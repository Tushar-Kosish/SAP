import {
  AgentStatus,
  CorridorMetrics,
  DisruptionEvent,
  RouteOption,
  AIRecommendation,
  SapApiLog,
  AuditLogEntry,
  LogisticsDocument
} from '../types';

export const initialCorridorMetrics: CorridorMetrics = {
  containersInTransit: 1248,
  activeShipments: 87,
  currentDisruptions: 3,
  averageDelayHours: 4.7,
  costExposureLakhs: 18.4,
  co2ExposureTons: 12.8,
};

export const initialDisruptionEvent: DisruptionEvent = {
  id: 'DISRUPT-8492',
  title: 'CONGESTION DETECTED',
  corridor: 'JNPA → Delhi Freight Corridor (NH48 Highway)',
  congestionScore: 82,
  severity: 'CRITICAL',
  trafficDensity: 'High',
  portDwellTimeIncreasePercent: 31,
  expectedDelayHours: 8.2,
  confidencePercent: 94,
  timestamp: 'Just Now',
  location: [19.065, 73.001],
};

export const initialAgents: AgentStatus[] = [
  {
    id: 'sensing',
    name: 'Sensing Agent',
    role: 'Multi-Modal Congestion & Environmental Sensor',
    status: 'ACTIVE',
    currentTask: 'Monitoring JNPA terminal gate congestion & NH48 toll queues',
    confidence: 96,
    lastAction: 'Detected 31% port dwell time spike at JNPA Terminal 4',
    iconName: 'Activity',
    details: 'Ingesting AIS vessel positions, IoT GPS telemetry from 87 trucks, satellite infrared weather feeds, and CONCOR rail junction signals.',
    metrics: [
      { label: 'Data Sources', value: '14 Streams' },
      { label: 'Latency', value: '450 ms' },
    ]
  },
  {
    id: 'rerouting',
    name: 'Rerouting Agent',
    role: 'Dynamic Path Finder & Corridor Optimization',
    status: 'READY',
    currentTask: 'Evaluating 3 multi-modal transportation corridors',
    confidence: 93,
    lastAction: 'Simulated 1,000 Monte Carlo route paths via WDFC Rail',
    iconName: 'GitFork',
    details: 'Calculates dynamic transit times across NH48 highway, Western Dedicated Freight Corridor (WDFC) electrified rail, and coastal feeder links.',
    metrics: [
      { label: 'Corridors Tested', value: '3 Active' },
      { label: 'Solver Speed', value: '12 ms' },
    ]
  },
  {
    id: 'impact',
    name: 'Impact Assessment Agent',
    role: 'Cost, SLA Risk & Carbon Footprint Analyst',
    status: 'READY',
    currentTask: 'Calculating ₹ financial exposure and CO₂ emissions delta',
    confidence: 95,
    lastAction: 'Estimated ₹4,500/TEU net cost savings for Rail shift',
    iconName: 'BarChart3',
    details: 'Applies real-time diesel price matrices, CONCOR freight tariffs, SAP demurrage calculations, and GHG Protocol Scope 3 carbon formulas.',
    metrics: [
      { label: 'Cost Delta', value: '-₹5.4 Lakhs' },
      { label: 'CO₂ Savings', value: '-50%' },
    ]
  },
  {
    id: 'decision',
    name: 'Decision Agent',
    role: 'Autonomous Policy Evaluator & Ranker',
    status: 'READY',
    currentTask: 'Scoring pathways against enterprise SLA constraints',
    confidence: 91,
    lastAction: 'Selected WDFC Electric Rail (Score: 91/100)',
    iconName: 'BrainCircuit',
    details: 'Weights SLA delay risk (40%), carbon tax avoidance (25%), total freight cost (25%), and carrier reliability (10%).',
    metrics: [
      { label: 'Top Score', value: '91 / 100' },
      { label: 'Recommendation', value: 'WDFC Rail' },
    ]
  },
  {
    id: 'documentation',
    name: 'Documentation Agent',
    role: 'Automated Logistics & Customs Doc Generator',
    status: 'READY',
    currentTask: 'Standby for CONCOR booking & ICEGATE customs filings',
    confidence: 98,
    lastAction: 'Generated pre-filing draft for 120 TEU re-allocation',
    iconName: 'FileCheck',
    details: 'Automatically renders legally compliant CONCOR Rail Waybills, ICEGATE customs manifest updates, and SAP TM Freight Booking orders.',
    metrics: [
      { label: 'Templates', value: '5 Standard' },
      { label: 'PDF Speed', value: '180 ms' },
    ]
  }
];

