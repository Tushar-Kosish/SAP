import React, { useState, useEffect } from 'react';
import { AuditLogEntry } from '../types';
import { apiService } from '../services/api';
import { AuditLogView } from '../components/AuditLogView';
import { Clock, ShieldCheck } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    apiService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>ENTERPRISE GOVERNANCE AUDIT TRAIL</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          AI Decision Audit Log
        </h1>

        <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
          Transparent audit trail recording every autonomous micro-agent event, Monte Carlo risk calculation, human authorization, and SAP TM transaction dispatch.
        </p>
      </div>

      {/* Main Audit Log Table */}
      <AuditLogView logs={logs} />

    </div>
  );
};
