import React, { useState } from 'react';
import { AlertTriangle, UserCheck, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AttentionCard({ alerts, onReviewAction, onSelectIssue }) {
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterPriority === 'all') return true;
    return a.priority === filterPriority;
  });

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-rose)' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Needs Attention</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Prioritized operational risks and required owner actions</p>
          </div>
        </div>

        {/* Priority Filter Chips */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {['all', 'critical', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              style={{
                background: filterPriority === p ? 'var(--primary)' : 'transparent',
                color: filterPriority === p ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredAlerts.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}>
            No pending issues in this priority category. You're all caught up!
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            let badgeClass = 'badge-medium';
            if (alert.priority === 'critical') badgeClass = 'badge-critical';
            else if (alert.priority === 'high') badgeClass = 'badge-high';
            else if (alert.priority === 'low') badgeClass = 'badge-low';

            return (
              <div
                key={alert.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: alert.priority === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  border: alert.priority === 'critical' ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className={`badge ${badgeClass}`}>{alert.priority}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <UserCheck size={12} />
                        {alert.owner}
                      </span>
                    </div>
                    <div
                      onClick={() => onSelectIssue && onSelectIssue(alert)}
                      style={{ fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer', textDecoration: 'underline decoration-dotted' }}
                    >
                      {alert.title}
                    </div>
                  </div>

                  {alert.suggestedAction && (
                    <button
                      className="btn-primary"
                      onClick={() => onReviewAction && onReviewAction(alert)}
                      style={{ flexShrink: 0, padding: '8px 12px', fontSize: '12px' }}
                    >
                      <span>Review Action</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {alert.detail}
                </div>

                {alert.evidence && alert.evidence.length > 0 && (
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-dim)', marginBottom: '4px' }}>Evidence:</div>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      {alert.evidence.map((ev, i) => (
                        <li key={i} style={{ marginBottom: '2px' }}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
