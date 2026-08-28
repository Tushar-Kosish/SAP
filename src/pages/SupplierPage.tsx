import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { MultimodalOption } from '../types';
import { SupplierWeatherMap } from '../components/SupplierWeatherMap';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { downloadReroutePDF } from '../services/pdfGenerator';
import {
  Truck,
  Train,
  Anchor,
  Plane,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  Radio,
  Check,
  Send,
  FileText,
  Download,
  Eye,
  X,
  Sparkles,
  CloudRain,
  Sun,
  Wind,
  Waves,
  RefreshCw
} from 'lucide-react';

const multimodalOptions: MultimodalOption[] = [
  {
    id: 'ship',
    name: 'West Coast Maritime Coastal Feed',
    mode: 'By Ship',
    transitTimeHours: 48,
    costPerTeu: 8500,
    co2TonsPerTeu: 0.18,
    riskLevel: 'Medium',
    weatherStatus: {
      location: 'Arabian Sea / Hazira Approach',
      weatherType: 'High Wind',
      temperature: '29°C',
      windSpeed: '45 km/h',
      precipitation: '15%',
      severity: 'WARNING',
      impactDescription: 'Moderate 3.2m sea swell. ETA extended by +4 hours.'
    },
    icon: 'Anchor',
    color: '#06B6D4',
    pathwayName: 'Coastal Barge + Port Rail Feeder'
  },
  {
    id: 'air',
    name: 'Express Air Cargo Charter',
    mode: 'By Air',
    transitTimeHours: 4,
    costPerTeu: 45000,
    co2TonsPerTeu: 1.85,
    riskLevel: 'Low',
    weatherStatus: {
      location: 'Delhi-Mumbai Flight Corridor',
      weatherType: 'Fog',
      temperature: '21°C',
      windSpeed: '52 km/h',
      precipitation: '5%',
      severity: 'WARNING',
      impactDescription: 'Heavy fog over IGI Air Terminal. CAT-III ILS Active.'
    },
    icon: 'Plane',
    color: '#A855F7',
    pathwayName: 'Air Cargo Direct Corridor'
  },
  {
    id: 'rail',
    name: 'DFCCIL High-Speed Electric Rake',
    mode: 'By Rail',
    transitTimeHours: 16,
    costPerTeu: 14200,
    co2TonsPerTeu: 0.22,
    riskLevel: 'Low',
    weatherStatus: {
      location: 'Western Dedicated Freight Corridor (WDFC)',
      weatherType: 'Clear',
      temperature: '24°C',
      windSpeed: '12 km/h',
      precipitation: '0%',
      severity: 'NORMAL',
      impactDescription: 'Optimal Weather. Automated block signaling clear.'
    },
    icon: 'Train',
    color: '#10B981',
    pathwayName: 'WDFC Automated Rail Corridor'
  },
  {
    id: 'road',
    name: 'Highway Heavy Haul Truck Fleet',
    mode: 'By Road',
    transitTimeHours: 28,
    costPerTeu: 22000,
    co2TonsPerTeu: 0.65,
    riskLevel: 'Critical',
    weatherStatus: {
      location: 'NH48 Vadodara-Surat Highway',
      weatherType: 'Heavy Rain',
      temperature: '27°C',
      windSpeed: '34 km/h',
      precipitation: '95%',
      severity: 'CRITICAL',
      impactDescription: 'Torrential downpour & waterlogging on NH48. 14h delay.'
    },
    icon: 'Truck',
    color: '#EF4444',
    pathwayName: 'Highway NH48 Corridor'
  }
];

