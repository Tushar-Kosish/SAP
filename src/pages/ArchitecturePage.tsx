import React, { useState } from 'react';
import { GitBranch, Cpu, Server, Database, UserCheck, Code, Sparkles, Layers, ArrowDown, ArrowRight } from 'lucide-react';

interface ArchBlock {
  id: string;
  name: string;
  category: string;
  tech: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

export const ArchitecturePage: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<ArchBlock | null>(null);

  const blocks: ArchBlock[] = [
    {
      id: 'user',
      name: 'USER INTERFACE & OPERATOR',
      category: 'Human-in-the-Loop',
      tech: 'Logistics Operations Lead / SAP TM Dispatcher',
      description: 'Provides operational oversight and manual authorization gate for autonomous AI recommendations.',
      inputs: ['Disruption Alerts', 'AI Recommendation Cards', 'Audit Log Summaries'],
      outputs: ['Human Authorization Approval', 'Route Overrides']
    },
    {
      id: 'frontend',
      name: 'SMARTEVAC FRONTEND DASHBOARD',
      category: 'Client Presentation Layer',
      tech: 'React 18, TypeScript, Tailwind CSS, Leaflet GIS, Recharts, jsPDF',
      description: 'High-density enterprise command center rendering real-time telemetry, multi-agent node status, route maps, and document generators.',
      inputs: ['REST Telemetry Feeds', 'FastAPI API Responses'],
      outputs: ['User Approvals', 'Simulation Triggers']
    },
    {
      id: 'crewai',
      name: 'PYTHON / CREWAI ORCHESTRATION',
      category: 'Agent Task Scheduler',
      tech: 'Python 3.11, Multi-Agent Framework, FastAPI / Flask',
      description: 'Multi-agent DAG framework managing sequential and parallel agent execution, state management, and tool binding.',
      inputs: ['Port Congestion Index', 'Containers Dataset'],
      outputs: ['Evaluated Pathway Options', 'Document Manifests']
    },
    {
      id: 'agents',
      name: '5 MICRO-AGENTS',
      category: 'Autonomous Intelligence Engine',
      tech: 'Sensing, Rerouting, Impact Assessment, Decision, Documentation Agents',
      description: 'Specialized autonomous micro-agents evaluating 1,000 Monte Carlo route paths across cost, delay, CO₂ emissions, and SLA compliance.',
      inputs: ['IoT Telemetry Streams', 'CONCOR Rail Tariffs'],
      outputs: ['WDFC Rail Rerouting Recommendation (91/100)']
    },
    {
      id: 'llm',
      name: 'FOUNDATION LANGUAGE MODELS',
      category: 'Foundation AI Models',
      tech: 'OpenAI GPT-4o / Google Gemini API',
      description: 'Powers natural language reasoning, multi-criteria decision synthesis, and structured JSON output schema validation.',
      inputs: ['Agent System Prompts', 'Corridor Parameters'],
      outputs: ['Structured Reasoning & Executive Summary']
    },
    {
      id: 'firebase',
      name: 'TELEMETRY & AUDIT DB',
      category: 'Persistent Telemetry Database',
      tech: 'Cloud Firestore, SQLite Local DB',
      description: 'Stores historical shipment telemetry, audit log records, agent decision logs, and document metadata.',
      inputs: ['Shipment Updates', 'Audit Records'],
      outputs: ['Historical Analytics Data']
    },
    {
      id: 'sap_btp',
      name: 'SAP BTP INTEGRATION LAYER',
      category: 'Enterprise Integration Suite',
      tech: 'SAP Business Technology Platform (BTP), REST / OData Gateway',
      description: 'Enterprise API gateway routing AI decision payloads securely to SAP Transportation Management (TM).',
      inputs: ['SmartEvac Reroute Payloads'],
      outputs: ['REST OData 201 Created Status']
    },
    {
      id: 'sap_tm',
      name: 'SAP TRANSPORTATION MANAGEMENT (TM)',
      category: 'Enterprise Core System',
      tech: 'SAP TM Freight Booking Services',
      description: 'Executes actual carrier re-assignments, CONCOR rake bookings, and freight order updates in enterprise SAP database.',
      inputs: ['Transportation Order Requests'],
      outputs: ['Confirmed Freight Order TO-948271']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
          <GitBranch className="w-4 h-4 text-blue-500" />
          <span>ENTERPRISE SYSTEM ARCHITECTURE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          System Architecture Topology
        </h1>

        <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
          Click any architecture block below to inspect its technical specification, data inputs, outputs, and framework stack.
        </p>
      </div>

      {/* A2A Agent Control Tower Protocol Section matching Architecture Diagram */}
      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-blue-500/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                A2A Protocol /1.0
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">/.well-known/agent-card.json</span>
            </div>
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] mt-1 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span>Control Tower Agent-to-Agent (A2A) Architecture</span>
            </h2>
          </div>
          <a
            href="http://127.0.0.1:8000/.well-known/agent-card.json"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View Agent Card Manifest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Visual Flow Representation matching user diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          
          {/* Box 1: USER / Control Tower Frontend */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface-inset)] border border-blue-500/30 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <UserCheck className="w-4 h-4" />
              <span>USER / Control Tower Frontend</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] font-sans">
              Interfaces operator commands to agents via dual A2A RPC channels (8081 & 8082).
            </p>
            <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between text-[10px] text-emerald-400">
                <span>A2A (8081)</span>
                <span>→ Vision Agent</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-purple-400">
                <span>A2A (8082)</span>
                <span>→ Supplier Agent</span>
              </div>
            </div>
          </div>

          {/* Box 2: AGENTS Layer */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>AGENTS LAYER</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded bg-[var(--bg-surface-inset)] border border-emerald-500/20 space-y-1">
                <div className="font-bold text-emerald-400">👁️ Vision Agent (Port 8081)</div>
                <div className="text-[10px] text-[var(--text-muted)] font-sans">Camera & satellite visual disruption sensing</div>
              </div>
              <div className="p-2 rounded bg-[var(--bg-surface-inset)] border border-emerald-500/20 space-y-1">
                <div className="font-bold text-emerald-400">🚚 Supplier Agent (Port 8082)</div>
                <div className="text-[10px] text-[var(--text-muted)] font-sans">Carrier dispatch & vector routing search</div>
              </div>
            </div>
          </div>

          {/* Box 3: CLOUD SERVICES Layer */}
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/30 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Server className="w-4 h-4" />
              <span>CLOUD SERVICES</span>
            </div>
            <div className="space-y-1.5 text-[11px] font-sans">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Gemini 3 Flash</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Vertex AI Embeddings</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>AlloyDB PostgreSQL (Port 5432)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="glass-panel p-8 shadow-lg space-y-6">
        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          END-TO-END SYSTEM PIPELINE (CLICK ANY BLOCK TO VIEW SPECIFICATIONS)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blocks.map((block, idx) => (
            <div
              key={block.id}
              onClick={() => setSelectedBlock(block)}
              className="cursor-pointer glass-panel glass-panel-hover p-5 border border-[var(--border-color)] space-y-3 relative group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  LAYER 0{idx + 1}
                </span>
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                  {block.category}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {block.name}
              </h3>

              <div className="text-[11px] font-medium text-[var(--text-muted)] truncate">
                {block.tech}
              </div>

              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 font-medium">
                {block.description}
              </p>

              <div className="pt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Specs</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Click Detail Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-[var(--border-strong)] p-6 space-y-6 bg-[var(--bg-surface)]">
            
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">{selectedBlock.category}</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{selectedBlock.name}</h3>
              </div>

              <button
                onClick={() => setSelectedBlock(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              
              <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase">TECHNOLOGY STACK:</div>
                <div className="text-[var(--text-primary)] font-bold">{selectedBlock.tech}</div>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase">ROLE & RESPONSIBILITY:</div>
                <div className="text-[var(--text-secondary)] leading-relaxed">{selectedBlock.description}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">DATA INPUTS:</div>
                  {selectedBlock.inputs.map((inp, i) => (
                    <div key={i} className="text-[var(--text-primary)]">• {inp}</div>
                  ))}
                </div>

                <div className="bg-[var(--bg-surface-inset)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase">DATA OUTPUTS:</div>
                  {selectedBlock.outputs.map((out, i) => (
                    <div key={i} className="text-[var(--text-primary)]">• {out}</div>
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={() => setSelectedBlock(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
