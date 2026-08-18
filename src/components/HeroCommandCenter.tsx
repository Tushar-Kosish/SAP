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
  const [containers, setContainers] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

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
    <div className="glass-panel p-6 shadow-md transition-all space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            REAL-TIME CORRIDOR TELEMETRY
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Live Logistics Command Center
          </h2>
        </div>

        <div className="flex items-center gap-2.5 bg-[var(--bg-surface-inset)] px-4 py-2 rounded-xl border border-[var(--border-color)] text-xs font-semibold">
          <Navigation className="w-4 h-4 text-blue-500" />
          <span className="text-[var(--text-muted)]">Corridor:</span>
          <span className="font-bold text-[var(--text-primary)]">JNPA (Mumbai) → Delhi NCR</span>
        </div>
      </div>

      {/* 6 Key Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Card 1: Containers in Transit */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-[11px] font-semibold">Containers</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-[var(--text-primary)]">
            {containers.toLocaleString()}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] font-medium">TEU in Corridor</div>
        </div>

        {/* Card 2: Active Shipments */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-[11px] font-semibold">Shipments</span>
            <Truck className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-[var(--text-primary)]">
            {shipments}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] font-medium">Active Convoys</div>
        </div>

        {/* Card 3: Current Disruptions */}
        <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 space-y-1">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-[11px] font-bold">Disruptions</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {metrics.currentDisruptions}
          </div>
          <div className="text-[10px] text-amber-600/80 dark:text-amber-400/80 font-medium">1 Critical Alert</div>
        </div>

        {/* Card 4: Average Delay */}
        <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/30 space-y-1">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
            <span className="text-[11px] font-bold">Avg Delay</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
            +{metrics.averageDelayHours} hrs
          </div>
          <div className="text-[10px] text-rose-600/80 dark:text-rose-400/80 font-medium">NH48 Toll Queue</div>
        </div>

        {/* Card 5: Cost Exposure */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1 hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-[11px] font-semibold">Cost Exposure</span>
            <IndianRupee className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{cost}L
          </div>
          <div className="text-[10px] text-[var(--text-muted)] font-medium">Demurrage Risk</div>
        </div>

        {/* Card 6: CO₂ Exposure */}
        <div className="bg-[var(--bg-surface-inset)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1 hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-[11px] font-semibold">CO₂ Footprint</span>
            <Leaf className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-[var(--text-primary)]">
            {metrics.co2ExposureTons} t
          </div>
          <div className="text-[10px] text-[var(--text-muted)] font-medium">Corridor Emission</div>
        </div>

      </div>

    </div>
  );
};
