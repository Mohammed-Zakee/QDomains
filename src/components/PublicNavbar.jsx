import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => { navigate('/'); setIsOpen(false); }}>
          <img src="/brand_logo.png" alt="QDomains" style={{ height: '38px', borderRadius: '10px' }} />
          <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#007bff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>QDomains</span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link to={link.path} style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={toggleTheme} className="btn btn-ghost theme-toggle" style={{ padding: '0.6rem', borderRadius: '50%', fontSize: '1.1rem', minWidth: 'auto', background: 'none' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-ghost" onClick={() => { navigate('/login'); setIsOpen(false); }} style={{ fontWeight: 600 }}>Login</button>
          <button className="btn btn-primary" onClick={() => { navigate('/signup'); setIsOpen(false); }}>Get Started</button>

          {/* Animated Hamburger Icon for Mobile */}
          <button 
            className={`hamburger-btn ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>

        {/* Dropdown Drawer Mobile Menu */}
        <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            {navLinks.map(link => (
              <li key={link.path} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <Link 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)', display: 'block', width: '100%' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => { navigate('/login'); setIsOpen(false); }} 
              style={{ width: '100%', justifyContent: 'center', padding: '1rem', border: '1px solid var(--border)' }}
            >
              Login
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => { navigate('/signup'); setIsOpen(false); }} 
              style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

