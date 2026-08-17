import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  FileCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { LogisticsDocument } from '../types';

interface DocumentCenterProps {
  documents: LogisticsDocument[];
}

export const DocumentCenter: React.FC<DocumentCenterProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<LogisticsDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // Generate & Download PDF using jsPDF
  const handleGenerateAndDownloadPDF = (doc: LogisticsDocument) => {
    setIsGenerating(doc.id);

    setTimeout(() => {
      const pdf = new jsPDF();

      // Header Banner
      pdf.setFillColor(15, 23, 42); // #0F172A
      pdf.rect(0, 0, 210, 40, 'F');
      
      pdf.setTextColor(0, 242, 254); // Cyan
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SmartEvac AI', 15, 20);

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Multi-Agent Logistics Intelligence Platform | SAP BTP', 15, 30);

      // Document Title
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(doc.title.toUpperCase(), 15, 55);

      // Metadata Block
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Reference No: ${doc.referenceNo}`, 15, 65);
      pdf.text(`Date Generated: ${doc.dateGenerated}`, 15, 72);
      pdf.text(`Category: ${doc.category}`, 15, 79);
      pdf.text(`Corridor: JNPA (Mumbai) to ICD Dadri (Delhi NCR)`, 15, 86);

      // Divider Line
      pdf.setDrawColor(226, 232, 240);
      pdf.line(15, 92, 195, 92);

      // Content Summary
      pdf.setTextColor(30, 41, 59);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EXECUTIVE SUMMARY & DECISION AUDIT', 15, 104);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const splitText = pdf.splitTextToSize(doc.summary, 180);
      pdf.text(splitText, 15, 114);

      // Detailed Metrics Table
      pdf.setFillColor(241, 245, 249);
      pdf.rect(15, 135, 180, 50, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('DISPATCH PARAMETERS', 20, 145);
      pdf.setFont('helvetica', 'normal');
      pdf.text('• TEU Container Batch: 120 Containers', 20, 155);
      pdf.text('• Rerouted Pathway: Western Dedicated Freight Corridor (WDFC Rail)', 20, 163);
      pdf.text('• Net Freight Cost Savings: INR 5,40,000 (INR 4,500 / TEU)', 20, 171);
      pdf.text('• SLA ETA Guarantee: 31.0 Hours (-7.2 Hours versus Highway NH48)', 20, 179);

      // Official SAP BTP Stamp Box
      pdf.setDrawColor(16, 185, 129);
      pdf.rect(15, 200, 180, 30);
      pdf.setTextColor(16, 185, 129);
      pdf.setFont('helvetica', 'bold');
      pdf.text('✓ AUTHORIZED & EXECUTED VIA SAP TM BTP SUITE', 20, 215);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Digitally signed by SmartEvac AI Autonomous Multi-Agent Decision Engine.', 20, 223);

      // Save file
      pdf.save(`${doc.referenceNo}.pdf`);
      setIsGenerating(null);
    }, 400);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <FileCheck className="w-4 h-4" />
            AUTOMATED COMPLIANCE & CUSTOMS FILINGS
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            AI GENERATED DOCUMENTS
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
          PDF Generation Engine: Active
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel glass-panel-hover p-5 rounded-xl border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-mono font-bold uppercase">
                  {doc.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {doc.fileSize}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white">{doc.title}</h3>
              <div className="text-xs font-mono text-slate-400">Ref: {doc.referenceNo}</div>
              
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {doc.summary}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              
              <button
                onClick={() => setSelectedDoc(doc)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-white/10"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleGenerateAndDownloadPDF(doc)}
                disabled={isGenerating === doc.id}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-extrabold transition-all shadow-glow-cyan"
              >
                {isGenerating === doc.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 fill-black" />
                )}
                <span>Generate PDF</span>
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-6 bg-slate-950 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-extrabold text-white">{selectedDoc.title}</h3>
                  <div className="text-xs font-mono text-slate-400">Ref: {selectedDoc.referenceNo}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Document Content Sheet Preview */}
            <div className="bg-slate-900 p-6 rounded-xl border border-white/10 space-y-4 text-xs font-sans">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="text-cyan-400 font-bold font-mono text-sm">SmartEvac AI Document System</div>
                <div className="text-emerald-400 font-mono text-xs">✓ SAP BTP Verified</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{selectedDoc.title}</div>
                <div className="text-slate-400 font-mono">Date: {selectedDoc.dateGenerated}</div>
              </div>

              <p className="text-slate-300 leading-relaxed">
                {selectedDoc.summary}
              </p>

              <div className="bg-slate-950 p-4 rounded-lg border border-white/5 space-y-2 font-mono">
                <div className="text-slate-400 font-bold text-[10px] uppercase">CONTAINER DISPATCH PARAMETERS</div>
                <div className="text-slate-200">Corridor: JNPA Terminal → ICD Dadri</div>
                <div className="text-slate-200">Reassigned TEU: 120 Containers</div>
                <div className="text-slate-200">WDFC Rake: CONCOR #WDFC-984</div>
                <div className="text-emerald-400 font-bold">Estimated Cost Savings: ₹5.4 Lakhs</div>
              </div>

            </div>

            {/* Footer Modal Controls */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold border border-white/10"
              >
                Close
              </button>

              <button
                onClick={() => handleGenerateAndDownloadPDF(selectedDoc)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-glow-cyan"
              >
                <Download className="w-4 h-4 fill-black" />
                <span>Download Official PDF</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
