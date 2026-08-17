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
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <BrainCircuit className="w-4 h-4" />
            DECISION ENGINE GAUGES
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            AI DECISION ENGINE
          </h2>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
          Confidence: {recommendation.confidencePercent}%
        </div>
      </div>

      {/* 4 Metric Gauges Grid */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Gauge 1: Confidence */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">AI CONFIDENCE</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">
            {recommendation.confidencePercent}%
          </div>
          <div className="text-[10px] text-slate-400">Monte Carlo 1k runs</div>
        </div>

        {/* Gauge 2: Savings per Container */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">SAVINGS / TEU</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            ₹{recommendation.costSavingPerContainer.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400/80 font-mono">₹5.4L total batch</div>
        </div>

        {/* Gauge 3: Delay Reduction */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">DELAY REDUCTION</div>
          <div className="text-2xl font-extrabold text-blue-400 font-mono">
            {recommendation.delayReductionHours} hrs
          </div>
          <div className="text-[10px] text-slate-400">SLA Guaranteed</div>
        </div>

        {/* Gauge 4: CO2 Reduction */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/10 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">CO₂ REDUCTION</div>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">
            {recommendation.co2ReductionPercent}%
          </div>
          <div className="text-[10px] text-slate-400">-108t CO₂ Saved</div>
        </div>

      </div>

      {/* Cost per TEU Recharts Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold">FREIGHT COST PER CONTAINER (₹ IN THOUSANDS)</span>
          <span className="text-emerald-400 font-bold">Rail is Lowest</span>
        </div>

        <div className="h-44 w-full bg-slate-950/60 p-2 rounded-xl border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
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
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold">TRANSIT TIME (HOURS)</span>
          <span className="text-cyan-400 font-bold">31h vs 38h</span>
        </div>

        <div className="h-36 w-full bg-slate-950/60 p-2 rounded-xl border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={etaChartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
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
