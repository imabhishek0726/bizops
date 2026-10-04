import React from 'react';
import { HeartPulse, TrendingDown, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { computeBusinessHealth } from '@bizops/agent';

export default function HealthCard({ businessData }) {
  const health = computeBusinessHealth(businessData);
  const score = health.overallScore;

  let gaugeColor = 'var(--accent-emerald)';
  if (score < 70) gaugeColor = 'var(--accent-rose)';
  else if (score < 80) gaugeColor = 'var(--accent-amber)';

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--primary)'
          }}>
            <HeartPulse size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Operations Health</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Multi-factor real-time business health score</p>
          </div>
        </div>

        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: '999px',
          backgroundColor: `${gaugeColor}20`,
          color: gaugeColor,
          border: `1px solid ${gaugeColor}40`
        }}>
          {health.statusText}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', alignItems: 'center' }}>
        {/* Score Gauge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '42px', fontWeight: 800, color: '#fff', lineHeight: '1' }}>
            {score}
            <span style={{ fontSize: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>/100</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: health.deltaText.includes('↓') ? 'var(--accent-rose)' : 'var(--accent-emerald)',
            fontWeight: 600,
            marginTop: '6px'
          }}>
            {health.deltaText.includes('↓') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            <span>{health.deltaText}</span>
          </div>
        </div>

        {/* Breakdown Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>
            <Info size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            {health.explanation}
          </div>

          {/* Progress Bars for dimensions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', fontSize: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '3px' }}>
                <span>Revenue Health</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{health.categories.revenueScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${health.categories.revenueScore}%`, background: 'var(--accent-emerald)', borderRadius: '2px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '3px' }}>
                <span>Task Health</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{health.categories.taskScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${health.categories.taskScore}%`, background: 'var(--primary)', borderRadius: '2px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '3px' }}>
                <span>Delay Impact</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{health.categories.delayScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${health.categories.delayScore}%`, background: 'var(--accent-amber)', borderRadius: '2px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '3px' }}>
                <span>Team Workload</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{health.categories.workloadScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${health.categories.workloadScore}%`, background: 'var(--accent-cyan)', borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
