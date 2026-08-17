import React from 'react';
import {
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Clock,
  ShieldCheck,
  Sparkles
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
    <div className="space-y-5">
      
      {/* Route Evaluation Table */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-panel space-y-3">
        
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-base font-bold text-white tracking-tight">
            ROUTE EVALUATION MATRIX
          </h3>
          <span className="text-xs font-mono text-slate-400">120 TEU Batch Evaluation</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-2.5 px-3">Route Pathway</th>
                <th className="py-2.5 px-3 text-right">ETA</th>
                <th className="py-2.5 px-3 text-right">Cost / TEU</th>
                <th className="py-2.5 px-3 text-right">CO₂ Emission</th>
                <th className="py-2.5 px-3 text-center">Risk Level</th>
                <th className="py-2.5 px-3 text-right">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {routes.map((route) => {
                const isSelected = selectedRouteId === route.id;
                const isRecommended = route.isRecommended;

                return (
                  <tr
                    key={route.id}
                    onClick={() => onSelectRoute(route.id)}
                    className={`cursor-pointer transition-colors ${
                      isRecommended
                        ? 'bg-emerald-950/40 hover:bg-emerald-950/60'
                        : isSelected
                        ? 'bg-slate-800/60'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Route Name */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: route.color }}></span>
                        <div>
                          <span className="font-bold text-white font-sans text-xs block">
                            {route.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {route.mode}
                          </span>
                        </div>
                        {isRecommended && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 uppercase">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-3 px-3 text-right font-bold text-white">
                      {route.etaHours}h
                    </td>

                    {/* Cost */}
                    <td className="py-3 px-3 text-right font-bold text-white">
                      ₹{route.costPerContainer.toLocaleString()}
                    </td>

                    {/* CO2 */}
                    <td className="py-3 px-3 text-right text-slate-300">
                      {route.co2PerContainerTons}t
                    </td>

                    {/* Risk Level */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          route.riskLevel === 'High'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : route.riskLevel === 'Low'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {route.riskLevel}
                      </span>
                    </td>

                    {/* AI Score */}
                    <td className="py-3 px-3 text-right font-bold text-sm text-white">
                      {route.aiScore} <span className="text-[10px] text-slate-500 font-normal">/100</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Prominent AI Recommendation Card */}
      <div className="bg-slate-900/95 p-5 rounded-xl border border-emerald-800/80 space-y-4 shadow-panel">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                RECOMMENDED STRATEGY
              </div>
              <h3 className="text-lg font-bold text-white">
                Switch to WDFC Rail Route
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-2xl font-bold text-emerald-400 font-mono">
              91
            </span>
            <div className="text-left font-mono">
              <span className="text-xs text-slate-400 block">/ 100</span>
              <span className="text-[9px] text-slate-500 uppercase">AI SCORE</span>
            </div>
          </div>

        </div>

        {/* Reasoning Quote Box */}
        <blockquote className="bg-slate-950 p-3.5 rounded-lg border-l-2 border-emerald-400 text-slate-200 text-xs font-sans leading-relaxed">
          "{recommendation.reasoning}"
        </blockquote>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <TrendingDown className="w-3.5 h-3.5" /> ₹5.4 Lakhs Savings
            </span>
            <span className="flex items-center gap-1 text-blue-400 font-bold">
              <Clock className="w-3.5 h-3.5" /> -7.2 Hrs Delay
            </span>
          </div>

          <div className="flex items-center gap-2">
            
            <button
              onClick={onOpenReasoning}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>View Reasoning</span>
            </button>

            <button
              onClick={onApprove}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 text-white text-xs font-bold transition-all shadow-subtle active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Approve Reroute</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
