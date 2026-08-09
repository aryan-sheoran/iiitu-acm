import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/apiURL';



export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('acm_admin_token', data.token);
      localStorage.setItem('acm_admin_user', data.username);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex bg-bg-primary transition-colors duration-300">
      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-acm-dark via-acm-blue to-[#0a4dcc] flex-col justify-between p-14 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white">
            <img src="/iiitu-acm.jpeg" alt="IIITU ACM Logo" className="w-full h-full object-cover" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white/80 tracking-widest uppercase">IIITU ACM</p>
          <p className="text-[12px] text-white/50 mt-1">Student Chapter Admin Portal</p>
        </div>

        <div className="relative">
          <blockquote className="text-white text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-4">
            "Computing is not about<br/>computers anymore."
          </blockquote>
          <p className="text-white/50 text-sm">— Nicholas Negroponte</p>
        </div>

        <p className="relative text-white/30 text-[11px]">
          Indian Institute of Information Technology, Una
        </p>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white lg:hidden mb-5">
              <img src="/iiitu-acm.jpeg" alt="IIITU ACM Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-text-secondary">Sign in to the admin dashboard</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-red-500/8 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium">
              <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-secondary text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-acm-blue/30 focus:border-acm-blue transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-secondary text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-acm-blue/30 focus:border-acm-blue transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-acm-blue hover:bg-acm-dark text-white font-semibold text-sm transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_0_0_rgba(0,113,227,0)] hover:shadow-[0_4px_20px_rgba(0,113,227,0.35)] focus:outline-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
