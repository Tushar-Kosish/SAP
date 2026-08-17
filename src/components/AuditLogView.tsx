import React from 'react';
import { Clock, ShieldCheck, Filter, Download } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditLogViewProps {
  logs: AuditLogEntry[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            ENTERPRISE GOVERNANCE & COMPLIANCE
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            AI DECISION AUDIT LOG
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:bg-slate-800">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Severity</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:bg-slate-800">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Agent Name</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Event Details</th>
              <th className="py-3 px-4 text-right">SAP Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-xs">
            {logs.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-900/60 transition-colors">
                
                {/* Timestamp */}
                <td className="py-3.5 px-4 text-cyan-400 font-bold whitespace-nowrap">
                  {entry.timestamp}
                </td>

                {/* Agent */}
                <td className="py-3.5 px-4 font-bold text-white font-sans whitespace-nowrap">
                  {entry.agentName}
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-slate-200 whitespace-nowrap">
                  {entry.action}
                </td>

                {/* Severity */}
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    entry.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : entry.severity === 'SUCCESS'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : entry.severity === 'WARNING'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}>
                    {entry.severity}
                  </span>
                </td>

                {/* Details */}
                <td className="py-3.5 px-4 text-slate-300 max-w-md truncate font-sans">
                  {entry.details}
                </td>

                {/* Ref */}
                <td className="py-3.5 px-4 text-right text-slate-400 font-mono">
                  {entry.transactionRef || '—'}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
