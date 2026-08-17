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
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8 pb-24 lg:pb-8">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wide shadow-glow-cyan"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SAP BTP MULTI-AGENT LOGISTICS PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
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
            className="text-sm sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered logistics disruption detection and intelligent route optimization.
          </motion.p>

          {/* Full-width touch CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-md mx-auto sm:max-w-none"
          >
            <button
              onClick={() => navigate('/operations')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-sm sm:text-base transition-all shadow-glow-cyan active:scale-95 min-h-[48px]"
            >
              <span>🚀 Launch Command Center</span>
            </button>

            <button
              onClick={() => navigate('/agents')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-sm sm:text-base transition-all active:scale-95 min-h-[48px]"
            >
              <span>Explore AI Agents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

      </section>

      {/* 2. Compact Mobile Hero Visual */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-cyan-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-black shadow-card">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>JNPA PORT → AI → DELHI NCR</span>
            </div>
            <span className="text-slate-400">WDFC RAIL LINK</span>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* JNPA */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-cyan-500/40 text-center w-full sm:w-44">
              <div className="text-xl mb-1">🚢</div>
              <div className="text-xs font-extrabold text-white">JNPA PORT</div>
              <div className="text-[10px] font-mono text-cyan-400">Navi Mumbai</div>
            </div>

            {/* AI Signal Pipeline */}
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
              <div className="w-full bg-slate-950 p-2.5 rounded-xl border border-emerald-400 flex items-center justify-between text-[11px] font-mono shadow-glow-emerald">
                <span className="text-emerald-400 font-bold">🚆 WDFC Rail</span>
                <span className="text-emerald-300 font-extrabold">31h ETA (Optimal)</span>
              </div>
            </div>

            {/* Delhi NCR */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-blue-500/40 text-center w-full sm:w-44">
              <div className="text-xl mb-1">🏭</div>
              <div className="text-xs font-extrabold text-white">ICD DADRI</div>
              <div className="text-[10px] font-mono text-blue-400">Delhi NCR</div>
            </div>

          </div>

          {/* Small Floating Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-3 border-t border-white/10">
            <div className="bg-slate-950 p-2 rounded-lg border border-rose-500/40 text-rose-400 font-bold">
              82% CONGESTION
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-cyan-500/40 text-cyan-400 font-bold">
              94% AI CONFIDENCE
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-emerald-500/40 text-emerald-400 font-bold">
              3 ROUTES
            </div>
          </div>

        </div>

      </section>

      {/* 3. Mobile Swipeable Feature Cards Carousel */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">SYSTEM CAPABILITIES</h2>
            <p className="text-xs text-slate-400">Swipe to explore core platform modules</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 md:hidden">Swipe Left →</span>
        </div>

        {/* Carousel Container */}
        <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none">
          
          {/* Card 1 */}
          <div
            onClick={() => navigate('/agents')}
            className="flex-none w-[85%] sm:w-80 md:w-auto snap-center cursor-pointer glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 space-y-4 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                5 AI AGENTS
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">AI Agents</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                5 specialized AI agents working together autonomously to monitor, analyze, decide, and file documents.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-cyan-400 gap-1.5 pt-1">
              <span>Explore Agents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('/operations')}
            className="flex-none w-[85%] sm:w-80 md:w-auto snap-center cursor-pointer glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 space-y-4 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/30 active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
                TELEMETRY
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">Live Operations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monitor shipments and disruptions in real time from a high-density command center interface.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-blue-400 gap-1.5 pt-1">
              <span>Open Operations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('/routes')}
            className="flex-none w-[85%] sm:w-80 md:w-auto snap-center cursor-pointer glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 space-y-4 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                PATHWAYS
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">Route Intelligence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compare road, rail and coastal alternatives for cost, ETA, and CO₂ footprint optimization.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1.5 pt-1">
              <span>Explore Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigate('/sap')}
            className="flex-none w-[85%] sm:w-80 md:w-auto snap-center cursor-pointer glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 space-y-4 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Server className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                SAP BTP
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">SAP Integration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect intelligent decisions directly with SAP Transportation Management systems.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-indigo-400 gap-1.5 pt-1">
              <span>View SAP Layer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. Problem → Solution Stack */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 bg-slate-950">
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">THE PROBLEM VS THE SOLUTION</h2>
            <p className="text-xs text-slate-400">How SmartEvac AI transforms traditional supply chain gridlocks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-rose-950/20 p-5 rounded-2xl border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <AlertOctagon className="w-4 h-4" />
                <span>THE TRADITIONAL PROBLEM</span>
              </div>
              
              <ul className="space-y-2 font-mono text-xs text-rose-200">
                <li className="p-2 rounded bg-rose-900/30 border border-rose-800/40">🚨 PORT CONGESTION: 31% dwell spike</li>
                <li className="p-2 rounded bg-rose-900/30 border border-rose-800/40">⏳ ROAD DELAY: +8.2 hours lost on NH48</li>
                <li className="p-2 rounded bg-rose-900/30 border border-rose-800/40">💸 COST EXPOSURE: ₹18.4L demurrage risk</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE SMARTEVAC AI SOLUTION</span>
              </div>

              <ul className="space-y-2 font-mono text-xs text-emerald-200">
                <li className="p-2 rounded bg-emerald-900/30 border border-emerald-800/40">⚡ INSTANT REROUTE: 120 containers to WDFC Rail</li>
                <li className="p-2 rounded bg-emerald-900/30 border border-emerald-800/40">⏱ TIME SAVED: 7.2 hours faster arrival</li>
                <li className="p-2 rounded bg-emerald-900/30 border border-emerald-800/40">💰 COST SAVED: ₹5.4 Lakhs direct freight savings</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* 5. Mobile Live Demo CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="glass-card-accent p-8 sm:p-12 rounded-3xl border border-cyan-500/50 text-center space-y-4 bg-slate-950 shadow-glow-cyan">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE DEMO</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            SEE SMARTevac THINK.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Watch five AI agents respond to a real-time logistics disruption across JNPA Port, NH48, and WDFC Rail.
          </p>

          <button
            onClick={() => navigate('/operations?demo=true')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-base transition-all shadow-glow-cyan active:scale-95 min-h-[48px]"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>▶ RUN LIVE SIMULATION</span>
          </button>

        </div>

      </section>

    </div>
  );
};
