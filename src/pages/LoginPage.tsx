import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import {
  ShieldAlert,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  User as UserIcon,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'role' | 'auth';
type AuthTab = 'login' | 'register';

const ROLE_CONFIG = {
  supplier: {
    label: 'Supplier Portal',
    tagline: 'Manage fleet capacity, live weather map & route proposals',
    icon: Truck,
    accent: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    border: 'border-emerald-500/40 hover:border-emerald-500/80',
    activeBorder: 'border-emerald-500',
    textColor: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
    glow: 'shadow-emerald-500/25',
    features: ['Live multimodal weather map', 'How Should This Shipment Move analysis', 'AI Route Change proposals to Admin', 'Download official signed PDF certificates'],
    demoEmail: 'supplier@abclogistics.com',
    demoPass: 'supplier123',
    defaultName: 'ABC Logistics Supplier',
    redirectTo: '/supplier',
  },
  admin: {
    label: 'Admin Control Center',
    tagline: 'Review supplier requests, issue PDF certificates & manual rerouting',
    icon: ShieldAlert,
    accent: 'purple',
    gradient: 'from-purple-600 to-violet-600',
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500/40 hover:border-purple-500/80',
    activeBorder: 'border-purple-500',
    textColor: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300',
    glow: 'shadow-purple-500/25',
    features: ['Rerouting requests approval & PDF issuance', 'Manual route override control', 'Revoke active rerouting decisions', 'Audit trail & system governance'],
    demoEmail: 'admin@smartevac.ai',
    demoPass: 'admin123',
    defaultName: 'System Administrator',
    redirectTo: '/admin',
  },
} as const;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();
  const { setRole } = useRole();

  const [step, setStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [authTab, setAuthTab] = useState<AuthTab>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') navigate('/admin', { replace: true });
      else navigate('/supplier', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const cfg = selectedRole ? ROLE_CONFIG[selectedRole] : null;

  const doRedirect = (role: UserRole) => {
    setRole(role);
    navigate(ROLE_CONFIG[role].redirectTo, { replace: true });
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmail('');
    setPassword('');
    setName('');
    setStep('auth');
  };

  const handleBack = () => {
    setStep('role');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    if (authTab === 'login') {
      const res = await login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessMsg('Login successful! Redirecting…');
        setTimeout(() => doRedirect(selectedRole), 800);
      } else {
        setErrorMsg(res.error || 'Invalid credentials. Please try again.');
      }
    } else {
      if (!name.trim()) { setIsSubmitting(false); setErrorMsg('Please enter your full name.'); return; }
      const res = await register(name, email, password, selectedRole);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessMsg('Account created! Redirecting…');
        setTimeout(() => doRedirect(selectedRole), 800);
      } else {
        setErrorMsg(res.error || 'Registration failed. Please try again.');
      }
    }
  };

  const handleQuickDemoAccess = async (roleKey: UserRole) => {
    const roleCfg = ROLE_CONFIG[roleKey];
    setSelectedRole(roleKey);
    setIsSubmitting(true);
    setErrorMsg(null);
    const res = await login(roleCfg.demoEmail, roleCfg.demoPass);
    setIsSubmitting(false);
    if (res.success) {
      setSuccessMsg('Access Granted! Redirecting…');
      setTimeout(() => doRedirect(roleKey), 600);
    } else {
      doRedirect(roleKey);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-sans">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SMARTevac AI Enterprise Supply Chain Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Logistics Control & AI Rerouting Center
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Select your operational role below to access weather-based multimodal route intelligence, supplier proposals, and admin authorization governance.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'role' ? (
            /* STEP 1: ROLE SELECTION (SUPPLIER vs ADMIN) */
            <motion.div
              key="step-role"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {(['supplier', 'admin'] as const).map((rKey) => {
                  const item = ROLE_CONFIG[rKey];
                  const IconComp = item.icon;
                  return (
                    <div
                      key={rKey}
                      onClick={() => handleRoleSelect(rKey)}
                      className={`group relative p-6 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-xl flex flex-col justify-between space-y-6`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 shadow-lg flex items-center justify-center text-white`}>
                            <IconComp className="w-6 h-6" />
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${item.badge}`}>
                            {rKey.toUpperCase()} PORTAL
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-extrabold text-[var(--text-primary)] group-hover:text-white transition-colors">
                            {item.label}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                            {item.tagline}
                          </p>
                        </div>

                        <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                          {item.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${item.textColor} shrink-0`} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold font-mono">
                        <span className={item.textColor}>Enter Portal</span>
                        <div className={`w-8 h-8 rounded-full bg-[var(--bg-surface)] border ${item.activeBorder} flex items-center justify-center group-hover:translate-x-1 transition-transform`}>
                          <ArrowRight className={`w-4 h-4 ${item.textColor}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* QUICK DEMO ACCESS BUTTONS */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] max-w-xl mx-auto space-y-3 text-center">
                <div className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
                  ⚡ Quick Demo One-Click Access
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleQuickDemoAccess('supplier')}
                    className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Demo Supplier Login</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoAccess('admin')}
                    className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Demo Admin Login</span>
                  </button>
                </div>
              </div>

            </motion.div>
          ) : (
            /* STEP 2: LOGIN / SIGNUP FORM */
            <motion.div
              key="step-auth"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="max-w-md mx-auto"
            >
              <div className={`glass-panel p-8 rounded-2xl border ${cfg?.activeBorder} bg-[var(--bg-surface)] shadow-2xl space-y-6`}>
                
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white font-mono transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Role Selection</span>
                </button>

                <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg?.gradient} flex items-center justify-center text-white shadow-md`}>
                    {selectedRole === 'admin' ? <ShieldAlert className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
                      {cfg?.label}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                      Enterprise Credentials Access
                    </p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Form Tabs */}
                <div className="flex bg-[var(--bg-surface-inset)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-mono font-bold">
                  <button
                    onClick={() => { setAuthTab('login'); setErrorMsg(null); }}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      authTab === 'login' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { setAuthTab('register'); setErrorMsg(null); }}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      authTab === 'register' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Register Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  {authTab === 'register' && (
                    <div className="space-y-1">
                      <label className="font-bold text-[var(--text-secondary)]">Full Name</label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold text-[var(--text-secondary)]">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={cfg?.demoEmail}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[var(--text-secondary)]">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-[var(--text-muted)] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${cfg?.gradient} text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all`}
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>{authTab === 'login' ? `Log In to ${cfg?.label}` : `Create ${cfg?.label} Account`}</span>
                  </button>
                </form>

                {/* Quick Auto-Fill Demo Credentials Button */}
                <div className="pt-2 border-t border-[var(--border-color)]">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(cfg?.demoEmail || '');
                      setPassword(cfg?.demoPass || '');
                    }}
                    className="w-full py-2 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] font-bold flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto-fill Demo Credentials ({cfg?.demoEmail})</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
