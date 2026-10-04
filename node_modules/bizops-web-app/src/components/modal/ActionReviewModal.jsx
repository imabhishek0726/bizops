import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, X, Terminal, ArrowRight, Lock } from 'lucide-react';

export default function ActionReviewModal({ actionItem, onClose }) {
  const [isSimulated, setIsSimulated] = useState(false);

  if (!actionItem) return null;

  const targetEntity = actionItem.toolPayload?.supplierName || actionItem.toolPayload?.clientName || actionItem.targetEntity || actionItem.owner || 'Target Entity';
  const toolName = actionItem.toolName || actionItem.toolCallName || 'agent_action_tool';
  const proposedMessage = actionItem.proposedMessage || actionItem.detail || actionItem.reasoning || 'Proposed agent action payload generated for review.';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        padding: '28px',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.15)',
            color: 'var(--accent-amber)'
          }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>Human-in-the-Loop Review</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Approval required before executing agent action</p>
          </div>
        </div>

        {/* Safeguard banner */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          fontSize: '12px',
          color: '#fca5a5',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <Lock size={16} />
          <span><strong>DEMO MODE:</strong> Action will be simulated only. No real email or external write will occur.</span>
        </div>

        {/* Action Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Action Title</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{actionItem.title || actionItem.action}</div>
          </div>

          <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Target Recipient</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{targetEntity}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Tool Function</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{toolName}</div>
            </div>
          </div>

          {/* Draft Message Payload */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>Proposed Message Draft / Payload:</div>
            <div style={{
              background: '#05070e',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#a5b4fc',
              lineHeight: '1.5',
              maxHeight: '120px',
              overflowY: 'auto'
            }}>
              {proposedMessage}
            </div>
          </div>
        </div>

        {/* Simulation Result */}
        {isSimulated ? (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#6ee7b7',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            textAlign: 'center',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            ✓ Action simulated successfully in DEMO mode! Audit trace logged.
          </div>
        ) : null}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {!isSimulated ? (
            <button className="btn-primary" onClick={() => setIsSimulated(true)}>
              <span>Simulate Execution</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button className="btn-primary" onClick={onClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
