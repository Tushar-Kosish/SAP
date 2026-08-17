import React, { useState, useEffect } from 'react';
import { RouteOption, AIRecommendation } from '../types';
import { apiService } from '../services/api';
import { RouteMap } from '../components/RouteMap';
import { RouteComparison } from '../components/RouteComparison';
import { MapPin, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoutesPage: React.FC = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<'road' | 'rail' | 'coastal'>('rail');

  useEffect(() => {
    Promise.all([apiService.getRoutes(), apiService.getRecommendation()]).then(([r, rec]) => {
      setRoutes(r);
      setRecommendation(rec);
    });
  }, []);

  if (!recommendation) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>MULTI-MODAL PATHWAY EVALUATOR</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          ROUTE INTELLIGENCE
        </h1>

        <p className="text-base text-slate-300">
          Every disruption creates a decision. SmartEvac evaluates all available highway, railway, and maritime corridors across India to identify the optimal rerouting pathway.
        </p>
      </div>

      {/* Map Section */}
      <RouteMap
        routes={routes}
        selectedRouteId={selectedRouteId}
        onSelectRoute={setSelectedRouteId}
      />

      {/* Comparison Matrix */}
      <RouteComparison
        routes={routes}
        recommendation={recommendation}
        selectedRouteId={selectedRouteId}
        onSelectRoute={setSelectedRouteId}
        onApprove={() => navigate('/operations?demo=true')}
        onOpenReasoning={() => {}}
      />

      {/* Deep-Dive Pathways Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Road */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-400">HIGHWAY NH48</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold">HIGH RISK</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">Trucking Corridor</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            JNPA → Surat → Vadodara → Jaipur → Delhi NCR. Subject to high toll plaza congestion (+8.2h delay) and high diesel carbon intensity.
          </p>
          <div className="text-xs font-mono text-rose-300 font-bold pt-2">
            ETA: 38 Hours | Cost: ₹42,000 / TEU
          </div>
        </div>

        {/* Rail */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-emerald-400 space-y-3 bg-emerald-950/20 shadow-glow-emerald">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">WDFC RAILWAY</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">★ AI RECOMMENDED</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">Dedicated Freight Rail</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            JNPA → Vadodara Hub → Palanpur → Rewari → ICD Dadri. Electrified heavy-haul rail bypassing road congestion with guaranteed 31h transit time.
          </p>
          <div className="text-xs font-mono text-emerald-300 font-bold pt-2">
            ETA: 31 Hours | Cost: ₹37,500 / TEU
          </div>
        </div>

        {/* Coastal */}
        <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-400">COASTAL FEEDER</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">MEDIUM RISK</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">Maritime + Rail</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            JNPA → Pipavav Port → Northern Rail → ICD Dadri. Lowest monetary cost and carbon emissions, suited for non-urgent bulk container flows.
          </p>
          <div className="text-xs font-mono text-blue-300 font-bold pt-2">
            ETA: 54 Hours | Cost: ₹29,000 / TEU
          </div>
        </div>

      </div>

    </div>
  );
};
