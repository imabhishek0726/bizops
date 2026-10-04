import React from 'react';
import { LayoutDashboard, Activity, AlertTriangle, Users, Clock, Bot, ShieldCheck, Cpu } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'changes', label: 'What Changed?', icon: Activity },
    { id: 'attention', label: 'Needs Attention', icon: AlertTriangle },
    { id: 'ownership', label: "Who's Got Ball?", icon: Users },
    { id: 'waiting', label: 'Waiting On', icon: Clock },
    { id: 'copilot', label: 'AI Copilot', icon: Bot, badge: 'Agent' }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      height: '100vh'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--primary), #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          <Cpu size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: '#fff' }}>BizOps Copilot</div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>Autonomous Operations</div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-dim)'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '999px',
                  background: 'rgba(99, 102, 241, 0.25)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(99, 102, 241, 0.4)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Demo Mode Safeguard Footer */}
      <div style={{
        marginTop: 'auto',
        padding: '12px 14px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-subtle)',
        fontSize: '11px',
        color: 'var(--text-dim)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '4px' }}>
          <ShieldCheck size={14} />
          <span>DEMO SAFEGUARD</span>
        </div>
        <div>Synthetic Data Active</div>
        <div style={{ color: '#ef4444', fontWeight: 600, marginTop: '2px' }}>NO SEND / NO WRITE</div>
      </div>
    </aside>
  );
}
