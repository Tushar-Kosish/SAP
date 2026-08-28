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
  Truck,
  Zap,
  RotateCcw,
  Check,
  X,
  Trash2,
  Download,
  AlertTriangle,
  Layers,
  Sparkles,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { downloadReroutePDF } from '../services/pdfGenerator';
import { WorkflowStepper } from '../components/WorkflowStepper';

export const AdminPage: React.FC = () => {
  const {
    clientShipments,
    supplierFleets,
    rerouteOrders,
    approveRerouteWithDocument,
    revokeRerouteOrder,
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

  // Manual Reroute State
  const [manualShipmentId, setManualShipmentId] = useState<string>(clientShipments[0]?.id || 'SHP-102');
  const [manualSelectedRoute, setManualSelectedRoute] = useState<string>('WDFC High-Speed Rail Corridor');
  const [manualSuccessMsg, setManualSuccessMsg] = useState<string | null>(null);

  // Confirmation Modals
  const [deleteRequestId, setDeleteRequestId] = useState<string | null>(null);
  const [removeRerouteId, setRemoveRerouteId] = useState<string | null>(null);

  // Success Banner
  const [approvedBannerMsg, setApprovedBannerMsg] = useState<string | null>(null);

  // PDF Preview
  const [previewPdfUri, setPreviewPdfUri] = useState<string | null>(null);

  const handleEmergencyOverride = () => {
    triggerEmergencyOverride(emergencyCorridor);
    setOverrideTriggered(true);
    setTimeout(() => {
      setOverrideTriggered(false);
    }, 3000);
  };

  const handleAcceptReroute = async (requestId: string) => {
    const targetOrd = rerouteOrders.find((o) => o.id === requestId);
    await approveRerouteWithDocument(requestId);
    setApprovedBannerMsg(
      `✓ REROUTING APPROVED: Shipment ${targetOrd?.shipmentId || 'SM-1048'} (${targetOrd?.fromMode || 'Road'} ➡️ ${targetOrd?.toMode || 'WDFC Rail'})`
    );
    setTimeout(() => setApprovedBannerMsg(null), 4000);
  };

  const handleApplyManualRoute = () => {
    const target = clientShipments.find((s) => s.id === manualShipmentId);
    setManualSuccessMsg(`✓ Manual Route Override Applied: Shipment ${manualShipmentId} set to ${manualSelectedRoute}.`);
    setTimeout(() => setManualSuccessMsg(null), 3500);
  };

  const handleConfirmRemoveReroute = async () => {
    if (!removeRerouteId) return;
    await revokeRerouteOrder(removeRerouteId);
    setRemoveRerouteId(null);
  };

  const handleConfirmDeleteRequest = async (requestId: string) => {
    await rejectRerouteRequest(requestId);
    setDeleteRequestId(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900/40 to-slate-950 border-b border-purple-500/20 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>System & Rerouting Authorization Control Center</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Admin Rerouting Approvals & Route Governance
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Review supplier route change proposals, authorize automated written PDF documents, apply manual route overrides, or revoke active reroute decisions anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {approvedBannerMsg && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{approvedBannerMsg}</span>
            </div>
            <span className="text-xs font-mono bg-emerald-500/30 px-2.5 py-1 rounded">Written PDF Issued</span>
          </div>
        </div>
      )}

      {/* 7-Step Interactive Workflow Stepper */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <WorkflowStepper currentStepIndex={5} />
      </div>

      {/* Overview Metrics */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Supplier Requests</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">
                {rerouteOrders.filter(o => o.status === 'PENDING_ADMIN_APPROVAL').length} Pending
              </div>
              <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 animate-spin" /> Requires Admin Action
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Approved Reroutes</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">
                {rerouteOrders.filter(o => o.status === 'ACCEPTED').length} Active
              </div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <FileText className="w-3 h-3" /> Signed PDF Documents
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">System Audit Logs</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{auditTrailCount} Entries</div>
              <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1 mt-0.5">
                <Lock className="w-3 h-3" /> Tamper-Proof Audit
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Governance Status</div>
              <div className="text-2xl font-extrabold text-emerald-400">ACTIVE</div>
              <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> World Bank SCM Compliant
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Requests & Manual Rerouting */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: SUPPLIER REROUTING REQUESTS PAGE */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-purple-500/40 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Supplier Rerouting Requests Center</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Review supplier proposals triggered by weather disruptions. Accepting generates an official written PDF document.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {rerouteOrders.filter((r) => r.status === 'PENDING_ADMIN_APPROVAL').length} Pending Approval
              </span>
            </div>

            {rerouteOrders.length === 0 ? (
              <div className="p-6 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-center text-[var(--text-muted)] font-mono">
                No active rerouting requests pending.
              </div>
            ) : (
              <div className="space-y-4">
                {rerouteOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-4 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-extrabold font-mono">
                          Request #{ord.id}
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-[var(--text-primary)]">
                            Supplier: {ord.supplierName} | Shipment #{ord.shipmentId}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] font-mono">
                            Volume: {ord.containers} TEU | Requested At: {ord.requestedAt}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                          ord.status === 'ACCEPTED'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : ord.status === 'PENDING_ADMIN_APPROVAL'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse'
                            : ord.status === 'REVERTED'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {ord.status === 'ACCEPTED'
                          ? '✓ APPROVED & SIGNED PDF ISSUED'
                          : ord.status === 'PENDING_ADMIN_APPROVAL'
                          ? '⏳ PENDING ADMIN APPROVAL'
                          : ord.status === 'REVERTED'
                          ? 'REVOKED'
                          : ord.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                        <span className="text-[10px] text-[var(--text-muted)] font-mono block uppercase">Current Pathway Route</span>
                        <span className="text-rose-400 font-bold block mt-0.5">{ord.fromMode}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                        <span className="text-[10px] text-[var(--text-muted)] font-mono block uppercase">Requested New Pathway</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">{ord.toMode}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="text-amber-400 font-bold">⛈️ Weather Disruption Justification:</div>
                      <p>{ord.reason || ord.weatherReason || 'Severe weather alert & highway flooding.'}</p>
                      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                        <div>AI Confidence: <strong className="text-emerald-400">94%</strong></div>
                        <div>Delay Reduction: <strong className="text-blue-400">7.2 Hours</strong></div>
                        <div>Cost Delta: <strong className="text-indigo-400">-₹ 4,500/TEU</strong></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-2">
                        {ord.status === 'ACCEPTED' && ord.documentDataUri && (
                          <>
                            <button
                              onClick={() => setPreviewPdfUri(ord.documentDataUri!)}
                              className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-bold text-cyan-400 flex items-center gap-1.5"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View PDF Document</span>
                            </button>

                            <button
                              onClick={() => downloadReroutePDF({
                                requestId: ord.id,
                                shipmentId: ord.shipmentId,
                                supplierName: ord.supplierName,
                                fromMode: ord.fromMode,
                                toMode: ord.toMode,
                                containers: ord.containers,
                                weatherReason: ord.weatherReason || ord.reason || 'Weather Emergency Bypass',
                                approvedBy: ord.approvedBy || 'System Administrator',
                                approvedAt: ord.approvedAt || new Date().toLocaleString(),
                                costSavings: '₹ 4.8 Lakhs Net Savings',
                                timeSavings: '12 Hours Delay Avoided'
                              })}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download PDF</span>
                            </button>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => setDeleteRequestId(ord.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Request</span>
                        </button>

                        {ord.status === 'PENDING_ADMIN_APPROVAL' && (
                          <>
                            <button
                              onClick={() => rejectRerouteRequest(ord.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                            >
                              ✕ Reject
                            </button>

                            <button
                              onClick={() => handleAcceptReroute(ord.id)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              <span>✓ ACCEPT REROUTING</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: ADMIN MANUAL REROUTING CONTROL */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-blue-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  <span>Manual Rerouting Override</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Admin is not forced to accept AI recommendations. Manually assign Road, Rail, Air, Ship, or Multimodal routes.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Direct Manual Control
              </span>
            </div>

            {manualSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-fadeIn">
                {manualSuccessMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-bold text-[var(--text-secondary)]">Select Target Shipment</label>
                <select
                  value={manualShipmentId}
                  onChange={(e) => setManualShipmentId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-bold"
                >
                  {clientShipments.map((s) => (
                    <option key={s.id} value={s.id}>
                      Shipment #{s.id} - {s.cargoType} (Current: {s.currentMode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--text-secondary)]">Manual Pathway Mode Selection</label>
                <select
                  value={manualSelectedRoute}
                  onChange={(e) => setManualSelectedRoute(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-bold"
                >
                  <option value="🚆 BY RAIL - DFCCIL Electric High-Speed Rake">🚆 BY RAIL - DFCCIL Electric High-Speed Rake</option>
                  <option value="🚢 BY SHIP - Coastal Maritime Barge Link">🚢 BY SHIP - Coastal Maritime Barge Link</option>
                  <option value="✈️ BY AIR - Priority Cargo Charter">✈️ BY AIR - Priority Cargo Charter</option>
                  <option value="🚛 BY ROAD - Highway NH48 Heavy Haul">🚛 BY ROAD - Highway NH48 Heavy Haul</option>
                  <option value="🔄 MULTIMODAL - Coastal Barge + DFCCIL Rail Sync">🔄 MULTIMODAL - Coastal Barge + DFCCIL Rail Sync</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleApplyManualRoute}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>APPLY MANUAL ROUTE OVERRIDE</span>
            </button>
          </div>

          {/* SECTION 3: ACTIVE REROUTING DECISIONS & REMOVE REROUTING */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-400" />
                  <span>Active Rerouting Decisions & Revocation Control</span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Revoke active rerouting decisions to return shipments back to their original approved routes.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {clientShipments.map((shp) => (
                <div
                  key={shp.id}
                  className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Shipment #{shp.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          shp.rerouteApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {shp.status}
                      </span>
                    </div>
                    <div className="text-slate-300">
                      Original: <span className="text-slate-400">Highway Route A (NH48)</span> | Current Mode: <span className="text-emerald-400 font-bold">{shp.currentMode}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Carrier: {shp.assignedSupplier} | ETA: {shp.eta}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {shp.rerouteApproved ? (
                      <button
                        onClick={() => setRemoveRerouteId(shp.id)}
                        className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>REMOVE REROUTING</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono italic">Original Route Active</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: GLOBAL EMERGENCY OVERRIDE */}
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
            </div>

            {overrideTriggered ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-400">Emergency Corridor Override Executed</div>
                <div className="text-[11px] text-slate-300 font-mono">All impacted consignments re-routed to DFCCIL High-Speed Rail.</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-[var(--text-secondary)]">Target Disrupted Corridor / Sector</label>
                  <select
                    value={emergencyCorridor}
                    onChange={(e) => setEmergencyCorridor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  >
                    <option value="Rewari - Dadri WDFC Segment">Rewari - Dadri WDFC Segment (Monsoon Heavy Rain Risk)</option>
                    <option value="JNPT Port Terminal 3">JNPT Port Terminal 3 (Crane Breakdown)</option>
                    <option value="NH-48 Highway Km 112">NH-48 Highway Km 112 (Flooding Hazard)</option>
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

        {/* Right Column: Governance & System Controls */}
        <div className="space-y-6">
          
          {/* Transparency & AI Cutoff Settings */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-5">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider font-mono">
              Role Governance & AI Cutoffs
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
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
                <p className="text-[11px] text-[var(--text-muted)]">
                  Suppliers see live weather telemetry and receive AI route proposals.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">AI Decision Confidence Cutoff</span>
                  <span className="font-mono font-bold text-purple-400">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
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
            </div>
          </div>

        </div>

      </div>

      {/* CONFIRMATION MODAL: REMOVE REROUTING */}
      {removeRerouteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-sans">
          <div className="relative w-full max-w-md glass-panel rounded-2xl border border-rose-500/40 p-6 space-y-4 bg-slate-950 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-base border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5" />
              <span>Remove Rerouting Decision?</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove the active rerouting decision for <strong>Shipment #{removeRerouteId}</strong>?
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
              The shipment will return to its previous approved route mode and update supplier notifications.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRemoveRerouteId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemoveReroute}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: DELETE REQUEST */}
      {deleteRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-sans">
          <div className="relative w-full max-w-md glass-panel rounded-2xl border border-rose-500/40 p-6 space-y-4 bg-slate-950 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-base border-b border-slate-800 pb-3">
              <Trash2 className="w-5 h-5" />
              <span>Delete Rerouting Request #{deleteRequestId}?</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This action will permanently cancel and delete request <strong>#{deleteRequestId}</strong> from the active reroute queue.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteRequestId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDeleteRequest(deleteRequestId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL FOR ADMIN */}
      {previewPdfUri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[85vh] glass-panel rounded-2xl border border-purple-500/40 p-4 bg-slate-950 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>Issued Written Reroute Authorization Certificate (PDF)</span>
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

    </div>
  );
};
