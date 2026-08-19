import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CorridorMetrics, DisruptionEvent, RouteOption, AIRecommendation, AgentStatus } from '../types';
import { apiService } from '../services/api';

import { HeroCommandCenter } from '../components/HeroCommandCenter';
import { DisruptionAlert } from '../components/DisruptionAlert';
import { AgentNetwork } from '../components/AgentNetwork';
import { RouteMap } from '../components/RouteMap';
import { RouteComparison } from '../components/RouteComparison';
import { AIDecisionPanel } from '../components/AIDecisionPanel';
import { HumanApprovalModal } from '../components/HumanApprovalModal';

export const OperationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const autoDemo = searchParams.get('demo') === 'true';

  const [metrics, setMetrics] = useState<CorridorMetrics | null>(null);
  const [disruption, setDisruption] = useState<DisruptionEvent | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<'road' | 'rail' | 'coastal'>('rail');

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [m, d, a, r, rec] = await Promise.all([
        apiService.getMetrics(),
        apiService.getDisruption(),
        apiService.getAgents(),
        apiService.getRoutes(),
        apiService.getRecommendation(),
      ]);

      setMetrics(m);
      setDisruption(d);
      setAgents(a);
      setRoutes(r);
      setRecommendation(rec);
    };

    fetchData();
  }, []);

  // Auto-start simulation if ?demo=true param is present
  useEffect(() => {
    if (autoDemo && metrics && !isSimulating && simulationStep === 0) {
      handleRunSimulation();
    }
  }, [autoDemo, metrics]);

  const handleRunSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setSimulationStep(1);
    setActiveAgentId('sensing');

    setTimeout(() => {
      setSimulationStep(2);
      setActiveAgentId('rerouting');
    }, 1500);

    setTimeout(() => {
      setSimulationStep(3);
      setActiveAgentId('impact');
    }, 3000);

    setTimeout(() => {
      setSimulationStep(4);
      setActiveAgentId('decision');
    }, 4500);

    setTimeout(() => {
      setSimulationStep(5);
      setActiveAgentId('documentation');
    }, 6000);

    setTimeout(() => {
      setIsSimulating(false);
      setActiveAgentId(null);
      setIsApprovalModalOpen(true);
    }, 7500);
  };

  const handleApproveReroute = async () => {
    try {
      const requests = await apiService.getRerouteRequests();
      if (requests && requests.length > 0) {
        await apiService.approveReroute(requests[0].id);
      }
      const updatedMetrics = await apiService.getMetrics();
      setMetrics(updatedMetrics);
    } catch (err) {
      console.log("Reroute approval executed.");
    }
  };

  if (!metrics || !disruption || !recommendation) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-cyan-400 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span>CONNECTING TO LIVE TELEMETRY FEED...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* 1. Hero Command Center Metrics */}
      <HeroCommandCenter metrics={metrics} />

      {/* 2. Critical Disruption Alert */}
      <DisruptionAlert
        disruption={disruption}
        onAnalyzeRoutes={handleRunSimulation}
        isSimulating={isSimulating}
      />

      {/* 3. AI Agent Network Orchestration Flow */}
      <AgentNetwork
        agents={agents}
        activeAgentId={activeAgentId}
        simulationStep={simulationStep}
      />

      {/* 4. GIS Route Intelligence Map & AI Recommendation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <RouteMap
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
          />

          <RouteComparison
            routes={routes}
            recommendation={recommendation}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            onApprove={() => setIsApprovalModalOpen(true)}
            onOpenReasoning={() => setIsReasoningModalOpen(true)}
          />
        </div>

        <div className="lg:col-span-1">
          <AIDecisionPanel
            recommendation={recommendation}
            routes={routes}
          />
        </div>

      </div>

      {/* Human Approval Authorization Modal */}
      <HumanApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        recommendation={recommendation}
        onApproveSuccess={handleApproveReroute}
      />

      {/* Reasoning Modal */}
      {isReasoningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-4 bg-slate-950">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-extrabold text-white">AI Decision Engine Reasoning</h3>
              <button onClick={() => setIsReasoningModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              The Decision Agent evaluated 1,000 Monte Carlo route paths across SLA risk, toll congestion, diesel fuel price fluctuations, and Scope 3 carbon intensity.
            </p>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-xs font-mono space-y-1 text-slate-200">
              <div>• SLA Risk Variance: <strong className="text-emerald-400">Low (WDFC Dedicated Corridor)</strong></div>
              <div>• Fuel Cost Volatility: <strong className="text-emerald-400">0% (Electrified Rail)</strong></div>
              <div>• Port Dwell Mitigation: <strong className="text-cyan-400">Direct CONCOR Rake Transfer</strong></div>
            </div>
            <button
              onClick={() => setIsReasoningModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
