import { BusinessData } from '@bizops/shared';

export interface HealthBreakdown {
  overallScore: number;
  statusText: 'Healthy' | 'Needs Attention' | 'At Risk';
  deltaText: string;
  explanation: string;
  categories: {
    revenueScore: number;
    workloadScore: number;
    taskScore: number;
    delayScore: number;
    customerScore: number;
  };
}

export function computeBusinessHealth(data: BusinessData): HealthBreakdown {
  const { metrics, tasks, waitingItems, teamWorkload } = data;
  
  // 1. Revenue Score (Base 90 + trend)
  const revenueScore = Math.min(100, Math.max(50, 85 + (metrics.revenueTrendPercent > 0 ? metrics.revenueTrendPercent : metrics.revenueTrendPercent * 2)));

  // 2. Task Score (Base 100 - overdue penalty)
  const overduePenalty = metrics.overdueTasks * 10;
  const taskScore = Math.max(30, 100 - overduePenalty);

  // 3. Delay Score (Base 100 - waiting penalty)
  const highPriorityWaiting = waitingItems.filter(w => w.impact === 'high' || w.impact === 'critical').length;
  const delayScore = Math.max(20, 100 - (waitingItems.length * 5 + highPriorityWaiting * 10));

  // 4. Workload Score (Base 100 - overload penalty)
  const overloadedCount = teamWorkload.filter(w => w.isOverloaded).length;
  const workloadScore = Math.max(40, 100 - overloadedCount * 20);

  // 5. Customer / Alert Score
  const criticalAlerts = data.alerts.filter(a => a.priority === 'critical' || a.priority === 'high').length;
  const customerScore = Math.max(30, 100 - criticalAlerts * 15);

  // Overall Weighted Health Score
  const computedScore = Math.round(
    revenueScore * 0.25 +
    taskScore * 0.25 +
    delayScore * 0.20 +
    workloadScore * 0.15 +
    customerScore * 0.15
  );

  const overallScore = metrics.healthScore || computedScore;
  const diff = overallScore - metrics.previousHealthScore;
  const deltaText = diff >= 0 ? `↑ ${diff} pts from last period` : `↓ ${Math.abs(diff)} points from yesterday`;

  let statusText: 'Healthy' | 'Needs Attention' | 'At Risk' = 'Healthy';
  if (overallScore < 70) statusText = 'At Risk';
  else if (overallScore < 80) statusText = 'Needs Attention';

  let explanation = `Health is at ${overallScore}/100. `;
  if (metrics.overdueTasks > 0 && waitingItems.length > 0) {
    explanation += `Mainly impacted by ${waitingItems[0]?.title.toLowerCase()} and ${metrics.overdueTasks} overdue tasks.`;
  } else {
    explanation += `Operations running within expected parameters.`;
  }

  return {
    overallScore,
    statusText,
    deltaText,
    explanation,
    categories: {
      revenueScore: Math.round(revenueScore),
      workloadScore: Math.round(workloadScore),
      taskScore: Math.round(taskScore),
      delayScore: Math.round(delayScore),
      customerScore: Math.round(customerScore)
    }
  };
}
