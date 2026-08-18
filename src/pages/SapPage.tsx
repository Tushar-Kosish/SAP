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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20">
          <Server className="w-4 h-4 text-indigo-500" />
          <span>SAP BTP INTEGRATION LAYER</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          SAP BTP Enterprise Gateway
        </h1>

        <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
          Seamlessly bridging autonomous multi-agent solver decisions with SAP Transportation Management (TM) and carrier dispatch networks.
        </p>
      </div>

      {/* 5 Interactive Integration Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="glass-panel p-4 space-y-2 text-center">
          <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400">01. ORDERS</div>
          <div className="text-sm font-extrabold text-[var(--text-primary)]">Transportation Orders</div>
          <p className="text-[11px] text-[var(--text-muted)] leading-snug font-medium">Ingests active OData shipment sets from SAP TM</p>
        </div>

        <div className="glass-panel p-4 space-y-2 text-center">
          <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">02. CAPACITY</div>
          <div className="text-sm font-extrabold text-[var(--text-primary)]">Carrier Capacity</div>
          <p className="text-[11px] text-[var(--text-muted)] leading-snug font-medium">Queries real-time CONCOR rail rake availability</p>
        </div>

        <div className="glass-panel p-4 space-y-2 text-center">
          <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400">03. SOLVER</div>
          <div className="text-sm font-extrabold text-[var(--text-primary)]">Route Optimization</div>
          <p className="text-[11px] text-[var(--text-muted)] leading-snug font-medium">Executes multi-agent Monte Carlo route scoring</p>
        </div>

        <div className="glass-panel p-4 space-y-2 text-center">
          <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">04. DECISION</div>
          <div className="text-sm font-extrabold text-[var(--text-primary)]">Rerouting Decision</div>
          <p className="text-[11px] text-[var(--text-muted)] leading-snug font-medium">Passes approved recommendations to human authorization</p>
        </div>

        <div className="glass-panel p-4 space-y-2 text-center">
          <div className="text-xs font-extrabold text-amber-600 dark:text-amber-400">05. EXECUTION</div>
          <div className="text-sm font-extrabold text-[var(--text-primary)]">SAP TM Dispatch</div>
          <p className="text-[11px] text-[var(--text-muted)] leading-snug font-medium">Posts 201 Created booking response to SAP BTP</p>
        </div>

      </div>

      {/* SAP Telemetry Logs & Flow Component */}
      <SapIntegrationView logs={logs} />

      {/* CTA Section */}
      <div className="glass-panel p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h3 className="text-xl font-black text-[var(--text-primary)]">Deep-Dive System Architecture</h3>
          <p className="text-xs text-[var(--text-secondary)] font-medium">Inspect the complete multi-tier data pipeline from React frontend to SAP BTP.</p>
        </div>

        <button
          onClick={() => navigate('/architecture')}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition-all"
        >
          <span>Explore System Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
