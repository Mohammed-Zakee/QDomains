import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = {
  individual: [
    { icon: '🏠', label: 'Dashboard',    path: '/dashboard/user#overview' },
    { icon: '🌐', label: 'My Domains',   path: '/dashboard/user#domains' },
    { icon: '☁️', label: 'Hosting',      path: '/dashboard/user#hosting' },
    { icon: '📧', label: 'Email',        path: '/dashboard/user#email' },
    { icon: '💳', label: 'Billing',      path: '/dashboard/user#billing' },
    { icon: '🎫', label: 'Support',      path: '/dashboard/user#support' },
    { icon: '⚙️', label: 'Settings',    path: '/dashboard/user#settings' },
  ],
  business: [
    { icon: '🏠', label: 'Dashboard',    path: '/dashboard/user#overview' },
    { icon: '🌐', label: 'My Domains',   path: '/dashboard/user#domains' },
    { icon: '☁️', label: 'Hosting',      path: '/dashboard/user#hosting' },
    { icon: '👥', label: 'Team Access',  path: '/dashboard/user#team' },
    { icon: '📊', label: 'Analytics',   path: '/dashboard/user#analytics' },
    { icon: '💳', label: 'Billing',      path: '/dashboard/user#billing' },
    { icon: '🎫', label: 'Support',      path: '/dashboard/user#support' },
    { icon: '⚙️', label: 'Settings',    path: '/dashboard/user#settings' },
  ],
  admin: [
    { icon: '📊', label: 'Overview',     path: '/dashboard/admin#overview' },
    { icon: '👥', label: 'Users',        path: '/dashboard/admin#users' },
    { icon: '🌐', label: 'Domains',      path: '/dashboard/admin#domains' },
    { icon: '🖥️', label: 'Servers',     path: '/dashboard/admin#servers' },
    { icon: '💰', label: 'Revenue',      path: '/dashboard/admin#revenue' },
    { icon: '🎫', label: 'Tickets',      path: '/dashboard/admin#tickets' },
    { icon: '🔐', label: 'Security',     path: '/dashboard/admin#security' },
    { icon: '⚙️', label: 'System',      path: '/dashboard/admin#system' },
  ],
  service: [
    { icon: '🎫', label: 'Dashboard',    path: '/dashboard/service#overview' },
    { icon: '📋', label: 'Ticket Queue', path: '/dashboard/service#queue' },
    { icon: '💬', label: 'Live Chat',    path: '/dashboard/service#chat' },
    { icon: '👥', label: 'Team',         path: '/dashboard/service#team' },
    { icon: '📚', label: 'Knowledge',    path: '/dashboard/service#kb' },
    { icon: '📈', label: 'Reports',      path: '/dashboard/service#reports' },
  ],
};

const DashboardLayout = ({ children, title, activeTab = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const navItems = NAV_ITEMS[user?.type] || NAV_ITEMS.individual;
  const sidebarW = sidebarCollapsed ? '72px' : '260px';

  const roleColors = {
    individual: 'linear-gradient(135deg,#007bff,#00c6ff)',
    business:   'linear-gradient(135deg,#7c3aed,#a78bfa)',
    admin:      'linear-gradient(135deg,#ef4444,#f97316)',
    service:    'linear-gradient(135deg,#059669,#34d399)',
  };

  const roleLabel = {
    individual: 'Personal Account',
    business:   'Business Account',
    admin:      'System Administrator',
    service:    'Support Agent',
  };

  const notifications = [
    { id: 1, text: 'Domain qdomains.io renews in 30 days', time: '2h ago', dot: 'dot-yellow' },
    { id: 2, text: 'Invoice #1042 is ready to view',       time: '1d ago', dot: 'dot-blue' },
    { id: 3, text: 'SSL certificate auto-renewed',         time: '2d ago', dot: 'dot-green' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarW, minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100,
        background: 'var(--bg-primary)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease', overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}>
        {/* Brand */}
        <div style={{ padding: sidebarCollapsed ? '1.2rem 0' : '1.5rem 1.4rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }} onClick={() => navigate('/')}>
          <img src="/brand_logo.png" alt="Q" style={{ height: '34px', borderRadius: '8px', flexShrink: 0 }} />
          {!sidebarCollapsed && <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#007bff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap' }}>QDomains</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: sidebarCollapsed ? '1rem 0.4rem' : '1rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = activeTab === item.label;
            return (
              <div key={item.label}
                className={`nav-item${isActive ? ' active' : ''}`}
                onClick={() => navigate(item.path)}
                title={sidebarCollapsed ? item.label : ''}
                style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent' }}>
                <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{item.icon}</span>
                {!sidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{ padding: sidebarCollapsed ? '1rem 0.4rem' : '1rem 0.8rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!sidebarCollapsed && (
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: roleColors[user?.type] || 'linear-gradient(135deg,#007bff,#00c6ff)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || user?.email || 'User'}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{roleLabel[user?.type] || 'Account'}</p>
              </div>
            </div>
          )}
          <button className="btn btn-ghost" onClick={handleLogout}
            style={{ width: '100%', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap: '0.5rem', padding: '0.7rem 0.8rem', fontSize: '0.9rem', color: '#ef4444', borderRadius: '8px' }}>
            <span style={{ fontSize: '1rem' }}>🚪</span>
            {!sidebarCollapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ marginLeft: sidebarW, flex: 1, minHeight: '100vh', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '8px', fontSize: '1.1rem', minWidth: 'auto' }}>
              {sidebarCollapsed ? '▶' : '◀'}
            </button>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{title}</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                {new Date().toLocaleDateString('en-LK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '0.8rem', fontSize: '0.9rem' }}>🔍</span>
              <input type="text" placeholder="Search…" style={{ paddingLeft: '2.2rem', paddingRight: '1rem', width: '220px', height: '38px', borderRadius: '10px', fontSize: '0.88rem' }} />
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="btn btn-ghost" style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', fontSize: '1.1rem', minWidth: 'auto', position: 'relative' }}>
                🔔
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-primary)' }} />
              </button>
              {notifOpen && (
                <div style={{ position: 'absolute', right: 0, top: '110%', width: '300px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: '0.9rem' }}>Notifications</div>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: '0.9rem 1.2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', transition: 'var(--transition)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span className={n.dot} style={{ marginTop: '6px', flexShrink: 0 }} />
                      <div><p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{n.text}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{n.time}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', fontSize: '1.1rem', minWidth: 'auto' }}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Avatar */}
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: roleColors[user?.type] || 'linear-gradient(135deg,#007bff,#00c6ff)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
