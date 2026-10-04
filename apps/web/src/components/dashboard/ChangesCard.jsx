import React from 'react';
import { Activity, ArrowUpRight, AlertCircle, ArrowDownRight, Clock } from 'lucide-react';

export default function ChangesCard({ changes, onSelectChange }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Activity size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>What Changed?</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Operational deltas detected since prior period</p>
          </div>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
          {changes.length} Updates
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {changes.map((item) => {
          let impactClass = 'badge-low';
          let IconComponent = ArrowUpRight;
          let iconColor = 'var(--accent-emerald)';

          if (item.impact === 'high') {
            impactClass = 'badge-critical';
            IconComponent = AlertCircle;
            iconColor = 'var(--accent-rose)';
          } else if (item.impact === 'medium') {
            impactClass = 'badge-high';
            IconComponent = ArrowDownRight;
            iconColor = 'var(--accent-amber)';
          }

          return (
            <div
              key={item.id}
              onClick={() => onSelectChange && onSelectChange(item)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ marginTop: '2px', color: iconColor }}>
                  <IconComponent size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {item.description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '11px', color: 'var(--text-dim)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Delta: {item.metricDelta}</span>
                  </div>
                </div>
              </div>

              <span className={`badge ${impactClass}`} style={{ flexShrink: 0 }}>
                {item.impact}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
