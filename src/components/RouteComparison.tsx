import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  IndianRupee,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { RouteOption, AIRecommendation } from '../types';

interface RouteComparisonProps {
  routes: RouteOption[];
  recommendation: AIRecommendation;
  selectedRouteId: string;
  onSelectRoute: (id: 'road' | 'rail' | 'coastal') => void;
  onApprove: () => void;
  onOpenReasoning: () => void;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({
  routes,
  recommendation,
  selectedRouteId,
  onSelectRoute,
  onApprove,
  onOpenReasoning,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Route Comparison Table Card */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>ROUTE EVALUATION MATRIX</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">120 Container Batch Evaluation</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Route Pathway</th>
                <th className="py-3 px-4 text-right">ETA</th>
                <th className="py-3 px-4 text-right">Cost / TEU</th>
                <th className="py-3 px-4 text-right">CO₂ Emission</th>
                <th className="py-3 px-4 text-center">Risk Level</th>
                <th className="py-3 px-4 text-right">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {routes.map((route) => {
                const isSelected = selectedRouteId === route.id;
                const isRecommended = route.isRecommended;

                return (
                  <tr
                    key={route.id}
                    onClick={() => onSelectRoute(route.id)}
                    className={`cursor-pointer transition-all ${
                      isRecommended
                        ? 'bg-emerald-950/30 hover:bg-emerald-950/50'
                        : isSelected
                        ? 'bg-slate-800/60'
                        : 'hover:bg-slate-900/50'
                    }`}
                  >
                    {/* Route Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></span>
                        <div>
                          <span className="font-extrabold text-white font-sans text-sm block">
                            {route.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {route.mode}
                          </span>
                        </div>
                        {isRecommended && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40">
                            ★ RECOMMENDED
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-4 px-4 text-right font-bold text-white">
                      {route.etaHours}h
                    </td>

                    {/* Cost */}
                    <td className="py-4 px-4 text-right font-bold text-white">
                      ₹{route.costPerContainer.toLocaleString()}
                    </td>

                    {/* CO2 */}
                    <td className="py-4 px-4 text-right text-slate-300">
                      {route.co2PerContainerTons}t
                    </td>

                    {/* Risk Level */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold ${
                          route.riskLevel === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : route.riskLevel === 'Low'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {route.riskLevel}
                      </span>
                    </td>

                    {/* AI Score */}
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`text-base font-extrabold ${
                          isRecommended ? 'text-emerald-400 text-lg' : 'text-slate-300'
                        }`}
                      >
                        {route.aiScore}
                      </span>
                      <span className="text-xs text-slate-500"> /100</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Prominent AI Recommendation Highlight Card */}
      <div className="glass-card-accent p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 shadow-glow-emerald space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                AI DECISION ENGINE RECOMMENDATION
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Switch to WDFC Rail Route
              </h3>
            </div>
          </div>

          {/* AI Score Badge */}
          <div className="flex items-center gap-2 bg-emerald-950/80 px-4 py-2 rounded-xl border border-emerald-500/50">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              91
            </span>
            <div className="text-left font-mono">
              <span className="text-xs text-emerald-300 font-bold block">/ 100</span>
              <span className="text-[10px] text-slate-400 uppercase">AI SCORE</span>
            </div>
          </div>

        </div>

        {/* Reasoning Quote Box */}
        <blockquote className="bg-slate-950/80 p-4 rounded-xl border-l-4 border-emerald-400 text-slate-200 text-sm font-sans italic leading-relaxed">
          "{recommendation.reasoning}"
        </blockquote>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <TrendingDown className="w-4 h-4" /> ₹5.4 Lakhs Savings
            </span>
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              <Clock className="w-4 h-4" /> -7.2 Hrs Delay
            </span>
          </div>

          <div className="flex items-center gap-3">
            
            <button
              onClick={onOpenReasoning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-bold transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>View Reasoning</span>
            </button>

            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black text-xs font-extrabold transition-all shadow-glow-emerald hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4 fill-black" />
              <span>Approve Reroute</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
