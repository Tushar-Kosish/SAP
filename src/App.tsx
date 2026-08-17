import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MoreBottomSheet } from './components/MoreBottomSheet';
import { InstallPwaPrompt } from './components/InstallPwaPrompt';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { OperationsPage } from './pages/OperationsPage';
import { AgentsPage } from './pages/AgentsPage';
import { RoutesPage } from './pages/RoutesPage';
import { SapPage } from './pages/SapPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AuditPage } from './pages/AuditPage';
import { ArchitecturePage } from './pages/ArchitecturePage';

import { Settings, Info, ShieldCheck, Zap } from 'lucide-react';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/sap" element={<SapPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080B11] text-slate-100 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
        
        {/* PWA Custom Home-Screen Install Prompt */}
        <InstallPwaPrompt />

        {/* Global Navigation Header */}
        <Navbar onOpenMore={() => setIsMoreOpen(true)} />

        {/* Page Content */}
        <AnimatedRoutes />

        {/* Mobile App Bottom Navigation Bar */}
        <BottomNav
          onOpenMore={() => setIsMoreOpen(true)}
          isMoreOpen={isMoreOpen}
        />

        {/* Mobile App More Bottom Sheet Drawer */}
        <MoreBottomSheet
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-sm glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-4 bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Settings className="w-5 h-5" />
                  <span>Mobile App Settings</span>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 p-1">✕</button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-white/10 flex justify-between items-center">
                  <span>UI Theme</span>
                  <span className="text-cyan-400 font-bold">Dark Glassmorphism</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-white/10 flex justify-between items-center">
                  <span>SAP BTP Gateway</span>
                  <span className="text-emerald-400 font-bold">OData REST v2.4</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-white/10 flex justify-between items-center">
                  <span>PWA Standalone Mode</span>
                  <span className="text-cyan-400 font-bold">Active</span>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs shadow-glow-cyan"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* About Modal */}
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md glass-panel rounded-2xl border border-cyan-500/40 p-6 space-y-4 bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Zap className="w-5 h-5 fill-cyan-400" />
                  <span>About SmartEvac AI</span>
                </div>
                <button onClick={() => setIsAboutOpen(false)} className="text-slate-400 p-1">✕</button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                SmartEvac AI is an enterprise multi-agent logistics intelligence command center built for SAP BTP. It monitors landside port congestion, evaluates multi-modal pathways (Highway NH48, WDFC Rail, Coastal Feed), and automates customs filings.
              </p>

              <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-xs font-mono space-y-1 text-slate-200">
                <div>• Version: <strong className="text-cyan-400">1.0.0 (PWA Enabled)</strong></div>
                <div>• Engine: <strong className="text-emerald-400">CrewAI + OpenAI GPT-4o</strong></div>
                <div>• Integration: <strong className="text-indigo-400">SAP TM OData Gateway</strong></div>
              </div>

              <button
                onClick={() => setIsAboutOpen(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs shadow-glow-cyan"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
