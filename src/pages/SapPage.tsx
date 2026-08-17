import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SapApiLog } from '../types';
import { apiService } from '../services/api';
import { SapIntegrationView } from '../components/SapIntegrationView';
import { Server, ArrowRight, Database, Layers, Activity, ShieldCheck, Terminal } from 'lucide-react';

export const SapPage: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<SapApiLog[]>([]);

  useEffect(() => {
    apiService.getSapLogs().then(setLogs);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono font-bold">
          <Server className="w-4 h-4 text-indigo-400" />
          <span>SAP BTP INTEGRATION LAYER</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          INTELLIGENCE MEETS ENTERPRISE.
        </h1>

        <p className="text-base text-slate-300">
          Seamlessly bridging autonomous multi-agent solver decisions with SAP Transportation Management (TM) and carrier dispatch networks.
        </p>
      </div>

      {/* 5 Interactive Integration Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2 text-center">
          <div className="text-xs font-mono font-bold text-cyan-400">01. ORDERS</div>
          <div className="text-sm font-extrabold text-white">Transportation Orders</div>
          <p className="text-[11px] text-slate-400 leading-snug">Ingests active OData shipment sets from SAP TM</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2 text-center">
          <div className="text-xs font-mono font-bold text-blue-400">02. CAPACITY</div>
          <div className="text-sm font-extrabold text-white">Carrier Capacity</div>
          <p className="text-[11px] text-slate-400 leading-snug">Queries real-time CONCOR rail rake availability</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2 text-center">
          <div className="text-xs font-mono font-bold text-indigo-400">03. SOLVER</div>
          <div className="text-sm font-extrabold text-white">Route Optimization</div>
          <p className="text-[11px] text-slate-400 leading-snug">Executes multi-agent Monte Carlo route scoring</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2 text-center">
          <div className="text-xs font-mono font-bold text-emerald-400">04. DECISION</div>
          <div className="text-sm font-extrabold text-white">Rerouting Decision</div>
          <p className="text-[11px] text-slate-400 leading-snug">Passes approved recommendations to human authorization</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2 text-center">
          <div className="text-xs font-mono font-bold text-amber-400">05. EXECUTION</div>
          <div className="text-sm font-extrabold text-white">SAP TM Dispatch</div>
          <p className="text-[11px] text-slate-400 leading-snug">Posts 201 Created booking response to SAP BTP</p>
        </div>

      </div>

      {/* SAP Telemetry Logs & Flow Component */}
      <SapIntegrationView logs={logs} />

      {/* CTA Section */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-950">
        <div>
          <h3 className="text-xl font-extrabold text-white">Deep-Dive System Architecture</h3>
          <p className="text-xs text-slate-400">Inspect the complete multi-tier data pipeline from React frontend to SAP BTP.</p>
        </div>

        <button
          onClick={() => navigate('/architecture')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-extrabold text-xs shadow-glow-cyan"
        >
          <span>Explore System Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
