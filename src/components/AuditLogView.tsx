import React from 'react';
import { Clock, ShieldCheck, Filter, Download } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditLogViewProps {
  logs: AuditLogEntry[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  return (
    <div className="glass-panel p-6 shadow-md space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            ENTERPRISE GOVERNANCE & COMPLIANCE
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            AI Decision Audit Log
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]">
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            <span>Filter Severity</span>
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]">
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Agent Name</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Event Details</th>
              <th className="py-3 px-4 text-right">SAP Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)] text-xs">
            {logs.map((entry) => (
              <tr key={entry.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                
                {/* Timestamp */}
                <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-extrabold whitespace-nowrap font-mono">
                  {entry.timestamp}
                </td>

                {/* Agent */}
                <td className="py-3.5 px-4 font-extrabold text-[var(--text-primary)] whitespace-nowrap">
                  {entry.agentName}
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                  {entry.action}
                </td>

                {/* Severity */}
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    entry.severity === 'CRITICAL'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : entry.severity === 'SUCCESS'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : entry.severity === 'WARNING'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                  }`}>
                    {entry.severity}
                  </span>
                </td>

                {/* Details */}
                <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium max-w-md truncate">
                  {entry.details}
                </td>

                {/* Ref */}
                <td className="py-3.5 px-4 text-right text-[var(--text-muted)] font-mono font-semibold">
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
