import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Domains', path: '/domains' },
    { label: 'Hosting', path: '/hosting' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Why Us',  path: '/why-us' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: scrolled ? 'var(--glass)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      padding: '0.9rem 0',
      transition: 'all 0.4s ease',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/brand_logo.png" alt="QDomains" style={{ height: '38px', borderRadius: '10px' }} />
          <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#007bff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>QDomains</span>
        </div>

        <ul style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <li key={link.path} style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
              <Link to={link.path} style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '0.6rem', borderRadius: '50%', fontSize: '1.1rem', minWidth: 'auto', background: 'none' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ fontWeight: 600 }}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
