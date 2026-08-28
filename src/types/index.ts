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

export interface WeatherCondition {
  location: string;
  weatherType: 'Storm' | 'Heavy Rain' | 'Clear' | 'Fog' | 'High Wind' | 'Cyclone Alert';
  temperature: string;
  windSpeed: string;
  precipitation: string;
  severity: 'CRITICAL' | 'WARNING' | 'NORMAL';
  impactDescription: string;
}

export interface MultimodalOption {
  id: 'ship' | 'air' | 'rail' | 'road';
  name: string;
  mode: 'By Ship' | 'By Air' | 'By Rail' | 'By Road';
  transitTimeHours: number;
  costPerTeu: number;
  co2TonsPerTeu: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  weatherStatus: WeatherCondition;
  icon: string;
  color: string;
  pathwayName: string;
}

export interface RouteOption {
  id: 'road' | 'rail' | 'coastal' | 'ship' | 'air';
  name: string;
  mode: string;
  pathway: string;
  etaHours: number;
  costPerContainer: number;
  totalCost: number; // For batch of containers
  co2PerContainerTons: number;
  totalCo2Tons: number;
  riskLevel: 'High' | 'Low' | 'Medium' | 'Critical';
  aiScore: number;
  isRecommended: boolean;
  color: string;
  coordinates: [number, number][];
  distanceKm: number;
  transitTimeFormatted: string;
  benefits: string[];
}

export interface AIRecommendation {
  targetRouteId: 'rail' | 'ship' | 'air' | 'road';
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
  category: 'Rail Booking' | 'Customs Filing' | 'Transportation Order' | 'AI Report' | 'Risk Evaluation' | 'Reroute Authorization';
  format: 'PDF';
  dateGenerated: string;
  fileSize: string;
  referenceNo: string;
  summary: string;
  downloadUrl?: string;
  pdfDataUri?: string;
}

export interface SimulationStep {
  stepIndex: number;
  activeAgentId: 'sensing' | 'rerouting' | 'impact' | 'decision' | 'documentation';
  description: string;
  durationMs: number;
}

