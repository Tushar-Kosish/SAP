import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import {
  ShieldAlert,
  Truck,
  UserCheck,
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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Role Config ────────────────────────────────────────────────────────────

type Step = 'role' | 'auth';
type AuthTab = 'login' | 'register';

const ROLE_CONFIG = {
  customer: {
    label: 'Consumer',
    tagline: 'Track shipments & view live delivery updates',
    icon: UserCheck,
    accent: 'indigo',
    gradient: 'from-indigo-600 to-blue-600',
    bg: 'bg-indigo-500/10 hover:bg-indigo-500/20',
    border: 'border-indigo-500/40 hover:border-indigo-500/80',
    activeBorder: 'border-indigo-500',
    textColor: 'text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300',
    glow: 'shadow-indigo-500/25',
    features: ['Real-time cargo tracking', 'ETA & delay alerts', 'Cost savings dashboard', 'Priority reroute requests'],
    demoEmail: 'customer@tatamotors.com',
    demoPass: 'customer123',
    redirectTo: '/client',
  },
  supplier: {
    label: 'Supplier',
    tagline: 'Manage fleet capacity & dispatch orders',
    icon: Truck,
    accent: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    border: 'border-emerald-500/40 hover:border-emerald-500/80',
    activeBorder: 'border-emerald-500',
    textColor: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
    glow: 'shadow-emerald-500/25',
    features: ['Live fleet availability', 'AI reroute dispatch orders', 'SLA performance tracker', 'Milestone status updates'],
    demoEmail: 'supplier@concor.co.in',
    demoPass: 'supplier123',
    defaultName: 'CONCOR Rail Dispatcher',
    redirectTo: '/supplier',
  },
  admin: {
    label: 'Admin',
    tagline: 'Full system governance & emergency controls',
    icon: ShieldAlert,
    accent: 'purple',
    gradient: 'from-purple-600 to-violet-600',
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500/40 hover:border-purple-500/80',
    activeBorder: 'border-purple-500',
    textColor: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300',
    glow: 'shadow-purple-500/25',
    features: ['Multi-tenant governance', 'Emergency override panel', 'AI agent configuration', 'SAP BTP telemetry audit'],
    demoEmail: 'admin@smartevac.ai',
    demoPass: 'admin123',
    defaultName: 'System Administrator',
    redirectTo: '/admin',
  },
} as const;

// ─── Main LoginPage Component ────────────────────────────────────────────────

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
      else if (user.role === 'supplier') navigate('/supplier', { replace: true });
      else navigate('/client', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const cfg = selectedRole ? ROLE_CONFIG[selectedRole] : null;

  // ── Helpers ───────────────────────────────────────────────────────────────

  const doRedirect = (role: UserRole) => {
    setRole(role === 'customer' ? 'client' : role);
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

  // Email + Password login/register
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

  // Instant demo / Google SSO (uses pre-seeded demo account)
  const handleGoogleSignIn = async () => {
    if (!selectedRole || !cfg) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    const res = await login(cfg.demoEmail, cfg.demoPass);
    setIsSubmitting(false);
    if (res.success) {
      setSuccessMsg('Signed in! Redirecting…');
      setTimeout(() => doRedirect(selectedRole), 600);
    } else {
      // Fallback: just navigate (offline demo)
      doRedirect(selectedRole);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-emerald-600/8 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative w-full max-w-5xl">

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            SmartEvac AI — Supply Chain Intelligence Platform
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Welcome{step === 'auth' && cfg ? (
              <span className={`ml-3 ${cfg.textColor}`}>{cfg.label}</span>
            ) : null}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
            {step === 'role'
              ? 'Select your role to access your personalised supply-chain dashboard.'
              : `Sign in or create your ${cfg?.label} account to continue.`}
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'role' ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${step === 'role' ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-400'}`}>1</span>
              Choose Role
            </div>
            <div className="w-8 h-px bg-[var(--border-color)]" />
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'auth' ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${step === 'auth' ? 'bg-blue-500 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-color)]'}`}>2</span>
              Sign In / Up
            </div>
          </div>
        </div>

        {/* ── STEP 1: ROLE SELECTION ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {step === 'role' && (
            <motion.div
              key="role-step"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(Object.entries(ROLE_CONFIG) as [UserRole, typeof ROLE_CONFIG[UserRole]][]).map(([roleKey, roleCfg]) => {
                  const Icon = roleCfg.icon;
                  return (
                    <motion.button
                      key={roleKey}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect(roleKey)}
                      className={`relative p-6 rounded-2xl bg-[var(--bg-surface)] border-2 ${roleCfg.border} transition-all duration-300 text-left group shadow-xl ${roleCfg.glow} flex flex-col gap-4 cursor-pointer`}
                    >
                      {/* Glow overlay on hover */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${roleCfg.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                      {/* Icon + Badge */}
                      <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${roleCfg.gradient} flex items-center justify-center shadow-lg shadow-${roleCfg.accent}-500/30`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-full border ${roleCfg.badge} border-${roleCfg.accent}-500/30`}>
                          {roleCfg.label}
                        </span>
                      </div>

                      {/* Title + tagline */}
                      <div>
                        <h3 className="text-lg font-extrabold text-[var(--text-primary)]">{roleCfg.label} Portal</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{roleCfg.tagline}</p>
                      </div>

                      {/* Features list */}
                      <ul className="space-y-1.5">
                        {roleCfg.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-medium">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${roleCfg.textColor}`} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className={`mt-auto flex items-center gap-2 text-xs font-extrabold ${roleCfg.textColor} group-hover:gap-3 transition-all`}>
                        <span>Continue as {roleCfg.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-center text-[11px] text-[var(--text-muted)] mt-6 font-mono">
                Your data is isolated — each role only accesses its own secure workspace.
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: AUTH FORM ──────────────────────────────────────── */}
          {step === 'auth' && cfg && selectedRole && (
            <motion.div
              key="auth-step"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              {/* Role badge */}
              <div className={`flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-surface)] border-2 ${cfg.activeBorder} mb-5 shadow-lg`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shrink-0`}>
                  <cfg.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[var(--text-primary)]">{cfg.label} Portal Selected</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">{cfg.tagline}</div>
                </div>
                <button
                  onClick={handleBack}
                  className="ml-auto p-2 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[var(--text-muted)] transition-all"
                  title="Change role"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Auth Card */}
              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-2xl space-y-5">

                {/* Tab switcher */}
                <div className="grid grid-cols-2 p-1 bg-[var(--bg-surface-inset)] rounded-xl border border-[var(--border-color)] text-xs font-extrabold">
                  <button
                    onClick={() => { setAuthTab('login'); setErrorMsg(null); }}
                    className={`py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      authTab === 'login' ? `bg-gradient-to-r ${cfg.gradient} text-white shadow-sm` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Log In
                  </button>
                  <button
                    onClick={() => { setAuthTab('register'); setErrorMsg(null); }}
                    className={`py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      authTab === 'register' ? `bg-gradient-to-r ${cfg.gradient} text-white shadow-sm` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    Sign Up
                  </button>
                </div>

                {/* Google SSO Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-extrabold flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google as {cfg.label}</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] font-mono">
                  <div className="flex-1 h-px bg-[var(--border-color)]" />
                  OR USE EMAIL
                  <div className="flex-1 h-px bg-[var(--border-color)]" />
                </div>

                {/* Error / Success */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{successMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name — only on register */}
                  <AnimatePresence>
                    {authTab === 'register' && (
                      <motion.div key="name-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1">
                        <label className="text-xs font-bold text-[var(--text-secondary)]">Full Name</label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] focus:border-blue-500 text-xs text-[var(--text-primary)] focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text-secondary)]">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={cfg.demoEmail}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] focus:border-blue-500 text-xs text-[var(--text-primary)] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text-secondary)]">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] focus:border-blue-500 text-xs text-[var(--text-primary)] focus:outline-none transition-colors"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${cfg.gradient} hover:opacity-90 text-white font-extrabold text-sm shadow-lg shadow-${cfg.accent}-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 mt-1`}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /><span>Processing…</span></>
                    ) : (
                      <><span>{authTab === 'login' ? `Log In as ${cfg.label}` : `Create ${cfg.label} Account`}</span><ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>

                {/* Demo hint */}
                <div className="pt-1 border-t border-[var(--border-color)]">
                  <button
                    type="button"
                    onClick={() => { setEmail(cfg.demoEmail); setPassword(cfg.demoPass); }}
                    className="w-full text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono flex items-center justify-center gap-1.5 py-1.5 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Fill demo credentials for {cfg.label}
                  </button>
                </div>
              </div>

              <p className="text-center text-[11px] text-[var(--text-muted)] mt-4 font-mono">
                Your account is stored securely · Role access is enforced by the server
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
