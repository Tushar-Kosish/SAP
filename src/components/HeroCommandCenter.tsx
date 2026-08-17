import React, { useEffect, useState } from 'react';
import {
  Package,
  Truck,
  AlertTriangle,
  Clock,
  IndianRupee,
  Leaf,
  Navigation
} from 'lucide-react';
import { CorridorMetrics } from '../types';

interface HeroCommandCenterProps {
  metrics: CorridorMetrics;
}

export const HeroCommandCenter: React.FC<HeroCommandCenterProps> = ({ metrics }) => {
  // Animated counter state
  const [containers, setContainers] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1200; // 1.2s ease out animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setContainers(Math.floor(easeProgress * metrics.containersInTransit));
      setShipments(Math.floor(easeProgress * metrics.activeShipments));
      setCost(parseFloat((easeProgress * metrics.costExposureLakhs).toFixed(1)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [metrics]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            REAL-TIME TELEMETRY FEED
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            LIVE LOGISTICS COMMAND CENTER
          </h2>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-cyan-500/30">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-400">CORRIDOR:</span>
          <span className="text-sm font-bold text-white font-mono">JNPA (Mumbai) → Delhi NCR</span>
        </div>
      </div>

      {/* 6 Key Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Containers in Transit */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Containers</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {containers.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">TEU in Corridor</div>
        </div>

        {/* Card 2: Active Shipments */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Shipments</span>
            <Truck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {shipments}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Active Convoys</div>
        </div>

        {/* Card 3: Current Disruptions */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-semibold">Disruptions</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono tracking-tight">
            {metrics.currentDisruptions}
          </div>
          <div className="text-[11px] text-amber-400/80 font-mono">1 Critical Alert</div>
        </div>

        {/* Card 4: Average Delay */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-1">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-mono font-semibold">Avg Delay</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-300 font-mono tracking-tight">
            +{metrics.averageDelayHours} hrs
          </div>
          <div className="text-[11px] text-rose-400/80 font-mono">NH48 Toll Bottleneck</div>
        </div>

        {/* Card 5: Cost Exposure */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Cost Exposure</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
            ₹{cost}L
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Demurrage Risk</div>
        </div>

        {/* Card 6: CO₂ Exposure */}
        <div className="glass-panel glass-panel-hover p-4 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">CO₂ Footprint</span>
            <Leaf className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {metrics.co2ExposureTons} t
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Corridor Emission</div>
        </div>

      </div>

    </div>
  );
};
