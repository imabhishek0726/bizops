import React from 'react';
import { IndianRupee, CheckSquare, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export default function MetricCard({ title, value, subtitle, trend, icon: Icon, color, onClick }) {
  return (
    <div
      className="glass-panel"
      onClick={onClick}
      style={{
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{title}</span>
        <div style={{
          padding: '8px',
          borderRadius: 'var(--radius-md)',
          background: `${color}15`,
          color: color
        }}>
          <Icon size={18} />
        </div>
      </div>

      <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
        {value}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
        {trend && (
          <span style={{
            color: trend.startsWith('+') ? 'var(--accent-emerald)' : 'var(--accent-amber)',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
        <span style={{ color: 'var(--text-dim)' }}>{subtitle}</span>
      </div>
    </div>
  );
}
