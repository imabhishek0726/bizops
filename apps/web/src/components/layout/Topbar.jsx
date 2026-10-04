import React from 'react';
import { Store, ChevronDown, Calendar, Bell, Search, User } from 'lucide-react';

export default function Topbar({
  selectedBusiness,
  setSelectedBusiness,
  businesses,
  searchQuery,
  setSearchQuery,
  pendingAlertsCount
}) {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-topbar)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left: Business Selector Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedBusiness.id}
            onChange={(e) => {
              const b = businesses.find(item => item.id === e.target.value);
              if (b) setSelectedBusiness(b);
            }}
            style={{
              appearance: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 36px 8px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none',
              transition: 'border-color var(--transition-fast)'
            }}
          >
            {businesses.map(b => (
              <option key={b.id} value={b.id} style={{ backgroundColor: '#111827', color: '#fff' }}>
                {b.name} ({b.type})
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            color="var(--text-muted)"
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
          <Calendar size={14} />
          <span>{selectedBusiness.date}</span>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search tasks, alerts, or personnel..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px 8px 36px',
            fontSize: '13px',
            color: '#fff',
            outline: 'none'
          }}
        />
      </div>

      {/* Right: Notifications & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-muted)" />
          {pendingAlertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: 'var(--accent-rose)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-dark)'
            }}>
              {pendingAlertsCount}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px'
          }}>
            <User size={16} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Owner</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Operations Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
