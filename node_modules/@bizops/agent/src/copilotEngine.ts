import { BusinessData, CopilotMessage } from '@bizops/shared';
import { computeBusinessHealth } from './healthEngine.js';
import { generateTopRecommendation } from './recommendationEngine.js';
import { toolRegistry } from '@bizops/tools';

export async function processCopilotQuery(
  query: string,
  data: BusinessData
): Promise<CopilotMessage> {
  const q = query.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const health = computeBusinessHealth(data);
  const rec = generateTopRecommendation(data);

  let responseText = '';
  let evidence: string[] = [];
  let reasoning: string[] = [];
  let toolTrace: any = undefined;

  if (q.includes('doing') || q.includes('status') || q.includes('how are we')) {
    responseText = `Your business operations are overall ${health.statusText.toUpperCase()} with an Operations Health score of ${health.overallScore}/100. Key revenue is tracking at ${data.metrics.revenueFormatted} (${data.metrics.revenueTrendPercent >= 0 ? '+' : ''}${data.metrics.revenueTrendPercent}% vs prior period).`;
    evidence = [
      `Revenue: ${data.metrics.revenueFormatted}`,
      `${data.metrics.ordersOrProjectsLabel}: ${data.metrics.ordersOrProjects}`,
      `Open Tasks: ${data.metrics.openTasks} (${data.metrics.overdueTasks} overdue)`,
      `Waiting Items: ${data.metrics.waitingItemsCount}`
    ];
    reasoning = [
      `Health score is at ${health.overallScore}/100 (${health.deltaText}).`,
      `Revenue growth remains strong, but ${data.metrics.overdueTasks} overdue items require attention.`
    ];
    toolTrace = {
      toolName: 'query_kpis',
      input: { businessId: data.id },
      status: 'simulated',
      resultSummary: 'Executed KPI query engine across revenue, order throughput, and open task queues.'
    };
  } else if (q.includes('change') || q.includes('changed') || q.includes('what happened')) {
    responseText = `Here are the primary operational changes detected for ${data.name} since the previous period:`;
    evidence = data.changes.map(c => `${c.title} — ${c.description}`);
    reasoning = [
      `The most critical change is: "${data.changes[1]?.title || data.changes[0]?.title}".`,
      `This change impacts overall operations health and resource availability.`
    ];
  } else if (q.includes('attention') || q.includes('alert') || q.includes('issue')) {
    const topAlerts = data.alerts;
    responseText = `There are ${topAlerts.length} key operational items requiring your attention today:`;
    evidence = topAlerts.map(a => `[${a.priority.toUpperCase()}] ${a.title} (Owner: ${a.owner})`);
    reasoning = [
      `Top priority issue: ${topAlerts[0]?.title}.`,
      `Estimated impact: ${topAlerts[0]?.impact}`
    ];
  } else if (q.includes('health') || q.includes('score') || q.includes('why')) {
    responseText = `Operations Health score is currently ${health.overallScore}/100 (${health.deltaText}).`;
    evidence = [
      `Revenue Health: ${health.categories.revenueScore}/100`,
      `Task Health: ${health.categories.taskScore}/100 (${data.metrics.overdueTasks} overdue)`,
      `Delay Health: ${health.categories.delayScore}/100 (${data.metrics.waitingItemsCount} waiting)`,
      `Workload Health: ${health.categories.workloadScore}/100`,
      `Customer Health: ${health.categories.customerScore}/100`
    ];
    reasoning = [
      health.explanation
    ];
  } else if (q.includes('overloaded') || q.includes('who') || q.includes('ball') || q.includes('ownership')) {
    const overloaded = data.teamWorkload.filter(w => w.isOverloaded);
    responseText = overloaded.length > 0 
      ? `Team capacity alert: ${overloaded.map(o => `${o.person} (${o.loadPercentage}%)`).join(', ')} is currently overloaded.`
      : `Team workload is evenly distributed across all active members.`;
    evidence = data.teamWorkload.map(w => `${w.person} (${w.role}): ${w.loadPercentage}% capacity, ${w.activeTasksCount} active tasks`);
    reasoning = [
      `High workload increases risk of task delays and missed SLAs.`,
      `Consider reallocating non-essential tasks to members with lower bandwidth utilization.`
    ];
  } else if (q.includes('waiting') || q.includes('block') || q.includes('pending')) {
    responseText = `You currently have ${data.waitingItems.length} operational items in a WAITING state:`;
    evidence = data.waitingItems.map(w => `${w.title} — Waiting since ${w.waitingSince} (Owner: ${w.responsiblePerson})`);
    reasoning = [
      `Highest impact blocker: ${data.waitingItems[0]?.title}.`,
      `Expected next step: ${data.waitingItems[0]?.nextExpectedStep}.`
    ];
  } else {
    // Default fallback to "What should I do first?"
    responseText = `Your highest-impact recommended action today is: "${rec.title}".`;
    evidence = rec.evidence;
    reasoning = [
      rec.reasoning,
      `Impact: ${rec.impact} | Owner: ${rec.owner}`
    ];
  }

  // Execute tool call if recommendation is attached or query demands action
  if (!toolTrace && rec.toolName && toolRegistry[rec.toolName]) {
    const toolExec = await toolRegistry[rec.toolName].execute(rec.toolPayload, data.id);
    toolTrace = {
      toolName: rec.toolName,
      input: rec.toolPayload,
      status: toolRegistry[rec.toolName].requiresApproval ? 'seeking_approval' : 'simulated',
      resultSummary: toolExec.resultSummary
    };
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'copilot',
    text: responseText,
    timestamp,
    evidence,
    reasoning,
    actionRecommendation: rec,
    toolCallTrace: toolTrace
  };
}
