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
