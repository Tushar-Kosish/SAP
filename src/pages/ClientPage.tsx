import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import {
  UserCheck,
  Package,
  Clock,
  TrendingDown,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MessageSquare,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientPage: React.FC = () => {
  const { clientShipments, toggleRerouteApproval } = useRole();
  const [activeTab, setActiveTab] = useState<'shipments' | 'savings' | 'documents'>('shipments');
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const totalCostSavings = clientShipments.reduce((acc, s) => acc + s.costSavingsLakhs, 0);
  const totalCo2Savings = clientShipments.reduce((acc, s) => acc + s.co2SavingsTons, 0);
  const totalContainers = clientShipments.reduce((acc, s) => acc + s.containersCount, 0);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportModalOpen(false);
      setSupportMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-blue-900/40 to-slate-900 border-b border-indigo-500/20 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enterprise Client Portal</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Shipment Transparency & Cargo Oversight
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Real-time container tracking, transparent AI delay mitigation, cost savings verification, and automated SAP invoice access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSupportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Priority Reroute</span>
            </button>
          </div>
        </div>
      </div>


      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Active Cargo Containers</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{totalContainers} TEU</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> 100% Tracked via SAP BTP
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Cost Savings Realized</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">₹ {totalCostSavings.toFixed(1)} Lakhs</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" /> Verified by AI Optimization
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Carbon Emission Avoided</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{totalCo2Savings.toFixed(1)} Tons</div>
              <div className="text-[10px] text-teal-400 font-bold flex items-center gap-1 mt-0.5">
                <Leaf className="w-3 h-3" /> ESG Compliant
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Transparent SLA Rating</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">99.4%</div>
              <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> Zero Hidden Surcharges
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
          <button
            onClick={() => setActiveTab('shipments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'shipments'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Active Cargo & Reroute Approvals</span>
          </button>
          
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'savings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span>Financial & CO₂ Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'documents'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SAP Invoices & Compliance</span>
          </button>
        </div>

        {/* Tab 1: Shipments */}
        {activeTab === 'shipments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <span>Client Consignment Inventory</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {clientShipments.length} Active Consignments
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {clientShipments.map((shp) => (
                <div
                  key={shp.id}
                  className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-lg hover:border-indigo-500/40 transition-all space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-[var(--text-primary)]">{shp.trackingNumber}</span>
                        <span className="text-xs font-mono text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                          {shp.id}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            shp.status === 'Rerouted'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : shp.status === 'Delayed'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {shp.status}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] font-medium">
                        Cargo: <span className="font-bold text-[var(--text-primary)]">{shp.cargoType}</span> ({shp.containersCount} TEU Containers)
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Assigned Vendor</div>
                        <div className="text-xs font-bold text-indigo-400">{shp.assignedSupplier}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-1">
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Origin & Destination</div>
                      <div className="font-bold text-[var(--text-primary)]">{shp.origin}</div>
                      <div className="text-slate-400">➡️ {shp.destination}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-1">
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">ETA & Delay Status</div>
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {shp.eta}
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">{shp.originalEta}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-1">
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Active Route & Savings</div>
                      <div className="font-bold text-[var(--text-primary)]">{shp.currentMode}</div>
                      <div className="text-[11px] text-emerald-400 font-bold">
                        ₹ {shp.costSavingsLakhs} L Saved | {shp.co2SavingsTons} T CO₂ Avoided
                      </div>
                    </div>
                  </div>

                  {/* Multi-Modal Transit Duration Comparison */}
                  <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-1 text-xs font-mono">
                    <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold flex items-center justify-between">
                      <span>Multi-Modal Transit Duration Estimates</span>
                      <span className="text-blue-400">Route Breakdown</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[11px]">
                        <span className="text-slate-400 block text-[9px]">🚛 ROAD</span>
                        <strong className="text-white">40.0 Hours</strong>
                      </div>
                      <div className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/40 text-[11px]">
                        <span className="text-emerald-400 block text-[9px]">🚆 RAIL (AI Reroute)</span>
                        <strong className="text-emerald-400">21.8 Hours</strong>
                      </div>
                      <div className="px-2 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-[11px]">
                        <span className="text-slate-400 block text-[9px]">🚢 SEA / COASTAL</span>
                        <strong className="text-white">42.3 Hours</strong>
                      </div>
                      <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[11px]">
                        <span className="text-slate-400 block text-[9px]">✈️ AIR CARGO</span>
                        <strong className="text-white">7.0 Hours</strong>
                      </div>
                    </div>
                  </div>

                  {/* Reroute Toggle & Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[var(--text-secondary)]">Automated AI Reroute Approval:</span>
                      <button
                        onClick={() => toggleRerouteApproval(shp.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 flex items-center gap-1.5 ${
                          shp.rerouteApproved
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}
                      >
                        {shp.rerouteApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{shp.rerouteApproved ? 'AI Reroute Approved' : 'Approval Required'}</span>
                      </button>
                    </div>

                    <Link
                      to="/routes"
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Compare Corridor Options</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Financial & Carbon Savings */}
        {activeTab === 'savings' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>Transparent Cost & Carbon Impact Audit</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Every container rerouted by SmartEvac AI generates auditable financial savings and carbon credit reductions logged on SAP BTP.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">Financial Optimization Breakdown</span>
                  <span className="text-xs font-bold text-emerald-400">Total: ₹ {totalCostSavings.toFixed(1)} Lakhs</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-secondary)]">Demurrage & Port Dwell Fee Avoided</span>
                    <span className="font-bold text-[var(--text-primary)]">₹ 3.20 Lakhs</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-secondary)]">Highway Toll & Congestion Savings</span>
                    <span className="font-bold text-[var(--text-primary)]">₹ 1.80 Lakhs</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[var(--text-secondary)]">Rail Freight Volume Discount</span>
                    <span className="font-bold text-[var(--text-primary)]">₹ 1.90 Lakhs</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">ESG & CO₂ Reduction Certificate</span>
                  <span className="text-xs font-bold text-teal-400">Total: {totalCo2Savings.toFixed(1)} Tons</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-secondary)]">Diesel Trucking to Electric Rail Shift</span>
                    <span className="font-bold text-[var(--text-primary)]">15.4 Tons CO₂</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-secondary)]">Coastal Shipping Multimodal Bonus</span>
                    <span className="font-bold text-[var(--text-primary)]">5.3 Tons CO₂</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[var(--text-secondary)]">Engine Idle Time Reduction</span>
                    <span className="font-bold text-[var(--text-primary)]">0.0 Tons CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Documents */}
        {activeTab === 'documents' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                SAP BTP Invoices & Transport Documentation
              </h2>
              <Link to="/documents" className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                <span>View All Documents</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">SAP-TM-REROUTE-INVOICE-9021.pdf</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">Size: 2.4 MB | Generated: Today 11:30 AM</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
                  Download
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">CONCOR-RAIL-BOOKING-MANIFEST.pdf</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">Size: 1.8 MB | Generated: Today 09:15 AM</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Reroute Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <span>Request Priority Reroute Assistance</span>
              </h3>
              <button onClick={() => setSupportModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {supportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-400">Request Dispatched to AI Agent & Supplier</div>
                <div className="text-[11px] text-slate-300">Your custom evacuation reroute request has been logged on SAP BTP.</div>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)]">Consignment ID / Route Detail</label>
                  <input
                    type="text"
                    defaultValue="SHP-9021 (ICD Dadri to JNPT Port)"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)]">Priority Instruction / Note</label>
                  <textarea
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Specify target delivery window or mode preference (e.g. Prioritize rail wagon over coastal barge)..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Transparent Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
