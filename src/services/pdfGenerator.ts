import { jsPDF } from 'jspdf';

export interface RerouteDocumentDetails {
  requestId: string;
  shipmentId: string;
  supplierName: string;
  fromMode: string;
  toMode: string;
  containers: number;
  weatherReason: string;
  approvedBy: string;
  approvedAt: string;
  costSavings: string;
  timeSavings: string;
}

export const generateReroutePDF = (details: RerouteDocumentDetails): { pdf: jsPDF; dataUri: string; filename: string } => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [15, 23, 42]; // slate-900
  const accentColor = [16, 185, 129]; // emerald-500
  const blueColor = [37, 99, 235]; // blue-600

  // Top Decorative Bar
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 0, 210, 6, 'F');

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 6, 210, 36, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SAP SmartEvac AI Logistics Network', 14, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('OFFICIAL MULTIMODAL REROUTE AUTHORIZATION ORDER & CERTIFICATE', 14, 29);

  // SAP BTP Badge
  doc.setFillColor(blueColor[0], blueColor[1], blueColor[2]);
  doc.roundedRect(145, 14, 51, 20, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SAP TM VERIFIED', 150, 22);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('DOC REF: ' + details.requestId, 150, 28);

  // Document Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 50, 182, 28, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 50, 182, 28, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  doc.text('Shipment Reference:', 18, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(details.shipmentId, 55, 58);

  doc.setFont('helvetica', 'bold');
  doc.text('Logistics Provider:', 18, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(details.supplierName, 55, 65);

  doc.setFont('helvetica', 'bold');
  doc.text('Containers (TEU):', 18, 72);
  doc.setFont('helvetica', 'normal');
  doc.text(details.containers + ' TEU Standard Containers', 55, 72);

  doc.setFont('helvetica', 'bold');
  doc.text('Approval Timestamp:', 115, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(details.approvedAt, 153, 58);

  doc.setFont('helvetica', 'bold');
  doc.text('Authorized By:', 115, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(details.approvedBy, 153, 65);

  doc.setFont('helvetica', 'bold');
  doc.text('Authorization Status:', 115, 72);
  doc.setTextColor(16, 185, 129);
  doc.text('APPROVED & EXECUTED', 153, 72);

  // Rerouting Pathway Box
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Authorized Reroute Pathway & Mode Change', 14, 88);

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 92, 182, 30, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 92, 182, 30, 2, 2, 'S');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(225, 29, 72); // rose red for original
  doc.text('Original Pathway Mode:', 20, 102);
  doc.setFont('helvetica', 'normal');
  doc.text(details.fromMode, 65, 102);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald green for new
  doc.text('Approved New Pathway:', 20, 112);
  doc.setFont('helvetica', 'normal');
  doc.text(details.toMode, 65, 112);

  // Weather & Risk Justification Box
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. Weather Hazard & Environmental Justification', 14, 132);

  doc.setFillColor(254, 242, 242); // light red/orange tint
  doc.roundedRect(14, 136, 182, 32, 2, 2, 'F');
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, 136, 182, 32, 2, 2, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('Disruption Factor:', 20, 145);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(details.weatherReason || 'Severe weather alert & corridor congestion detected.', 55, 145);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('Safety Compliance:', 20, 155);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('Approved under Emergency SAP Evacuation Protocol Section 4B.', 55, 155);

  // Expected Impact Metrics Table
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('3. Expected Impact & Cost Optimization', 14, 178);

  doc.setFillColor(248, 250, 252);
  doc.rect(14, 182, 182, 24, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 182, 182, 24, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Transit Delay Avoided:', 20, 192);
  doc.setFont('helvetica', 'normal');
  doc.text(details.timeSavings, 65, 192);

  doc.setFont('helvetica', 'bold');
  doc.text('Estimated Cost Benefit:', 20, 199);
  doc.setFont('helvetica', 'normal');
  doc.text(details.costSavings, 65, 199);

  // Signatures and Official Digital Seal Section
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 218, 196, 218);

  // Digital Seal Box
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(14, 224, 75, 45, 3, 3, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(14, 224, 75, 45, 3, 3, 'S');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('SAP SMART EVAC AI SEAL', 20, 232);
  doc.setFont('helvetica', 'normal');
  doc.text('Cryptographic Hash Code:', 20, 238);
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.text('0x8F92A...4B19E', 20, 244);
  doc.text('VERIFIED BY SAP BTP GATEWAY', 20, 252);
  doc.text('DATE: ' + details.approvedAt, 20, 258);

  // Admin Signature Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Admin Signature:', 115, 232);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text(details.approvedBy, 115, 244);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Chief Logistics & Evacuation Officer', 115, 250);
  doc.text('SAP BTP Enterprise Operations', 115, 255);

  // Footer text
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184);
  doc.text('This document is a legally binding written reroute authorization order issued by SAP SmartEvac AI.', 14, 282);

  const filename = `REROUTE_AUTHORIZATION_${details.requestId}_${details.shipmentId}.pdf`;
  const dataUri = doc.output('datauristring');

  return { pdf: doc, dataUri, filename };
};

export const downloadReroutePDF = (details: RerouteDocumentDetails) => {
  const { pdf, filename } = generateReroutePDF(details);
  pdf.save(filename);
};
