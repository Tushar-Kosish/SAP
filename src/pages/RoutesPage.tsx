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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>MULTI-MODAL PATHWAY EVALUATOR</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Route Corridor Intelligence
        </h1>

        <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
          SmartEvac evaluates all available highway, railway, and maritime corridors across India to identify the optimal intermodal rerouting pathway.
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
        <div className="glass-panel p-6 border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">HIGHWAY NH48</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold">HIGH RISK</span>
          </div>
          <h3 className="text-lg font-black text-[var(--text-primary)]">Trucking Corridor</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
            JNPA → Surat → Vadodara → Jaipur → Delhi NCR. Subject to high toll plaza congestion (+8.2h delay) and high diesel carbon intensity.
          </p>
          <div className="text-xs text-rose-600 dark:text-rose-400 font-extrabold pt-2">
            ETA: 38 Hours | Cost: ₹42,000 / TEU
          </div>
        </div>

        {/* Rail */}
        <div className="glass-panel p-6 border-2 border-emerald-500 space-y-3 bg-emerald-500/5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">WDFC RAILWAY</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">★ AI RECOMMENDED</span>
          </div>
          <h3 className="text-lg font-black text-[var(--text-primary)]">Dedicated Freight Rail</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
            JNPA → Vadodara Hub → Palanpur → Rewari → ICD Dadri. Electrified heavy-haul rail bypassing road congestion with guaranteed 31h transit time.
          </p>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold pt-2">
            ETA: 31 Hours | Cost: ₹37,500 / TEU
          </div>
        </div>

        {/* Coastal */}
        <div className="glass-panel p-6 border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">COASTAL FEEDER</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold">MEDIUM RISK</span>
          </div>
          <h3 className="text-lg font-black text-[var(--text-primary)]">Maritime + Rail</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
            JNPA → Pipavav Port → Northern Rail → ICD Dadri. Lowest monetary cost and carbon emissions, suited for non-urgent bulk container flows.
          </p>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-extrabold pt-2">
            ETA: 54 Hours | Cost: ₹29,000 / TEU
          </div>
        </div>

      </div>

    </div>
  );
};
