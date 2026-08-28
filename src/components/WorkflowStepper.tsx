import React from 'react';
import {
  CloudRain,
  MapPin,
  Sparkles,
  Send,
  ShieldCheck,
  FileText,
  Truck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface WorkflowStepperProps {
  currentStepIndex?: number;
  onStepClick?: (stepIndex: number) => void;
}

export const WORKFLOW_STEPS = [
  {
    index: 1,
    label: 'Weather Sensing',
    sublabel: 'Rain/Storm Detection',
    icon: CloudRain,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-500/10',
  },
  {
    index: 2,
    label: 'GIS Route Map',
    sublabel: 'Live Multimodal Overlay',
    icon: MapPin,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-500/10',
  },
  {
    index: 3,
    label: 'AI Recommendation',
    sublabel: 'Weather & Delay Analysis',
    icon: Sparkles,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/10',
  },
  {
    index: 4,
    label: 'Supplier Proposal',
    sublabel: 'Send Request to Admin',
    icon: Send,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
  },
  {
    index: 5,
    label: 'Admin Authorization',
    sublabel: 'Accept / Override Reroute',
    icon: ShieldCheck,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-500/10',
  },
  {
    index: 6,
    label: 'PDF Certificate',
    sublabel: 'Official Written Document',
    icon: FileText,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-indigo-500/10',
  },
  {
    index: 7,
    label: 'Carrier Dispatch',
    sublabel: 'Live SAP Synchronization',
    icon: Truck,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/40',
    bgColor: 'bg-teal-500/10',
  },
];

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStepIndex = 3,
  onStepClick,
}) => {
  return (
    <div className="glass-panel p-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-lg font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-extrabold uppercase text-[var(--text-primary)]">
            End-to-End AI Logistics Workflow Journey
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          7-Step Automated Pipeline
        </span>
      </div>

      {/* Stepper Bar - Horizontal scrollable on mobile, grid on desktop */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        {WORKFLOW_STEPS.map((step, idx) => {
          const IconComp = step.icon;
          const isActive = currentStepIndex === step.index;
          const isDone = currentStepIndex > step.index;

          return (
            <React.Fragment key={step.index}>
              <div
                onClick={() => onStepClick && onStepClick(step.index)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? `${step.bgColor} ${step.borderColor} ring-2 ring-emerald-500/30 scale-[1.02]`
                    : isDone
                    ? 'bg-[var(--bg-surface-inset)] border-emerald-500/30 text-emerald-400'
                    : 'bg-[var(--bg-surface-inset)] border-[var(--border-color)] opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 font-extrabold'
                      : isActive
                      ? `${step.bgColor} ${step.color} border ${step.borderColor}`
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <IconComp className="w-3.5 h-3.5" />}
                </div>

                <div className="text-left">
                  <div className="text-[11px] font-extrabold text-[var(--text-primary)] whitespace-nowrap">
                    {step.index}. {step.label}
                  </div>
                  <div className="text-[9px] text-[var(--text-muted)] font-mono whitespace-nowrap">
                    {step.sublabel}
                  </div>
                </div>
              </div>

              {idx < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 hidden md:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
