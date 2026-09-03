import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Repeat, ShieldCheck, UserCheck, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { STORAGE_KEYS } from '../../utils/constants';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { success, error } = useToast();

  const [email, setEmail] = useState('superadmin@campusloop.in');
  const [password, setPassword] = useState('SuperAdmin123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  React.useEffect(() => {
    // Clear stale mock storage keys on visiting login
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_COLLEGE);
    } catch (_) {}
  }, []);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password, rememberMe });
      success('Welcome back!', 'Authenticated to CampusLoop Admin.');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = (err as Error).message || 'Invalid credentials. Please try again.';
      setFormError(msg);
      error('Login Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'SUPER_ADMIN' | 'COLLEGE_ADMIN') => {
    setIsLoading(true);
    setFormError('');
    try {
      if (role === 'SUPER_ADMIN') {
        setEmail('superadmin@campusloop.in');
        setPassword('SuperAdmin123!');
        await login({ email: 'superadmin@campusloop.in', password: 'SuperAdmin123!', rememberMe: true });
      } else {
        setEmail('admin.iitb@campusloop.in');
        setPassword('CollegeAdmin123!');
        await login({ email: 'admin.iitb@campusloop.in', password: 'CollegeAdmin123!', rememberMe: true });
      }
      success('Authenticated', `Signed in as ${role === 'SUPER_ADMIN' ? 'Super Admin' : 'IITB College Admin'}`);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const msg = (err as Error).message || 'Failed to authenticate.';
      setFormError(msg);
      error('Login Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      {/* Left Brand Panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3.5">
          <img src="/logo.png" alt="CampusLoop" className="w-12 h-12 rounded-2xl object-contain bg-white p-1 shadow-lg shadow-emerald-950" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">Campus</span>
                <span className="text-emerald-400">Loop</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] font-bold tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="text-sky-400">BUY</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-amber-400">SELL</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-purple-400">BORROW</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-emerald-400">EXCHANGE</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-pink-400">DONATE</span>
            </p>
          </div>
        </div>

        {/* Center Pitch */}
        <div className="relative z-10 my-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Circular Economy for Higher Education</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Recirculating campus goods. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Preventing landfill waste.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
            The dedicated administrative hub for CampusLoop Super Admins and Campus Coordinators to manage student verifications, resource exchanges, campus hubs, and sustainability scorecards.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-850/80 border border-slate-800 p-4 rounded-xl">
              <span className="text-2xl font-bold text-white">14,820 kg</span>
              <p className="text-xs text-slate-400 mt-1">CO₂ Emissions Avoided</p>
            </div>
            <div className="bg-slate-850/80 border border-slate-800 p-4 rounded-xl">
              <span className="text-2xl font-bold text-white">₹18.4 Lakhs</span>
              <p className="text-xs text-slate-400 mt-1">Student Costs Saved</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-xs text-slate-500">
          CampusLoop Operations &bull; Mobile app used by students &bull; Web portal for campus leaders
        </div>
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal Sign In</h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Enter your authorized administrative credentials to access the console.
            </p>
          </div>

          {formError && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Admin Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@campusloop.in or admin@college.edu"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 h-4 w-4 mr-2"
                />
                Remember this device
              </label>

              <button
                type="button"
                onClick={() => success('Password Reset', 'A reset link has been dispatched to your official campus email.')}
                className="text-xs font-semibold text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold shadow-md"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Quick Demo Logins Helper */}
          <div className="pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Instant Demo Access (Click to Test):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('SUPER_ADMIN')}
                className="flex items-center justify-center gap-2 p-3 text-xs font-medium rounded-xl border border-purple-200 bg-purple-50/60 text-purple-900 hover:bg-purple-100 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Super Admin (Global)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('COLLEGE_ADMIN')}
                className="flex items-center justify-center gap-2 p-3 text-xs font-medium rounded-xl border border-emerald-200 bg-emerald-50/60 text-emerald-900 hover:bg-emerald-100 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>College Admin (IITB)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
