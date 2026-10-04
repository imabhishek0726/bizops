import React from 'react';
import { Users, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function OwnershipTable({ tasks, teamWorkload }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
            <Users size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Who's Got the Ball?</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Task ownership, current status, and capacity utilization</p>
          </div>
        </div>
      </div>

      {/* Team Capacity Summary Pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {teamWorkload.map((member) => {
          let barColor = 'var(--accent-emerald)';
          if (member.loadPercentage > 80) barColor = 'var(--accent-rose)';
          else if (member.loadPercentage > 65) barColor = 'var(--accent-amber)';

          return (
            <div
              key={member.person}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{member.person}</span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: barColor }}>{member.loadPercentage}% Load</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '8px' }}>{member.role}</div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${member.loadPercentage}%`, background: barColor, borderRadius: '2px' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ownership Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '10px 12px' }}>Owner</th>
              <th style={{ padding: '10px 12px' }}>Work / Task</th>
              <th style={{ padding: '10px 12px' }}>Status</th>
              <th style={{ padding: '10px 12px' }}>Due Date</th>
              <th style={{ padding: '10px 12px' }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              let statusColor = 'var(--text-muted)';
              let StatusIcon = Clock;

              if (task.status === 'overdue') {
                statusColor = 'var(--accent-rose)';
                StatusIcon = AlertCircle;
              } else if (task.status === 'waiting') {
                statusColor = 'var(--accent-amber)';
                StatusIcon = Clock;
              } else if (task.status === 'completed') {
                statusColor = 'var(--accent-emerald)';
                StatusIcon = CheckCircle2;
              }

              let badgeClass = 'badge-low';
              if (task.priority === 'critical') badgeClass = 'badge-critical';
              else if (task.priority === 'high') badgeClass = 'badge-high';
              else if (task.priority === 'medium') badgeClass = 'badge-medium';

              return (
                <tr key={task.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#fff' }}>{task.assignee}</td>
                  <td style={{ padding: '12px', color: 'var(--text-main)' }}>{task.title}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: statusColor, fontWeight: 600, fontSize: '12px', textTransform: 'capitalize' }}>
                      <StatusIcon size={14} />
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: task.status === 'overdue' ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                    {task.dueDate}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${badgeClass}`}>{task.priority}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
