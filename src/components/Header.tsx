import React from 'react';
import {
  Zap,
  Activity,
  Layers,
  MapPin,
  FileText,
  Clock,
  Play,
  CheckCircle2,
  Server,
  UserCheck
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRunSimulation: () => void;
  isSimulating: boolean;
  simulationStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunSimulation,
  isSimulating,
  simulationStep,
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'live-ops', label: 'Live Operations', icon: <Activity className="w-4 h-4" /> },
    { id: 'agents', label: 'AI Agents', icon: <Zap className="w-4 h-4" /> },
    { id: 'routes', label: 'Routes', icon: <MapPin className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Log', icon: <Clock className="w-4 h-4" /> },
    { id: 'sap', label: 'SAP Integration', icon: <Server className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080B11]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('landing')}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 text-black font-bold fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  SmartEvac <span className="text-cyan-400">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  SAP BTP Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Multi-Agent Logistics Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status & Simulation Control */}
        <div className="flex items-center gap-3">
          
          {/* Operational Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>OPERATIONAL</span>
          </div>

          {/* Live Simulation Button */}
          <button
            onClick={onRunSimulation}
            disabled={isSimulating}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isSimulating
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-glow-cyan hover:scale-[1.02]'
            }`}
          >
            {isSimulating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
                <span>SIMULATING ({simulationStep}/5)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>RUN LIVE SIMULATION</span>
              </>
            )}
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
