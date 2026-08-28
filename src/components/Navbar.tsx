import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, User as UserIcon, Palette, Sun, Moon, Compass, Check, Menu, X, ShieldAlert, Truck, UserCheck, Activity, Cpu, MapPin, BookOpen } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenMore?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) onLogout();
    else { logout(); navigate('/'); }
  };

  // Strict role-based nav links — each role only sees their own pages
  const getNavLinks = () => {
    if (!user) return [];
    if (user.role === 'admin') return [
      { path: '/admin', label: 'Dashboard', icon: <ShieldAlert className="w-4 h-4 text-purple-400" /> },
      { path: '/operations', label: 'Live Operations', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
      { path: '/agents', label: 'AI Decisions', icon: <Cpu className="w-4 h-4 text-blue-400" /> },
      { path: '/routes', label: 'Route Management', icon: <MapPin className="w-4 h-4 text-amber-400" /> },
      { path: '/scm-guidance', label: 'System', icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    ];
    return [
      { path: '/supplier', label: 'Dashboard', icon: <Truck className="w-4 h-4 text-emerald-400" /> },
    ];
  };

  const navLinks = getNavLinks();

  const roleColor = user?.role === 'admin'
    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    : user?.role === 'supplier'
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';

  const themeOptions: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-400" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-blue-400" /> },
    { id: 'navy', label: 'Navy', icon: <Compass className="w-4 h-4 text-indigo-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-color)] transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[var(--text-primary)]">
            SmartEvac <span className="text-blue-500">AI</span>
          </span>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-surface-inset)] p-1.5 rounded-xl border border-[var(--border-color)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-blue-500 shadow-sm border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: User Info + Theme + Logout */}
        <div className="flex items-center gap-2">

          {/* Theme Picker */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="p-2 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] transition-all"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-blue-400" />
            </button>
            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] p-2 shadow-2xl z-50 space-y-1 animate-fadeIn">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setTheme(opt.id); setIsThemeOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      theme === opt.id
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">{opt.icon}<span>{opt.label}</span></div>
                    {theme === opt.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Badge */}
          {isAuthenticated && user && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${roleColor}`}>
              <UserIcon className="w-3.5 h-3.5" />
              <span className="max-w-[100px] truncate">{user.name}</span>
              <span className="text-[9px] uppercase font-mono opacity-70">({user.role})</span>
            </div>
          )}

          {/* LOGOUT BUTTON — always visible and prominent */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all active:scale-95"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-color)] px-4 py-3 space-y-2 bg-[var(--nav-bg)]">
          {/* User info on mobile */}
          {isAuthenticated && user && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold ${roleColor}`}>
              <UserIcon className="w-4 h-4" />
              <span>{user.name}</span>
              <span className="ml-auto text-[9px] uppercase font-mono opacity-70">({user.role})</span>
            </div>
          )}

          {/* Nav links on mobile */}
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                      : 'text-[var(--text-secondary)] bg-[var(--bg-surface-inset)]'
                  }`
                }
              >
                {link.icon}{link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs"
          >
            <LogOut className="w-4 h-4" />
            Log Out of Account
          </button>
        </div>
      )}
    </header>
  );
};
