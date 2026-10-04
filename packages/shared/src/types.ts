export type BusinessType = 'Restaurant' | 'IT Services & Consulting';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'waiting' | 'overdue' | 'completed';
export type ImpactLevel = 'positive' | 'high' | 'medium' | 'low';

export interface BusinessMetrics {
  revenue: number;
  revenueFormatted: string;
  revenueTrendPercent: number; // e.g., +12.4
  ordersOrProjects: number;
  ordersOrProjectsLabel: string; // e.g. "Orders" or "Active Projects"
  openTasks: number;
  overdueTasks: number;
  waitingItemsCount: number;
  healthScore: number;
  previousHealthScore: number;
}

export interface OperationalTask {
  id: string;
  title: string;
  assignee: string; // "Rahul", "Priya", "Amit", etc.
  status: TaskStatus;
  dueDate: string; // e.g., "Today", "Tomorrow", "Oct 5"
  priority: PriorityLevel;
  category: 'Operations' | 'Support' | 'Management' | 'Supply Chain' | 'Finance';
  workloadContribution: number; // % contribution to person's load
}

export interface OperationalChange {
  id: string;
  title: string;
  description: string;
  metricDelta: string;
  impact: ImpactLevel;
  type: 'order_spike' | 'supplier_delay' | 'support_decline' | 'workload_shift' | 'approval_block';
  timestamp: string;
  recommendedActionId?: string;
}

export interface OperationalAlert {
  id: string;
  title: string;
  priority: PriorityLevel;
  owner: string;
  detail: string;
  evidence: string[];
  impact: string;
  suggestedAction: string;
  toolCallName?: string;
  toolParams?: Record<string, any>;
}

export interface WaitingItem {
  id: string;
  title: string;
  waitingSince: string;
  responsiblePerson: string;
  impact: PriorityLevel;
  nextExpectedStep: string;
  blockerContext: string;
  actionableTool?: string;
}

export interface WorkloadOverview {
  person: string;
  role: string;
  loadPercentage: number;
  activeTasksCount: number;
  isOverloaded: boolean;
}

export interface BusinessData {
  id: string;
  name: string;
  type: BusinessType;
  location: string;
  date: string;
  metrics: BusinessMetrics;
  tasks: OperationalTask[];
  changes: OperationalChange[];
  alerts: OperationalAlert[];
  waitingItems: WaitingItem[];
  teamWorkload: WorkloadOverview[];
}

export interface Recommendation {
  id: string;
  title: string;
  reasoning: string;
  impact: 'High' | 'Medium' | 'Low';
  owner: string;
  evidence: string[];
  actionButtonLabel: string;
  toolName: string;
  toolPayload: Record<string, any>;
  requiresApproval: boolean;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  evidence?: string[];
  reasoning?: string[];
  actionRecommendation?: Recommendation;
  toolCallTrace?: {
    toolName: string;
    input: Record<string, any>;
    status: 'proposed' | 'simulated' | 'seeking_approval';
    resultSummary: string;
  };
}

export interface ApprovalRequest {
  id: string;
  title: string;
  toolName: string;
  payload: Record<string, any>;
  targetEntity: string;
  riskAssessment: string;
  proposedMessage?: string;
  status: 'pending' | 'approved' | 'rejected' | 'simulated';
  createdAt: string;
}
