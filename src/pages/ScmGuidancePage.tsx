import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Sliders,
  Grid,
  Layers,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  Award,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Info,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Activity,
  Globe,
  Zap,
  Users,
  Compass,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

// --- Types & Data Interfaces ---

type ActiveTab = 'positioning' | 'vulnerability' | 'riskHeatmap' | 'dynamics' | 'esfRequirements' | 'fidicEngineers';

interface PositioningItem {
  name: string;
  category: string;
  cost: 'High' | 'Low';
  risk: 'High' | 'Low';
  quadrant: 'Strategic Critical' | 'Strategic Security' | 'Tactical Advantage' | 'Tactical Acquisition';
  dueDiligence: string;
  recommendation: string;
}

interface RiskItem {
  id: string;
  category: string;
  type: string;
  description: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  mitigation: string;
  owner: string;
}

export const ScmGuidancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('positioning');

  // --- 1. Supply Positioning Matrix State ---
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('Strategic Critical');

  const positioningItems: PositioningItem[] = [
    {
      name: 'Custom Electrified Locomotives & Heavy Rakes',
      category: 'Rail Rolling Stock',
      cost: 'High',
      risk: 'High',
      quadrant: 'Strategic Critical',
      dueDiligence: 'Comprehensive supply chain mapping down to raw steel & traction motor suppliers. Rigorous prequalification and ISO 22095 CoC auditing.',
      recommendation: 'Collaborative partnership, long-term framework agreements, and mandatory FIDIC Red Book nominated subcontractor oversight.'
    },
    {
      name: 'Specialized Semiconductor GPS Tracking Sensors',
      category: 'IoT Fleet Hardware',
      cost: 'Low',
      risk: 'High',
      quadrant: 'Strategic Security',
      dueDiligence: 'Identify single-source chokepoints in microchip fabrication. Monitor global logistics and component buffers.',
      recommendation: 'Dual-sourcing strategy, maintain strategic safety stockpiles, and contractually require backup component suppliers.'
    },
    {
      name: 'Standardized ISO Container Chassis Fleets',
      category: 'Landside Transport',
      cost: 'High',
      risk: 'Low',
      quadrant: 'Tactical Advantage',
      dueDiligence: 'High-level market analysis, competitive rate benchmarking, and supplier financial stability checks.',
      recommendation: 'Leverage volume purchasing, short-term competitive bidding, and performance-based SLA discounts.'
    },
    {
      name: 'Port Gate Paperwork & Routine Ancillary Supplies',
      category: 'Operational Supplies',
      cost: 'Low',
      risk: 'Low',
      quadrant: 'Tactical Acquisition',
      dueDiligence: 'Routine compliance checks, basic supplier registration, and standard payment terms.',
      recommendation: 'Streamline e-procurement purchasing, automated reordering, and minimal administrative overhead.'
    }
  ];

  // --- 2. Vulnerability Index Calculator State ---
  const [vulnScores, setVulnScores] = useState({
    tiers: 4,           // 1: Very Few, 5: Many
    criticality: 4,     // 1: Very Low, 5: Very High
    distance: 3,        // 1: Close/Local, 5: Far Away Overseas
    relationship: 3,    // 1: Excellent/Collaborative, 5: Poor/Transactional
    visibility: 4       // 1: Full Transparency, 5: Low Visibility
  });

  const calcTotalVuln = () => {
    return vulnScores.tiers + vulnScores.criticality + vulnScores.distance + vulnScores.relationship + vulnScores.visibility;
  };

  const getVulnRating = (sum: number) => {
    if (sum >= 18) return { label: 'CRITICAL HIGH VULNERABILITY', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' };
    if (sum >= 13) return { label: 'MODERATE VULNERABILITY', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' };
    return { label: 'LOW RESILIENT VULNERABILITY', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' };
  };

  // --- 3. Risk Heatmap State ---
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string>('All');

  const riskTaxonomy: RiskItem[] = [
    {
      id: 'R01',
      category: 'Environmental & Social',
      type: 'Social / Labor',
      description: 'Breach of ESS2 labor standards or unmonitored migrant worker conditions at 2nd-tier subcontracted yards.',
      likelihood: 4,
      impact: 5,
      mitigation: 'Require Bidder E&S declarations, mandatory unannounced site visits, and chain of custody workforce audits.',
      owner: 'E&S Specialist / PIU'
    },
    {
      id: 'R02',
      category: 'Supplier Performance',
      type: 'Delivery / Capacity',
      description: 'Capacity bottleneck at WDFC rail rake maintenance facility causing 14h congestion spillover to port gates.',
      likelihood: 4,
      impact: 4,
      mitigation: 'Contractual safety buffer requirements, multi-sourcing feeder options, and daily OData telemetry tracking.',
      owner: 'Operations Lead'
    },
    {
      id: 'R03',
      category: 'Supply Market',
      type: 'Logistics / Fuel',
      description: 'Spike in maritime shipping fuel surcharges and container chassis driver shortages during peak season.',
      likelihood: 3,
      impact: 4,
      mitigation: 'Lock-in 6+ month fixed pricing agreements, index-based price adjustments, and 3PL routing flexibility.',
      owner: 'Procurement Director'
    },
    {
      id: 'R04',
      category: 'Technology',
      type: 'Cybersecurity',
      description: 'Cyberattack or API downtime on customs electronic data interchange (ICEGATE) portal.',
      likelihood: 2,
      impact: 5,
      mitigation: 'Implement redundant SAP BTP REST endpoints, offline manifest queuing, and zero-trust authentication.',
      owner: 'IT Systems Architect'
    },
    {
      id: 'R05',
      category: 'Geopolitical',
      type: 'Trade Restrictions',
      description: 'Sudden tariff adjustments or import clearance delays on raw steel components.',
      likelihood: 2,
      impact: 3,
      mitigation: 'Pre-clearance documentation verification, local vendor diversification, and legal buffer clauses.',
      owner: 'Legal Advisor'
    }
  ];

  // --- 4. Supply Chain Dynamics Simulator State ---
  const [bullwhipMultiplier, setBullwhipMultiplier] = useState<number>(2);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 font-sans animate-fadeIn">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>WORLD BANK PROCUREMENT GUIDANCE (MARCH 2023 EDITION)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
            Supply Chain Management <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Practical Risk & Toolset Executive Suite
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">
            An interactive toolset based on World Bank guidance for public sector procurement, evaluating supply positioning, supplier preferencing, vulnerability indices, risk taxonomies, and supply chain dynamics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kraljic Positioning</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5-Point Vulnerability Calculator</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ESS2 & ESS6 Compliance</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> FIDIC Red Book Oversight</span>
          </div>
        </div>
      </div>

      {/* 2. Framework Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border-color)]">
        <button
          onClick={() => setActiveTab('positioning')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'positioning'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>1. Supply Positioning Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('vulnerability')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'vulnerability'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>2. Vulnerability Evaluator</span>
        </button>

        <button
          onClick={() => setActiveTab('riskHeatmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'riskHeatmap'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>3. Risk Heatmap & Taxonomy</span>
        </button>

        <button
          onClick={() => setActiveTab('dynamics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'dynamics'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>4. Bullwhip & Ripple Dynamics</span>
        </button>

        <button
          onClick={() => setActiveTab('esfRequirements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'esfRequirements'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>5. ESF Social & Labor Standards</span>
        </button>

        <button
          onClick={() => setActiveTab('fidicEngineers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'fidicEngineers'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>6. FIDIC Red Book Governance</span>
        </button>
      </div>

      {/* --- TAB CONTENT AREA --- */}

      {/* TAB 1: SUPPLY POSITIONING MATRIX (KRALJIC) */}
      {activeTab === 'positioning' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 2x2 Matrix */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">World Bank Supply Positioning Model</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Categorize project spend by Risk/Vulnerability vs Financial Cost</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-blue-500/10 text-blue-400">Figure VI Reference</span>
              </div>

              {/* 2x2 Grid Visualizer */}
              <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl bg-[var(--bg-surface-inset)] border border-[var(--border-strong)] p-6 grid grid-cols-2 grid-rows-2 gap-4 shadow-inner">
                
                {/* Y-Axis Label */}
                <div className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider hidden sm:block">
                  Risk / Vulnerability Level →
                </div>

                {/* X-Axis Label */}
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider hidden sm:block">
                  Financial Spend / Cost →
                </div>

                {/* Top-Left: Strategic Security */}
                <button
                  onClick={() => setSelectedQuadrant('Strategic Security')}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    selectedQuadrant === 'Strategic Security'
                      ? 'bg-amber-500/15 border-amber-500/60 ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-500">HIGH RISK • LOW COST</span>
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[var(--text-primary)]">Strategic Security</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">High vulnerability, scarce specialized inputs.</p>
                  </div>
                </button>

                {/* Top-Right: Strategic Critical */}
                <button
                  onClick={() => setSelectedQuadrant('Strategic Critical')}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    selectedQuadrant === 'Strategic Critical'
                      ? 'bg-rose-500/15 border-rose-500/60 ring-2 ring-rose-500/40 shadow-lg'
                      : 'bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-500">HIGH RISK • HIGH COST</span>
                    <Zap className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[var(--text-primary)]">Strategic Critical</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">High spending, mission-critical infrastructure.</p>
                  </div>
                </button>

                {/* Bottom-Left: Tactical Acquisition */}
                <button
                  onClick={() => setSelectedQuadrant('Tactical Acquisition')}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    selectedQuadrant === 'Tactical Acquisition'
                      ? 'bg-blue-500/15 border-blue-500/60 ring-2 ring-blue-500/40 shadow-lg'
                      : 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-500">LOW RISK • LOW COST</span>
                    <Grid className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[var(--text-primary)]">Tactical Acquisition</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Routine standard supplies, low risk.</p>
                  </div>
                </button>

                {/* Bottom-Right: Tactical Advantage */}
                <button
                  onClick={() => setSelectedQuadrant('Tactical Advantage')}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    selectedQuadrant === 'Tactical Advantage'
                      ? 'bg-emerald-500/15 border-emerald-500/60 ring-2 ring-emerald-500/40 shadow-lg'
                      : 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-500">LOW RISK • HIGH COST</span>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[var(--text-primary)]">Tactical Advantage</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">High volume spend, abundant suppliers.</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Right Details Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-panel p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Quadrant: <span className="text-blue-500">{selectedQuadrant}</span>
                  </h4>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400">
                    Toolbox E & F Policy
                  </span>
                </div>

                {positioningItems
                  .filter(item => item.quadrant === selectedQuadrant)
                  .map((item, idx) => (
                    <div key={idx} className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">EXAMPLE CONTRACT ITEM</span>
                        <h5 className="text-base font-extrabold text-[var(--text-primary)]">{item.name}</h5>
                        <span className="text-xs text-blue-400 font-semibold">{item.category}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5">
                          <Sliders className="w-4 h-4" /> Required Supply Chain Due Diligence
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.dueDiligence}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-2">
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Strategic Recommendation
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.recommendation}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: VULNERABILITY EVALUATOR */}
      {activeTab === 'vulnerability' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">5-Point Supply Chain Vulnerability Index Calculator</h3>
                <p className="text-xs text-[var(--text-secondary)]">Based on World Bank Practical Toolbox H (Table VI) score matrix</p>
              </div>

              <div className={`px-4 py-2 rounded-2xl text-xs font-black border ${getVulnRating(calcTotalVuln()).color}`}>
                SCORE: {calcTotalVuln()} / 25 — {getVulnRating(calcTotalVuln()).label}
              </div>
            </div>

            {/* 5 Interactive Range Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Factor 1 */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[var(--text-primary)]">1. Number of Supply Tiers</span>
                  <span className="text-blue-400 font-mono">Score: {vulnScores.tiers} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnScores.tiers}
                  onChange={(e) => setVulnScores({ ...vulnScores, tiers: parseInt(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>1 (Very Few Tiers)</span>
                  <span>5 (Many Tiers / Complex)</span>
                </div>
              </div>

              {/* Factor 2 */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[var(--text-primary)]">2. Average Tier Criticality</span>
                  <span className="text-blue-400 font-mono">Score: {vulnScores.criticality} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnScores.criticality}
                  onChange={(e) => setVulnScores({ ...vulnScores, criticality: parseInt(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>1 (Very Low Impact)</span>
                  <span>5 (Very High Criticality)</span>
                </div>
              </div>

              {/* Factor 3 */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[var(--text-primary)]">3. Geographic Distance</span>
                  <span className="text-blue-400 font-mono">Score: {vulnScores.distance} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnScores.distance}
                  onChange={(e) => setVulnScores({ ...vulnScores, distance: parseInt(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>1 (Local / Domestic)</span>
                  <span>5 (Far Away Overseas)</span>
                </div>
              </div>

              {/* Factor 4 */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[var(--text-primary)]">4. Supplier Relationship Quality</span>
                  <span className="text-blue-400 font-mono">Score: {vulnScores.relationship} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnScores.relationship}
                  onChange={(e) => setVulnScores({ ...vulnScores, relationship: parseInt(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>1 (Excellent Partnership)</span>
                  <span>5 (Poor / Transactional)</span>
                </div>
              </div>

              {/* Factor 5 */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3 md:col-span-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[var(--text-primary)]">5. Information & Visibility Transparency</span>
                  <span className="text-blue-400 font-mono">Score: {vulnScores.visibility} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnScores.visibility}
                  onChange={(e) => setVulnScores({ ...vulnScores, visibility: parseInt(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>1 (Full Transparency & Audits)</span>
                  <span>5 (Low Visibility / Blindspot)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 3: RISK HEATMAP & TAXONOMY */}
      {activeTab === 'riskHeatmap' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">7-Category Risk Taxonomy & Heatmap</h3>
                <p className="text-xs text-[var(--text-secondary)]">Based on World Bank Table VII Risk Categories & Likelihood vs Impact Matrix</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] font-semibold">Filter:</span>
                <select
                  value={selectedRiskCategory}
                  onChange={(e) => setSelectedRiskCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)]"
                >
                  <option value="All">All Risk Categories</option>
                  <option value="Environmental & Social">Environmental & Social</option>
                  <option value="Supplier Performance">Supplier Performance</option>
                  <option value="Supply Market">Supply Market</option>
                  <option value="Technology">Technology</option>
                  <option value="Geopolitical">Geopolitical</option>
                </select>
              </div>
            </div>

            {/* Risk Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase font-mono text-[10px]">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Risk Description</th>
                    <th className="py-3 px-4 text-center">Likelihood</th>
                    <th className="py-3 px-4 text-center">Impact</th>
                    <th className="py-3 px-4">Mitigation Strategy</th>
                    <th className="py-3 px-4">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {riskTaxonomy
                    .filter(r => selectedRiskCategory === 'All' || r.category === selectedRiskCategory)
                    .map((risk) => (
                      <tr key={risk.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-blue-400">{risk.id}</td>
                        <td className="py-3 px-4 font-bold text-[var(--text-primary)]">{risk.category}</td>
                        <td className="py-3 px-4 max-w-xs text-[var(--text-secondary)]">{risk.description}</td>
                        <td className="py-3 px-4 text-center font-bold text-amber-500">{risk.likelihood} / 5</td>
                        <td className="py-3 px-4 text-center font-bold text-rose-500">{risk.impact} / 5</td>
                        <td className="py-3 px-4 text-[var(--text-secondary)] font-medium max-w-xs">{risk.mitigation}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-400">{risk.owner}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: BULLWHIP & RIPPLE DYNAMICS */}
      {activeTab === 'dynamics' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Supply Chain Dynamics Simulator</h3>
                <p className="text-xs text-[var(--text-secondary)]">Simulating the Bullwhip Effect (demand volatility) & Ripple Effect (disruption propagation)</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[var(--text-muted)]">Demand Spike Multiplier:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={bullwhipMultiplier}
                  onChange={(e) => setBullwhipMultiplier(parseInt(e.target.value))}
                  className="accent-blue-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-extrabold text-blue-400">{bullwhipMultiplier}x Demand Surge</span>
              </div>
            </div>

            {/* Bullwhip Animation Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Tier 1: Borrower */}
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3 text-center">
                <span className="text-[10px] font-bold text-blue-400 uppercase font-mono">TIER 0 • BORROWER / PORT</span>
                <div className="text-2xl font-black text-[var(--text-primary)]">100 TEU</div>
                <p className="text-[11px] text-[var(--text-secondary)]">Baseline port dispatch demand requirement.</p>
              </div>

              {/* Tier 2: Main Contractor */}
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3 text-center">
                <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono">TIER 1 • MAIN CONTRACTOR</span>
                <div className="text-2xl font-black text-indigo-400">{100 * bullwhipMultiplier} TEU</div>
                <p className="text-[11px] text-[var(--text-secondary)]">Order safety margin buffer added.</p>
              </div>

              {/* Tier 3: 2nd Tier Supplier */}
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3 text-center">
                <span className="text-[10px] font-bold text-purple-400 uppercase font-mono">TIER 2 • SUBCONTRACTOR</span>
                <div className="text-2xl font-black text-purple-400">{100 * Math.pow(bullwhipMultiplier, 1.5)} TEU</div>
                <p className="text-[11px] text-[var(--text-secondary)]">Exaggerated ordering due to lack of visibility.</p>
              </div>

              {/* Tier 4: Raw Material Supplier */}
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-rose-500/30 space-y-3 text-center bg-rose-500/5">
                <span className="text-[10px] font-bold text-rose-500 uppercase font-mono">TIER 3 • RAW MATERIAL MANUFACTURER</span>
                <div className="text-2xl font-black text-rose-500">{Math.round(100 * Math.pow(bullwhipMultiplier, 2.1))} TEU</div>
                <p className="text-[11px] text-[var(--text-secondary)]">Severe bullwhip distortion & stockout crisis!</p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 5: ESF SOCIAL & LABOR STANDARDS */}
      {activeTab === 'esfRequirements' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--border-color)] pb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">World Bank ESF (Environmental & Social Framework) Standards</h3>
              <p className="text-xs text-[var(--text-secondary)]">ESS2 (Labor & Working Conditions) & ESS6 (Biodiversity & Resource Management)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-blue-500" />
                  <span>ESS2: Child Labor, Forced Labor & Worker Safety</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Borrowers must require primary suppliers to sign declarations confirming zero child/forced labor breaches in the last 5 years and enforce strict subcontracting labor audits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Globe className="w-5 h-5 text-emerald-500" />
                  <span>ESS6: Sustainable Commodity Sourcing</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Verifies that raw materials (timber, steel, gravel) originate from certified sustainable sources without causing critical habitat conversion.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FIDIC RED BOOK GOVERNANCE */}
      {activeTab === 'fidicEngineers' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--border-color)] pb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">FIDIC Red Book (2017) Supervising Engineer Oversight</h3>
              <p className="text-xs text-[var(--text-secondary)]">Clause 5.2 (Nominated Subcontractors) & Mobilization Performance Plan</p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <h4 className="text-sm font-bold text-blue-400">Supervising Engineer Responsibilities</h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li className="flex items-start gap-2">✓ Oversee main contractor resource mobilization & subcontracting approvals.</li>
                <li className="flex items-start gap-2">✓ Administer Contract Management Plan (CMP) and monitor SEA/SH safeguards.</li>
                <li className="flex items-start gap-2">✓ Evaluate supply chain due diligence reports & audit compliance metrics.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ScmGuidancePage;