export const initialRoutes: RouteOption[] = [
  {
    id: 'road',
    name: 'Route A — Highway (NH 48)',
    mode: 'Trucking (NH48)',
    pathway: 'JNPA → Surat → Vadodara → Jaipur → Delhi NCR',
    etaHours: 38,
    costPerContainer: 42000,
    totalCost: 5040000, // 120 * 42000
    co2PerContainerTons: 1.8,
    totalCo2Tons: 216,
    riskLevel: 'High',
    aiScore: 61,
    isRecommended: false,
    color: '#EF4444', // Red
    distanceKm: 1420,
    transitTimeFormatted: '38h (+8.2h Delay)',
    coordinates: [
      [18.948, 72.951], // JNPA
      [19.065, 73.001], // Vashi
      [21.170, 72.831], // Surat
      [22.307, 73.181], // Vadodara
      [26.912, 75.787], // Jaipur
      [28.613, 77.209]  // Delhi NCR
    ],
    benefits: ['Door-to-door delivery', 'No intermodal transfer needed']
  },
  {
    id: 'rail',
    name: 'Route B — Electric Rail (WDFC Corridor)',
    mode: 'Dedicated Freight Corridor Rail',
    pathway: 'JNPA → Vadodara Hub → Palanpur Junction → Rewari → ICD Dadri',
    etaHours: 31,
    costPerContainer: 37500,
    totalCost: 4500000, // 120 * 37500
    co2PerContainerTons: 0.9,
    totalCo2Tons: 108,
    riskLevel: 'Low',
    aiScore: 91,
    isRecommended: true,
    color: '#10B981', // Emerald Green
    distanceKm: 1498,
    transitTimeFormatted: '31h (Guaranteed SLA)',
    coordinates: [
      [18.948, 72.951], // JNPA
      [22.307, 73.181], // Vadodara Hub
      [24.172, 72.438], // Palanpur Junction WDFC
      [28.192, 76.619], // Rewari Rail Yard
      [28.535, 77.553]  // ICD Dadri
    ],
    benefits: [
      'Bypasses NH48 highway toll congestion',
      '7.0 hours faster ETA',
      '50% reduction in carbon emissions',
      '₹5.4 Lakhs direct freight cost savings for 120 containers',
      'Automated CONCOR rail wagon allocation'
    ]
  },
  {
    id: 'coastal',
    name: 'Route C — Coastal Feed + Northern Rail',
    mode: 'Maritime Coastal + Rail',
    pathway: 'JNPA Port → Pipavav Port → Northern Rail Link → ICD Dadri',
    etaHours: 54,
    costPerContainer: 29000,
    totalCost: 3480000, // 120 * 29000
    co2PerContainerTons: 0.7,
    totalCo2Tons: 84,
    riskLevel: 'Medium',
    aiScore: 76,
    isRecommended: false,
    color: '#3B82F6', // Sapphire Blue
    distanceKm: 1650,
    transitTimeFormatted: '54h (Lowest Cost)',
    coordinates: [
      [18.948, 72.951], // JNPA
      [20.913, 71.503], // Pipavav Port
      [24.172, 72.438], // Palanpur
      [28.535, 77.553]  // ICD Dadri
    ],
    benefits: ['Lowest monetary cost per TEU', 'Lowest carbon emissions', 'Suitable for non-urgent bulk cargo']
  }
];

export const initialRecommendation: AIRecommendation = {
  targetRouteId: 'rail',
  routeName: 'WDFC Electric Freight Rail',
  score: 91,
  containersToReassign: 120,
  originalRoute: 'NH48 Highway Trucking',
  newRoute: 'WDFC Dedicated Freight Corridor (JNPA → ICD Dadri)',
  reasoning: 'Lower congestion exposure on NH48, 7.0-hour faster ETA arrival at ICD Dadri, 50% carbon footprint reduction, and ₹5,400 per TEU overall cost savings.',
  costSavingPerContainer: 4500,
  totalCostSavings: 540000,
  delayReductionHours: 7.2,
  co2ReductionPercent: 50,
  confidencePercent: 94,
};

