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
      pdf.setFillColor(37, 99, 235); // #2563EB Blue
      pdf.rect(0, 0, 210, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SmartEvac AI', 15, 20);

      pdf.setTextColor(239, 246, 255);
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
    <div className="glass-panel p-6 shadow-md space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            AUTOMATED COMPLIANCE & CUSTOMS FILINGS
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            AI Generated Customs Documents
          </h2>
        </div>

        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          PDF Generation Engine: Active
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel glass-panel-hover p-6 border border-[var(--border-color)] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-extrabold uppercase">
                  {doc.category}
                </span>
                <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                  {doc.fileSize}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{doc.title}</h3>
              <div className="text-xs font-medium text-[var(--text-muted)]">Ref: {doc.referenceNo}</div>
              
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1 font-medium">
                {doc.summary}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-color)]">
              
              <button
                onClick={() => setSelectedDoc(doc)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] text-xs font-bold transition-all border border-[var(--border-color)]"
              >
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleGenerateAndDownloadPDF(doc)}
                disabled={isGenerating === doc.id}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all shadow-md shadow-blue-500/25"
              >
                {isGenerating === doc.id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Download className="w-4 h-4 fill-white" />
                )}
                <span>Generate PDF</span>
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-[var(--border-strong)] p-6 space-y-6 bg-[var(--bg-surface)] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)]">{selectedDoc.title}</h3>
                  <div className="text-xs font-medium text-[var(--text-muted)]">Ref: {selectedDoc.referenceNo}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Document Content Sheet Preview */}
            <div className="bg-[var(--bg-surface-inset)] p-6 rounded-xl border border-[var(--border-color)] space-y-4 text-xs font-sans">
              
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">SmartEvac AI Document System</div>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓ SAP BTP Verified</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[var(--text-primary)] text-sm">{selectedDoc.title}</div>
                <div className="text-[var(--text-muted)] font-medium">Date: {selectedDoc.dateGenerated}</div>
              </div>

              <p className="text-[var(--text-secondary)] leading-relaxed font-medium">
                {selectedDoc.summary}
              </p>

              <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-color)] space-y-2 font-medium">
                <div className="text-[var(--text-muted)] font-bold text-[10px] uppercase">CONTAINER DISPATCH PARAMETERS</div>
                <div className="text-[var(--text-primary)]">Corridor: JNPA Terminal → ICD Dadri</div>
                <div className="text-[var(--text-primary)]">Reassigned TEU: 120 Containers</div>
                <div className="text-[var(--text-primary)]">WDFC Rake: CONCOR #WDFC-984</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">Estimated Cost Savings: ₹5.4 Lakhs</div>
              </div>

            </div>

            {/* Footer Modal Controls */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border-color)]"
              >
                Close
              </button>

              <button
                onClick={() => handleGenerateAndDownloadPDF(selectedDoc)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/25"
              >
                <Download className="w-4 h-4 fill-white" />
                <span>Download Official PDF</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
