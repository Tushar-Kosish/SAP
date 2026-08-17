import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Server,
  FileText,
  Clock,
  GitBranch,
  Settings,
  Info,
  X,
  ChevronRight,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface MoreBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
}

export const MoreBottomSheet: React.FC<MoreBottomSheetProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenAbout,
}) => {
  if (!isOpen) return null;

  const moreNavItems = [
    { path: '/sap', label: 'SAP Integration', icon: <Server className="w-5 h-5 text-indigo-400" />, desc: 'BTP OData REST telemetry layer' },
    { path: '/documents', label: 'Documents', icon: <FileText className="w-5 h-5 text-cyan-400" />, desc: 'AI-generated CONCOR & customs PDFs' },
    { path: '/audit', label: 'Audit Log', icon: <Clock className="w-5 h-5 text-emerald-400" />, desc: 'Enterprise governance audit trail' },
    { path: '/architecture', label: 'Architecture', icon: <GitBranch className="w-5 h-5 text-blue-400" />, desc: 'Multi-tier system topology diagram' },
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Background Overlay Click Handler */}
      <div className="flex-1" onClick={onClose} />

      {/* Sliding Sheet */}
      <div className="bg-[#0A0E17] rounded-t-3xl border-t border-cyan-500/40 p-6 space-y-6 shadow-2xl animate-slideUp max-h-[85vh] overflow-y-auto">
        
        {/* Handlebar Indicator */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <span className="text-base font-extrabold text-white">SmartEvac AI Platform</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="space-y-2">
          {moreNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between p-3.5 rounded-2xl border transition-all active:scale-[0.99] min-h-[52px] ${
                  isActive
                    ? 'bg-cyan-950/80 border-cyan-400 text-white'
                    : 'bg-slate-900/60 border-white/10 text-slate-200 hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{item.desc}</div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-500" />
            </NavLink>
          ))}
        </div>

        {/* Utility Items: Settings & About */}
        <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 font-mono text-xs">
          
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-bold active:scale-95 min-h-[44px]"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-bold active:scale-95 min-h-[44px]"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>About</span>
          </button>

        </div>

      </div>

    </div>
  );
};
