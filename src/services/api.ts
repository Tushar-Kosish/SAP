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

import {
  initialAgents,
  initialCorridorMetrics,
  initialDisruptionEvent,
  initialRoutes,
  initialRecommendation,
  initialSapLogs,
  initialAuditLogs,
  initialDocuments
} from './mockData';

// Simulated API latency helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class SmartEvacApiService {
  private metrics: CorridorMetrics = { ...initialCorridorMetrics };
  private disruption: DisruptionEvent = { ...initialDisruptionEvent };
  private agents: AgentStatus[] = [...initialAgents];
  private routes: RouteOption[] = [...initialRoutes];
  private recommendation: AIRecommendation = { ...initialRecommendation };
  private sapLogs: SapApiLog[] = [...initialSapLogs];
  private auditLogs: AuditLogEntry[] = [...initialAuditLogs];
  private documents: LogisticsDocument[] = [...initialDocuments];

  // Fetch Corridor Metrics
  async getMetrics(): Promise<CorridorMetrics> {
    await delay(100);
    return { ...this.metrics };
  }

  // Fetch Disruption Alert
  async getDisruption(): Promise<DisruptionEvent> {
    await delay(100);
    return { ...this.disruption };
  }

  // Fetch AI Agent Network Status
  async getAgents(): Promise<AgentStatus[]> {
    await delay(150);
    return [...this.agents];
  }

  // Fetch Alternative Route Options
  async getRoutes(): Promise<RouteOption[]> {
    await delay(150);
    return [...this.routes];
  }

  // Fetch AI Recommendation
  async getRecommendation(): Promise<AIRecommendation> {
    await delay(100);
    return { ...this.recommendation };
  }

  // Fetch SAP BTP Telemetry Logs
  async getSapLogs(): Promise<SapApiLog[]> {
    await delay(100);
    return [...this.sapLogs];
  }

  // Fetch Decision Audit Logs
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    await delay(100);
    return [...this.auditLogs];
  }

  // Fetch Generated Logistics Documents
  async getDocuments(): Promise<LogisticsDocument[]> {
    await delay(100);
    return [...this.documents];
  }

  // Add SAP Log Entry
  addSapLog(log: Omit<SapApiLog, 'id'>): SapApiLog {
    const newLog: SapApiLog = {
      ...log,
      id: `SAP-LOG-${Math.floor(1000 + Math.random() * 9000)}`
    };
    this.sapLogs = [newLog, ...this.sapLogs];
    return newLog;
  }

  // Add Audit Log Entry
  addAuditLog(log: Omit<AuditLogEntry, 'id'>): AuditLogEntry {
    const newLog: AuditLogEntry = {
      ...log,
      id: `AUDIT-${Math.floor(100 + Math.random() * 900)}`
    };
    this.auditLogs = [newLog, ...this.auditLogs];
    return newLog;
  }

  // Approve Reroute Decision
  async approveReroute(): Promise<{ success: boolean; message: string; sapOrderRef: string }> {
    await delay(400);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    // Create SAP Dispatch Log
    this.addSapLog({
      timestamp: timeStr,
      method: 'POST',
      endpoint: '/sap/opu/odata/sap/TRANSPORTATION_ORDER_SRV/BookingSet',
      status: 201,
      statusText: 'Created',
      payloadSnippet: '{"ShipmentID":"870192","NewRoute":"WDFC_RAIL","Containers":120,"Status":"EXECUTED"}',
      responseSnippet: '{"d":{"TransportationOrderID":"TO-948271","Status":"CONFIRMED","ETA":"31 Hours"}}',
      system: 'SAP TM'
    });

    // Add Audit Log
    this.addAuditLog({
      timestamp: timeStr,
      agentId: 'documentation',
      agentName: 'Documentation Agent',
      action: 'Human Authorization Received & Executed',
      severity: 'SUCCESS',
      details: '120 TEU containers successfully rerouted to WDFC Rail. SAP TM order TO-948271 issued.',
      transactionRef: 'SAP-TM-TO-948271'
    });

    // Update metrics to reflect resolved delay
    this.metrics = {
      ...this.metrics,
      currentDisruptions: 2,
      averageDelayHours: 2.1,
      costExposureLakhs: 13.0,
      co2ExposureTons: 6.4,
    };

    return {
      success: true,
      message: '120 containers reassigned to WDFC Rail. SAP TM execution request initiated.',
      sapOrderRef: 'SAP-TM-TO-948271'
    };
  }
}

export const apiService = new SmartEvacApiService();