export const SupplierPage: React.FC = () => {
  const {
    supplierFleets,
    rerouteOrders,
    submitRerouteRequest,
    acceptRerouteOrder,
    updateFleetStatus,
    clientShipments
  } = useRole();

  const [activeTab, setActiveTab] = useState<'multimodal' | 'fleets' | 'documents' | 'orders' | 'sla'>('multimodal');
  const [selectedModeId, setSelectedModeId] = useState<'ship' | 'air' | 'rail' | 'road'>('rail');
  const [selectedFleetId, setSelectedFleetId] = useState<string>('FLT-RAIL-01');
  const [milestoneStatus, setMilestoneStatus] = useState<string>('');
  const [milestoneSuccess, setMilestoneSuccess] = useState<boolean>(false);

  // Modal State for Reroute Request
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [requestTargetShipment, setRequestTargetShipment] = useState<string>(clientShipments[0]?.id || 'SHP-102');
  const [requestTargetMode, setRequestTargetMode] = useState<string>('By Rail (DFCCIL High-Speed Corridor)');
  const [requestWeatherReason, setRequestWeatherReason] = useState<string>(
    'Severe Heavy Rain & Torrential Flooding on NH48 Highway Corridor. Switching to Rail to save 12 hours.'
  );
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState<boolean>(false);

  // PDF Preview State
  const [previewPdfUri, setPreviewPdfUri] = useState<string | null>(null);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState<boolean>(false);

  const totalCapacity = supplierFleets.reduce((acc, f) => acc + f.capacityContainers, 0);
  const totalUtilized = supplierFleets.reduce((acc, f) => acc + f.utilizedContainers, 0);
  const utilizationPercent = Math.round((totalUtilized / totalCapacity) * 100);

  const handleMilestoneUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMilestoneSuccess(true);
    setTimeout(() => {
      setMilestoneSuccess(false);
      setMilestoneStatus('');
    }, 2500);
  };

  const handleSendRequestToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetShipmentObj = clientShipments.find((s) => s.id === requestTargetShipment);
    const fromModeStr = targetShipmentObj?.currentMode || 'Highway Route A (NH48 Heavy Rain Hazard)';

    await submitRerouteRequest({
      shipmentId: requestTargetShipment,
      fromMode: fromModeStr,
      toMode: requestTargetMode,
      containers: targetShipmentObj?.containersCount || 45,
      weatherReason: requestWeatherReason,
      ratePerContainer: 14200
    });

    setRequestSubmittedSuccess(true);
    setTimeout(() => {
      setRequestSubmittedSuccess(false);
      setIsRequestModalOpen(false);
    }, 2000);
  };

  const activeOption = multimodalOptions.find((o) => o.id === selectedModeId) || multimodalOptions[2];

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900/40 to-slate-950 border-b border-emerald-500/20 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Supplier & Logistics Carrier Portal</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Multimodal Weather Analytics & Reroute Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Real-time weather tracking across <strong>By Ship</strong>, <strong>By Air</strong>, <strong>By Rail</strong>, and <strong>By Road</strong>. Submit AI weather route change proposals directly to Admin and receive official signed PDF authorization orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Send Route Change Request to Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7-Step Interactive Workflow Stepper */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <WorkflowStepper currentStepIndex={3} />
      </div>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Carrier Capacity</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{totalCapacity} TEU</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <Activity className="w-3 h-3" /> {utilizationPercent}% Utilized
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Weather Risk Alert</div>
              <div className="text-2xl font-extrabold text-rose-400">NH48 Storm</div>
              <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" /> Heavy Rain & Flooding
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">PDF Reroute Documents</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">
                {rerouteOrders.filter(o => o.status === 'ACCEPTED').length} Issued
              </div>
              <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Official Signed PDF
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">SLA Rating</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">99.2%</div>
              <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" /> Grade-A Carrier
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8 space-y-6">
        
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('multimodal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'multimodal'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Multimodal Weather Map & Route Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'documents'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Written Reroute PDF Documents ({rerouteOrders.filter(o => o.status === 'ACCEPTED').length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('fleets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'fleets'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>Fleet Availability & Rake Console</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>All Reroute Orders ({rerouteOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sla')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'sla'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>SLA Scorecard & Payouts</span>
          </button>
        </div>

        {/* Tab 1: Multimodal Weather Map & Route Analysis */}
        {activeTab === 'multimodal' && (
          <div className="space-y-6">
            
            {/* Live Leaflet Map with Weather Overlays */}
            <SupplierWeatherMap
              multimodalOptions={multimodalOptions}
              selectedModeId={selectedModeId}
              onSelectMode={(id) => setSelectedModeId(id)}
            />

            {/* Multimodal Pathway Comparison Grid (By Ship, By Air, By Rail, By Road) */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                    Multimodal Pathway Comparison Matrix
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Live performance, cost, transit duration, and weather impact metrics across 4 transport options.
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  4 Active Transport Modes
                </span>
              </div>

              {/* Table of 4 Modes */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] text-[11px] font-bold text-[var(--text-muted)] uppercase font-mono">
                      <th className="py-3 px-3">Transport Mode</th>
                      <th className="py-3 px-3">Pathway / Route</th>
                      <th className="py-3 px-3 text-right">Transit Time</th>
                      <th className="py-3 px-3 text-right">Cost / TEU</th>
                      <th className="py-3 px-3 text-right">CO₂ Footprint</th>
                      <th className="py-3 px-3">Live Weather Condition</th>
                      <th className="py-3 px-3 text-center">Risk Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {multimodalOptions.map((opt) => {
                      const isSelected = selectedModeId === opt.id;
                      return (
                        <tr
                          key={opt.id}
                          onClick={() => setSelectedModeId(opt.id)}
                          className={`cursor-pointer transition-all ${
                            isSelected ? 'bg-emerald-500/10 font-medium' : 'hover:bg-[var(--bg-surface-hover)]'
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: opt.color }}
                              >
                                {opt.id === 'ship' ? <Anchor className="w-4 h-4" /> : opt.id === 'air' ? <Plane className="w-4 h-4" /> : opt.id === 'rail' ? <Train className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                              </div>
                              <div>
                                <span className="font-extrabold text-[var(--text-primary)] block text-xs">
                                  {opt.mode}
                                </span>
                                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                                  {opt.name}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-xs text-[var(--text-secondary)] font-medium">
                            {opt.pathwayName}
                          </td>

                          <td className="py-3.5 px-3 text-right font-extrabold text-[var(--text-primary)] text-sm font-mono">
                            {opt.transitTimeHours} Hours
                          </td>

                          <td className="py-3.5 px-3 text-right font-extrabold text-emerald-400 text-sm font-mono">
                            ₹ {opt.costPerTeu.toLocaleString()}
                          </td>

                          <td className="py-3.5 px-3 text-right text-[var(--text-secondary)] font-mono">
                            {opt.co2TonsPerTeu} t CO₂
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="space-y-0.5">
                              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1">
                                {opt.weatherStatus.weatherType === 'Heavy Rain' ? '🌧️ Heavy Rain' : opt.weatherStatus.weatherType === 'High Wind' ? '💨 High Wind' : opt.weatherStatus.weatherType === 'Fog' ? '🌫️ Fog' : '☀️ Clear'}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)] block font-mono">
                                {opt.weatherStatus.location} ({opt.weatherStatus.temperature})
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                                opt.riskLevel === 'Critical'
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                  : opt.riskLevel === 'High'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              }`}
                            >
                              {opt.riskLevel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Weather Reroute Recommendation Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950 border border-emerald-500/30 shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      AI WEATHER REROUTE ENGINE SUGGESTION
                    </div>
                    <h3 className="text-lg font-extrabold text-white">
                      Reroute from Highway NH48 (Heavy Rain) ➡️ DFCCIL High-Speed Rail Corridor
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsReasoningModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs border border-cyan-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>VIEW AI REASONING →</span>
                  </button>

                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Route Change Request to Admin</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>AI Rationale:</strong> Heavy rainfall is expected along the current road corridor for the next 8 hours. Road travel has a high probability of severe delay. WDFC rail provides a lower weather exposure, shorter ETA, and predictable transportation time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                    ⏱️ Time Saved: 12.0 Hours
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 font-bold">
                    💰 Cost Saved: ₹ 7,800 per TEU
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-purple-400 font-bold">
                    🌿 CO₂ Reduced: -0.43 Tons/TEU
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Written Documents & Official PDF Orders */}
        {activeTab === 'documents' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                  Official Written Reroute Authorization Documents
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Legal authorization documents generated automatically upon Admin approval with digital SAP stamps & signatures.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                {rerouteOrders.filter(o => o.status === 'ACCEPTED').length} Signed PDF Certificates
              </span>
            </div>

            <div className="space-y-4">
              {rerouteOrders.length === 0 ? (
                <div className="text-center py-10 text-xs text-[var(--text-muted)] font-mono">
                  No reroute requests submitted yet.
                </div>
              ) : (
                rerouteOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold font-mono">
                          {ord.id}
                        </span>
                        <span className="text-xs font-extrabold text-[var(--text-primary)]">
                          Ref: {ord.shipmentId} ({ord.containers} TEU Containers)
                        </span>

                        {ord.status === 'ACCEPTED' ? (
                          <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approved by Admin - Official PDF Issued</span>
                          </span>
                        ) : ord.status === 'PENDING_ADMIN_APPROVAL' ? (
                          <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-extrabold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                            <span>Waiting for Admin Approval</span>
                          </span>
                        ) : ord.status === 'REVERTED' ? (
                          <span className="px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-extrabold flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            <span>Rerouting Revoked by Admin</span>
                          </span>
                        ) : (
                          <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-extrabold">
                            {ord.status}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[var(--text-secondary)]">
                        Pathway Reroute: <span className="text-rose-400 line-through mr-1">{ord.fromMode}</span> ➡️ <span className="text-emerald-400 font-bold">{ord.toMode}</span>
                      </div>

                      {ord.weatherReason && (
                        <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                          <CloudRain className="w-3.5 h-3.5" /> Reason: {ord.weatherReason}
                        </div>
                      )}

                      {ord.approvedAt && (
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">
                          Signed by <strong>{ord.approvedBy}</strong> on {ord.approvedAt}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {ord.status === 'ACCEPTED' && ord.documentDataUri ? (
                        <>
                          <button
                            onClick={() => setPreviewPdfUri(ord.documentDataUri!)}
                            className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-bold text-cyan-400 flex items-center gap-1.5 shadow-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Written Certificate</span>
                          </button>

                          <button
                            onClick={() => downloadReroutePDF({
                              requestId: ord.id,
                              shipmentId: ord.shipmentId,
                              supplierName: ord.supplierName,
                              fromMode: ord.fromMode,
                              toMode: ord.toMode,
                              containers: ord.containers,
                              weatherReason: ord.weatherReason || ord.reason || 'Weather emergency bypass approved.',
                              approvedBy: ord.approvedBy || 'System Admin',
                              approvedAt: ord.approvedAt || new Date().toLocaleString(),
                              costSavings: '₹ 4.8 Lakhs Net Savings',
                              timeSavings: '12 Hours Delay Avoided'
                            })}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Official PDF</span>
                          </button>
                        </>
                      ) : (
                        <div className="text-xs text-[var(--text-muted)] font-mono italic">
                          {ord.status === 'PENDING_ADMIN_APPROVAL' ? 'Pending Admin Authorization...' : 'No Document'}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Fleets */}
        {activeTab === 'fleets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                  Logistics Carrier Fleet Resources
                </h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Live SAP TM Synchronized
                </span>
              </div>

              <div className="space-y-4">
                {supplierFleets.map((fleet) => (
                  <div
                    key={fleet.id}
                    className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-lg space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          {fleet.type === 'Rail Rake' ? <Train className="w-5 h-5" /> : fleet.type === 'Coastal Vessel' ? <Anchor className="w-5 h-5" /> : fleet.type === 'Air Cargo Charter' ? <Plane className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="text-base font-extrabold text-[var(--text-primary)]">{fleet.name}</div>
                          <div className="text-xs text-[var(--text-secondary)] font-mono">ID: {fleet.id} | Location: {fleet.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            fleet.status === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {fleet.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Capacity</div>
                        <div className="font-bold text-[var(--text-primary)]">{fleet.capacityContainers} TEU</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Utilized</div>
                        <div className="font-bold text-emerald-400">{fleet.utilizedContainers} TEU</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">SLA Score</div>
                        <div className="font-bold text-blue-400">{fleet.slaScorePercent}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-[var(--text-secondary)] font-medium">Quick Capacity Adjust:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateFleetStatus(fleet.id, 'Available', Math.max(0, fleet.utilizedContainers - 10))}
                          className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-bold"
                        >
                          - 10 TEU
                        </button>
                        <button
                          onClick={() => updateFleetStatus(fleet.id, 'Assigned', Math.min(fleet.capacityContainers, fleet.utilizedContainers + 10))}
                          className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-bold"
                        >
                          + 10 TEU
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Milestone Broadcast Panel */}
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                Live Milestone Reporter
              </h2>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Broadcast Transit Milestone to SAP</span>
                </div>

                {milestoneSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    <div className="text-xs font-bold text-emerald-400">Milestone Broadcasted!</div>
                    <div className="text-[11px] text-slate-300">Admin dashboard notifications updated in real time.</div>
                  </div>
                ) : (
                  <form onSubmit={handleMilestoneUpdate} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--text-secondary)]">Select Fleet / Shipment</label>
                      <select
                        value={selectedFleetId}
                        onChange={(e) => setSelectedFleetId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                      >
                        {supplierFleets.map((f) => (
                          <option key={f.id} value={f.id}>{f.name} ({f.id})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--text-secondary)]">Milestone Status Update</label>
                      <input
                        type="text"
                        value={milestoneStatus}
                        onChange={(e) => setMilestoneStatus(e.target.value)}
                        placeholder="e.g. Cleared Rewari Yard - Heading to JNPT Port"
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Radio className="w-4 h-4" />
                      <span>Transmit Milestone Update</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: All Reroute Orders */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                All Reroute Orders & Requests
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">Dispatched & Requested Orders</span>
            </div>

            <div className="space-y-3">
              {rerouteOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-emerald-400">{ord.id}</span>
                      <span className="text-xs font-bold text-[var(--text-primary)]">Ref: {ord.shipmentId}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                        {ord.containers} TEU Containers
                      </span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Reroute: <span className="text-amber-400">{ord.fromMode}</span> ➡️ <span className="text-emerald-400 font-bold">{ord.toMode}</span>
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] font-mono">Requested At: {ord.requestedAt} | Rate: ₹ {ord.ratePerContainer.toLocaleString()}/TEU</div>
                  </div>

                  <div className="flex items-center gap-3">
                    {ord.status === 'ACCEPTED' ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accepted & Scheduled</span>
                      </span>
                    ) : ord.status === 'PENDING_ADMIN_APPROVAL' ? (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Awaiting Admin Approval</span>
                      </span>
                    ) : ord.status === 'REVERTED' ? (
                      <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                        Reroute Revoked
                      </span>
                    ) : (
                      <button
                        onClick={() => acceptRerouteOrder(ord.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Allocation</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: SLA Scorecard */}
        {activeTab === 'sla' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                Supplier Compliance & SLA Scorecard
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Transparent SLA metrics determine priority AI container dispatch allocations and quarterly incentive bonuses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase">On-Time Transit Rate</div>
                <div className="text-3xl font-extrabold text-emerald-400">99.1%</div>
                <div className="text-[10px] text-slate-400">Target: ≥ 95.0% (Exceeded)</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase">Average Turnaround Time</div>
                <div className="text-3xl font-extrabold text-blue-400">3.8 Hours</div>
                <div className="text-[10px] text-slate-400">Target: ≤ 6.0 Hours (Optimal)</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase">SAP Settlement Payout</div>
                <div className="text-3xl font-extrabold text-indigo-400">₹ 14.5 Lakhs</div>
                <div className="text-[10px] text-slate-400">Status: Disbursed via SAP BTP</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* REROUTE REQUEST MODAL */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-emerald-500/30 p-6 space-y-4 bg-[var(--bg-surface)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-base">
                <Send className="w-5 h-5" />
                <span>Send Route Change Request to Admin</span>
              </div>
              <button onClick={() => setIsRequestModalOpen(false)} className="text-[var(--text-muted)] p-1 hover:text-white">✕</button>
            </div>

            {requestSubmittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-extrabold text-emerald-400">Request Sent to Admin!</h4>
                <p className="text-xs text-slate-300">
                  Your route change proposal has been transmitted to Admin. Once approved, your official written PDF certificate will be generated automatically.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendRequestToAdmin} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Target Shipment</label>
                  <select
                    value={requestTargetShipment}
                    onChange={(e) => setRequestTargetShipment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-bold"
                  >
                    {clientShipments.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id} - {s.cargoType} ({s.containersCount} TEU) | Current: {s.currentMode}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Proposed Target Transport Mode</label>
                  <select
                    value={requestTargetMode}
                    onChange={(e) => setRequestTargetMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-bold"
                  >
                    <option value="By Rail (DFCCIL High-Speed Electric Corridor)">By Rail (DFCCIL High-Speed Electric Corridor) - ETA 16h</option>
                    <option value="By Ship (West Coast Maritime Coastal Feed)">By Ship (West Coast Maritime Coastal Feed) - ETA 48h</option>
                    <option value="By Air (Express Air Cargo Charter)">By Air (Express Air Cargo Charter) - ETA 4h</option>
                    <option value="By Road (Express Highway Bypass)">By Road (Express Highway Bypass) - ETA 24h</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Weather Hazard & Disruption Justification</label>
                  <textarea
                    rows={3}
                    value={requestWeatherReason}
                    onChange={(e) => setRequestWeatherReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                    placeholder="e.g. Torrential downpour & heavy flash floods on Highway NH48."
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 font-mono space-y-1">
                  <div className="text-emerald-400 font-bold">✓ Automated SAP BTP Validation</div>
                  <div>• Estimated Delay Reduction: <strong>-12.0 Hours</strong></div>
                  <div>• Cost Benefit: <strong>₹ 7,800 / TEU Savings</strong></div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Proposal to Admin</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {previewPdfUri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[85vh] glass-panel rounded-2xl border border-purple-500/40 p-4 bg-slate-950 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>Official Written Reroute Authorization Certificate (PDF)</span>
              </div>
              <button onClick={() => setPreviewPdfUri(null)} className="text-slate-400 p-1 hover:text-white">✕</button>
            </div>

            <div className="flex-1 w-full rounded-xl overflow-hidden bg-white">
              <iframe src={previewPdfUri} className="w-full h-full border-none" title="Reroute Authorization Certificate PDF" />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewPdfUri(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI REASONING MODAL */}
      {isReasoningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-4 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-base">
                <Sparkles className="w-5 h-5" />
                <span>AI Route Intelligence Explanation</span>
              </div>
              <button onClick={() => setIsReasoningModalOpen(false)} className="text-slate-400 p-1 hover:text-white">✕</button>
            </div>

            <blockquote className="bg-slate-900 p-4 rounded-xl border-l-4 border-emerald-500 text-slate-200 text-xs font-sans leading-relaxed shadow-inner">
              "Heavy rainfall is expected along the current road corridor for the next 8 hours. Road travel has a high probability of severe delay. WDFC rail provides a lower weather exposure, shorter ETA, and predictable transportation time."
            </blockquote>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Weather Risk Level</span>
                <span className="text-rose-400 font-bold">HIGH (NH48 Torrential Rain)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Recommended Alternative</span>
                <span className="text-emerald-400 font-bold">WDFC Electric High-Speed Rail</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">ETA Improvement</span>
                <span className="text-blue-400 font-bold">38h ➔ 31h (-7.2 Hours Saved)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">AI Confidence Score</span>
                <span className="text-purple-400 font-extrabold">94% Confidence</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsReasoningModalOpen(false);
                  setIsRequestModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Proceed to Send Request to Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
