import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Layers,
  Activity,
  Cpu,
  MapPin,
  Server,
  FileText,
  Clock,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  GitBranch
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: <Layers className="w-4 h-4" /> },
    { path: '/operations', label: 'Operations', icon: <Activity className="w-4 h-4" /> },
    { path: '/agents', label: 'AI Agents', icon: <Cpu className="w-4 h-4" /> },
    { path: '/routes', label: 'Routes', icon: <MapPin className="w-4 h-4" /> },
    { path: '/sap', label: 'SAP', icon: <Server className="w-4 h-4" /> },
    { path: '/documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { path: '/audit', label: 'Audit', icon: <Clock className="w-4 h-4" /> },
    { path: '/architecture', label: 'Architecture', icon: <GitBranch className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080B11]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan transition-transform group-hover:scale-105">
            <Zap className="w-5 h-5 text-black font-bold fill-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                SmartEvac <span className="text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                SAP BTP Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Multi-Agent Logistics Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => navigate('/operations')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-extrabold transition-all shadow-glow-cyan hover:scale-[1.02]"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-300 hover:bg-slate-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

    </header>
  );
};
