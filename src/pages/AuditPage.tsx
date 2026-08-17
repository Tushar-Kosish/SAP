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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>ENTERPRISE GOVERNANCE AUDIT TRAIL</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI DECISION AUDIT LOG
        </h1>

        <p className="text-base text-slate-300">
          Complete transparent audit trail recording every autonomous agent event, Monte Carlo risk calculation, human authorization, and SAP TM transaction dispatch.
        </p>
      </div>

      {/* Main Audit Log Table */}
      <AuditLogView logs={logs} />

    </div>
  );
};
