import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Cpu,
  Activity,
  MapPin,
  Server,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
  Navigation,
  FileCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-6 pb-24 lg:pb-12">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>ENTERPRISE LOGISTICS INTELLIGENCE PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            SMART LOGISTICS.<br />
            <span className="text-slate-400 font-bold">AUTONOMOUS DECISIONS.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Multi-agent AI platform that monitors landside port congestion, evaluates multi-modal transportation corridors, and executes optimal rerouting decisions directly via SAP Transportation Management.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => navigate('/operations')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all shadow-subtle active:scale-[0.99]"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigate('/agents')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-all active:scale-[0.99]"
            >
              <span>Explore AI Agents</span>
            </button>
          </div>

        </div>

      </section>

      {/* 2. Enterprise GIS Corridor Telemetry Monitor */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="bg-slate-900/90 rounded-xl p-5 sm:p-8 border border-slate-800 space-y-6 shadow-panel">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>CORRIDOR MONITOR: JNPA PORT → ICD DADRI (DELHI NCR)</span>
            </div>
            <span className="text-slate-400">WDFC DEDICATED FREIGHT RAILWAY</span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* JNPA */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center w-full sm:w-52 space-y-1">
              <div className="text-xs font-mono text-slate-400 uppercase">ORIGIN NODE</div>
              <div className="text-sm font-bold text-white">JNPA PORT TERMINAL</div>
              <div className="text-[11px] font-mono text-blue-400">1,248 TEU In Transit</div>
            </div>

            {/* AI Signal Pipeline */}
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
              <div className="w-full bg-slate-950 p-3 rounded-lg border border-emerald-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">Route B: WDFC Electric Rail</span>
                <span className="text-emerald-300 font-bold">31h ETA (AI Recommended)</span>
              </div>
            </div>

            {/* Delhi NCR */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center w-full sm:w-52 space-y-1">
              <div className="text-xs font-mono text-slate-400 uppercase">DESTINATION NODE</div>
              <div className="text-sm font-bold text-white">ICD DADRI TERMINAL</div>
              <div className="text-[11px] font-mono text-slate-400">Delhi NCR Freight Hub</div>
            </div>

          </div>

          {/* Benchmark Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs font-mono pt-4 border-t border-slate-800">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">NH48 CONGESTION</span>
              <span className="text-rose-400 font-bold">82 / 100</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">EXPECTED DELAY</span>
              <span className="text-amber-400 font-bold">+8.2 Hours</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">DECISION CONFIDENCE</span>
              <span className="text-cyan-400 font-bold">94%</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">SAVINGS / TEU</span>
              <span className="text-emerald-400 font-bold">₹4,500</span>
            </div>
          </div>

        </div>

      </section>

      {/* 3. System Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold text-white">SYSTEM MODULES</h2>
            <p className="text-xs text-slate-400">Core capabilities of the SmartEvac enterprise engine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1 */}
          <div
            onClick={() => navigate('/agents')}
            className="cursor-pointer bg-slate-900/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                5 MICRO-AGENTS
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">AI Agent Network</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                5 specialized micro-agents (Sensing, Rerouting, Impact, Decision, Documentation) executing asynchronous solver routines.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-blue-400 gap-1 pt-1">
              <span>View Agent Network</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('/operations')}
            className="cursor-pointer bg-slate-900/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                LIVE TELEMETRY
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Live Operations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-density operations center monitoring active container shipments, gate queues, and highway toll bottlenecks in real time.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-emerald-400 gap-1 pt-1">
              <span>Open Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('/routes')}
            className="cursor-pointer bg-slate-900/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                MULTI-MODAL SOLVER
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Route Intelligence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates highway (NH48), dedicated electrified rail (WDFC), and coastal feeder links across cost, ETA, and carbon footprint.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-cyan-400 gap-1 pt-1">
              <span>Evaluate Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigate('/sap')}
            className="cursor-pointer bg-slate-900/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                SAP BTP SUITE
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">SAP Integration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bridges intelligent AI decision outputs directly into SAP Transportation Management (TM) OData REST services.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-indigo-400 gap-1 pt-1">
              <span>Inspect SAP Layer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. Problem vs Solution Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
          
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">PROBLEM VS SOLUTION</h2>
            <p className="text-xs text-slate-400">How SmartEvac AI transforms landside port gridlocks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-950 p-5 rounded-lg border border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <AlertOctagon className="w-4 h-4" />
                <span>LANDSIDE PORT CONGESTION</span>
              </div>
              
              <ul className="space-y-2 font-mono text-xs text-slate-300">
                <li className="p-2 rounded bg-slate-900 border border-slate-800">🚨 JNPA GATE DWELL: +31% delay spike</li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">⏳ NH48 BOTTLENECK: +8.2 hours toll queue delay</li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">💸 DEMURRAGE EXPOSURE: ₹18.4 Lakhs batch risk</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>SMARTEVAC AUTOMATED REROUTING</span>
              </div>

              <ul className="space-y-2 font-mono text-xs text-slate-300">
                <li className="p-2 rounded bg-slate-900 border border-slate-800">⚡ WDFC RAIL TRANSFER: 120 TEU reassigned</li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">⏱ SLA GUARANTEE: -7.2 hours transit time reduction</li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">💰 NET COST SAVINGS: ₹5.4 Lakhs total batch savings</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* 5. Live Simulation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="bg-slate-900 p-8 sm:p-10 rounded-xl border border-slate-800 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-950 text-slate-300 text-xs font-mono font-semibold border border-slate-800">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>EXECUTIVE DEMONSTRATION MODE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            RUN LIVE MULTI-AGENT SIMULATION
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Observe the 5 AI micro-agents execute sensing, pathway calculation, financial risk assessment, decision policy, and document filing in real time.
          </p>

          <button
            onClick={() => navigate('/operations?demo=true')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all shadow-subtle active:scale-[0.99]"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>▶ Execute Live Simulation</span>
          </button>

        </div>

      </section>

    </div>
  );
};
