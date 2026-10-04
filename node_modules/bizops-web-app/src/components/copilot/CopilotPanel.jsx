import React, { useState } from 'react';
import { Bot, Send, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Terminal, ShieldCheck } from 'lucide-react';
import { processCopilotQuery } from '@bizops/agent';

export default function CopilotPanel({ businessData, onReviewAction }) {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'copilot',
      text: `Hello Owner! I'm your Business Operations Copilot for ${businessData.name}. Ask me any question or pick a suggested query below to inspect real-time metrics, evidence chains, and reviewable actions.`,
      timestamp: 'Just now'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetPrompts = [
    'How are we doing?',
    'What changed today?',
    'What needs attention?',
    'Why is health score down?',
    'Who is overloaded?',
    'What are we waiting for?',
    'What should I do first?'
  ];

  const handleSend = async (textToSend) => {
    const queryText = textToSend || inputQuery;
    if (!queryText.trim() || isProcessing) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsProcessing(true);

    try {
      const copilotResponse = await processCopilotQuery(queryText, businessData);
      setMessages(prev => [...prev, copilotResponse]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'copilot',
          text: 'Something went wrong while loading this view. Please try again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '600px',
      overflow: 'hidden'
    }}>
      {/* Copilot Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(99, 102, 241, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>AI Operations Copilot</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Evidence-based reasoning for {businessData.name}</p>
          </div>
        </div>

        <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <Sparkles size={13} />
          Live Agent Ready
        </span>
      </div>

      {/* Preset Prompt Chips */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        background: 'rgba(0,0,0,0.1)'
      }}>
        {presetPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: msg.sender === 'user' ? '80%' : '90%',
              background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--primary), var(--primary-hover))' : 'rgba(255, 255, 255, 0.03)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              color: '#fff',
              fontSize: '13px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', opacity: 0.7 }}>
              <span style={{ fontWeight: 700 }}>{msg.sender === 'user' ? 'You' : 'Copilot'}</span>
              <span>{msg.timestamp}</span>
            </div>

            <div style={{ lineHeight: '1.5' }}>{msg.text}</div>

            {/* Evidence Chain */}
            {msg.evidence && msg.evidence.length > 0 && (
              <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>EVIDENCE CHAIN:</div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {msg.evidence.map((ev, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{ev}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reasoning */}
            {msg.reasoning && msg.reasoning.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                💡 {msg.reasoning.join(' ')}
              </div>
            )}

            {/* Tool Trace View */}
            {msg.toolCallTrace && (
              <div style={{ marginTop: '10px', background: '#05070e', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', marginBottom: '4px' }}>
                  <Terminal size={12} />
                  <span>TOOL EXECUTION TRACE: {msg.toolCallTrace.toolName}</span>
                </div>
                <div style={{ color: 'var(--text-dim)' }}>Status: {msg.toolCallTrace.status}</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{msg.toolCallTrace.resultSummary}</div>
              </div>
            )}

            {/* Recommendation Action Button */}
            {msg.actionRecommendation && (
              <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Recommendation Available
                </span>
                <button
                  className="btn-primary"
                  onClick={() => onReviewAction && onReviewAction(msg.actionRecommendation)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  <span>Review Action</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--text-dim)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} className="pulse-indicator" />
            <span>Copilot is reasoning over operational data...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Ask Copilot anything (e.g. 'What should I do first?')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#fff',
            outline: 'none'
          }}
        />
        <button
          className="btn-primary"
          onClick={() => handleSend()}
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.6 : 1 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
