import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
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
  ChevronRight,
  Activity,
  Plus,
  Radio,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SupplierPage: React.FC = () => {
  const { supplierFleets, rerouteOrders, acceptRerouteOrder, updateFleetStatus } = useRole();
  const [activeTab, setActiveTab] = useState<'fleets' | 'orders' | 'sla'>('fleets');
  const [selectedFleetId, setSelectedFleetId] = useState<string>('FLT-RAIL-01');
  const [milestoneStatus, setMilestoneStatus] = useState<string>('');
  const [milestoneSuccess, setMilestoneSuccess] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-slate-900 border-b border-emerald-500/20 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Logistics Provider & Supplier Portal</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Fleet Capacity & AI Reroute Dispatch Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Transparent dispatch orders, live rake/fleet availability, SLA performance metrics, and instant milestone updates synced with SAP BTP.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Network Capacity</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{totalCapacity} TEU</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <Activity className="w-3 h-3" /> {utilizationPercent}% Capacity Utilized
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">AI Reroute Orders</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{rerouteOrders.length} Pending/Active</div>
              <div className="text-[10px] text-teal-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Direct SAP Dispatch
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">SLA Performance Score</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">98.8%</div>
              <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" /> Grade A Supplier
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-bold">Turnaround SLA</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">4.2 Hrs</div>
              <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Fast Turnaround
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
            onClick={() => setActiveTab('fleets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>AI Reroute Dispatch Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('sla')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sla'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Supplier Scorecard & SLA Payouts</span>
          </button>
        </div>

        {/* Tab 1: Fleets */}
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
                    <div className="text-[11px] text-slate-300">Client and Admin dashboard notifications updated in real time.</div>
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

        {/* Tab 2: Reroute Orders */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                AI Automated Evacuation Orders
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">Dispatched by SmartEvac AI Agent</span>
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
                    {ord.status === 'PENDING_ACK' ? (
                      <button
                        onClick={() => acceptRerouteOrder(ord.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Reroute Allocation</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accepted & Scheduled</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: SLA Scorecard */}
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

    </div>
  );
};
