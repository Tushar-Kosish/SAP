import React from 'react';
import { Server, ArrowRight, Activity, Terminal, ShieldCheck, Database, Layers } from 'lucide-react';
import { SapApiLog } from '../types';

interface SapIntegrationViewProps {
  logs: SapApiLog[];
}

export const SapIntegrationView: React.FC<SapIntegrationViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Disclaimer Banner */}
      <div className="glass-panel p-5 border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[var(--text-primary)]">SAP Integration Layer</span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase">
                SAP BTP GATEWAY ACTIVE
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              Enterprise REST telemetry layer bridging SmartEvac AI agent decisions with SAP Transportation Management (TM).
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="glass-panel p-6 shadow-md space-y-4">
        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          SYSTEM INTEGRATION TOPOLOGY
        </div>
        <h3 className="text-xl font-black text-[var(--text-primary)]">SAP BTP Architecture</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* Node 1 */}
          <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-blue-500/30 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              01
            </div>
            <div className="text-sm font-extrabold text-[var(--text-primary)]">SmartEvac AI</div>
            <div className="text-[11px] text-[var(--text-muted)] font-semibold">Multi-Agent Engine</div>
          </div>

          {/* Node 2 */}
          <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-indigo-500/30 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 mx-auto flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
              02
            </div>
            <div className="text-sm font-extrabold text-[var(--text-primary)]">SAP BTP</div>
            <div className="text-[11px] text-[var(--text-muted)] font-semibold">Integration Suite</div>
          </div>

          {/* Node 3 */}
          <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-cyan-500/30 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 mx-auto flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">
              03
            </div>
            <div className="text-sm font-extrabold text-[var(--text-primary)]">SAP TM</div>
            <div className="text-[11px] text-[var(--text-muted)] font-semibold">Transportation Mgmt</div>
          </div>

          {/* Node 4 */}
          <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-emerald-500/30 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
              04
            </div>
            <div className="text-sm font-extrabold text-[var(--text-primary)]">Carrier Network</div>
            <div className="text-[11px] text-[var(--text-muted)] font-semibold">CONCOR / Railways</div>
          </div>

        </div>
      </div>

      {/* Live Telemetry Console Log */}
      <div className="glass-panel p-6 shadow-md space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-[var(--text-primary)]">SAP BTP API TELEMETRY STREAM</span>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE FEED
          </span>
        </div>

        {/* API Logs List */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {logs.map((log) => (
            <div key={log.id} className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-2 text-xs">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    log.method === 'POST' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                  }`}>
                    {log.method}
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">{log.endpoint}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-[var(--text-muted)] font-medium">{log.timestamp}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                    {log.status} {log.statusText}
                  </span>
                </div>
              </div>

              <div className="bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] font-mono overflow-x-auto">
                <span className="text-blue-600 dark:text-blue-400 font-bold">RESPONSE: </span>
                <span>{log.responseSnippet}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
