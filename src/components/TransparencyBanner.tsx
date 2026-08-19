import React, { useEffect, useState } from 'react';
import { useRole } from '../context/RoleContext';
import { ShieldCheck, Eye, RefreshCw, ArrowRight, UserCheck, Truck, ShieldAlert, Radio, Zap } from 'lucide-react';

export const TransparencyBanner: React.FC = () => {
  const { role, transparencyEnabled, auditTrailCount, lastLiveEvent } = useRole();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (lastLiveEvent) {
      const roleUpper = lastLiveEvent.senderRole.toUpperCase();
      let text = `Real-time update from ${roleUpper}: `;
      if (lastLiveEvent.type === 'REROUTE_APPROVED') text += 'Reroute decision approved & dispatched to carrier!';
      else if (lastLiveEvent.type === 'REROUTE_TRIGGERED') text += 'Emergency reroute triggered on corridor!';
      else if (lastLiveEvent.type === 'SHIPMENT_STATUS_UPDATED') text += 'Fleet status & location updated!';
      else text += `${lastLiveEvent.type} event recorded.`;

      setToastMsg(text);
      const timer = setTimeout(() => setToastMsg(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [lastLiveEvent]);

  if (!transparencyEnabled) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border-b border-blue-500/20 px-4 py-2.5 backdrop-blur-md">
      
      {/* Live Toast Banner for Cross-Device Events */}
      {toastMsg && (
        <div className="mb-2 p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>⚡ REAL-TIME MULTI-DEVICE SYNC: {toastMsg}</span>
          </div>
          <span className="text-[10px] font-mono opacity-80">Synced live across devices</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-emerald-400 mr-1.5">[Multi-Device Sync Active]</span>
            <span className="text-[var(--text-secondary)]">
              Real-time cross-device data pipeline. Admin, Supplier & Consumer views synchronize instantly on all mobile devices.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
          <div className="flex items-center gap-3 bg-[var(--bg-surface-inset)] px-3 py-1 rounded-lg border border-[var(--border-color)]">
            <span className={`flex items-center gap-1 font-bold ${role === 'client' ? 'text-indigo-400' : 'text-slate-400'}`}>
              <UserCheck className="w-3 h-3" /> Consumer
            </span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className={`flex items-center gap-1 font-bold ${role === 'supplier' ? 'text-emerald-400' : 'text-slate-400'}`}>
              <Truck className="w-3 h-3" /> Supplier
            </span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className={`flex items-center gap-1 font-bold ${role === 'admin' ? 'text-purple-400' : 'text-slate-400'}`}>
              <ShieldAlert className="w-3 h-3" /> Admin
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>{auditTrailCount} Verified Audits</span>
          </div>
        </div>

      </div>
    </div>
  );
};
