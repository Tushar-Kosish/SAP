import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-color)] pt-12 pb-8 px-4 lg:px-8 text-[var(--text-secondary)] font-sans transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                SmartEvac <span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Autonomous multi-agent intelligence platform for landside port evacuation, intermodal corridor optimization, and real-time SAP Transportation Management synchronization.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-blue-600 dark:text-blue-400">
                SAP BTP Integration
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-emerald-600 dark:text-emerald-400">
                Multi-Agent Solver
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-muted)]">
                v1.0 PWA
              </span>
            </div>
          </div>

          {/* Col 3: Platform Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              COMMAND CENTER
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/operations" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Live Operations</Link></li>
              <li><Link to="/agents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Agent Network</Link></li>
              <li><Link to="/routes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Route Intelligence</Link></li>
              <li><Link to="/sap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">SAP Integration</Link></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              GOVERNANCE & DOCS
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/documents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Document Center</Link></li>
              <li><Link to="/audit" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Decision Audit Log</Link></li>
              <li><Link to="/architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">System Architecture</Link></li>
            </ul>
          </div>

          {/* Col 5: SAP Enterprise Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              SYSTEM STATUS
            </h4>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Real-time synchronization active via OData REST Gateway.
            </p>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span>Built for intelligent enterprise logistics optimization</span>
          </div>
          <div className="text-[var(--text-muted)] font-medium">
            SmartEvac AI © 2026 | All Rights Reserved
          </div>
        </div>

      </div>
    </footer>
  );
};
