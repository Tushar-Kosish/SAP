import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Sparkles } from 'lucide-react';

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('smartevac_pwa_dismissed');
    if (isDismissed === 'true') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('smartevac_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 glass-card-accent p-4 rounded-2xl border border-cyan-500/50 shadow-glow-cyan bg-slate-950/95 animate-slideDown">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTALL SMARTevac AI</span>
            </div>
            <p className="text-xs text-slate-300 leading-snug mt-0.5">
              Add SmartEvac to your home screen for a faster native app-like experience.
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-3 font-mono text-xs">
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white font-bold"
        >
          Not Now
        </button>

        <button
          onClick={handleInstall}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow-glow-cyan"
        >
          <Download className="w-3.5 h-3.5 fill-black" />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};
