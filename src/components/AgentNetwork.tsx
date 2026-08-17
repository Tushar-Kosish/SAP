import React from 'react';
import {
  Activity,
  GitFork,
  BarChart3,
  BrainCircuit,
  FileCheck,
  CheckCircle2,
  Loader2,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AgentStatus } from '../types';

interface AgentNetworkProps {
  agents: AgentStatus[];
  activeAgentId?: string | null;
  simulationStep?: number;
}

export const AgentNetwork: React.FC<AgentNetworkProps> = ({
  agents,
  activeAgentId,
  simulationStep = 0,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-blue-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-indigo-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-emerald-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-amber-400" />;
      default: return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-6">
      
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Zap className="w-4 h-4" />
            AUTONOMOUS AGENT ORCHESTRATION ENGINE
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            AI AGENT NETWORK
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>5 CrewAI Micro-Agents Online</span>
        </div>
      </div>

      {/* Interconnected Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        
        {agents.map((agent, index) => {
          const isActive = activeAgentId === agent.id;
          const isCompleted = simulationStep > index + 1;
          const stepNumber = index + 1;

          return (
            <div key={agent.id} className="relative flex flex-col justify-between">
              
              {/* Agent Node Card */}
              <div
                className={`h-full p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-950/90 via-slate-900 to-slate-950 border-cyan-400 shadow-glow-cyan scale-[1.02] ring-2 ring-cyan-500/50'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center">
                      {getIcon(agent.iconName)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      STEP {stepNumber}
                    </span>
                  </div>

                  {/* Status Indicator Pill */}
                  {isActive ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      PROCESSING
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      DONE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                      {agent.status}
                    </span>
                  )}
                </div>

                {/* Agent Name & Role */}
                <div>
                  <h3 className="text-sm font-extrabold text-white">{agent.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{agent.role}</p>
                </div>

                {/* Task Box */}
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-white/5 space-y-1 text-xs">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">CURRENT TASK</div>
                  <p className="text-[11px] text-slate-200 leading-snug font-sans">
                    {agent.currentTask}
                  </p>
                </div>

                {/* Metrics & Confidence */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Confidence</span>
                  <span className="font-bold text-cyan-300">{agent.confidence}%</span>
                </div>

              </div>

              {/* Connector Arrow for Desktop (Between Cards) */}
              {index < agents.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900 border border-cyan-500/40 items-center justify-center text-cyan-400 shadow-md">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};
