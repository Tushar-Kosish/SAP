import React, { useState, useEffect } from 'react';
import { AgentStatus } from '../types';
import { apiService } from '../services/api';
import {
  Activity,
  GitFork,
  BarChart3,
  BrainCircuit,
  FileCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Sparkles
} from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentStatus | null>(null);

  useEffect(() => {
    apiService.getAgents().then(setAgents);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-blue-500" />;
      case 'GitFork': return <GitFork className="w-6 h-6 text-indigo-500" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-500" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-cyan-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
      default: return <Zap className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
          <Cpu className="w-4 h-4 text-blue-500" />
          <span>AUTONOMOUS MULTI-AGENT ARCHITECTURE</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          AI Micro-Agent Network
        </h1>
        
        <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
          Five specialized micro-agents operating synchronously across sensing, corridor routing, financial risk evaluation, policy decisioning, and SAP customs documentation.
        </p>
      </div>

      {/* Interconnected Flow Visual Banner */}
      <div className="glass-panel p-6 shadow-md space-y-4">
        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          PIPELINE DAG EXECUTION SEQUENCE
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {agents.map((agent, index) => (
            <React.Fragment key={agent.id}>
              <div
                onClick={() => setSelectedAgent(agent)}
                className="cursor-pointer flex-1 w-full bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] hover:border-blue-500/40 transition-all text-center space-y-2 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] mx-auto flex items-center justify-center shadow-sm">
                  {getIcon(agent.iconName)}
                </div>
                <div className="text-xs font-extrabold text-[var(--text-primary)]">{agent.name}</div>
                <div className="text-[10px] font-bold text-[var(--text-muted)]">Step 0{index + 1}</div>
              </div>

              {index < agents.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-blue-500/50" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 5 Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, idx) => (
          <div
            key={agent.id}
            className="glass-panel glass-panel-hover p-6 border border-[var(--border-color)] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  0{idx + 1} AGENT NODE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  ● {agent.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-center shadow-sm">
                  {getIcon(agent.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[var(--text-primary)]">{agent.name}</h3>
                  <div className="text-xs text-[var(--text-muted)] font-medium">{agent.role}</div>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium pt-1">
                {agent.details}
              </p>

              <div className="bg-[var(--bg-surface-inset)] p-3 rounded-xl border border-[var(--border-color)] space-y-1 text-xs">
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">CURRENT ACTION</div>
                <p className="text-[11px] text-[var(--text-primary)] font-semibold leading-snug">
                  {agent.lastAction}
                </p>
              </div>
            </div>

            {/* Metrics & Click Trigger */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
              <div>
                <span className="text-[var(--text-muted)] font-medium">Confidence: </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{agent.confidence}%</span>
              </div>

              <button
                onClick={() => setSelectedAgent(agent)}
                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-extrabold text-xs"
              >
                <span>View Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-[var(--border-strong)] p-6 space-y-6 bg-[var(--bg-surface)]">
            
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-center">
                  {getIcon(selectedAgent.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)]">{selectedAgent.name}</h3>
                  <div className="text-xs text-[var(--text-muted)] font-medium">{selectedAgent.role}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Deep-Dive Spec Details */}
            <div className="space-y-4 text-xs font-medium">
              <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                <div className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px]">INPUT TELEMETRY DATA STREAMS:</div>
                <div className="text-[var(--text-primary)]">• JNPA Gate IoT sensors & AIS vessel coordinates</div>
                <div className="text-[var(--text-primary)]">• NH48 National Highway toll queue velocity</div>
                <div className="text-[var(--text-primary)]">• CONCOR railway yard rake availability</div>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px]">PROCESSING ENGINE:</div>
                <div className="text-[var(--text-primary)]">• Python agent solver runtime</div>
                <div className="text-[var(--text-primary)]">• Multi-criteria optimization routine</div>
                <div className="text-[var(--text-primary)]">• Monte Carlo 1,000 SLA variance simulation</div>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">OUTPUT ARTIFACTS:</div>
                <div className="text-[var(--text-primary)]">• Recommended pathway: WDFC Electric Rail (91/100)</div>
                <div className="text-[var(--text-primary)]">• CONCOR booking PDF & ICEGATE customs amendment</div>
                <div className="text-[var(--text-primary)]">• SAP TM Transportation Order dispatch payload</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedAgent(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md"
            >
              Close Specs
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
