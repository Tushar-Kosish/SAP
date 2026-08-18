import React from 'react';
import {
  BrainCircuit,
  TrendingUp,
  Clock,
  Leaf,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AIRecommendation, RouteOption } from '../types';

interface AIDecisionPanelProps {
  recommendation: AIRecommendation;
  routes: RouteOption[];
}

export const AIDecisionPanel: React.FC<AIDecisionPanelProps> = ({
  recommendation,
  routes,
}) => {
  // Chart Data for Cost Comparison (in Thousands INR)
  const costChartData = routes.map((r) => ({
    name: r.id.toUpperCase(),
    cost: Math.round(r.costPerContainer / 1000),
    fullName: r.name,
    color: r.color,
  }));

  // Chart Data for ETA Comparison (Hours)
  const etaChartData = routes.map((r) => ({
    name: r.id.toUpperCase(),
    eta: r.etaHours,
    color: r.color,
  }));

  return (
    <div className="glass-panel p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" />
            DECISION ENGINE GAUGES
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
            AI Decision Intelligence Engine
          </h2>
        </div>

        <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-extrabold">
          Confidence: {recommendation.confidencePercent}%
        </div>
      </div>

      {/* 4 Metric Gauges Grid */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Gauge 1: Confidence */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
          <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">AI CONFIDENCE</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {recommendation.confidencePercent}%
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">Monte Carlo 1k runs</div>
        </div>

        {/* Gauge 2: Savings per Container */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
          <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">SAVINGS / TEU</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{recommendation.costSavingPerContainer.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">₹5.4L total batch</div>
        </div>

        {/* Gauge 3: Delay Reduction */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
          <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">DELAY REDUCTION</div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {recommendation.delayReductionHours} hrs
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">SLA Guaranteed</div>
        </div>

        {/* Gauge 4: CO2 Reduction */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
          <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">CO₂ REDUCTION</div>
          <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {recommendation.co2ReductionPercent}%
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">-108t CO₂ Saved</div>
        </div>

      </div>

      {/* Cost per TEU Recharts Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-[var(--text-primary)]">FREIGHT COST PER CONTAINER (₹ IN THOUSANDS)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Rail is Lowest</span>
        </div>

        <div className="h-44 w-full bg-[var(--bg-surface-inset)] p-3 rounded-2xl border border-[var(--border-color)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="currentColor" fontSize={10} tickLine={false} className="text-[var(--text-muted)]" />
              <YAxis stroke="currentColor" fontSize={10} tickLine={false} className="text-[var(--text-muted)]" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                formatter={(value: any) => [`₹${value}k`, 'Cost per TEU']}
              />
              <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                {costChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ETA Transit Hours Recharts Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-[var(--text-primary)]">TRANSIT TIME (HOURS)</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">31h vs 38h</span>
        </div>

        <div className="h-36 w-full bg-[var(--bg-surface-inset)] p-3 rounded-2xl border border-[var(--border-color)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={etaChartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <XAxis type="number" stroke="currentColor" fontSize={10} tickLine={false} className="text-[var(--text-muted)]" />
              <YAxis dataKey="name" type="category" stroke="currentColor" fontSize={10} tickLine={false} className="text-[var(--text-muted)]" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                formatter={(value: any) => [`${value} hours`, 'Transit ETA']}
              />
              <Bar dataKey="eta" radius={[0, 6, 6, 0]}>
                {etaChartData.map((entry, index) => (
                  <Cell key={`cell-eta-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
