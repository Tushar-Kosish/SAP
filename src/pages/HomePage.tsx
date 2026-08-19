import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Cpu,
  Activity,
  MapPin,
  Server,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Navigation,
  FileCheck,
  Sparkles,
  TrendingUp,
  Clock,
  IndianRupee,
  Zap,
  Check,
  ChevronRight,
  RefreshCw,
  BookOpen
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [simStep, setSimStep] = useState<number | null>(null);
  const [isSimRunning, setIsSimRunning] = useState(false);

  const handleRunSimulation = () => {
    setIsSimRunning(true);
    setSimStep(0);
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimStep(step);
        if (index === steps.length - 1) {
          setIsSimRunning(false);
        }
      }, (index + 1) * 800);
    });
  };

  const agentSteps = [
    { title: 'Sensing Agent', desc: 'Detected 8.2h toll queue on NH48 highway corridor', color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Route Agent', desc: 'Identified 120 TEU capacity on WDFC Rail Corridor B', color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Impact Agent', desc: 'Calculated ₹5.4 Lakhs demurrage savings & 7.2h transit cut', color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Decision Agent', desc: 'Evaluated policy matrix — Passed 94% confidence threshold', color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Documentation Agent', desc: 'Generated SAP TM OData manifest & customs filing', color: 'text-cyan-500 bg-cyan-500/10' }
  ];

  return (
    <div className="space-y-16 py-8 pb-24 lg:pb-16 max-w-7xl mx-auto px-4 lg:px-8 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative pt-4 pb-8">
        
        {/* Soft Background Accent Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-inset)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-primary)] shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>Autonomous Multi-Agent Logistics Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Intelligent Port Evacuation.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Autonomous Decisions.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-2xl mx-auto leading-relaxed">
            Real-time multi-agent AI system that monitors landside port congestion, calculates multi-modal corridor pathways, and executes optimal rerouting directly via SAP Transportation Management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/operations')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/agents')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>Explore AI Micro-Agents</span>
            </button>
          </div>

          {/* Persona Portals Quick Launch Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <button
              onClick={() => navigate('/client')}
              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-blue-900/20 border border-indigo-500/30 hover:border-indigo-500/60 transition-all text-left group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Client Portal</span>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-extrabold text-[var(--text-primary)] mt-1">Cargo Transparency</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Track containers, ETAs, carbon savings & approvals</div>
            </button>

            <button
              onClick={() => navigate('/supplier')}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-left group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Supplier Portal</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-extrabold text-[var(--text-primary)] mt-1">Fleet & Dispatch</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Manage rakes, AI dispatch orders & SLA payouts</div>
            </button>

            <button
              onClick={() => navigate('/scm-guidance')}
              className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-blue-500/40 hover:border-blue-500/70 transition-all text-left group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">World Bank SCM</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-extrabold text-[var(--text-primary)] mt-1">Risk & Toolset Suite</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Supply positioning, vulnerability & ESF standards</div>
            </button>

            <button
              onClick={() => navigate('/admin')}
              className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 to-amber-900/20 border border-purple-500/30 hover:border-purple-500/60 transition-all text-left group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">Admin Center</span>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-extrabold text-[var(--text-primary)] mt-1">System Governance</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Role policies, emergency overrides & telemetry</div>
            </button>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">ACTIVE CORRIDOR</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">JNPA → Delhi NCR</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">DECISION SPEED</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1.2 Seconds</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">AVG TEU SAVINGS</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">₹4,500 / Container</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">SAP GATEWAY</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">OData REST v2</span>
            </div>
          </div>

        </div>

      </section>


      {/* 2. Interactive Telemetry Monitor Widget */}
      <section>
        <div className="glass-panel p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span>LIVE CORRIDOR MONITOR</span>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                JNPA Port Terminal → ICD Dadri Freight Corridor
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-[var(--text-secondary)]">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>WDFC Dedicated Freight Railway Active</span>
            </div>
          </div>

          {/* Interactive Corridor Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Origin Node */}
            <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2 text-center md:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">ORIGIN NODE</div>
              <div className="text-lg font-extrabold text-[var(--text-primary)]">JNPA Port Terminal</div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">1,248 TEU In Transit</div>
            </div>

            {/* AI Optimizer Connection */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 border border-blue-500/20 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>AI Reroute Active</span>
              </div>
              <div className="text-xs font-semibold text-[var(--text-secondary)]">
                WDFC Electrified Rail Bypass
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                31h ETA (-7.2h vs Highway NH48)
              </div>
            </div>

            {/* Destination Node */}
            <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2 text-center md:text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">DESTINATION NODE</div>
              <div className="text-lg font-extrabold text-[var(--text-primary)]">ICD Dadri Hub</div>
              <div className="text-xs font-semibold text-[var(--text-muted)]">Delhi NCR Freight Hub</div>
            </div>

          </div>

          {/* Metric Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center pt-2">
            <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] block">HIGHWAY CONGESTION</span>
              <span className="text-base font-extrabold text-rose-500">82 / 100 Risk</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] block">EXPECTED DELAY</span>
              <span className="text-base font-extrabold text-amber-500">+8.2 Hours</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] block">SOLVER CONFIDENCE</span>
              <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">94% Optimal</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] block">TOTAL BATCH SAVINGS</span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">₹5.4 Lakhs</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core System Modules Showcase */}
      <section className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Core System Modules</h2>
            <p className="text-xs text-[var(--text-secondary)]">Explore the autonomous micro-agents and integration layers powering SmartEvac AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Module Card 1 */}
          <div
            onClick={() => navigate('/agents')}
            className="glass-panel glass-panel-hover p-6 cursor-pointer space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                5 Micro-Agents Active
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">AI Agent Network</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Autonomous solver network comprising Sensing, Route Optimization, Financial Risk, Decision Policy, and SAP Documentation micro-agents.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 gap-1 pt-1 group-hover:translate-x-1 transition-transform">
              <span>View Agent Workflows</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Module Card 2 */}
          <div
            onClick={() => navigate('/operations')}
            className="glass-panel glass-panel-hover p-6 cursor-pointer space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Real-Time Telemetry
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Live Operations Center</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Executive dashboard tracking port terminal dwell, gate queues, highway toll bottlenecks, and active container shipments in real time.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1 pt-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Command Center</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Module Card 3 */}
          <div
            onClick={() => navigate('/routes')}
            className="glass-panel glass-panel-hover p-6 cursor-pointer space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Intermodal Corridor
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Multi-Modal Solver</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Evaluates highway (NH48), electrified rail (WDFC), and coastal feeder links based on financial cost, transit speed, and carbon footprint.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1 pt-1 group-hover:translate-x-1 transition-transform">
              <span>Evaluate Corridors</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Module Card 4 */}
          <div
            onClick={() => navigate('/sap')}
            className="glass-panel glass-panel-hover p-6 cursor-pointer space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                SAP TM OData v2
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">SAP BTP Gateway</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Seamlessly posts intelligent AI decision outputs into SAP Transportation Management (TM) REST endpoints with full audit logging.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 gap-1 pt-1 group-hover:translate-x-1 transition-transform">
              <span>Inspect SAP REST Payload</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. Problem vs Solution Comparison */}
      <section className="glass-panel p-6 sm:p-8 space-y-6">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Problem vs Solution</h2>
          <p className="text-xs text-[var(--text-secondary)]">How SmartEvac AI transforms landside port gridlocks into automated logistics efficiency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Problem Card */}
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Standard Landside Congestion</span>
            </div>
            
            <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-medium">
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>JNPA Gate Dwell:</strong> Unplanned 31% surge in container dwell hours.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Highway Bottleneck:</strong> +8.2 hours lost per truck at NH48 toll plazas.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Demurrage Penalties:</strong> Up to ₹18.4 Lakhs cost risk per batch shipment.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>SmartEvac AI Automated Rerouting</span>
            </div>

            <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-medium">
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>WDFC Rail Transfer:</strong> Automatically reallocates 120 TEU to electric rail.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Transit Acceleration:</strong> -7.2 hours faster delivery to Delhi NCR ICD.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Direct SAP Filing:</strong> Generates SAP TM manifest & customs documentation instantly.</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 5. Interactive Live Simulation Console */}
      <section className="glass-panel p-8 sm:p-10 text-center space-y-6 border-blue-500/30">
        
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
            <Zap className="w-4 h-4" />
            <span>Interactive Demonstration</span>
          </div>

          <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">
            Run Multi-Agent Solver Simulation
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Trigger the 5 micro-agents in real time to observe sensing, corridor evaluation, financial risk analysis, decision approval, and SAP manifest generation.
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleRunSimulation}
            disabled={isSimRunning}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSimRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Executing Micro-Agent Routines...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>▶ Run Autonomous Solver Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Live Step Progress Display */}
        {simStep !== null && (
          <div className="max-w-2xl mx-auto mt-6 p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-left space-y-3 animate-fadeIn">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex justify-between items-center">
              <span>SOLVER EXECUTION STEP {simStep + 1} OF 5</span>
              {simStep === 4 && <span className="text-emerald-500 font-extrabold">COMPLETED SUCCESSFULLY</span>}
            </div>

            <div className="space-y-2">
              {agentSteps.slice(0, simStep + 1).map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] animate-slideIn">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${step.color}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">{step.title}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] truncate">{step.desc}</div>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
