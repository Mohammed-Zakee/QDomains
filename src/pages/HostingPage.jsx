import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const HostingPage = () => {
    const plans = [
        { name: 'Starter', icon: '🌱', price: '2.95', period: 'mo', color: '#22c55e', desc: 'Ideal for personal sites, CVs, and bloggers.', features: ['1 Domain', '10 GB SSD Storage', 'Free SSL', '24/7 Support'] },
        { name: 'Professional', icon: '⚡', price: '9.95', period: 'mo', color: '#007bff', badge: 'Most Popular', desc: 'Best for growing startups and small businesses.', features: ['10 Domains', '50 GB NVMe SSD', 'Free Domain (1yr)', 'Unlimited Emails', 'Priority Support'] },
        { name: 'Business', icon: '🚀', price: '24.95', period: 'mo', color: '#8b5cf6', badge: 'Powerhouse', desc: 'Enterprise-grade hosting with elite features.', features: ['Unlimited Domains', '250 GB NVMe Storage', '2 Free Domains', 'Advanced Security', 'Dedicated Account Mgr'] },
    ];

    return (
        <div>
            <PublicNavbar />
            
            <section style={{ padding: '8rem 0 6rem', background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--light-blue) 60%, var(--bg-primary) 100%)' }}>
               <div className="container" style={{ textAlign: 'center' }}>
                  <h1 style={{ fontSize: '3.8rem', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.1 }}>Powerful <span className="gradient-text">Web Hosting</span></h1>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 3.5rem' }}>
                    Blazing-fast NVMe SSD servers located in South Asia and globally — with a 99.9% uptime guarantee.
                  </p>
                  
                  <div className="grid grid-3">
                     {plans.map(p => (
                        <div key={p.name} style={{ background: 'var(--bg-primary)', borderRadius: '28px', padding: '3.5rem 2.5rem', border: p.badge ? '2px solid var(--primary)' : '1px solid var(--border)', boxShadow: p.badge ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transition: 'var(--transition)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                           {p.badge && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.4rem 1.4rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 700 }}>{p.badge}</div>}
                           <div style={{ fontSize: '3.2rem', marginBottom: '1.2rem' }}>{p.icon}</div>
                           <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>{p.name}</h3>
                           <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.8rem', minHeight: '3rem' }}>{p.desc}</p>
                           <div style={{ marginBottom: '2.5rem' }}>
                              <span style={{ fontSize: '3.2rem', fontWeight: 800, color: p.color }}>${p.price}</span>
                              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>/{p.period}</span>
                           </div>
                           <ul style={{ textAlign: 'left', marginBottom: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                              {p.features.map(f => <li key={f} style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}><span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span> {f}</li>)}
                           </ul>
                           <button className={`btn ${p.badge ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '1.1rem', borderRadius: '16px', fontSize: '1.05rem' }}>Deploy Plan →</button>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <PublicFooter />
        </div>
    );
};

export default HostingPage;