export const initialSapLogs: SapApiLog[] = [
  {
    id: 'SAP-LOG-1001',
    timestamp: '20:41:00',
    method: 'GET',
    endpoint: '/sap/opu/odata/sap/TRANSPORTATION_ORDER_SRV/ShipmentSet?$filter=Corridor eq \'JNPA-DELHI\'',
    status: 200,
    statusText: 'OK',
    payloadSnippet: 'Query parameters: Corridor=JNPA-DELHI, ActiveStatus=IN_TRANSIT',
    responseSnippet: '{"d":{"results":[{"ShipmentID":"870192","Containers":120,"Carrier":"Highway Logistics Corp"}]}}',
    system: 'SAP TM'
  },
  {
    id: 'SAP-LOG-1002',
    timestamp: '20:41:03',
    method: 'GET',
    endpoint: '/sap/btp/ai-core/v1/sensing-feed/jnpa-dwell-metrics',
    status: 200,
    statusText: 'OK',
    payloadSnippet: 'Polling JNPA Port Gateway Sensors',
    responseSnippet: '{"dwell_time_avg_hours": 18.2, "congestion_index": 82, "status": "CRITICAL"}',
    system: 'SAP BTP'
  },
  {
    id: 'SAP-LOG-1003',
    timestamp: '20:41:06',
    method: 'GET',
    endpoint: '/sap/opu/odata/sap/CARRIER_CAPACITY_SRV/RailWagonSet?$filter=Corridor eq \'WDFC_DADRI\'',
    status: 200,
    statusText: 'OK',
    payloadSnippet: 'Check CONCOR WDFC Rail Rake availability at JNPA ICD Yard',
    responseSnippet: '{"available_rakes": 3, "total_teu_capacity": 180, "departure_time": "22:30 IST"}',
    system: 'SAP TM'
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUDIT-901',
    timestamp: '20:41:03',
    agentId: 'sensing',
    agentName: 'Sensing Agent',
    action: 'Disruption Detected',
    severity: 'CRITICAL',
    details: 'Congestion score exceeded threshold (82/100) on JNPA-Delhi Highway NH48',
    transactionRef: 'EVAC-ALERT-8492'
  },
  {
    id: 'AUDIT-902',
    timestamp: '20:41:05',
    agentId: 'rerouting',
    agentName: 'Rerouting Agent',
    action: 'Pathway Evaluation',
    severity: 'INFO',
    details: 'Generated 3 alternative multi-modal routes: NH48 Highway, WDFC Rail, Coastal Feed',
    transactionRef: 'EVAC-OPT-3910'
  },
  {
    id: 'AUDIT-903',
    timestamp: '20:41:08',
    agentId: 'impact',
    agentName: 'Impact Assessment Agent',
    action: 'Cost & CO₂ Calculation',
    severity: 'INFO',
    details: 'Calculated ₹18.4L delay risk on road vs ₹5.4L savings on WDFC Rail',
    transactionRef: 'EVAC-FIN-4821'
  },
  {
    id: 'AUDIT-904',
    timestamp: '20:41:11',
    agentId: 'decision',
    agentName: 'Decision Agent',
    action: 'Strategy Selected',
    severity: 'SUCCESS',
    details: 'Recommended WDFC Rail Corridor (Score: 91/100, 94% Confidence)',
    transactionRef: 'EVAC-REC-9102'
  }
];

export const initialDocuments: LogisticsDocument[] = [
  {
    id: 'DOC-101',
    title: 'CONCOR Rail Waybill & Rake Allocation',
    category: 'Rail Booking',
    format: 'PDF',
    dateGenerated: '2026-08-17 20:41',
    fileSize: '420 KB',
    referenceNo: 'CONCOR-WDFC-2026-891',
    summary: 'Official CONCOR electrified rail rake manifest assigning 120 TEU containers from JNPA yard to ICD Dadri train #WDFC-984.'
  },
  {
    id: 'DOC-102',
    title: 'ICEGATE Customs Pre-Filing Amendment',
    category: 'Customs Filing',
    format: 'PDF',
    dateGenerated: '2026-08-17 20:41',
    fileSize: '310 KB',
    referenceNo: 'ICEGATE-BOE-77492-AMEND',
    summary: 'Electronic customs declaration amendment notifying Indian Customs of intermodal transshipment node change to Dadri ICD.'
  },
  {
    id: 'DOC-103',
    title: 'SAP TM Freight Transportation Order',
    category: 'Transportation Order',
    format: 'PDF',
    dateGenerated: '2026-08-17 20:41',
    fileSize: '580 KB',
    referenceNo: 'SAP-TM-TO-948271',
    summary: 'Executed SAP TM order dispatching 120 containers via Indian Railways freight network with carrier EDI confirmation.'
  },
  {
    id: 'DOC-104',
    title: 'SmartEvac AI Rerouting Executive Report',
    category: 'AI Report',
    format: 'PDF',
    dateGenerated: '2026-08-17 20:41',
    fileSize: '890 KB',
    referenceNo: 'SMARTEVAC-EXEC-SUMMARY-8492',
    summary: 'Full executive breakdown detailing multi-agent decision audit trail, Monte Carlo risk variance, and Scope 3 carbon reduction metrics.'
  }
];
