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
    <div className="glass-panel p-6 border-rose-500/30 shadow-md space-y-4 font-sans">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        
        {/* Left Disruption Info */}
        <div className="space-y-3 max-w-3xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              <span>CONGESTION INCIDENT DETECTED</span>
            </div>
            
            <span className="text-xs font-medium text-[var(--text-muted)]">
              Corridor: <strong className="text-[var(--text-primary)] font-bold">{disruption.corridor}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                {disruption.congestionScore} <span className="text-sm text-[var(--text-muted)] font-semibold">/ 100</span>
              </span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 uppercase">
                {disruption.severity} Risk
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
              High-density gridlock at JNPA Port Gate 4 & NH48 toll plaza impeding 1,248 TEU container movement.
            </p>
          </div>

          {/* Sub-Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
            <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px] font-bold">TRAFFIC DENSITY</span>
              <span className="text-rose-600 dark:text-rose-400 font-extrabold">{disruption.trafficDensity}</span>
            </div>
            <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px] font-bold">PORT DWELL TIME</span>
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">+{disruption.portDwellTimeIncreasePercent}%</span>
            </div>
            <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px] font-bold">EXPECTED DELAY</span>
              <span className="text-rose-600 dark:text-rose-400 font-extrabold">{disruption.expectedDelayHours} hours</span>
            </div>
            <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[10px] font-bold">AI CONFIDENCE</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">{disruption.confidencePercent}%</span>
            </div>
          </div>

        </div>

        {/* Right Action Button */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2">
          <button
            onClick={onAnalyzeRoutes}
            disabled={isSimulating}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md ${
              isSimulating
                ? 'bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-muted)] cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-95'
            }`}
          >
            <Cpu className="w-4 h-4 text-white" />
            <span>{isSimulating ? 'SOLVER EXECUTING...' : 'Analyze Alternative Routes'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
          
          <span className="text-[10px] text-center text-[var(--text-muted)] font-medium">
            Triggers 5-agent solver routines
          </span>
        </div>

      </div>

    </div>
  );
};
