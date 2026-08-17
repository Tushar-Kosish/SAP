import React from 'react';
import { AlertOctagon, ArrowRight, Cpu } from 'lucide-react';
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
    <div className="bg-slate-900/90 p-5 rounded-xl border border-rose-900/60 shadow-panel">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        
        {/* Left Disruption Info */}
        <div className="space-y-3 max-w-3xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-mono font-bold uppercase">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>CONGESTION INCIDENT DETECTED</span>
            </div>
            
            <span className="text-xs font-mono text-slate-400">
              Corridor: <strong className="text-slate-200">{disruption.corridor}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-rose-400">
                {disruption.congestionScore} <span className="text-sm text-slate-400">/ 100</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-900/80 text-rose-200 border border-rose-700 uppercase">
                {disruption.severity}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-density gridlock at JNPA Port Gate 4 & NH48 toll plaza impeding 1,248 TEU container movement.
            </p>
          </div>

          {/* Sub-Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs font-mono">
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TRAFFIC DENSITY</span>
              <span className="text-rose-300 font-bold">{disruption.trafficDensity}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">PORT DWELL TIME</span>
              <span className="text-amber-300 font-bold">+{disruption.portDwellTimeIncreasePercent}%</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">EXPECTED DELAY</span>
              <span className="text-rose-300 font-bold">{disruption.expectedDelayHours} hours</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">AI CONFIDENCE</span>
              <span className="text-cyan-300 font-bold">{disruption.confidencePercent}%</span>
            </div>
          </div>

        </div>

        {/* Right Action Button */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2">
          <button
            onClick={onAnalyzeRoutes}
            disabled={isSimulating}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-bold text-xs transition-all shadow-subtle ${
              isSimulating
                ? 'bg-slate-950 border border-slate-800 text-slate-400 cursor-wait'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white active:scale-[0.99]'
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>{isSimulating ? 'SOLVER EXECUTING...' : 'Analyze Alternative Routes'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          <span className="text-[10px] text-center text-slate-400 font-mono">
            Triggers 5-agent solver routines
          </span>
        </div>

      </div>

    </div>
  );
};
