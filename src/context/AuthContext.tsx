import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';

export type UserRole = 'admin' | 'supplier' | 'customer';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
}

interface StoredAccount extends AuthUser {
  passwordHash: string;
}

const DEFAULT_USERS: StoredAccount[] = [
  { id: 1, name: 'System Administrator', email: 'admin@smartevac.ai', passwordHash: 'admin123', role: 'admin' },
  { id: 2, name: 'CONCOR Rail Dispatcher', email: 'supplier@concor.co.in', passwordHash: 'supplier123', role: 'supplier' },
  { id: 3, name: 'Tata Motors Logistics', email: 'customer@tatamotors.com', passwordHash: 'customer123', role: 'customer' }
];

const DB_STORAGE_KEY = 'smartevac_users_db';
const USER_SESSION_KEY = 'smartevac_current_user';
const TOKEN_KEY = 'smartevac_token';

// Helper to get or initialize local user database
const getLocalUserDb = (): StoredAccount[] => {
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_USERS;
  }
};

const saveUserToLocalDb = (newUser: StoredAccount) => {
  const users = getLocalUserDb();
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(users));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // Ensure default DB is populated
      getLocalUserDb();

      const storedUserRaw = localStorage.getItem(USER_SESSION_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (storedUserRaw && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUserRaw) as AuthUser;
          setUser(parsedUser);
          setToken(storedToken);
          apiService.setAuthToken(storedToken);
        } catch (err) {
          console.error("Failed to restore local session:", err);
          logout();
        }
      } else if (storedToken) {
        try {
          apiService.setAuthToken(storedToken);
          const userData = await apiService.getMe();
          const authUser: AuthUser = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: (userData.role.toLowerCase() as UserRole) || 'customer'
          };
          setUser(authUser);
          setToken(storedToken);
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authUser));
        } catch (err) {
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (emailInput: string, passwordInput: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // 1. Try real FastAPI backend if available
    try {
      const res = await apiService.login({ email: cleanEmail, password: cleanPass });
      const authToken = res.access_token;
      const authUser: AuthUser = {
        id: res.user_id,
        name: res.name,
        email: res.email,
        role: (res.role.toLowerCase() as UserRole) || 'customer'
      };

      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authUser));
      apiService.setAuthToken(authToken);

      // Cache locally for offline availability
      saveUserToLocalDb({ ...authUser, passwordHash: cleanPass });

      setUser(authUser);
      setToken(authToken);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (apiErr: any) {
      console.log("Backend login failed or offline, checking persistent local DB...", apiErr);
      
      // 2. Local Database Fallback Verification
      const localUsers = getLocalUserDb();
      const foundUser = localUsers.find(
        u => u.email.toLowerCase() === cleanEmail && u.passwordHash === cleanPass
      );

      if (foundUser) {
        const mockToken = `token_local_${foundUser.id}_${Date.now()}`;
        const authUser: AuthUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        };

        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authUser));
        apiService.setAuthToken(mockToken);

        setUser(authUser);
        setToken(mockToken);
        setIsAuthModalOpen(false);
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password. Please check your credentials or sign up.' };
    }
  };

  const register = async (name: string, emailInput: string, passwordInput: string, role: UserRole) => {
    const cleanName = name.trim();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    const localUsers = getLocalUserDb();
    const existing = localUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    // 1. Try real FastAPI backend registration
    try {
      const res = await apiService.register({ name: cleanName, email: cleanEmail, password: cleanPass, role });
      const authToken = res.access_token;
      const authUser: AuthUser = {
        id: res.user_id,
        name: res.name,
        email: res.email,
        role: (res.role.toLowerCase() as UserRole) || 'customer'
      };

      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authUser));
      apiService.setAuthToken(authToken);

      saveUserToLocalDb({ ...authUser, passwordHash: cleanPass });

      setUser(authUser);
      setToken(authToken);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (apiErr: any) {
      console.log("Backend register failed or offline, saving to persistent local DB...", apiErr);

      // 2. Local Database Registration Fallback
      const newId = Date.now();
      const newStoredAccount: StoredAccount = {
        id: newId,
        name: cleanName,
        email: cleanEmail,
        passwordHash: cleanPass,
        role: role
      };

      saveUserToLocalDb(newStoredAccount);

      const mockToken = `token_local_${newId}_${Date.now()}`;
      const authUser: AuthUser = {
        id: newId,
        name: cleanName,
        email: cleanEmail,
        role: role
      };

      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authUser));
      apiService.setAuthToken(mockToken);

      setUser(authUser);
      setToken(mockToken);
      setIsAuthModalOpen(false);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_SESSION_KEY);
    apiService.setAuthToken(null);
    setUser(null);
    setToken(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
