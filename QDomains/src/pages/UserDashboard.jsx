import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

/* ─── Shared Components ─── */
const StatCard = ({ label, val, icon, color, change }) => (
  <div className="stat-card">
    <div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{label}</p>
      <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>{val}</h3>
      {change && <p style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 600, marginTop: '0.25rem' }}>{change}</p>}
    </div>
    <div style={{ fontSize: '2rem', background: color + '18', padding: '0.9rem', borderRadius: '14px', width: '54px', height: '54px', display: 'grid', placeItems: 'center' }}>{icon}</div>
  </div>
);

const ProgressBar = ({ label, pct, color }) => (
  <div style={{ marginBottom: '1.4rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
      <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '0.88rem', fontWeight: 700, color }}>{pct}%</span>
    </div>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  </div>
);

/* ─── Sub-Sections ─── */

const OverviewSection = ({ stats, domains, invoices }) => (
  <div className="fade-in">
    <div className="grid grid-4 mb-2">
      {stats.map(s => <StatCard key={s.label} {...s} />)}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
      <div className="glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.8rem' }}>Server Resource Usage</h3>
        <ProgressBar label="Network Uptime"  pct={99.9} color="#22c55e" />
        <ProgressBar label="Bandwidth Usage" pct={65}   color="#007bff" />
        <ProgressBar label="Disk Storage"    pct={38}   color="#0ea5e9" />
      </div>
      <div className="glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {['Register New Domain', 'Install SSL Certificate', 'Create Email Account', 'Open Support Ticket'].map((l, i) => (
             <button key={l} className="btn btn-outline" style={{ textAlign: 'left', display: 'flex', gap: '0.8rem', padding: '0.8rem', borderRadius: '12px' }}>
                <span>{['🌐','🔒','📧','🎫'][i]}</span> {l}
             </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DomainsSection = ({ domains }) => (
  <div className="fade-in glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
       <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage My Domains</h3>
       <button className="btn btn-primary">+ Register New</button>
    </div>
    <div className="table-wrapper">
       <table>
          <thead>
             <tr><th>Domain</th><th>Reg. Date</th><th>Renewal</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
             {domains.map(d => (
                <tr key={d.name}>
                  <td style={{ fontWeight: 700 }}>{d.name}</td>
                  <td>{d.reg}</td>
                  <td>{d.ren}</td>
                  <td><span className={`badge badge-${d.status === 'Active' ? 'green' : 'gray'}`}>{d.status}</span></td>
                  <td><button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Manage</button></td>
                </tr>
             ))}
          </tbody>
       </table>
    </div>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const hash = location.hash.replace('#', '') || 'overview';
    setActiveTab(hash);
  }, [location.hash]);

  const stats = [
    { label: 'Active Domains', val: '4', icon: '🌐', color: '#007bff', change: '+1 this month' },
    { label: 'Hosting Plans', val: '2', icon: '☁️', color: '#0ea5e9', change: 'Pro Plan active' },
    { label: 'SSL Certificates', val: '4', icon: '🔒', color: '#22c55e', change: 'All valid' },
    { label: 'Open Tickets', val: '0', icon: '🎫', color: '#f59e0b', change: 'All resolved' },
  ];

  const domains = [
    { name: 'qdomains.io',    reg: '2026-03-31', ren: '2027-03-31', status: 'Active',  daysLeft: 365 },
    { name: 'mybusiness.lk', reg: '2026-03-25', ren: '2027-03-25', status: 'Active',  daysLeft: 359 },
    { name: 'portfolio.me',  reg: '2025-06-10', ren: '2026-06-10', status: 'Active',  daysLeft: 72  },
    { name: 'testsite.net',  reg: '2025-12-01', ren: '2026-12-01', status: 'Pending', daysLeft: 245 },
  ];

  const invoices = [
    { id: '#1042', date: '2026-03-31', amount: '$34.97', status: 'Paid' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'domains': return <DomainsSection domains={domains} />;
      case 'hosting': return <div className="fade-in glass p-3 br-20"><h3>Web Hosting Management</h3><p className="text-secondary mt-1">Manage your professional and starter hosting plans here.</p></div>;
      case 'email':   return <div className="fade-in glass p-3 br-20"><h3>Email Accounts</h3><p className="text-secondary mt-1">Configure your corporate email and forwarders.</p></div>;
      case 'billing': return <div className="fade-in glass p-3 br-20"><h3>Billing & Invoices</h3><p className="text-secondary mt-1">View your payment history and download invoices.</p></div>;
      case 'support': return <div className="fade-in glass p-3 br-20"><h3>Support Helpdesk</h3><p className="text-secondary mt-1">Contact our local support team for assistance.</p></div>;
      case 'settings':return <div className="fade-in glass p-3 br-20"><h3>Account Settings</h3><p className="text-secondary mt-1">Update your profile, security, and notification settings.</p></div>;
      default:        return <OverviewSection stats={stats} domains={domains} invoices={invoices} />;
    }
  };

  const labels = {
    overview: 'Dashboard Overview',
    domains:  'My Domains',
    hosting:  'Cloud Hosting',
    email:    'Email Hosting',
    billing:  'Billing & Invoices',
    support:  'Support Tickets',
    settings: 'Account Settings'
  };

  return (
    <DashboardLayout title={labels[activeTab] || 'Dashboard'} activeTab={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}>
       {renderContent()}
    </DashboardLayout>
  );
};

export default UserDashboard;
