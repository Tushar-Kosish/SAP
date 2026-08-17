import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Server, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070B] border-t border-white/10 pt-12 pb-8 px-4 lg:px-8 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                SmartEvac <span className="text-cyan-400">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Intelligent logistics. Autonomous decisions. Next-generation multi-agent AI command center for landside port evacuation and intermodal route optimization.
            </p>

            <div className="flex items-center gap-3 text-[11px] font-mono text-cyan-400 pt-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30">
                SAP BTP Certified Pattern
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300">
                CrewAI Engine
              </span>
            </div>
          </div>

          {/* Col 3: Platform Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              COMMAND CENTER
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/operations" className="hover:text-cyan-400 transition-colors">Live Operations</Link></li>
              <li><Link to="/agents" className="hover:text-cyan-400 transition-colors">AI Agent Network</Link></li>
              <li><Link to="/routes" className="hover:text-cyan-400 transition-colors">Route Intelligence</Link></li>
              <li><Link to="/sap" className="hover:text-cyan-400 transition-colors">SAP Integration</Link></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              GOVERNANCE & DOCS
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/documents" className="hover:text-cyan-400 transition-colors">AI Document Center</Link></li>
              <li><Link to="/audit" className="hover:text-cyan-400 transition-colors">Decision Audit Log</Link></li>
              <li><Link to="/architecture" className="hover:text-cyan-400 transition-colors">System Architecture</Link></li>
            </ul>
          </div>

          {/* Col 5: SAP Enterprise Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              ENTERPRISE SUITE
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bridges SAP Transportation Management (TM) with autonomous multi-agent solvers via SAP BTP.
            </p>
            <div className="pt-1">
              <Link
                to="/sap"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold hover:underline"
              >
                <span>View SAP REST Layer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            Built for intelligent transportation innovation
          </div>
          <div className="text-slate-400">
            SmartEvac AI © 2026 | All Rights Reserved
          </div>
        </div>

      </div>
    </footer>
  );
};
