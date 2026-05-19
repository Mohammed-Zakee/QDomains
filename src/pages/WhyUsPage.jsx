import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const WhyUsPage = () => {
    const features = [
        { icon: '🛡️', title: 'Enterprise Security', desc: 'DDoS protection, free SSL for all domains, and daily malware scans built-in to keep you safe.' },
        { icon: '⚡', title: 'Blazing Fast Servers', desc: 'NVMe SSD drives, LiteSpeed web server, and global CDN for lightning-fast site access.' },
        { icon: '🇱🇰', title: 'Local Sri Lankan Support', desc: 'Dedicated Sinhala, Tamil & English speaking support team available 24/7 to assist you.' },
        { icon: '💳', title: 'Easy Local Payments', desc: 'Pay with cards, bank transfers, or local payment gateways—no USD conversion needed.' },
        { icon: '📊', title: 'Powerful Control Panel', desc: 'Modern dashboard to manage every aspect of your hosting and domains with ease.' },
        { icon: '🔄', title: '30-Day Money Back', desc: "Not satisfied? We'll issue a full refund within 30 days, no questions asked." },
    ];

    const reviews = [
        { name: 'Saman Perera', role: 'CEO, TechSprint LK', text: 'Switched to QDomains last year. Fastest load times we ever had inside Sri Lanka!' },
        { name: 'Kushan Silva', role: 'Freelancer', text: 'Registering .lk takes just 2 minutes now. Incredible automation and local support!' },
        { name: 'Indika Rathnayaka', role: 'Director, BizCorp', text: 'Professional, stable, and the pricing is very fair for the high-end hardware they provide.' },
    ];

    return (
        <div>
            <PublicNavbar />
            
            <section style={{ padding: '8rem 0 6rem', background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--light-blue) 60%, var(--bg-primary) 100%)' }}>
               <div className="container" style={{ textAlign: 'center' }}>
                  <h1 style={{ fontSize: '3.8rem', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.1 }}>Why <span className="gradient-text">QDomains?</span></h1>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 3.5rem' }}>We’re not just a hosting company. We’re your local partner in building a high-performance digital presence.</p>
                  
                  <div className="grid grid-3">
                     {features.map(f => (
                        <div key={f.title} className="card" style={{ background: 'var(--bg-primary)', padding: '2.5rem', borderRadius: '24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div style={{ fontSize: '2.5rem', width: '60px', height: '600px', maxHeight: '64px', borderRadius: '16px', background: 'var(--light-blue)', display: 'grid', placeItems: 'center' }}>{f.icon}</div>
                           <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{f.title}</h3>
                           <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <section className="py-8" style={{ background: 'var(--bg-primary)' }}>
               <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Loved by 10,000+ Customers</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>See what the Sri Lankan tech community is saying about us.</p>
                  </div>
                  <div className="grid grid-3">
                     {reviews.map(r => (
                        <div key={r.name} style={{ background: 'var(--bg-secondary)', borderRadius: '24px', padding: '2.2rem', boxShadow: 'var(--shadow-sm)' }}>
                           <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}>"{r.text}"</p>
                           <div>
                              <p style={{ fontWeight: 800, color: 'var(--primary)' }}>{r.name}</p>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.role}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <PublicFooter />
        </div>
    );
};

export default WhyUsPage;
