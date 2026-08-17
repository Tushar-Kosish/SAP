import React, { useState, useEffect } from 'react';
import { LogisticsDocument } from '../types';
import { apiService } from '../services/api';
import { DocumentCenter } from '../components/DocumentCenter';
import { FileText, FileCheck } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<LogisticsDocument[]>([]);

  useEffect(() => {
    apiService.getDocuments().then(setDocuments);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
          <FileCheck className="w-4 h-4 text-cyan-400" />
          <span>AUTOMATED COMPLIANCE & CUSTOMS ENGINE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI DOCUMENTATION CENTER
        </h1>

        <p className="text-base text-slate-300">
          The Documentation Agent automatically renders legally compliant CONCOR Rail Waybills, ICEGATE customs manifest amendments, and SAP TM Transportation Orders.
        </p>
      </div>

      {/* Main Document Center Grid */}
      <DocumentCenter documents={documents} />

    </div>
  );
};
