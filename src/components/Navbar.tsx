import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMore }) => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: <Layers className="w-4 h-4 text-slate-400" /> },
    { path: '/operations', label: 'Operations', icon: <Activity className="w-4 h-4 text-slate-400" /> },
    { path: '/agents', label: 'AI Agents', icon: <Cpu className="w-4 h-4 text-slate-400" /> },
    { path: '/routes', label: 'Routes', icon: <MapPin className="w-4 h-4 text-slate-400" /> },
    { path: '/sap', label: 'SAP', icon: <Server className="w-4 h-4 text-slate-400" /> },
    { path: '/documents', label: 'Documents', icon: <FileText className="w-4 h-4 text-slate-400" /> },
    { path: '/audit', label: 'Audit Log', icon: <Clock className="w-4 h-4 text-slate-400" /> },
    { path: '/architecture', label: 'Architecture', icon: <GitBranch className="w-4 h-4 text-slate-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 group-hover:border-slate-500 transition-colors">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                SmartEvac <span className="text-slate-400 font-normal">AI</span>
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                SAP BTP Core
              </span>
            </div>
          </div>
        </Link>

        {/* Mobile Header Center & Right */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>OPERATIONAL</span>
          </div>

          <button
            onClick={onOpenMore}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 active:bg-slate-800"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA for Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate('/operations')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all shadow-subtle active:scale-[0.99]"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </div>
    </header>
  );
};
