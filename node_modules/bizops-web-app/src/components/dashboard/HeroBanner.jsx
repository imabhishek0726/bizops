import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { generateTopRecommendation } from '@bizops/agent';

export default function HeroBanner({ businessData, onReviewAction }) {
  const topRec = generateTopRecommendation(businessData);

  return (
    <div className="glass-panel" style={{
      padding: '28px 32px',
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.08))',
      border: '1px solid rgba(99, 102, 241, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
          <Sparkles size={16} />
          <span>BUSINESS OPERATIONS AGENT ACTIVE</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Good morning, Owner.
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Here's what needs your attention today for <strong style={{ color: '#fff' }}>{businessData.name}</strong>.
        </p>
      </div>

      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        maxWidth: '420px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '4px' }}>
          RECOMMENDED NEXT ACTION
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
          {topRec.title}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '12px', lineHeight: '1.4' }}>
          {topRec.reasoning}
        </div>
        <button
          className="btn-primary"
          onClick={() => onReviewAction && onReviewAction(topRec)}
          style={{ padding: '8px 14px', fontSize: '12px', width: '100%', justifyContent: 'center' }}
        >
          <span>Review Action</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
