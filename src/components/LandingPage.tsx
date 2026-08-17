import React from 'react';
import {
  Zap,
  ShieldCheck,
  TrendingDown,
  Cpu,
  MapPin,
  Server,
  ArrowRight,
  Sparkles,
  BarChart2
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onRunSimulation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
  onRunSimulation,
}) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-between p-6 lg:p-12 max-w-7xl mx-auto">
      
      {/* Top Tag & Hero Title */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wide shadow-glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>ENTERPRISE AI LOGISTICS OPERATIONS COMMAND CENTER</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          SMART LOGISTICS.<br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AUTONOMOUS DECISIONS.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
          A multi-agent AI platform for intelligent transportation monitoring, disruption detection, and real-time route optimization—integrated directly with SAP Transportation Management.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-base transition-all shadow-glow-cyan hover:scale-[1.03]"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onRunSimulation}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-base transition-all hover:border-cyan-400"
          >
            <Zap className="w-5 h-5 fill-cyan-400" />
            <span>Run 30-Sec Live Simulation</span>
          </button>
        </div>

      </div>

      {/* Feature Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Multi-Agent AI</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            5 specialized autonomous agents (Sensing, Rerouting, Impact, Decision, Documentation) working in concert.
          </p>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Route Intelligence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Live evaluation of Highway (NH48), Dedicated Freight Rail (WDFC), and Coastal shipping across India.
          </p>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">SAP BTP Integration</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Seamless REST telemetry bridging SAP Transportation Management (TM) and CONCOR booking APIs.
          </p>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Human-in-the-Loop</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI recommendations backed by instant human authorization, automated PDF filing, and full audit logs.
          </p>
        </div>

      </div>

      {/* Corridor Benchmark Banner */}
      <div className="glass-card-accent p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-cyan-500/30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">
            JNPA
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-mono">Benchmark Corridor</div>
            <div className="text-lg font-bold text-white">Jawaharlal Nehru Port Trust (JNPA) → Delhi NCR</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-xs text-slate-400 font-mono">Delay Avoidance</div>
            <div className="text-xl font-extrabold text-emerald-400">-7.2 Hours</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Cost Savings</div>
            <div className="text-xl font-extrabold text-cyan-400">₹5.4 Lakhs</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Carbon Delta</div>
            <div className="text-xl font-extrabold text-indigo-400">-50% CO₂</div>
          </div>
        </div>
      </div>

    </div>
  );
};
