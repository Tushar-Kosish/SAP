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
  Palette
} from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface NavbarProps {
  onOpenMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMore }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <Layers className="w-4 h-4 opacity-75" /> },
    { path: '/operations', label: 'Operations', icon: <Activity className="w-4 h-4 opacity-75" /> },
    { path: '/agents', label: 'AI Agents', icon: <Cpu className="w-4 h-4 opacity-75" /> },
    { path: '/routes', label: 'Routes', icon: <MapPin className="w-4 h-4 opacity-75" /> },
    { path: '/sap', label: 'SAP', icon: <Server className="w-4 h-4 opacity-75" /> },
    { path: '/documents', label: 'Documents', icon: <FileText className="w-4 h-4 opacity-75" /> },
    { path: '/audit', label: 'Audit Log', icon: <Clock className="w-4 h-4 opacity-75" /> },
    { path: '/architecture', label: 'Architecture', icon: <GitBranch className="w-4 h-4 opacity-75" /> },
  ];

  const themeOptions: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Fiori Light', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'dark', label: 'Horizon Dark', icon: <Moon className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'navy', label: 'Palantir Navy', icon: <Compass className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'emerald', label: 'Emerald Matrix', icon: <Palette className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--border-strong)] transition-colors">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-sans">
                SmartEvac <span className="text-[var(--text-muted)] font-normal">AI</span>
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-surface-inset)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                SAP BTP Core
              </span>
            </div>
          </div>
        </Link>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Theme Dropdown Toggle */}
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="p-1.5 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs flex items-center gap-1"
          >
            <Palette className="w-4 h-4 text-blue-500" />
          </button>

          <button
            onClick={onOpenMore}
            className="w-8 h-8 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] active:scale-95"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-surface-inset)] p-1 rounded-lg border border-[var(--border-color)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Theme Selector + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-blue-500" />
              <span>Theme</span>
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] p-1.5 shadow-xl z-50 space-y-1">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      theme === opt.id
                        ? 'bg-[var(--bg-surface-inset)] text-[var(--text-primary)] font-bold border border-[var(--border-color)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/operations')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-app)] hover:opacity-90 font-bold text-xs transition-all shadow-subtle active:scale-[0.99]"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                theme === opt.id
                  ? 'bg-[var(--bg-surface-inset)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border-color)]'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}

    </header>
  );
};
