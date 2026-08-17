export type TabType = 'landing' | 'overview' | 'live-ops' | 'agents' | 'routes' | 'documents' | 'audit' | 'sap';

export interface AgentStatus {
  id: 'sensing' | 'rerouting' | 'impact' | 'decision' | 'documentation';
  name: string;
  role: string;
  status: 'ACTIVE' | 'PROCESSING' | 'READY' | 'IDLE';
  currentTask: string;
  confidence: number;
  lastAction: string;
  iconName: string;
  details: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface CorridorMetrics {
  containersInTransit: number;
  activeShipments: number;
  currentDisruptions: number;
  averageDelayHours: number;
  costExposureLakhs: number;
  co2ExposureTons: number;
}

export interface DisruptionEvent {
  id: string;
  title: string;
  corridor: string;
  congestionScore: number;
  severity: 'CRITICAL' | 'WARNING' | 'MODERATE';
  trafficDensity: 'High' | 'Severe' | 'Moderate';
  portDwellTimeIncreasePercent: number;
  expectedDelayHours: number;
  confidencePercent: number;
  timestamp: string;
  location: [number, number]; // lat, lng
}

export interface RouteOption {
  id: 'road' | 'rail' | 'coastal';
  name: string;
  mode: string;
  pathway: string;
  etaHours: number;
  costPerContainer: number;
  totalCost: number; // For batch of 120 containers
  co2PerContainerTons: number;
  totalCo2Tons: number;
  riskLevel: 'High' | 'Low' | 'Medium';
  aiScore: number;
  isRecommended: boolean;
  color: string;
  coordinates: [number, number][];
  distanceKm: number;
  transitTimeFormatted: string;
  benefits: string[];
}

export interface AIRecommendation {
  targetRouteId: 'rail';
  routeName: string;
  score: number;
  containersToReassign: number;
  originalRoute: string;
  newRoute: string;
  reasoning: string;
  costSavingPerContainer: number;
  totalCostSavings: number;
  delayReductionHours: number;
  co2ReductionPercent: number;
  confidencePercent: number;
}

export interface SapApiLog {
  id: string;
  timestamp: string;
  method: 'POST' | 'GET' | 'PUT';
  endpoint: string;
  status: number;
  statusText: string;
  payloadSnippet: string;
  responseSnippet: string;
  system: 'SAP BTP' | 'SAP TM' | 'Carrier Network';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
  details: string;
  transactionRef?: string;
}

export interface LogisticsDocument {
  id: string;
  title: string;
  category: 'Rail Booking' | 'Customs Filing' | 'Transportation Order' | 'AI Report' | 'Risk Evaluation';
  format: 'PDF';
  dateGenerated: string;
  fileSize: string;
  referenceNo: string;
  summary: string;
  downloadUrl?: string;
}

export interface SimulationStep {
  stepIndex: number;
  activeAgentId: 'sensing' | 'rerouting' | 'impact' | 'decision' | 'documentation';
  description: string;
  durationMs: number;
}
