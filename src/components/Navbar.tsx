import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Activity,
  Cpu,
  MapPin,
  Server,
  FileText,
  Clock,
  ArrowRight,
  UserCheck,
  GitBranch,
  ShieldCheck,
  Sun,
  Moon,
  Compass,
  Palette,
  Check,
  Menu,
  X
} from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface NavbarProps {
  onOpenMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMore }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <Layers className="w-4 h-4" /> },
    { path: '/operations', label: 'Operations', icon: <Activity className="w-4 h-4" /> },
    { path: '/agents', label: 'AI Agents', icon: <Cpu className="w-4 h-4" /> },
    { path: '/routes', label: 'Routes', icon: <MapPin className="w-4 h-4" /> },
    { path: '/sap', label: 'SAP BTP', icon: <Server className="w-4 h-4" /> },
    { path: '/documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { path: '/audit', label: 'Audit Log', icon: <Clock className="w-4 h-4" /> },
    { path: '/architecture', label: 'Architecture', icon: <GitBranch className="w-4 h-4" /> },
  ];

  const themeOptions: { id: ThemeMode; label: string; icon: React.ReactNode; badge: string }[] = [
    { id: 'light', label: 'Fiori Light', icon: <Sun className="w-4 h-4 text-amber-500" />, badge: 'Light' },
    { id: 'dark', label: 'Horizon Dark', icon: <Moon className="w-4 h-4 text-blue-400" />, badge: 'Dark' },
    { id: 'navy', label: 'Palantir Navy', icon: <Compass className="w-4 h-4 text-indigo-400" />, badge: 'Navy' },
    { id: 'emerald', label: 'Emerald Matrix', icon: <Palette className="w-4 h-4 text-emerald-400" />, badge: 'Matrix' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-color)] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-[var(--text-primary)] font-sans">
                SmartEvac <span className="text-blue-600 dark:text-blue-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                SAP BTP Engine
              </span>
            </div>
          </div>
        </Link>

        {/* Center Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-surface-inset)] p-1.5 rounded-xl border border-[var(--border-color)] shadow-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-blue-600 dark:text-blue-400 shadow-sm border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Theme Dropdown & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Theme Selector Button */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-all active:scale-95"
            >
              <Palette className="w-4 h-4 text-blue-500" />
              <span>Theme</span>
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] p-2 shadow-2xl z-50 space-y-1 animate-fadeIn">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)] mb-1">
                  Color Themes
                </div>
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      theme === opt.id
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                    {theme === opt.id && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={() => navigate('/operations')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/25 active:scale-95"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="p-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs flex items-center gap-1"
          >
            <Palette className="w-4 h-4 text-blue-500" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[var(--border-color)] space-y-1">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                      : 'text-[var(--text-secondary)] bg-[var(--bg-surface-inset)]'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/operations');
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Theme Dropdown Drawer */}
      {isThemeMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[var(--border-color)] grid grid-cols-2 gap-2">
          {themeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setTheme(opt.id);
                setIsThemeMenuOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                theme === opt.id
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                  : 'text-[var(--text-secondary)] bg-[var(--bg-surface-inset)]'
              }`}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.id && <Check className="w-3.5 h-3.5 text-blue-500" />}
            </button>
          ))}
        </div>
      )}

    </header>
  );
};
