import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const ServiceDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'user', name: 'Saman Perera', text: 'Hi, I registered a .lk domain 2 days ago but the DNS is still not propagated.', time: '14:02' },
    { from: 'agent', name: 'You', text: 'Hello Saman! Let me check your domain configuration right away.', time: '14:05' },
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '') || 'overview';
    setActiveTab(hash);
  }, [location.hash]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const stats = [
    { label: 'Active Tickets',  val: '14',    icon: '🎫', color: '#f59e0b' },
    { label: 'Avg Wait Time',   val: '~2 min', icon: '⏳', color: '#0ea5e9' },
    { label: 'CSAT Score',      val: '4.8/5',  icon: '⭐', color: '#22c55e' },
    { label: 'Resolved Today',  val: '31',     icon: '✅', color: '#8b5cf6' },
  ];

  const tickets = [
    { id: 'TK-2048', user: 'Saman Perera', category: 'DNS / Domains', time: '14m ago', priority: 'High', status: 'Open', avatar: 'S' },
    { id: 'TK-2047', user: 'Kushan Silva',  category: 'Hosting',       time: '22m ago', priority: 'Medium', status: 'In Progress', avatar: 'K' },
    { id: 'TK-2046', user: 'Indika Rath',  category: 'Billing',       time: '38m ago', priority: 'Low', status: 'Open', avatar: 'I' },
  ];

  const team = [
    { name: 'Nimal Abey', role: 'Technical Specialist', status: 'Available', avatar: 'N', tickets: 4 },
    { name: 'Sara Jaya',  role: 'Domain Specialist',    status: 'In Chat',  avatar: 'S', tickets: 2 },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'queue':
        return (
          <div className="fade-in glass p-3 br-20 mt-1">
             <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>Priority Ticket Queue</h3>
             <div className="table-wrapper">
                <table>
                   <thead><tr><th>Ticket ID</th><th>User</th><th>Category</th><th>Priority</th><th>Status</th></tr></thead>
                   <tbody>
                      {tickets.map(t => (
                         <tr key={t.id}>
                            <td style={{ fontWeight: 700 }}>{t.id}</td>
                            <td>{t.user}</td>
                            <td>{t.category}</td>
                            <td><span className={`badge badge-${t.priority === 'High' ? 'red' : 'yellow'}`}>{t.priority}</span></td>
                            <td><span className={`badge badge-${t.status === 'Open' ? 'yellow' : 'blue'}`}>{t.status}</span></td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        );
      case 'chat':
        return (
          <div className="fade-in mt-1" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
             <div className="glass br-20 flex-column overflow-hidden" style={{ minHeight: '500px' }}>
                <div className="p-2 border-bottom flex-between bg-primary">
                   <p style={{ fontWeight: 800 }}>Active Support Chat</p>
                   <span className="badge badge-green">Connected</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {messages.map((m, i) => (
                      <div key={i} style={{ alignSelf: m.from === 'agent' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                         <div style={{ background: m.from === 'agent' ? 'var(--primary)' : 'white', color: m.from === 'agent' ? 'white' : 'var(--text-primary)', padding: '0.8rem 1.2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>{m.text}</div>
                         <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.3rem', textAlign: m.from === 'agent' ? 'right' : 'left' }}>{m.time}</p>
                      </div>
                   ))}
                   <div ref={chatEndRef} />
                </div>
                <div className="p-2 border-top bg-primary flex gap-1">
                   <input style={{ flex: 1, height: '44px', borderRadius: '12px' }} placeholder="Type your response..." value={chatMsg} onChange={e => setChatMsg(e.target.value)} />
                   <button className="btn btn-primary" onClick={() => { if(chatMsg) setMessages([...messages, { from: 'agent', name: 'You', text: chatMsg, time: 'Now' }]); setChatMsg(''); }}>Send →</button>
                </div>
             </div>
             <div className="glass p-2 br-20">
                <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Active Agents</h4>
                <div className="flex-column gap-1">
                   {team.map(m => (
                      <div key={m.name} className="flex-between p-1 bg-secondary br-12">
                         <div className="flex gap-0-5">
                            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.8rem' }}>{m.avatar}</div>
                            <div><p style={{ fontSize: '0.8rem', fontWeight: 700 }}>{m.name}</p><p style={{ fontSize: '0.65rem' }}>{m.role}</p></div>
                         </div>
                         <span className={`dot-${m.status === 'Available' ? 'green' : 'blue'}`} />
                      </div>
                   ))}
                </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="fade-in">
             <div className="grid grid-4 mb-2">
               {stats.map(s => (
                  <div key={s.label} className="glass p-2 br-16 flex-between">
                     <div><p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.label}</p><h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{s.val}</h3></div>
                     <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
                  </div>
               ))}
             </div>
             <div className="glass p-3 br-20">
                <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Support Overview</h3>
                <p className="text-secondary">Welcome to the support console. Monitor your queue and respond to active chats using the sidebar navigation.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout title={activeTab === 'overview' ? 'Support Management' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} activeTab={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}>
       {renderContent()}
    </DashboardLayout>
  );
};

export default ServiceDashboard;
