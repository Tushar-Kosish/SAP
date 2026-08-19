import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MoreBottomSheet } from './components/MoreBottomSheet';
import { InstallPwaPrompt } from './components/InstallPwaPrompt';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { OperationsPage } from './pages/OperationsPage';
import { AgentsPage } from './pages/AgentsPage';
import { RoutesPage } from './pages/RoutesPage';
import { SapPage } from './pages/SapPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AuditPage } from './pages/AuditPage';
import { ArchitecturePage } from './pages/ArchitecturePage';

import { ClientPage } from './pages/ClientPage';
import { SupplierPage } from './pages/SupplierPage';
import { AdminPage } from './pages/AdminPage';
import { ScmGuidancePage } from './pages/ScmGuidancePage';

import { Settings, Zap, Sun, Moon } from 'lucide-react';

import { AuthProvider, useAuth, UserRole } from './context/AuthContext';

import { LoginPage } from './pages/LoginPage';

// --- Protected Route & RBAC Role Guard Component ---
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center text-xs font-bold font-mono text-[var(--text-secondary)]">
        Verifying security token & database credentials...
      </div>
    );
  }

  // Without Login User CANNOT enter website -> Redirect to Login Page
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Role Access Isolation Guard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'supplier') return <Navigate to="/supplier" replace />;
    return <Navigate to="/client" replace />;
  }

  return <>{children}</>;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="flex-1"
      >
        <Routes location={location}>
          {/* Public Login & Sign Up Entrance Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Consumer / Customer Interface & Data */}
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin']}>
                <ClientPage />
              </ProtectedRoute>
            }
          />

          {/* Supplier Partner Interface & Data */}
          <Route
            path="/supplier"
            element={
              <ProtectedRoute allowedRoles={['supplier', 'admin']}>
                <SupplierPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Control Center Interface & System Modules */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <OperationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AgentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RoutesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sap"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AuditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/architecture"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ArchitecturePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scm-guidance"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ScmGuidancePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Wildcard Route -> Redirect to Entrance */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function MainLayout() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const showChrome = isAuthenticated && !isLoginPage;

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans flex flex-col justify-between transition-colors">
      
      {/* PWA Custom Home-Screen Install Prompt */}
      <InstallPwaPrompt />

      {/* Global Navigation Header — only shown after login */}
      {showChrome && <Navbar onOpenMore={() => setIsMoreOpen(true)} onLogout={handleLogout} />}

      {/* Page Content */}
      <AnimatedRoutes />

      {/* Mobile App Bottom Navigation Bar — only shown after login */}
      {showChrome && (
        <BottomNav
          onOpenMore={() => setIsMoreOpen(true)}
          isMoreOpen={isMoreOpen}
        />
      )}

      {/* Mobile App More Bottom Sheet Drawer — only shown after login */}
      {showChrome && (
        <MoreBottomSheet
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm glass-panel rounded-2xl border border-[var(--border-strong)] p-6 space-y-4 bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2 text-blue-500 font-bold">
                <Settings className="w-5 h-5" />
                <span>Mobile App Settings</span>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-[var(--text-muted)] p-1">✕</button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)] space-y-2">
                <span className="text-[var(--text-secondary)] font-bold block">UI Theme Preference</span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold ${
                      theme === 'light' ? 'bg-blue-600 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Fiori Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold ${
                      theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Horizon Dark
                  </button>
                </div>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)] flex justify-between items-center">
                <span>SAP BTP Gateway</span>
                <span className="text-emerald-500 font-bold">OData REST v2.4</span>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)] flex justify-between items-center">
                <span>PWA Standalone Mode</span>
                <span className="text-blue-500 font-bold">Active</span>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-app)] font-extrabold text-xs shadow-subtle"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md glass-panel rounded-2xl border border-[var(--border-strong)] p-6 space-y-4 bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2 text-blue-500 font-bold">
                <Zap className="w-5 h-5" />
                <span>About SmartEvac AI</span>
              </div>
              <button onClick={() => setIsAboutOpen(false)} className="text-[var(--text-muted)] p-1">✕</button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              SmartEvac AI is an enterprise multi-agent logistics intelligence command center built for SAP BTP. It monitors landside port congestion, evaluates multi-modal pathways (Highway NH48, WDFC Rail, Coastal Feed), and automates customs filings.
            </p>

            <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)] text-xs font-mono space-y-1 text-[var(--text-primary)]">
              <div>• Version: <strong className="text-blue-500">1.0.0 (PWA Enabled)</strong></div>
              <div>• Theme: <strong className="text-amber-500">{theme.toUpperCase()} HORIZON</strong></div>
              <div>• Integration: <strong className="text-emerald-500">SAP TM OData Gateway</strong></div>
            </div>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-app)] font-extrabold text-xs shadow-subtle"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer — only shown after login */}
      {showChrome && <Footer />}

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
