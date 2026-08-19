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

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

class SmartEvacApiService {
  private token: string | null = localStorage.getItem('smartevac_token');
  private metrics: CorridorMetrics = { ...initialCorridorMetrics };
  private disruption: DisruptionEvent = { ...initialDisruptionEvent };
  private agents: AgentStatus[] = [...initialAgents];
  private routes: RouteOption[] = [...initialRoutes];
  private recommendation: AIRecommendation = { ...initialRecommendation };
  private sapLogs: SapApiLog[] = [...initialSapLogs];
  private auditLogs: AuditLogEntry[] = [...initialAuditLogs];
  private documents: LogisticsDocument[] = [...initialDocuments];

  public setAuthToken(token: string | null) {
    self_token_set: {
      this.token = token;
    }
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(errorBody.detail || `HTTP Error ${response.status}`);
    }

    return response.json();
  }

  // ==========================================
  // Real FastAPI Backend Authentication Endpoints
  // ==========================================

  async register(data: { name: string; email: string; password: string; role: string }) {
    return this.request<{ access_token: string; token_type: string; user_id: number; name: string; email: string; role: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ access_token: string; token_type: string; user_id: number; name: string; email: string; role: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request<{ message: string }>('/auth/logout', { method: 'POST' });
  }

  async getMe() {
    return this.request<{ id: number; name: string; email: string; role: string }>('/auth/me');
  }

  // ==========================================
  // Real Orders API
  // ==========================================

  async getOrders() {
    return this.request<Array<{
      id: string;
      customer_id: number;
      customer_name?: string;
      supplier_id?: number;
      supplier_name?: string;
      product: string;
      quantity: number;
      status: string;
      created_at: string;
    }>>('/orders');
  }

  async createOrder(data: { product: string; quantity: number; supplier_id?: number; destination?: string }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==========================================
  // Real Shipments API
  // ==========================================

  async getShipments() {
    return this.request<Array<{
      id: string;
      order_id: string;
      current_location: string;
      destination: string;
      current_route: string;
      estimated_delivery: string;
      status: string;
      customer_name?: string;
      supplier_name?: string;
      product?: string;
      quantity?: number;
    }>>('/shipments');
  }

  async getShipmentById(id: string) {
    return this.request<{
      id: string;
      order_id: string;
      current_location: string;
      destination: string;
      current_route: string;
      estimated_delivery: string;
      status: string;
      customer_name?: string;
      supplier_name?: string;
      product?: string;
      quantity?: number;
    }>(`/shipments/${id}`);
  }

  async updateShipmentStatus(id: string, data: { status: string; current_location?: string }) {
    return this.request(`/shipments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // ==========================================
  // Real Reroute Requests API
  // ==========================================

  async getRerouteRequests() {
    return this.request<Array<{
      id: string;
      shipment_id: string;
      reason: string;
      proposed_route: string;
      status: string;
      created_by: string;
      approved_by?: number;
      created_at: string;
      shipment_current_route?: string;
    }>>('/reroute-requests');
  }

  async getMultiModalComparison(distanceKm: number = 1200) {
    return this.request<Record<string, {
      name: string;
      mode: string;
      transit_time_hours: number;
      cost_per_teu_inr: number;
      co2_tons_per_teu: number;
      risk_level: string;
      ai_score: number;
      recommended?: boolean;
    }>>(`/multimodal-comparison?distance_km=${distanceKm}`);
  }

  async triggerReroute(data: { shipment_id: string; reason: string; proposed_route?: string; custom_prompt?: string }) {
    return this.request('/reroute-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async approveReroute(requestId: string) {
    return this.request<{ id: string; shipment_id: string; status: string; proposed_route: string }>(
      `/reroute-requests/${requestId}/approve`,
      { method: 'POST' }
    );
  }

  async rejectReroute(requestId: string) {
    return this.request<{ id: string; shipment_id: string; status: string }>(
      `/reroute-requests/${requestId}/reject`,
      { method: 'POST' }
    );
  }

  // ==========================================
  // Real Notifications API
  // ==========================================

  async getNotifications() {
    return this.request<Array<{
      id: string;
      user_id: number;
      message: string;
      type: string;
      is_read: boolean;
      created_at: string;
    }>>('/notifications');
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: 'POST' });
  }

  // ==========================================
  // WebSockets Connection
  // ==========================================

  connectWebSocket(userId: number, onMessage: (data: any) => void): WebSocket {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = API_BASE_URL.replace(/^https?:\/\//, '');
    const ws = new WebSocket(`${wsProtocol}//${wsHost}/ws/${userId}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.log("WebSocket message:", event.data);
      }
    };

    return ws;
  }

  // ==========================================
  // Demo Helper Telemetry & Documents Methods
  // ==========================================

  async getMetrics(): Promise<CorridorMetrics> {
    return { ...this.metrics };
  }

  async getDisruption(): Promise<DisruptionEvent> {
    return { ...this.disruption };
  }

  async getAgents(): Promise<AgentStatus[]> {
    return [...this.agents];
  }

  async getRoutes(): Promise<RouteOption[]> {
    return [...this.routes];
  }

  async getRecommendation(): Promise<AIRecommendation> {
    return { ...this.recommendation };
  }

  async getSapLogs(): Promise<SapApiLog[]> {
    return [...this.sapLogs];
  }

  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return [...this.auditLogs];
  }

  async getDocuments(): Promise<LogisticsDocument[]> {
    return [...this.documents];
  }
}

export const apiService = new SmartEvacApiService();
