import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import GlobeCanvas from '../components/GlobeCanvas';

const Landing = () => {
    const navigate = useNavigate();

    const highlights = [
        { title: 'Domains',  icon: '🌐', path: '/domains',  desc: 'Register .lk and global domains in seconds.' },
        { title: 'Hosting',  icon: '☁️', path: '/hosting',  desc: 'NVMe SSD speed for your web applications.' },
        { title: 'Pricing',  icon: '💰', path: '/pricing',  desc: 'Transparent, flat-rate pricing for everyone.' },
        { title: 'Why Us',   icon: '🏆', path: '/why-us',   desc: 'Industry-leading support and 99.9% uptime.' },
    ];

    return (
        <div>
            <PublicNavbar />
            
            {/* Split Hero with 3D Globe */}
            <section style={{ padding: '8rem 0 6rem', background: 'linear-gradient(155deg, var(--bg-primary) 0%, var(--light-blue) 60%, var(--bg-primary) 100%)', position: 'relative', overflow: 'hidden' }}>
               <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  <div className="fade-in">
                      <span className="badge badge-blue" style={{ marginBottom: '1.2rem' }}>🚀 Sri Lanka's Most Trusted Host</span>
                      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.4rem)', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.1 }}>One Platform for All Your <span className="gradient-text">Digital Assets</span></h1>
                      <p style={{ fontSize: '1.18rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '640px' }}>Register domains and manage hosting with a single, incredibly fast, and local platform designed for performance.</p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/domains')} style={{ padding: '1.1rem 2.8rem', borderRadius: '16px', fontSize: '1.1rem' }}>Find Your Domain →</button>
                        <button className="btn btn-outline" onClick={() => navigate('/hosting')} style={{ padding: '1.1rem 2.5rem', borderRadius: '16px', fontSize: '1.1rem' }}>Explore Hosting</button>
                      </div>
                  </div>
                  <div className="fade-in-left" style={{ height: '560px', position: 'relative' }}>
                      <GlobeCanvas />
                  </div>
               </div>
            </section>

            {/* Quick Highlights */}
            <section className="py-8">
               <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>Start Your Journey Today</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>Select a service to get started with QDomains. Each plan is tailored for excellence.</p>
                  </div>
                  <div className="grid grid-4" style={{ gap: '2.5rem' }}>
                    {highlights.map(h => (
                       <div key={h.title} onClick={() => navigate(h.path)} style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'var(--transition)' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                          <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>{h.icon}</div>
                          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.6rem' }}>{h.title}</h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{h.desc}</p>
                       </div>
                    ))}
                  </div>
               </div>
            </section>

            {/* CTA */}
            <section className="py-8" style={{ background: 'linear-gradient(135deg, #007bff 0%, #0ea5e9 100%)', textAlign: 'center' }}>
               <div className="container">
                  <h2 style={{ color: 'white', fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Get Started with QDomains Today</h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '620px', margin: '0 auto 3rem' }}>Join thousands of Sri Lankan businesses and entrepreneurs already hosting with us.</p>
                  <button onClick={() => navigate('/signup')} style={{ background: 'white', color: '#007bff', padding: '1.2rem 3.5rem', borderRadius: '18px', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 5px 25px rgba(0,0,0,0.1)' }}>Create My Account →</button>
               </div>
            </section>

            <PublicFooter />
        </div>
    );
};

export default Landing;
