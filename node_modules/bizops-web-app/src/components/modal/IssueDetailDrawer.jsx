import React from 'react';
import { X, AlertTriangle, UserCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export default function IssueDetailDrawer({ item, onClose, onReviewAction }) {
  if (!item) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 90,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="glass-panel" style={{
        width: '480px',
        height: '100%',
        borderRadius: 0,
        borderLeft: '1px solid var(--border-subtle)',
        padding: '32px 24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        animation: 'slideInRight 0.25s ease-out'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <span className="badge badge-high" style={{ textTransform: 'uppercase' }}>
              {item.impact || item.priority || 'Operational Detail'}
            </span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            {item.title}
          </h2>

          <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={14} />
            <span>Assigned Owner: <strong style={{ color: '#fff' }}>{item.owner || item.assignee || 'Operations Team'}</strong></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* What Happened */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '6px' }}>
                WHAT HAPPENED
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                {item.description || item.detail || item.blockerContext || 'Operational status shift recorded by intelligence engine.'}
              </div>
            </div>

            {/* Why It Matters */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '6px' }}>
                WHY IT MATTERS
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                {item.impact || 'Directly affects business operations health score and order fulfillment SLAs.'}
              </div>
            </div>

            {/* Evidence List */}
            {item.evidence && item.evidence.length > 0 && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  EVIDENCE & DATA TRACE
                </div>
                <div style={{ background: '#05070e', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {item.evidence.map((ev, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{ev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action Button */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginTop: '24px' }}>
          <button
            className="btn-primary"
            onClick={() => {
              onClose();
              if (onReviewAction) onReviewAction(item);
            }}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            <span>Review Recommended Action</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
