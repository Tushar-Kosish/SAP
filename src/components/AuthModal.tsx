import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { Lock, Mail, User, ShieldAlert, Truck, UserCheck, LogIn, UserPlus, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (activeTab === 'login') {
      const res = await login(email, password);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Login failed. Please check credentials.');
      } else {
        setSuccessMsg('Login successful!');
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your name.');
        setIsSubmitting(false);
        return;
      }
      const res = await register(name, email, password, role);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed.');
      } else {
        setSuccessMsg('Account created successfully!');
      }
    }
  };

  const handleDemoLogin = async (demoRole: UserRole) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    let demoEmail = '';
    let demoPass = '';

    if (demoRole === 'admin') {
      demoEmail = 'admin@smartevac.ai';
      demoPass = 'admin123';
    } else if (demoRole === 'supplier') {
      demoEmail = 'supplier@concor.co.in';
      demoPass = 'supplier123';
    } else {
      demoEmail = 'customer@tatamotors.com';
      demoPass = 'customer123';
    }

    const res = await login(demoEmail, demoPass);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(`Demo ${demoRole} login failed.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-2xl p-6 shadow-2xl space-y-5 text-[var(--text-primary)]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 text-lg font-bold"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-500 mx-auto flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">SmartEvac AI Authentication</h2>
          <p className="text-xs text-[var(--text-secondary)]">Secure role-based access for Admins, Suppliers & Customers</p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[var(--bg-surface-inset)] rounded-xl border border-[var(--border-color)] text-xs font-bold">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>

          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'register'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Instant Demo Persona Access</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleDemoLogin('customer')}
              disabled={isSubmitting}
              className="px-2 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-bold flex flex-col items-center gap-0.5 transition-all active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => handleDemoLogin('supplier')}
              disabled={isSubmitting}
              className="px-2 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold flex flex-col items-center gap-0.5 transition-all active:scale-95"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Supplier</span>
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={isSubmitting}
              className="px-2 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 font-bold flex flex-col items-center gap-0.5 transition-all active:scale-95"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-secondary)]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-secondary)]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-secondary)]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface-inset)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-secondary)]">Select Account Role</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1 ${
                    role === 'customer'
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-[var(--bg-surface-inset)] text-[var(--text-secondary)] border-[var(--border-color)]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" /> Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1 ${
                    role === 'supplier'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-[var(--bg-surface-inset)] text-[var(--text-secondary)] border-[var(--border-color)]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" /> Supplier
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1 ${
                    role === 'admin'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-[var(--bg-surface-inset)] text-[var(--text-secondary)] border-[var(--border-color)]'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{activeTab === 'login' ? 'Log In to SmartEvac' : 'Create Account'}</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
