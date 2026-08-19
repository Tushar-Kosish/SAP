import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import {
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Eye,
  Sliders,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Globe,
  Radio,
  FileText,
  UserCheck,
  Truck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';

export const AdminPage: React.FC = () => {
  const {
    clientShipments,
    supplierFleets,
    rerouteOrders,
    backendRerouteRequests,
    approveRerouteRequest,
    rejectRerouteRequest,
    transparencyEnabled,
    setTransparencyEnabled,
    triggerEmergencyOverride,
    auditTrailCount
  } = useRole();

  const [emergencyCorridor, setEmergencyCorridor] = useState('Rewari - Dadri WDFC Segment');
  const [overrideTriggered, setOverrideTriggered] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [autoApproveClient, setAutoApproveClient] = useState(true);

  const handleEmergencyOverride = () => {
    triggerEmergencyOverride(emergencyCorridor);
    setOverrideTriggered(true);
    setTimeout(() => {
      setOverrideTriggered(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border-b border-purple-500/20 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>System & Governance Admin Control Center</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Multi-Tenant Operations & System Telemetry
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Manage Client & Supplier transparency policies, configure AI agent confidence thresholds, enforce emergency overrides, and monitor SAP BTP API health.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Multi-Tenant Status</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">3 Active Roles</div>
              <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Client, Supplier & Admin
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">SAP BTP Telemetry</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">Online (24ms)</div>
              <div className="text-[10px] text-indigo-400 font-bold flex items-center gap-1 mt-0.5">
                <Activity className="w-3 h-3" /> OData REST v4 Active
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Data Transparency Policy</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">
                {transparencyEnabled ? 'OPEN' : 'RESTRICTED'}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Shared Telemetry Pipeline
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">System Audit Logs</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{auditTrailCount} Entries</div>
              <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                <FileText className="w-3 h-3" /> Tamper-Proof Audit
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Governance & Emergency Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Transparency Policy & Governance */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <span>Role Access & Transparency Governance</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Configure data sharing boundaries between enterprise Clients and logistics Suppliers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">Open Data Transparency</span>
                  <button
                    onClick={() => setTransparencyEnabled(!transparencyEnabled)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      transparencyEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        transparencyEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Allows clients to see live supplier capacity and suppliers to receive automated AI container reroutes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">Auto-Approve AI Reroutes</span>
                  <button
                    onClick={() => setAutoApproveClient(!autoApproveClient)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      autoApproveClient ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        autoApproveClient ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  When enabled, high-confidence AI recommendations re-route delayed cargo immediately without manual client sign-off.
                </p>
              </div>
            </div>

            {/* Slider: AI Agent Confidence Threshold */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--text-primary)]">AI Reroute Decision Confidence Cutoff</span>
                <span className="font-mono font-bold text-purple-400">{confidenceThreshold}% Minimum</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                <span>60% (Aggressive Rerouting)</span>
                <span>85% (Recommended)</span>
                <span>95% (Strict Safety)</span>
              </div>
            </div>

          </div>

          {/* Section: Custom AI Disruption Prompt & Multi-Modal Transit Simulator */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-blue-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <span>Admin AI Custom Disruption Prompt Simulator</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Type a custom prompt or simulation scenario to test real-time multi-modal transit duration analysis.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Multi-Modal AI v2.4
              </span>
            </div>

            {/* Custom Prompt Input Box */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[var(--text-secondary)]">Enter Custom AI Disruption Scenario / Instruction Prompt:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Landslide on Rewari Highway blocking 120 containers. Evaluate Rail vs Air vs Coastal Barge."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                  id="adminCustomPrompt"
                />
                <button
                  onClick={async () => {
                    const inputEl = document.getElementById('adminCustomPrompt') as HTMLInputElement;
                    const promptVal = inputEl?.value || 'Highway NH48 severe bottleneck near Rewari link';
                    if (clientShipments.length > 0) {
                      await apiService.triggerReroute({
                        shipment_id: clientShipments[0].id,
                        reason: 'Admin Simulated Supply-Chain Disruption',
                        custom_prompt: promptVal
                      });
                      triggerEmergencyOverride('Custom AI Prompt Scenario');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
                >
                  <Zap className="w-4 h-4" />
                  <span>Execute AI Simulation</span>
                </button>
              </div>
            </div>

            {/* Multi-Modal Transit Time & Cost Comparison Matrix */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
              <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Multi-Modal Transit Duration Breakdown (1,200 km Corridor)</span>
                <span className="text-emerald-400 font-bold">Real-time Calculation</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                
                {/* Road */}
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <div className="text-[10px] text-rose-400 font-bold uppercase flex items-center gap-1">
                    <span>🚛 Road Trucking</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">40.0 Hrs</div>
                  <div className="text-[10px] text-slate-300">Cost: ₹18,500 / TEU</div>
                  <div className="text-[10px] text-rose-400 font-bold">High Risk (Congested)</div>
                </div>

                {/* Rail - Recommended */}
                <div className="p-3 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 space-y-1 shadow-lg">
                  <div className="text-[10px] text-emerald-400 font-extrabold uppercase flex items-center justify-between">
                    <span>🚆 WDFC Rail</span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded text-[8px]">AI CHOICE</span>
                  </div>
                  <div className="text-xl font-extrabold text-emerald-400">21.8 Hrs</div>
                  <div className="text-[10px] text-slate-300">Cost: ₹12,500 / TEU</div>
                  <div className="text-[10px] text-emerald-400 font-bold">-20 Hrs Delay Saved</div>
                </div>

                {/* Coastal Sea */}
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-1">
                  <div className="text-[10px] text-teal-400 font-bold uppercase flex items-center gap-1">
                    <span>🚢 Coastal Ship</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">42.3 Hrs</div>
                  <div className="text-[10px] text-slate-300">Cost: ₹9,800 / TEU</div>
                  <div className="text-[10px] text-teal-400 font-bold">Lowest CO₂ (0.8t)</div>
                </div>

                {/* Air Freight */}
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase flex items-center gap-1">
                    <span>✈️ Air Cargo</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">7.0 Hrs</div>
                  <div className="text-[10px] text-slate-300">Cost: ₹48,000 / TEU</div>
                  <div className="text-[10px] text-indigo-400 font-bold">Express Priority</div>
                </div>

              </div>
            </div>
          </div>

          {/* Section: World Bank Supply Chain Management (SCM) Governance & Risk Matrix */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-emerald-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    World Bank SCM Guidance (March 2023)
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">ISO 22095:2020 CoC Certified</span>
                </div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] mt-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <span>World Bank SCM Positioning & Risk Matrix</span>
                </h2>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                IBRD / IDA Procurement Compliant
              </span>
            </div>

            {/* 4 Quadrant Supply Positioning Model (World Bank Figure VI) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                1. World Bank Supply Positioning Matrix (Vulnerability vs Cost)
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <div className="text-[10px] text-rose-400 font-extrabold uppercase">Strategic Critical (High Cost / High Vulnerability)</div>
                  <div className="text-sm font-bold text-white">JNPA - WDFC Rail Corridor Reroute</div>
                  <div className="text-[10px] text-slate-300 font-sans">Action: Heightened supply chain due diligence, FIDIC Red Book clauses, & buffer capacity.</div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="text-[10px] text-amber-400 font-extrabold uppercase">Strategic Security (Low Cost / High Vulnerability)</div>
                  <div className="text-sm font-bold text-white">ICD Dadri Safety Buffer Inventory</div>
                  <div className="text-[10px] text-slate-300 font-sans">Action: Secure multi-sourcing contracts & continuous risk monitoring.</div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                  <div className="text-[10px] text-blue-400 font-extrabold uppercase">Tactical Advantage (High Cost / Low Vulnerability)</div>
                  <div className="text-sm font-bold text-white">Express Air Cargo Priority Charter</div>
                  <div className="text-[10px] text-slate-300 font-sans">Action: Leverage purchasing volume for rate discounts.</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <div className="text-[10px] text-emerald-400 font-extrabold uppercase">Tactical Acquisition (Low Cost / Low Vulnerability)</div>
                  <div className="text-sm font-bold text-white">Routine Local Container Drayage</div>
                  <div className="text-[10px] text-slate-300 font-sans">Action: Standardized purchasing efficiency & automated dispatch.</div>
                </div>

              </div>
            </div>

            {/* World Bank Risk Heatmap Strategy (World Bank Figure X) */}
            <div className="pt-2 border-t border-[var(--border-color)] space-y-2">
              <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono flex items-center justify-between">
                <span>2. Risk Mitigation Strategy (World Bank 4-Stage Cycle)</span>
                <span className="text-emerald-400 font-bold">Resilience Rating: 94.8%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="text-[10px] text-purple-400 font-bold">1. AVOID</div>
                  <div className="text-[10px] text-slate-300 font-sans mt-0.5">Bypass gridlocked highways</div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="text-[10px] text-blue-400 font-bold">2. MINIMIZE</div>
                  <div className="text-[10px] text-slate-300 font-sans mt-0.5">ISO 22095 CoC Audits</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-[10px] text-amber-400 font-bold">3. SPREAD / TRANSFER</div>
                  <div className="text-[10px] text-slate-300 font-sans mt-0.5">Dual Rail/Coastal dispatch</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-400 font-bold">4. ACCEPT</div>
                  <div className="text-[10px] text-slate-300 font-sans mt-0.5">Routine minor delays</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Live AI-Generated Rerouting Requests Panel */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-purple-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>AI-Generated Rerouting Requests</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Review AI detected disruptions, examine recommended alternate routes, and grant authorization.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                {backendRerouteRequests.filter((r) => r.status === 'PENDING').length} Pending
              </span>
            </div>

            {backendRerouteRequests.length === 0 ? (
              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-center text-[var(--text-muted)]">
                No active rerouting requests pending.
              </div>
            ) : (
              <div className="space-y-3">
                {backendRerouteRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-400">{req.id}</span>
                        <span className="text-xs font-bold text-[var(--text-primary)]">Shipment #{req.shipment_id}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : req.status === 'REJECTED'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div>
                        <strong className="text-rose-400">Disruption Reason:</strong> {req.reason}
                      </div>
                      <div>
                        <strong className="text-emerald-400">AI Recommended Route:</strong> {req.proposed_route}
                      </div>
                    </div>

                    {req.status === 'PENDING' && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => rejectRerouteRequest(req.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approveRerouteRequest(req.id)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Dispatch</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Emergency Disruption Override Console */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-rose-500" />
                  <span>Global Disruption Emergency Override</span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Force emergency corridor rerouting across all client shipments during major port closures or weather emergencies.
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                Admin Privilege
              </span>
            </div>

            {overrideTriggered ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-400">Emergency Corridor Override Executed</div>
                <div className="text-[11px] text-slate-300">All impacted consignments re-routed to Dedicated Freight Corridor (WDFC).</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-[var(--text-secondary)]">Target Disrupted Corridor / Sector</label>
                  <select
                    value={emergencyCorridor}
                    onChange={(e) => setEmergencyCorridor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  >
                    <option value="Rewari - Dadri WDFC Segment">Rewari - Dadri WDFC Segment (Monsoon Congestion)</option>
                    <option value="JNPT Port Terminal 3">JNPT Port Terminal 3 (Crane Breakdown)</option>
                    <option value="NH-48 Highway Km 112">NH-48 Highway Km 112 (Truckers Strike)</option>
                  </select>
                </div>

                <button
                  onClick={handleEmergencyOverride}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <Radio className="w-4 h-4 animate-ping" />
                  <span>Execute Emergency Corridor Evacuation Override</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Telemetry & Multi-Tenant Snapshot */}
        <div className="space-y-6">
          
          {/* Multi-Tenant Quick Status */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider font-mono">
              Live Role Telemetry Stream
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-[var(--text-primary)]">Client Consignments</span>
                </div>
                <span className="font-mono font-bold text-indigo-400">{clientShipments.length} Active</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-[var(--text-primary)]">Supplier Fleets</span>
                </div>
                <span className="font-mono font-bold text-emerald-400">{supplierFleets.length} Fleets</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-[var(--text-primary)]">Active AI Agents</span>
                </div>
                <span className="font-mono font-bold text-purple-400">5 Operational</span>
              </div>
            </div>
          </div>

          {/* SAP BTP Health Check */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <span>SAP BTP Connector</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Endpoint Latency</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">24 ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">OData Protocol</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">REST v4.0</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-secondary)]">24h API Throughput</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">14,290 reqs</span>
              </div>
            </div>

            <Link
              to="/sap"
              className="w-full mt-2 py-2 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Inspect SAP Integration Logs</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
