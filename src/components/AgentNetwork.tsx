import React from 'react';
import {
  Activity,
  GitFork,
  BarChart3,
  BrainCircuit,
  FileCheck,
  CheckCircle2,
  Loader2,
  ShieldCheck,
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
      case 'Activity': return <Activity className="w-4 h-4 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-4 h-4 text-blue-400" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4 text-indigo-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-4 h-4 text-emerald-400" />;
      case 'FileCheck': return <FileCheck className="w-4 h-4 text-amber-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-panel space-y-5">
      
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            PROCESS ORCHESTRATION ENGINE
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            AI AGENT NETWORK
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>5 CrewAI Solvers Active</span>
        </div>
      </div>

      {/* Interconnected Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        
        {agents.map((agent, index) => {
          const isActive = activeAgentId === agent.id;
          const isCompleted = simulationStep > index + 1;
          const stepNumber = index + 1;

          return (
            <div key={agent.id} className="relative flex flex-col justify-between">
              
              {/* Agent Node Card */}
              <div
                className={`h-full p-4 rounded-lg border transition-all space-y-3 flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-950 border-blue-500 ring-1 ring-blue-500/40'
                    : isCompleted
                    ? 'bg-slate-950/90 border-emerald-800/60'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {getIcon(agent.iconName)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      0{stepNumber}
                    </span>
                  </div>

                  {/* Status Indicator Pill */}
                  {isActive ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono font-bold">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      ACTIVE
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      DONE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono">
                      {agent.status}
                    </span>
                  )}
                </div>

                {/* Agent Name & Role */}
                <div>
                  <h3 className="text-xs font-bold text-white">{agent.name}</h3>
                  <p className="text-[10px] text-slate-400 truncate">{agent.role}</p>
                </div>

                {/* Task Box */}
                <div className="bg-slate-900 p-2 rounded border border-slate-800/80 space-y-0.5 text-[11px]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">CURRENT TASK</div>
                  <p className="text-[10px] text-slate-200 leading-snug font-sans truncate">
                    {agent.currentTask}
                  </p>
                </div>

                {/* Metrics & Confidence */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Confidence</span>
                  <span className="font-bold text-white">{agent.confidence}%</span>
                </div>

              </div>

              {/* Connector Arrow for Desktop */}
              {index < agents.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};
