import React from 'react';
import { AlertOctagon, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { DisruptionEvent } from '../types';

interface DisruptionAlertProps {
  disruption: DisruptionEvent;
  onAnalyzeRoutes: () => void;
  isSimulating: boolean;
}

export const DisruptionAlert: React.FC<DisruptionAlertProps> = ({
  disruption,
  onAnalyzeRoutes,
  isSimulating,
}) => {
  return (
    <div className="relative overflow-hidden glass-panel p-6 rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-amber-950/30 shadow-glow-amber">
      
      {/* Background Accent Pulse Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Disruption Info */}
        <div className="space-y-3 max-w-3xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/60 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>⚠ CONGESTION DETECTED</span>
            </div>
            
            <span className="text-xs font-mono text-slate-400">
              Corridor: <strong className="text-slate-200">{disruption.corridor}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono tracking-tight">
                {disruption.congestionScore} <span className="text-xl text-rose-300">/ 100</span>
              </span>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-rose-900/80 text-rose-200 border border-rose-700 font-mono uppercase">
                {disruption.severity}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-normal">
              High density bottlenecks at JNPA Port Gate 4 & NH48 toll plaza impeding 1,248 TEU container movement.
            </p>
          </div>

          {/* Sub-Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs font-mono">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block text-[10px]">TRAFFIC DENSITY</span>
              <span className="text-rose-300 font-bold">{disruption.trafficDensity}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block text-[10px]">PORT DWELL TIME</span>
              <span className="text-amber-300 font-bold">+{disruption.portDwellTimeIncreasePercent}%</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block text-[10px]">EXPECTED DELAY</span>
              <span className="text-rose-300 font-bold">{disruption.expectedDelayHours} hours</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block text-[10px]">AI CONFIDENCE</span>
              <span className="text-cyan-300 font-bold">{disruption.confidencePercent}%</span>
            </div>
          </div>

        </div>

        {/* Right Action Button */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
          <button
            onClick={onAnalyzeRoutes}
            disabled={isSimulating}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-glow-cyan ${
              isSimulating
                ? 'bg-cyan-950 border border-cyan-800 text-cyan-400 opacity-80 cursor-wait'
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black hover:scale-[1.02]'
            }`}
          >
            <Cpu className="w-5 h-5 fill-black" />
            <span>{isSimulating ? 'AI AGENTS EXECUTING...' : 'Analyze Alternative Routes'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <span className="text-[11px] text-center text-slate-400 font-mono">
            Triggers multi-agent evaluation pipeline
          </span>
        </div>

      </div>

    </div>
  );
};
