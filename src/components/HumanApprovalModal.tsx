import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Server,
  ArrowRight,
  FileText,
  Loader2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AIRecommendation } from '../types';

interface HumanApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: AIRecommendation;
  onApproveSuccess: () => void;
}

export const HumanApprovalModal: React.FC<HumanApprovalModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  onApproveSuccess,
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showReasoningDetails, setShowReasoningDetails] = useState(false);

  if (!isOpen) return null;

  const handleApprove = async () => {
    setIsExecuting(true);

    // Simulate SAP BTP API dispatch latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsExecuting(false);
    setIsApproved(true);

    // Fire celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#00F2FE', '#3B82F6']
    });

    onApproveSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-6 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                HUMAN-IN-THE-LOOP AUTHORIZATION
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Rerouting Decision Requires Approval
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Workflow Step Bar */}
        <div className="flex items-center justify-between text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. AI Recommendation</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className={`flex items-center gap-1.5 font-bold ${isApproved ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
            <span>2. Human Approval</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <div className={`flex items-center gap-1.5 font-bold ${isApproved ? 'text-emerald-400' : 'text-slate-500'}`}>
            <Server className="w-3.5 h-3.5" />
            <span>3. SAP Execution</span>
          </div>
        </div>

        {/* State Content */}
        {!isApproved ? (
          <div className="space-y-4">
            
            {/* Recommended Action Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <div className="text-xs font-mono text-slate-400">RECOMMENDED ACTION</div>
              <div className="text-lg font-extrabold text-cyan-300 font-mono">
                Move {recommendation.containersToReassign} containers from {recommendation.originalRoute} → {recommendation.newRoute}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {recommendation.reasoning}
              </p>
            </div>

            {/* Impact Highlights */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[10px]">NET SAVINGS</span>
                <span className="text-emerald-400 font-bold text-sm">₹5.4 Lakhs</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[10px]">DELAY REDUCTION</span>
                <span className="text-cyan-400 font-bold text-sm">7.2 Hours</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[10px]">EMISSION REDUCTION</span>
                <span className="text-indigo-400 font-bold text-sm">-50% CO₂</span>
              </div>
            </div>

            {/* Reasoning Toggle Details */}
            {showReasoningDetails && (
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/10 text-xs font-mono space-y-1.5 animate-fadeIn">
                <div className="text-cyan-400 font-bold">DECISION ENGINE VERIFICATION LOG:</div>
                <div className="text-slate-300">• Port dwell time constraint: Pass (31% spike bypassed via rail terminal)</div>
                <div className="text-slate-300">• CONCOR WDFC rake availability: 3 rakes available at JNPA yard</div>
                <div className="text-slate-300">• SAP TM customer SLA agreement: Guaranteed 31h transit time delivery</div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              
              <button
                onClick={() => setShowReasoningDetails(!showReasoningDetails)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-bold transition-all"
              >
                {showReasoningDetails ? 'Hide Details' : 'Review Details'}
              </button>

              <div className="w-full sm:w-auto flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-white/10"
                >
                  ✕ Reject
                </button>

                <button
                  onClick={handleApprove}
                  disabled={isExecuting}
                  className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black text-xs font-extrabold transition-all shadow-glow-emerald hover:scale-[1.02]"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>DISPATCHING TO SAP...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 fill-black" />
                      <span>✓ Approve Decision</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Success State */
          <div className="py-6 text-center space-y-4 animate-fadeIn">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                HUMAN AUTHORIZATION GRANTED
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                ✓ REROUTING APPROVED
              </h3>
              <p className="text-sm font-mono text-cyan-300">
                120 TEU containers reassigned from NH48 Road to WDFC Electric Rail.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-xs font-mono text-slate-300 max-w-md mx-auto text-left space-y-1">
              <div className="text-slate-400 font-bold mb-1">SAP TM DISPATCH PAYLOAD:</div>
              <div>• Order ID: <strong className="text-white">SAP-TM-TO-948271</strong></div>
              <div>• Carrier: <strong className="text-white">Indian Railways (CONCOR)</strong></div>
              <div>• Status: <span className="text-emerald-400 font-bold">EXECUTED / 201 CREATED</span></div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Close & Return to Dashboard
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
