import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const PricingPage = () => {
    const sections = [
        { title: 'Domain Extensions', items: [
            { ext: '.com', reg: '$8.99', renew: '$11.99' },
            { ext: '.lk',  reg: '$14.99', renew: '$16.99' },
            { ext: '.net', reg: '$11.99', renew: '$13.99' },
            { ext: '.org', reg: '$10.99', renew: '$12.99' },
            { ext: '.io',  reg: '$39.99', renew: '$42.99' }
        ] },
        { title: 'Web Hosting', items: [
            { ext: 'Starter', reg: '$2.95', renew: '$2.95' },
            { ext: 'Professional', reg: '$9.95', renew: '$9.95' },
            { ext: 'Business', reg: '$24.95', renew: '$24.95' }
        ] },
        { title: 'Add-ons', items: [
            { ext: 'Sitelock Security', reg: '$2.50', renew: '$5.50' },
            { ext: 'CodeGuard Backup', reg: '$4.95', renew: '$6.95' },
            { ext: 'Enterprise Email', reg: '$0.99', renew: '$1.49' },
            { ext: 'SSL Certificate (EV)', reg: '$89.00', renew: '$99.00' }
        ] }
    ];

    return (
        <div>
            <PublicNavbar />
            
            <section style={{ padding: '8rem 0 6rem', background: 'var(--bg-primary)' }}>
               <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <h1 style={{ fontSize: '3.8rem', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.1 }}>Transparent <span className="gradient-text">Pricing</span></h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto' }}>Simple, predictable pricing. No bait-and-switch tactics. No hidden renewal fees.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                     {sections.map(sec => (
                        <div key={sec.title} className="glass" style={{ borderRadius: '28px', padding: '2.5rem', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                           <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{sec.title}</h3>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                              {sec.items.map(item => (
                                 <div key={item.ext} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                       <p style={{ fontWeight: 700, fontSize: '0.98rem' }}>{item.ext}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                       <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.reg}<small style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500, marginLeft: '0.3rem' }}>/yr</small></p>
                                       <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Renew: {item.renew}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <button className="btn btn-outline" style={{ width: '100%', marginTop: '2.5rem', padding: '0.85rem', borderRadius: '12px', fontSize: '0.9rem' }}>Learn More →</button>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <PublicFooter />
        </div>
    );
};

export default PricingPage;
