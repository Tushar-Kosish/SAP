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
    <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-panel">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            REAL-TIME TELEMETRY FEED
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            LIVE LOGISTICS COMMAND CENTER
          </h2>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
          <Navigation className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Corridor:</span>
          <span className="font-bold text-white">JNPA (Mumbai) → Delhi NCR</span>
        </div>
      </div>

      {/* 6 Key Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Card 1: Containers in Transit */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono">Containers</span>
            <Package className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {containers.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">TEU in Corridor</div>
        </div>

        {/* Card 2: Active Shipments */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono">Shipments</span>
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {shipments}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Active Convoys</div>
        </div>

        {/* Card 3: Current Disruptions */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-amber-900/50 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[11px] font-mono font-semibold">Disruptions</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-300 font-mono">
            {metrics.currentDisruptions}
          </div>
          <div className="text-[10px] text-amber-400/80 font-mono">1 Critical Alert</div>
        </div>

        {/* Card 4: Average Delay */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-rose-900/50 space-y-1">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[11px] font-mono font-semibold">Avg Delay</span>
            <Clock className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-300 font-mono">
            +{metrics.averageDelayHours} hrs
          </div>
          <div className="text-[10px] text-rose-400/80 font-mono">NH48 Toll Bottleneck</div>
        </div>

        {/* Card 5: Cost Exposure */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono">Cost Exposure</span>
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            ₹{cost}L
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Demurrage Risk</div>
        </div>

        {/* Card 6: CO₂ Exposure */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono">CO₂ Footprint</span>
            <Leaf className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {metrics.co2ExposureTons} t
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Corridor Emission</div>
        </div>

      </div>

    </div>
  );
};
