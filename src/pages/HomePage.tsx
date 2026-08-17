import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  Play,
  Cpu,
  Activity,
  MapPin,
  Server,
  AlertOctagon,
  ShieldCheck,
  TrendingDown,
  Clock,
  Sparkles,
  CheckCircle2,
  GitBranch
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 py-8">
      
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-4">
        
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wide shadow-glow-cyan"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>SAP BTP POWERED MULTI-AGENT LOGISTICS PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
          >
            SMART LOGISTICS.<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              AUTONOMOUS DECISIONS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed"
          >
            Multi-agent AI that detects logistics disruptions, evaluates alternative transportation pathways and recommends the optimal response in real time.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/operations')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-base transition-all shadow-glow-cyan hover:scale-[1.03]"
            >
              <span>🚀 Launch Command Center</span>
            </button>

            <button
              onClick={() => navigate('/agents')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-base transition-all hover:border-cyan-400"
            >
              <span>Explore AI Agents</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

        </div>

      </section>

      {/* 2. Hero Visual: Interactive Futuristic Logistics Corridor Animation */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black shadow-card">
          
          {/* Top Visual Label */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>LIVE GIS CORRIDOR MONITOR: JNPA PORT → DELHI NCR</span>
            </div>
            <span className="text-slate-400 hidden sm:block">WDFC ELECTRIFIED RAILWAY LINK</span>
          </div>

          {/* SVG Map Pathway Diagram */}
          <div className="relative py-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            
            {/* JNPA Port Node */}
            <div className="relative group bg-slate-900/90 p-5 rounded-2xl border border-cyan-500/40 text-center w-full md:w-56 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400 mx-auto flex items-center justify-center text-cyan-400 mb-3 shadow-glow-cyan">
                🚢
              </div>
              <div className="text-sm font-extrabold text-white">JNPA PORT</div>
              <div className="text-xs font-mono text-cyan-300">Navi Mumbai, MH</div>
              <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                Origin: 1,248 TEU
              </div>
            </div>

            {/* Connecting Pathways Lines with Animated Signals */}
            <div className="flex-1 w-full space-y-3 relative">
              
              {/* Route A: Road NH48 (Red) */}
              <div className="relative bg-slate-950/80 p-3 rounded-xl border border-rose-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-rose-400">
                  <span>🚚</span>
                  <span className="font-bold">NH48 Highway</span>
                </div>
                <span className="text-rose-300 font-bold">38h (+8.2h Delay)</span>
              </div>

              {/* Route B: Rail WDFC (Green - Optimal) */}
              <div className="relative bg-slate-950 p-3.5 rounded-xl border-2 border-emerald-400 flex items-center justify-between text-xs font-mono shadow-glow-emerald">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>🚆</span>
                  <span>WDFC Electric Rail (AI RECOMMENDED)</span>
                </div>
                <span className="text-emerald-300 font-extrabold">31h (Guaranteed)</span>
              </div>

              {/* Route C: Coastal Feed (Blue) */}
              <div className="relative bg-slate-950/80 p-3 rounded-xl border border-blue-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-blue-400">
                  <span>⚓</span>
                  <span>Pipavav Coastal Link</span>
                </div>
                <span className="text-blue-300">54h (Lowest Cost)</span>
              </div>

            </div>

            {/* Delhi NCR Node */}
            <div className="relative group bg-slate-900/90 p-5 rounded-2xl border border-blue-500/40 text-center w-full md:w-56 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-400 mx-auto flex items-center justify-center text-blue-400 mb-3 shadow-glow-blue">
                🏭
              </div>
              <div className="text-sm font-extrabold text-white">ICD DADRI</div>
              <div className="text-xs font-mono text-blue-300">Delhi NCR Terminal</div>
              <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                Destination Node
              </div>
            </div>

          </div>

          {/* Floating Data Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="bg-slate-950/90 p-3 rounded-xl border border-rose-500/40 text-center">
              <div className="text-[10px] font-mono text-slate-400">DISRUPTION STATUS</div>
              <div className="text-lg font-extrabold text-rose-400 font-mono">CONGESTION 82%</div>
            </div>

            <div className="bg-slate-950/90 p-3 rounded-xl border border-amber-500/40 text-center">
              <div className="text-[10px] font-mono text-slate-400">EXPECTED DELAY</div>
              <div className="text-lg font-extrabold text-amber-300 font-mono">ETA +8.2 HRS</div>
            </div>

            <div className="bg-slate-950/90 p-3 rounded-xl border border-cyan-500/40 text-center">
              <div className="text-[10px] font-mono text-slate-400">SYSTEM CONFIDENCE</div>
              <div className="text-lg font-extrabold text-cyan-400 font-mono">AI CONFIDENCE 94%</div>
            </div>

            <div className="bg-slate-950/90 p-3 rounded-xl border border-emerald-500/40 text-center">
              <div className="text-[10px] font-mono text-slate-400">CORRIDOR EVALUATION</div>
              <div className="text-lg font-extrabold text-emerald-400 font-mono">3 ROUTES TESTED</div>
            </div>
          </div>

        </div>

      </section>

      {/* 3. Homepage Feature Cards (4 Large Cards with Hover Effects) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">SYSTEM CAPABILITIES</h2>
          <p className="text-sm text-slate-400">Explore the four pillars of SmartEvac AI platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: AI AGENTS */}
          <div
            onClick={() => navigate('/agents')}
            className="group cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow-cyan space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
                5 MICRO-AGENTS
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                AI AGENTS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                5 specialized AI agents working together autonomously to monitor, analyze, assess impact, decide, and file documents.
              </p>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-cyan-400 gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore Agents</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: LIVE OPERATIONS */}
          <div
            onClick={() => navigate('/operations')}
            className="group cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow-blue space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/30"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-950 border border-blue-800">
                REAL-TIME TELEMETRY
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                LIVE OPERATIONS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Monitor active container shipments, gate queue bottlenecks, and port congestion in real time from a high-density command center.
              </p>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-blue-400 gap-2 group-hover:translate-x-1 transition-transform">
              <span>Open Operations</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: ROUTE INTELLIGENCE */}
          <div
            onClick={() => navigate('/routes')}
            className="group cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow-emerald space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
                MULTI-MODAL SOLVER
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                ROUTE INTELLIGENCE
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compare road, rail and coastal alternatives using multi-criteria solver algorithms for cost, ETA, and CO₂ footprint optimization.
              </p>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-emerald-400 gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore Routes</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: SAP INTEGRATION */}
          <div
            onClick={() => navigate('/sap')}
            className="group cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow-blue space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Server className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800">
                SAP BTP SUITE
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                SAP INTEGRATION
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect intelligent AI decision outputs directly with SAP Transportation Management (TM) and carrier dispatch networks.
              </p>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-indigo-400 gap-2 group-hover:translate-x-1 transition-transform">
              <span>View SAP Layer</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. Problem → Solution Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 bg-gradient-to-b from-slate-950 to-slate-900">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white">THE PROBLEM VS THE SOLUTION</h2>
            <p className="text-sm text-slate-400">How SmartEvac AI transforms traditional supply chain gridlocks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: THE PROBLEM */}
            <div className="bg-rose-950/20 p-6 rounded-2xl border border-rose-500/30 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <AlertOctagon className="w-4 h-4" />
                <span>THE TRADITIONAL PROBLEM</span>
              </div>
              
              <ul className="space-y-3 font-mono text-xs text-rose-200">
                <li className="flex items-center gap-2 p-2.5 rounded bg-rose-900/30 border border-rose-800/40">
                  <span>🚨 PORT CONGESTION:</span> 31% dwell time spikes at JNPA gate
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-rose-900/30 border border-rose-800/40">
                  <span>⏳ ROAD DELAY:</span> +8.2 hours lost in NH48 highway toll queues
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-rose-900/30 border border-rose-800/40">
                  <span>💸 COST EXPOSURE:</span> ₹18.4 Lakhs demurrage & SLA risk exposure
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-rose-900/30 border border-rose-800/40">
                  <span>🌿 CARBON SPIKE:</span> High diesel carbon emissions from idling trucks
                </li>
              </ul>
            </div>

            {/* Right: THE SMARTEVAC SOLUTION */}
            <div className="bg-emerald-950/20 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE SMARTEVAC AI SOLUTION</span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center font-mono text-[10px]">
                <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-300 font-bold">1. Detect</div>
                <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-300 font-bold">2. Analyze</div>
                <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-300 font-bold">3. Decide</div>
                <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-300 font-bold">4. Approve</div>
                <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-300 font-bold">5. Execute</div>
              </div>

              <ul className="space-y-3 font-mono text-xs text-emerald-200">
                <li className="flex items-center gap-2 p-2.5 rounded bg-emerald-900/30 border border-emerald-800/40">
                  <span>⚡ INSTANT REROUTE:</span> 120 containers shifted to WDFC Electric Rail
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-emerald-900/30 border border-emerald-800/40">
                  <span>⏱ TIME SAVED:</span> 7.2 hours faster arrival at ICD Dadri
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-emerald-900/30 border border-emerald-800/40">
                  <span>💰 COST SAVED:</span> ₹5.4 Lakhs direct freight savings
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded bg-emerald-900/30 border border-emerald-800/40">
                  <span>🌱 CARBON DROP:</span> 50% carbon reduction via electrified rail
                </li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* 5. Live Demo CTA Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="glass-card-accent p-10 sm:p-14 rounded-3xl border border-cyan-500/50 text-center space-y-6 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 shadow-glow-cyan">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE MULTI-AGENT DEMONSTRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SEE SMARTevac THINK.
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Watch five AI agents respond to a real-time logistics disruption across JNPA Port, NH48, and WDFC Rail.
          </p>

          <button
            onClick={() => navigate('/operations?demo=true')}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-lg transition-all shadow-glow-cyan hover:scale-[1.04]"
          >
            <Play className="w-6 h-6 fill-black" />
            <span>▶ RUN LIVE SIMULATION</span>
          </button>

        </div>

      </section>

    </div>
  );
};
