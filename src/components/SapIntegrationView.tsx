import React from 'react';
import { Server, ArrowRight, Activity, Terminal, ShieldCheck, Database, Layers } from 'lucide-react';
import { SapApiLog } from '../types';

interface SapIntegrationViewProps {
  logs: SapApiLog[];
}

export const SapIntegrationView: React.FC<SapIntegrationViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      
      {/* Disclaimer Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">SAP Integration Layer</span>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                DEMO / SIMULATED SAP API
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise REST telemetry layer bridging SmartEvac AI agent decisions with SAP Transportation Management (TM).
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-4">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
          SYSTEM INTEGRATION TOPOLOGY
        </div>
        <h3 className="text-xl font-extrabold text-white">SAP BTP Architecture</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* Node 1 */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/40 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 font-bold font-mono">
              01
            </div>
            <div className="text-sm font-extrabold text-white">SmartEvac AI</div>
            <div className="text-[11px] text-slate-400 font-mono">Multi-Agent Engine</div>
          </div>

          {/* Node 2 */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-blue-500/40 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-lg bg-blue-950 mx-auto flex items-center justify-center text-blue-400 font-bold font-mono">
              02
            </div>
            <div className="text-sm font-extrabold text-white">SAP BTP</div>
            <div className="text-[11px] text-slate-400 font-mono">Integration Suite</div>
          </div>

          {/* Node 3 */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/40 space-y-2 text-center relative">
            <div className="w-10 h-10 rounded-lg bg-indigo-950 mx-auto flex items-center justify-center text-indigo-400 font-bold font-mono">
              03
            </div>
            <div className="text-sm font-extrabold text-white">SAP TM</div>
            <div className="text-[11px] text-slate-400 font-mono">Transportation Mgmt</div>
          </div>

          {/* Node 4 */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 space-y-2 text-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 mx-auto flex items-center justify-center text-emerald-400 font-bold font-mono">
              04
            </div>
            <div className="text-sm font-extrabold text-white">Carrier Network</div>
            <div className="text-[11px] text-slate-400 font-mono">CONCOR / Railways</div>
          </div>

        </div>
      </div>

      {/* Live Telemetry Console Log */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-4 font-mono">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">SAP BTP API TELEMETRY STREAM</span>
          </div>
          <span className="text-xs text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE FEED
          </span>
        </div>

        {/* API Logs List */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {logs.map((log) => (
            <div key={log.id} className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-2 text-xs">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    log.method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {log.method}
                  </span>
                  <span className="text-slate-300 font-bold">{log.endpoint}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-400">{log.timestamp}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    {log.status} {log.statusText}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-2 rounded text-[11px] text-slate-400 overflow-x-auto">
                <span className="text-cyan-400 font-bold">RESPONSE: </span>
                <span>{log.responseSnippet}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
