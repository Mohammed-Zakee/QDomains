import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      login(data.user);
      if (data.user.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (data.user.role === 'service') {
        navigate('/dashboard/service');
      } else {
        navigate('/dashboard/user');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const demoLogins = [
    { label: 'Individual User', email: 'user@qdomains.lk',    color: '#007bff' },
    { label: 'Admin Panel',     email: 'admin@qdomains.lk',   color: '#ef4444' },
    { label: 'Support Agent',   email: 'service@qdomains.lk', color: '#22c55e' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-secondary)' }}>
      {/* Left decorative panel */}
      <div style={{ flex: 1, background: 'linear-gradient(145deg, #007bff 0%, #0ea5e9 50%, #00c6ff 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem', display: window.innerWidth < 900 ? 'none' : 'flex' }}>
        <img src="/logo.png" alt="QDomains" style={{ height: '80px', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }} />
        <h1 style={{ color: 'white', fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', textAlign: 'center', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          Manage Your<br />Digital Presence
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: '340px', lineHeight: 1.8, fontSize: '1rem' }}>
          Access your domains, hosting, emails, and billing from one unified dashboard.
        </p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem' }}>
          {[['50K+', 'Domains'], ['99.9%', 'Uptime'], ['24/7', 'Support']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src="/brand_logo.png" alt="Q" style={{ height: '32px', borderRadius: '8px' }} />
              <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#007bff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>QDomains</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sign in to your account to continue</p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1.5rem', color: '#b91c1c', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label>Email Address</label>
              <input type="email" required placeholder="you@example.com"
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ margin: 0 }}>Password</label>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} required placeholder="Enter your password"
                  value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                <span onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1rem', userSelect: 'none' }}>
                  {showPw ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Signing in…
                </span>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Demo quick login */}
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>DEMO LOGINS</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {demoLogins.map(d => (
                <button key={d.label} type="button"
                  onClick={() => { setCredentials({ email: d.email, password: 'demo1234' }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'var(--transition)', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.background = d.color + '10'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{d.email}</span>
                </button>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>Create one free</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
