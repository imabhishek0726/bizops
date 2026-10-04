import React, { useState } from 'react';
import { sunriseCafeData, jaipurTechData } from '@bizops/shared';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import HeroBanner from './components/dashboard/HeroBanner';
import HealthCard from './components/dashboard/HealthCard';
import MetricCard from './components/dashboard/MetricCard';
import ChangesCard from './components/dashboard/ChangesCard';
import AttentionCard from './components/dashboard/AttentionCard';
import OwnershipTable from './components/dashboard/OwnershipTable';
import WaitingCard from './components/dashboard/WaitingCard';
import CopilotPanel from './components/copilot/CopilotPanel';
import ActionReviewModal from './components/modal/ActionReviewModal';
import IssueDetailDrawer from './components/modal/IssueDetailDrawer';

import { IndianRupee, CheckSquare, Clock, AlertTriangle, Activity, Users } from 'lucide-react';

export default function App() {
  const businesses = [sunriseCafeData, jaipurTechData];
  const [selectedBusiness, setSelectedBusiness] = useState(sunriseCafeData);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActionItem, setSelectedActionItem] = useState(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Filter items based on search query if entered
  const filteredChanges = selectedBusiness.changes.filter(c => 
    !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlerts = selectedBusiness.alerts.filter(a =>
    !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = selectedBusiness.tasks.filter(t =>
    !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWaiting = selectedBusiness.waitingItems.filter(w =>
    !searchQuery || w.title.toLowerCase().includes(searchQuery.toLowerCase()) || w.responsiblePerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Layout Area */}
      <div className="main-layout">
        <Topbar
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
          businesses={businesses}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pendingAlertsCount={selectedBusiness.alerts.length}
        />

        <main className="content-area">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              <HeroBanner
                businessData={selectedBusiness}
                onReviewAction={(item) => setSelectedActionItem(item)}
              />

              {/* KPI Cards Row */}
              <div className="kpi-grid">
                <HealthCard businessData={selectedBusiness} />

                <MetricCard
                  title="Revenue Snapshot"
                  value={selectedBusiness.metrics.revenueFormatted}
                  subtitle="vs prior period"
                  trend={`${selectedBusiness.metrics.revenueTrendPercent >= 0 ? '+' : ''}${selectedBusiness.metrics.revenueTrendPercent}%`}
                  icon={IndianRupee}
                  color="var(--accent-emerald)"
                />

                <MetricCard
                  title="Open Tasks"
                  value={selectedBusiness.metrics.openTasks}
                  subtitle={`${selectedBusiness.metrics.overdueTasks} overdue items requiring action`}
                  icon={CheckSquare}
                  color="var(--primary)"
                  onClick={() => setActiveTab('ownership')}
                />

                <MetricCard
                  title="Waiting On"
                  value={selectedBusiness.metrics.waitingItemsCount}
                  subtitle={`${selectedBusiness.waitingItems.filter(w => w.impact === 'high' || w.impact === 'critical').length} high priority blockers`}
                  icon={Clock}
                  color="var(--accent-amber)"
                  onClick={() => setActiveTab('waiting')}
                />
              </div>

              {/* Split Dashboard Grid: What Changed & Needs Attention */}
              <div className="dashboard-split-grid">
                <ChangesCard
                  changes={filteredChanges}
                  onSelectChange={(item) => setSelectedDetailItem(item)}
                />

                <AttentionCard
                  alerts={filteredAlerts}
                  onReviewAction={(item) => setSelectedActionItem(item)}
                  onSelectIssue={(item) => setSelectedDetailItem(item)}
                />
              </div>

              {/* Ownership & Waiting Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <OwnershipTable
                  tasks={filteredTasks}
                  teamWorkload={selectedBusiness.teamWorkload}
                />

                <WaitingCard
                  waitingItems={filteredWaiting}
                  onReviewAction={(item) => setSelectedActionItem(item)}
                />
              </div>
            </>
          )}

          {/* DEDICATED CHANGES TAB */}
          {activeTab === 'changes' && (
            <div style={{ maxWidth: '900px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>What Changed?</h1>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Comprehensive log of operational deltas detected for {selectedBusiness.name}</p>
              </div>
              <ChangesCard
                changes={filteredChanges}
                onSelectChange={(item) => setSelectedDetailItem(item)}
              />
            </div>
          )}

          {/* DEDICATED ATTENTION TAB */}
          {activeTab === 'attention' && (
            <div style={{ maxWidth: '900px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Needs Attention</h1>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Prioritized operational queue with owner attribution and reviewable recommendations</p>
              </div>
              <AttentionCard
                alerts={filteredAlerts}
                onReviewAction={(item) => setSelectedActionItem(item)}
                onSelectIssue={(item) => setSelectedDetailItem(item)}
              />
            </div>
          )}

          {/* DEDICATED OWNERSHIP TAB */}
          {activeTab === 'ownership' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Who's Got the Ball?</h1>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Task distribution, status SLAs, and team capacity breakdown</p>
              </div>
              <OwnershipTable
                tasks={filteredTasks}
                teamWorkload={selectedBusiness.teamWorkload}
              />
            </div>
          )}

          {/* DEDICATED WAITING TAB */}
          {activeTab === 'waiting' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>What Are We Waiting On?</h1>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Blocked items, waiting durations, and unblock action triggers</p>
              </div>
              <WaitingCard
                waitingItems={filteredWaiting}
                onReviewAction={(item) => setSelectedActionItem(item)}
              />
            </div>
          )}

          {/* DEDICATED COPILOT TAB */}
          {activeTab === 'copilot' && (
            <div style={{ height: 'calc(100vh - 128px)' }}>
              <CopilotPanel
                businessData={selectedBusiness}
                onReviewAction={(item) => setSelectedActionItem(item)}
              />
            </div>
          )}
        </main>
      </div>

      {/* Human-in-the-Loop Action Review Modal */}
      {selectedActionItem && (
        <ActionReviewModal
          actionItem={selectedActionItem}
          onClose={() => setSelectedActionItem(null)}
        />
      )}

      {/* Issue Detail Drawer */}
      {selectedDetailItem && (
        <IssueDetailDrawer
          item={selectedDetailItem}
          onClose={() => setSelectedDetailItem(null)}
          onReviewAction={(item) => {
            setSelectedDetailItem(null);
            setSelectedActionItem(item);
          }}
        />
      )}
    </div>
  );
}
