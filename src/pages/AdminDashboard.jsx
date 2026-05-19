import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const StatCard = ({ label, val, icon, color, change, changeType = 'up' }) => (
  <div className="stat-card">
    <div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{label}</p>
      <h3 style={{ fontSize: '1.9rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>{val}</h3>
      {change && (
        <p style={{ fontSize: '0.78rem', color: changeType === 'up' ? '#22c55e' : '#ef4444', fontWeight: 600, marginTop: '0.25rem' }}>
          {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
    <div style={{ fontSize: '2rem', background: color + '18', padding: '0.9rem', borderRadius: '14px', width: '54px', height: '54px', display: 'grid', placeItems: 'center' }}>{icon}</div>
  </div>
);

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const hash = location.hash.replace('#', '') || 'overview';
    setActiveTab(hash);
  }, [location.hash]);

  const stats = [
    { label: 'Total Revenue',    val: '$148,200', icon: '💰', color: '#007bff',  change: '12.4% vs last month' },
    { label: 'Active Users',     val: '12,450',   icon: '👥', color: '#0ea5e9',  change: '8.1% this week' },
    { label: 'Domains Managed',  val: '54,889',   icon: '🌐', color: '#22c55e',  change: '3.2% new registrations' },
    { label: 'Open Tickets',     val: '14',       icon: '🎫', color: '#f59e0b',  change: '5 resolved today' },
    { label: 'Server Uptime',    val: '99.97%',   icon: '🖥️', color: '#8b5cf6',  change: 'Last 30 days' },
    { label: 'MRR',              val: '$18,640',  icon: '📈', color: '#ec4899',  change: '6.3% growth' },
  ];

  const recentUsers = [
    { name: 'Saman Perera',    email: 'saman@mail.com',   type: 'Business',    date: '2026-03-31', status: 'Active' },
    { name: 'Dilani Silva',    email: 'dilani@web.lk',    type: 'Individual',  date: '2026-03-30', status: 'Active' },
    { name: 'Kamal Wijesinghe',email: 'kamal@biz.lk',    type: 'Business',    date: '2026-03-29', status: 'Active' },
    { name: 'Ruwan Bandara',   email: 'ruwan@tech.io',    type: 'Individual',  date: '2026-03-28', status: 'Suspended' },
    { name: 'Amara Fonseka',   email: 'amara@shop.lk',   type: 'Business',    date: '2026-03-27', status: 'Active' },
  ];

  const serverNodes = [
    { name: 'LK-Node-01 (Colombo)',  cpu: 28, ram: 54, disk: 61, load: 'Normal',  status: 'Healthy' },
    { name: 'SG-Node-02 (Singapore)',cpu: 42, ram: 67, disk: 48, load: 'Normal',  status: 'Healthy' },
    { name: 'EU-Node-03 (Frankfurt)',cpu: 18, ram: 39, disk: 33, load: 'Low',     status: 'Healthy' },
    { name: 'US-Node-04 (N.Virginia)',cpu: 71, ram: 82, disk: 59, load: 'High',   status: 'Warning' },
  ];

  const logs = [
    { time: '18:02:44', msg: 'API auth_success — user #8820', type: 'success' },
    { time: '18:03:12', msg: 'Domain registered: qdomains.io', type: 'info' },
    { time: '18:04:01', msg: 'WARNING: DB latency spike (88ms) on LK-01', type: 'warn' },
    { time: '18:04:58', msg: 'Backup complete: db_main_snap_v501', type: 'success' },
    { time: '18:05:33', msg: 'ALERT: Failed login attempts ×5 (IP: 45.33.32.156)', type: 'error' },
  ];

  const logColor = { success: '#22c55e', info: '#94a3b8', warn: '#f59e0b', error: '#ef4444' };

  const revenueByService = [
    { service: 'Domain Registration', revenue: '$41,200', pct: 28, color: '#007bff' },
    { service: 'Shared Hosting',      revenue: '$53,900', pct: 36, color: '#0ea5e9' },
    { service: 'VPS Servers',         revenue: '$29,400', pct: 20, color: '#8b5cf6' },
    { service: 'SSL & Add-ons',       revenue: '$14,800', pct: 10, color: '#22c55e' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return (
          <div className="fade-in glass p-3 br-20 mt-1">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>User Management</h3>
            <div className="table-wrapper">
               <table>
                  <thead><tr><th>Name</th><th>Email</th><th>Type</th><th>Status</th></tr></thead>
                  <tbody>
                     {recentUsers.map(u => (
                        <tr key={u.email}>
                           <td style={{ fontWeight: 700 }}>{u.name}</td>
                           <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                           <td><span className={`badge ${u.type === 'Business' ? 'badge-blue' : 'badge-gray'}`}>{u.type}</span></td>
                           <td><span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{u.status}</span></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'servers':
        return (
          <div className="fade-in mt-1">
            {serverNodes.map(node => (
               <div key={node.name} className="glass p-3 br-20 mb-2">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{node.name}</p>
                    <span className={`badge ${node.status === 'Healthy' ? 'badge-green' : 'badge-yellow'}`}>{node.status}</span>
                  </div>
                  <div className="grid grid-3" style={{ gap: '1.5rem' }}>
                     {[['CPU', node.cpu, '#007bff'], ['RAM', node.ram, '#8b5cf6'], ['Disk', node.disk, '#0ea5e9']].map(([lbl, val, col]) => (
                        <div key={lbl}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                              <span>{lbl}</span><span style={{ fontWeight: 700 }}>{val}%</span>
                           </div>
                           <div className="progress-track"><div className="progress-fill" style={{ width: `${val}%`, background: val > 70 ? '#ef4444' : col }} /></div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
          </div>
        );
      case 'revenue':
        return (
          <div className="fade-in glass p-3 br-20 mt-1">
             <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2.5rem' }}>Financial Performance</h3>
             <div className="grid grid-4 mb-2">
                {[
                  { label: 'Total Revenue', val: '$148,200', color: '#007bff' },
                  { label: 'New MRR',       val: '$18,640',  color: '#22c55e' },
                  { label: 'Refunds',       val: '$1,200',   color: '#ef4444' },
                  { label: 'Net Profit',    val: '$147,000', color: '#8b5cf6' },
                ].map(r => (
                  <div key={r.label} style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{r.label}</p>
                    <p style={{ fontSize: '1.7rem', fontWeight: 800, color: r.color, fontFamily: 'var(--font-heading)' }}>{r.val}</p>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="fade-in">
             <div className="grid grid-3 mb-2">
               {stats.slice(0, 3).map(s => <StatCard key={s.label} {...s} />)}
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
                <div className="glass p-3 br-20">
                   <h3 style={{ fontWeight: 700, marginBottom: '2rem' }}>System Logs</h3>
                   <div style={{ background: '#0d1117', borderRadius: '12px', padding: '1.2rem', fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {logs.map((l, i) => (
                         <div key={i} style={{ display: 'flex', gap: '0.8rem' }}><span style={{ color: '#555' }}>[{l.time}]</span><span style={{ color: logColor[l.type] }}>{l.msg}</span></div>
                      ))}
                   </div>
                </div>
                <div className="glass p-3 br-20">
                   <h3 style={{ fontWeight: 700, marginBottom: '1.8rem' }}>Admin Quick Actions</h3>
                   <div className="flex-column gap-1">
                      {['Force Backup Node1', 'Purge Expired', 'System Newsletter'].map((l,i) => (
                         <button key={l} className="btn btn-outline" style={{ textAlign: 'left', display: 'flex', gap: '0.8rem' }}>
                            <span>{['🔄','🗑️','📧'][i]}</span> {l}
                         </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  const titles = {
    overview: 'System Administration',
    users:    'User Management',
    domains:  'Global Domain Assets',
    servers:  'Server Fleet Health',
    revenue:  'Revenue & Analytics',
    tickets:  'System Support Tickets',
    security: 'Platform Security Logs',
    system:   'Core System Settings'
  };

  return (
    <DashboardLayout title={titles[activeTab] || 'Admin Dashboard'} activeTab={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}>
       {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
