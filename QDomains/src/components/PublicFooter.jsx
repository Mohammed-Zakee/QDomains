import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PublicFooter = () => {
  const navigate = useNavigate();
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src="/brand_logo.png" alt="QDomains" style={{ height: '32px', borderRadius: '8px' }} />
              <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#007bff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>QDomains</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '260px' }}>
              Sri Lanka's premier domain registrar and web hosting provider, empowering businesses since 2026.
            </p>
          </div>

          {[
            { title: 'Services', links: ['Domain Registration', 'Web Hosting', 'VPS Servers', 'Email Hosting', 'SSL Certificates'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Support Center', 'Contact'] },
            { title: 'Quick Links', links: [
                { label: 'Domains',  href: '/domains' },
                { label: 'Hosting',  href: '/hosting' },
                { label: 'Pricing',  href: '/pricing' },
                { label: 'Why Us',   href: '/why-us' }
            ] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontWeight: 700, marginBottom: '1.2rem', fontSize: '0.95rem' }}>{col.title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => {
                    const label = l.label || l;
                    const href = l.href || '/';
                    return (
                        <li key={label} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'var(--transition)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                        {l.href ? <Link to={href} style={{ color: 'inherit' }}>{label}</Link> : label}
                        </li>
                    );
                })}
              </ul>
            </div>
          ))}
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>© 2026 QDomains (Pvt) Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ background: '#22c55e', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
