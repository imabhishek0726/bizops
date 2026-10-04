import React from 'react';
import { Clock, AlertCircle, ArrowRight, UserCheck, HelpCircle } from 'lucide-react';

export default function WaitingCard({ waitingItems, onReviewAction }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <Clock size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>What Are We Waiting On?</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Blocked operational work awaiting external response or sign-off</p>
          </div>
        </div>

        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          {waitingItems.length} Blocked Items
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {waitingItems.map((item) => {
          let impactBadge = 'badge-low';
          if (item.impact === 'critical') impactBadge = 'badge-critical';
          else if (item.impact === 'high') impactBadge = 'badge-high';
          else if (item.impact === 'medium') impactBadge = 'badge-medium';

          return (
            <div
              key={item.id}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`badge ${impactBadge}`}>{item.impact} impact</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {item.waitingSince}
                  </span>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                  {item.title}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '10px' }}>
                  {item.blockerContext}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-dim)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>Next Expected Step: </span>
                  {item.nextExpectedStep}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <UserCheck size={14} />
                  Owner: <strong style={{ color: '#fff' }}>{item.responsiblePerson}</strong>
                </span>

                {item.actionableTool && (
                  <button
                    className="btn-secondary"
                    onClick={() => onReviewAction && onReviewAction(item)}
                    style={{ padding: '6px 10px', fontSize: '11px' }}
                  >
                    <span>Unblock Action</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
