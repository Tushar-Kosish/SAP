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
    <div className="space-y-5 font-sans">
      
      {/* Route Evaluation Matrix */}
      <div className="glass-panel p-6 shadow-md space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
            Corridor Evaluation Matrix
          </h3>
          <span className="text-xs font-semibold text-[var(--text-muted)]">120 TEU Batch Evaluation</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                <th className="py-3 px-3">Route Pathway</th>
                <th className="py-3 px-3 text-right">ETA</th>
                <th className="py-3 px-3 text-right">Cost / TEU</th>
                <th className="py-3 px-3 text-right">CO₂ Emission</th>
                <th className="py-3 px-3 text-center">Risk Level</th>
                <th className="py-3 px-3 text-right">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {routes.map((route) => {
                const isSelected = selectedRouteId === route.id;
                const isRecommended = route.isRecommended;

                return (
                  <tr
                    key={route.id}
                    onClick={() => onSelectRoute(route.id)}
                    className={`cursor-pointer transition-colors ${
                      isRecommended
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/15'
                        : isSelected
                        ? 'bg-[var(--bg-surface-hover)]'
                        : 'hover:bg-[var(--bg-surface-hover)]'
                    }`}
                  >
                    {/* Route Name */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></span>
                        <div>
                          <span className="font-bold text-[var(--text-primary)] text-xs block">
                            {route.name}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] font-medium">
                            {route.mode}
                          </span>
                        </div>
                        {isRecommended && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 uppercase">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-3.5 px-3 text-right font-extrabold text-[var(--text-primary)]">
                      {route.etaHours}h
                    </td>

                    {/* Cost */}
                    <td className="py-3.5 px-3 text-right font-extrabold text-[var(--text-primary)]">
                      ₹{route.costPerContainer.toLocaleString()}
                    </td>

                    {/* CO2 */}
                    <td className="py-3.5 px-3 text-right text-[var(--text-secondary)] font-medium">
                      {route.co2PerContainerTons}t
                    </td>

                    {/* Risk Level */}
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          route.riskLevel === 'High'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : route.riskLevel === 'Low'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {route.riskLevel}
                      </span>
                    </td>

                    {/* AI Score */}
                    <td className="py-3.5 px-3 text-right font-black text-sm text-[var(--text-primary)]">
                      {route.aiScore} <span className="text-[10px] text-[var(--text-muted)] font-normal">/100</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Prominent AI Recommendation Card */}
      <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4 shadow-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                RECOMMENDED STRATEGY
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Switch to WDFC Rail Route
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[var(--bg-surface)] px-4 py-2 rounded-xl border border-[var(--border-color)]">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              91
            </span>
            <div className="text-left">
              <span className="text-xs text-[var(--text-muted)] block font-semibold">/ 100</span>
              <span className="text-[9px] text-[var(--text-muted)] uppercase font-bold">AI SCORE</span>
            </div>
          </div>

        </div>

        {/* Reasoning Quote Box */}
        <blockquote className="bg-[var(--bg-surface)] p-4 rounded-xl border-l-4 border-emerald-500 text-[var(--text-secondary)] text-xs font-medium leading-relaxed shadow-sm">
          "{recommendation.reasoning}"
        </blockquote>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <TrendingDown className="w-4 h-4" /> ₹5.4 Lakhs Savings
            </span>
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
              <Clock className="w-4 h-4" /> -7.2 Hrs Delay
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReasoning}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[var(--text-muted)]" />
              <span>View Rationale</span>
            </button>

            <button
              onClick={onApprove}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-md shadow-emerald-500/25 active:scale-95"
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
