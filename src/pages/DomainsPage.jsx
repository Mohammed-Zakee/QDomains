import React, { useState } from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import GlobeCanvas from '../components/GlobeCanvas';

const DomainsPage = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const tlds = [
    { ext: '.com', reg: '$8.99', renew: '$11.99', transfer: '$8.99' },
    { ext: '.lk',  reg: '$14.99', renew: '$16.99', transfer: '$14.99' },
    { ext: '.net', reg: '$11.99', renew: '$13.99', transfer: '$11.99' },
    { ext: '.org', reg: '$10.99', renew: '$12.99', transfer: '$10.99' },
    { ext: '.io',  reg: '$39.99', renew: '$42.99', transfer: '$39.99' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({ domain: query.includes('.') ? query : `${query}.com`, available: Math.random() > 0.3, price: '$8.99' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <PublicNavbar />
      
      {/* Search Hero */}
      <section style={{ padding: '6rem 0 4rem', background: 'linear-gradient(155deg, var(--bg-primary) 0%, var(--light-blue) 60%, var(--bg-primary) 100%)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.6rem', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.1 }}>Find Your <span className="gradient-text">Dream Domain</span></h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '580px' }}>
              Register .lk and international domains in seconds with Lanka’s only truly automated domain registration engine.
            </p>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.6rem', background: 'var(--bg-primary)', padding: '0.6rem', borderRadius: '18px', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
              <span style={{ paddingLeft: '1rem', display: 'grid', placeItems: 'center' }}>🔍</span>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your domain name here..." style={{ flex: 1, border: 'none', background: 'none' }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2.2rem', borderRadius: '14px' }}>Search</button>
            </form>
          </div>
          <div style={{ height: '480px', position: 'relative' }}>
             <GlobeCanvas />
          </div>
        </div>
      </section>

      {/* Result */}
      {loading && (
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--light-blue)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Scouring global registries...</p>
        </div>
      )}

      {result && (
        <section className="fade-in py-5">
           <div className="container">
              <div style={{ background: 'var(--bg-primary)', border: `2px solid ${result.available ? '#22c55e' : '#ef4444'}`, borderRadius: '24px', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{result.domain} <span style={{ color: result.available ? '#22c55e' : '#ef4444', fontWeight: 600, fontSize: '1rem', marginLeft: '0.5rem' }}>{result.available ? 'is available!' : 'is taken.'}</span></h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{result.available ? 'Register it today to protect your brand identity.' : 'Try a different keyword or extension.'}</p>
                 </div>
                 {result.available && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                       <span style={{ fontSize: '2rem', fontWeight: 800 }}>{result.price}<small style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/yr</small></span>
                       <button className="btn btn-success" style={{ padding: '1rem 2.5rem', borderRadius: '14px' }}>Add to Cart →</button>
                    </div>
                 )}
              </div>
           </div>
        </section>
      )}

      {/* Pricing Table */}
      <section className="py-8" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Transparent Domain Pricing</h2>
              <p style={{ color: 'var(--text-secondary)' }}>No hidden fees. WHOIS Privacy included FREE for life.</p>
           </div>
           <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
             <div className="table-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                   <thead>
                      <tr style={{ background: 'rgba(0,123,255,0.06)' }}>
                         <th style={{ padding: '1.2rem', textAlign: 'left' }}>Extension</th>
                         <th style={{ padding: '1.2rem' }}>Registration</th>
                         <th style={{ padding: '1.2rem' }}>Renewal</th>
                         <th style={{ padding: '1.2rem' }}>Transfer</th>
                         <th style={{ padding: '1.2rem' }}>Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      {tlds.map(d => (
                         <tr key={d.ext} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '1.2rem' }}><span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>{d.ext}</span></td>
                            <td style={{ padding: '1.2rem', textAlign: 'center', fontWeight: 600 }}>{d.reg}</td>
                            <td style={{ padding: '1.2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>{d.renew}</td>
                            <td style={{ padding: '1.2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>{d.transfer}</td>
                            <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                               <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>Register</button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default DomainsPage;
