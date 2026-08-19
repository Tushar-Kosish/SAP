import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Truck, ShieldAlert, Eye, ChevronDown, Check, Sparkles } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, transparencyEnabled, setTransparencyEnabled } = useRole();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Admin-only view switcher entries
  const adminViews = [
    {
      key: 'admin',
      label: 'Admin Control Center',
      color: 'text-purple-400 border-purple-500/30',
      bg: 'bg-purple-500/10 hover:bg-purple-500/20',
      icon: <ShieldAlert className="w-4 h-4 text-purple-400" />,
      path: '/admin',
      description: 'System governance, emergency overrides & SAP telemetry audit',
    },
    {
      key: 'supplier',
      label: 'Supplier Portal View',
      color: 'text-emerald-400 border-emerald-500/30',
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
      icon: <Truck className="w-4 h-4 text-emerald-400" />,
      path: '/supplier',
      description: 'Fleet capacity, AI reroute orders & SLA compliance scorecards',
    },
    {
      key: 'client',
      label: 'Customer Tracking View',
      color: 'text-indigo-400 border-indigo-500/30',
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/20',
      icon: <UserCheck className="w-4 h-4 text-indigo-400" />,
      path: '/client',
      description: 'Cargo tracking, ETAs, carbon savings & route changes',
    },
  ];

  // Current role display config
  const roleDisplayMap: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    admin: {
      label: 'Admin Control Center',
      color: 'text-purple-400 border-purple-500/30',
      bg: 'bg-purple-500/10',
      icon: <ShieldAlert className="w-4 h-4 text-purple-400" />,
    },
    supplier: {
      label: 'Supplier Partner Portal',
      color: 'text-emerald-400 border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      icon: <Truck className="w-4 h-4 text-emerald-400" />,
    },
    client: {
      label: 'Customer Tracking Portal',
      color: 'text-indigo-400 border-indigo-500/30',
      bg: 'bg-indigo-500/10',
      icon: <UserCheck className="w-4 h-4 text-indigo-400" />,
    },
    customer: {
      label: 'Customer Tracking Portal',
      color: 'text-indigo-400 border-indigo-500/30',
      bg: 'bg-indigo-500/10',
      icon: <UserCheck className="w-4 h-4 text-indigo-400" />,
    },
  };

  const active = roleDisplayMap[role] || roleDisplayMap['client'];
  const isAdmin = user?.role === 'admin';

  // Non-admin: read-only role badge (cannot switch roles)
  if (!isAdmin) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${active.bg} ${active.color}`}>
        {active.icon}
        <span>{active.label}</span>
      </div>
    );
  }

  // Admin: view switcher dropdown
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 shadow-sm ${active.bg} ${active.color}`}
        aria-label="Switch View Portal"
      >
        <span className="flex items-center gap-1.5">
          {active.icon}
          <span>{active.label}</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] p-3 shadow-2xl z-50 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between px-2 py-1 border-b border-[var(--border-color)] pb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-extrabold text-[var(--text-primary)]">Admin View Switcher</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
              Admin Only
            </span>
          </div>

          <div className="space-y-1.5">
            {adminViews.map((v) => {
              const isCurrent = role === v.key || (role === 'customer' && v.key === 'client');
              return (
                <button
                  key={v.key}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(v.path);
                  }}
                  className={`w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-all border ${
                    isCurrent
                      ? 'bg-blue-500/15 border-blue-500/40 text-[var(--text-primary)] shadow-sm'
                      : 'border-transparent hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
                      {v.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <span>{v.label}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono uppercase font-bold text-blue-400 bg-blue-400/10 px-1.5 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-snug">
                        {v.description}
                      </div>
                    </div>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 text-blue-500 mt-1 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Data Transparency Mode</span>
            </div>
            <button
              onClick={() => setTransparencyEnabled(!transparencyEnabled)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                transparencyEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={transparencyEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  transparencyEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
