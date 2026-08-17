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
  Info
} from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentStatus | null>(null);

  useEffect(() => {
    apiService.getAgents().then(setAgents);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-6 h-6 text-blue-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-indigo-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-emerald-400" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-400" />;
      default: return <Zap className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AUTONOMOUS MULTI-AGENT ARCHITECTURE</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          MEET THE AI AGENT NETWORK
        </h1>
        
        <p className="text-base text-slate-300">
          Five specialized agents. One coordinated decision. Operating asynchronously across sensing, pathway calculation, financial risk assessment, decision policy, and customs filing.
        </p>
      </div>

      {/* Interconnected Flow Visual Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-4">
          PIPELINE DAG EXECUTION SEQUENCE
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {agents.map((agent, index) => (
            <React.Fragment key={agent.id}>
              <div
                onClick={() => setSelectedAgent(agent)}
                className="cursor-pointer flex-1 w-full bg-slate-900/90 p-4 rounded-xl border border-white/10 hover:border-cyan-400 transition-all text-center space-y-2 hover:scale-[1.02]"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-white/10 mx-auto flex items-center justify-center">
                  {getIcon(agent.iconName)}
                </div>
                <div className="text-xs font-bold text-white">{agent.name}</div>
                <div className="text-[10px] font-mono text-slate-400">Step 0{index + 1}</div>
              </div>

              {index < agents.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-cyan-500/60" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 5 Large Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, idx) => (
          <div
            key={agent.id}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  0{idx + 1} — AGENT NODE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  ● {agent.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
                  {getIcon(agent.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{agent.name}</h3>
                  <div className="text-xs text-slate-400">{agent.role}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {agent.details}
              </p>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-1 text-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase">CURRENT ACTION</div>
                <p className="text-[11px] text-slate-200 font-mono leading-snug">
                  {agent.lastAction}
                </p>
              </div>
            </div>

            {/* Metrics & Click Trigger */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400">Confidence: </span>
                <span className="font-bold text-cyan-300">{agent.confidence}%</span>
              </div>

              <button
                onClick={() => setSelectedAgent(agent)}
                className="flex items-center gap-1.5 text-cyan-400 hover:underline font-bold text-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-6 bg-slate-950">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                  {getIcon(selectedAgent.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{selectedAgent.name}</h3>
                  <div className="text-xs text-slate-400">{selectedAgent.role}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Deep-Dive Spec Details */}
            <div className="space-y-4 text-xs font-mono">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[10px]">INPUT TELEMETRY DATA STREAMS:</div>
                <div className="text-slate-200">• JNPA Gate IoT sensors & AIS vessel coordinates</div>
                <div className="text-slate-200">• NH48 National Highway toll queue velocity</div>
                <div className="text-slate-200">• CONCOR railway yard rake availability</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-blue-400 font-bold uppercase text-[10px]">PROCESSING ENGINE:</div>
                <div className="text-slate-200">• CrewAI Python agent runtime</div>
                <div className="text-slate-200">• OpenAI GPT-4o multi-criteria solver</div>
                <div className="text-slate-200">• Monte Carlo 1,000 SLA variance simulation</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-emerald-400 font-bold uppercase text-[10px]">OUTPUT ARTIFACTS:</div>
                <div className="text-slate-200">• Recommended pathway: WDFC Electric Rail (91/100)</div>
                <div className="text-slate-200">• CONCOR booking PDF & ICEGATE customs amendment</div>
                <div className="text-slate-200">• SAP TM Transportation Order dispatch payload</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedAgent(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
