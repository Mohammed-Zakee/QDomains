import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState('individual');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', businessName: '', phone: '', country: 'Sri Lanka'
  });

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, accountType })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      login(data.user);
      navigate('/dashboard/user');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    { id: 'individual', icon: '👤', title: 'Personal / Individual', desc: 'Perfect for bloggers, freelancers, and personal projects.', price: 'Free to join' },
    { id: 'business',   icon: '🏢', title: 'Business / Corporate',  desc: 'Multi-user access, bulk discounts, and advanced billing.',  price: 'Free to join' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(155deg, var(--bg-secondary) 0%, var(--light-blue) 60%, var(--bg-primary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '960px', background: 'var(--bg-primary)', borderRadius: '32px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: Account type selector */}
        <div style={{ padding: '3.5rem 3rem', background: 'linear-gradient(145deg, #007bff 0%, #0ea5e9 60%, #00c6ff 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/brand_logo.png" alt="Q" style={{ height: '36px', borderRadius: '10px', background: 'white', padding: '2px' }} />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>QDomains</span>
          </div>
          <h2 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Choose Your Account Type
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Get started for free. Upgrade anytime as your needs grow.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {plans.map(p => (
              <div key={p.id} onClick={() => setAccountType(p.id)} style={{
                padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'var(--transition)',
                border: accountType === p.id ? '2.5px solid white' : '1.5px solid rgba(255,255,255,0.25)',
                background: accountType === p.id ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                  {accountType === p.id && <span style={{ marginLeft: 'auto', color: 'white', fontSize: '1.1rem' }}>✓</span>}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.6 }}>{p.desc}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginTop: '0.5rem', fontWeight: 600 }}>{p.price}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Free WHOIS Privacy', 'Free DNS Management', '24/7 LK Support', '30-Day Money Back'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#7dd3fc', fontSize: '0.9rem' }}>✓</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>
              Create {accountType === 'individual' ? 'Personal' : 'Business'} Account
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill in your details below. Takes less than 2 minutes.</p>
          </div>

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label>Full Name</label>
              <input required placeholder="John Perera" value={formData.name} onChange={update('name')} />
            </div>

            {accountType === 'business' && (
              <div>
                <label>Company / Business Name</label>
                <input required placeholder="Perera Technologies (Pvt) Ltd" value={formData.businessName} onChange={update('businessName')} />
              </div>
            )}

            <div>
              <label>Email Address</label>
              <input type="email" required placeholder="john@example.com" value={formData.email} onChange={update('email')} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label>Phone Number</label>
                <input type="tel" placeholder="+94 77 123 4567" value={formData.phone} onChange={update('phone')} />
              </div>
              <div>
                <label>Country</label>
                <select value={formData.country} onChange={update('country')}>
                  {['Sri Lanka', 'India', 'Maldives', 'Australia', 'United Kingdom', 'United States', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label>Password</label>
              <input type="password" required minLength={6} placeholder="Minimum 6 characters" value={formData.password} onChange={update('password')} />
            </div>

            {/* Strength hint */}
            {formData.password && (
              <div>
                <div className="progress-track" style={{ height: '5px' }}>
                  <div className="progress-fill" style={{
                    width: formData.password.length < 6 ? '20%' : formData.password.length < 10 ? '55%' : '100%',
                    background: formData.password.length < 6 ? '#ef4444' : formData.password.length < 10 ? '#f59e0b' : '#22c55e',
                    transition: 'width 0.3s ease, background 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Password strength: {formData.password.length < 6 ? 'Weak' : formData.password.length < 10 ? 'Good' : 'Strong'}
                </p>
              </div>
            )}

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              By creating an account, you agree to our{' '}
              <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms of Service</span> and{' '}
              <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Creating account…
                </span>
              ) : `Create ${accountType === 'individual' ? 'Personal' : 'Business'} Account →`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
