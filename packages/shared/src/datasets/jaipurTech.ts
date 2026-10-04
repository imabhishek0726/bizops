import { BusinessData } from '../types.js';

export const jaipurTechData: BusinessData = {
  id: 'jaipur-tech',
  name: 'Jaipur Tech Services',
  type: 'IT Services & Consulting',
  location: 'Malviya Nagar, Jaipur',
  date: 'October 4, 2026',
  metrics: {
    revenue: 482000,
    revenueFormatted: '₹4.82L',
    revenueTrendPercent: 8.2,
    ordersOrProjects: 7,
    ordersOrProjectsLabel: 'Active Projects',
    openTasks: 26,
    overdueTasks: 4,
    waitingItemsCount: 6,
    healthScore: 76,
    previousHealthScore: 82
  },
  changes: [
    {
      id: 'jt-change-1',
      title: 'Project workload increased 22%',
      description: 'Sprint capacity overloaded across PayQuick Gateway & Apex Cloud Migration deliverables.',
      metricDelta: '+22% Sprint Load',
      impact: 'high',
      type: 'workload_shift',
      timestamp: '3 hours ago'
    },
    {
      id: 'jt-change-2',
      title: 'Two client approvals delayed',
      description: 'Apex Corp SOW sign-off & PayQuick staging sign-off pending past due dates.',
      metricDelta: '2 Clients Delayed',
      impact: 'high',
      type: 'approval_block',
      timestamp: 'Yesterday',
      recommendedActionId: 'jt-rec-approval'
    },
    {
      id: 'jt-change-3',
      title: 'One project at risk (PayQuick API Gateway)',
      description: 'Milestone delivery date Oct 7 endangered by pending third-party API keys.',
      metricDelta: 'Milestone Risk',
      impact: 'high',
      type: 'supplier_delay',
      timestamp: 'Today, 08:15 AM'
    },
    {
      id: 'jt-change-4',
      title: 'Support tickets decreased 15%',
      description: 'Post-release bug tickets dropped after v2.4 patch release.',
      metricDelta: '-15% Tickets',
      impact: 'positive',
      type: 'order_spike',
      timestamp: '2 days ago'
    }
  ],
  alerts: [
    {
      id: 'jt-alert-1',
      title: 'PayQuick Milestone at Risk — Pending Client API Credentials',
      priority: 'critical',
      owner: 'Kavita (Backend Lead)',
      detail: 'Staging deployment blocked for 3 days waiting on PayQuick Security Team to issue OAuth keys. Milestone payment of ₹1.2L linked to Oct 7 delivery.',
      evidence: [
        'Milestone deadline: Oct 7, 2026',
        'Waiting on PayQuick Lead Engineer (Rohan Roy) since Oct 1',
        'Kavita allocated 88% capacity to PayQuick'
      ],
      impact: 'Critical: Risk of milestone delay penalty and developer idle time.',
      suggestedAction: 'Send automated milestone delay alert & key request escalation to PayQuick project sponsor.',
      toolCallName: 'request_client_approval',
      toolParams: {
        clientName: 'PayQuick',
        contactPerson: 'Rohan Roy',
        deliverable: 'OAuth Production API Keys',
        urgency: 'Critical'
      }
    },
    {
      id: 'jt-alert-2',
      title: 'Cloud Migration SOW pending Apex Corp VP Approval',
      priority: 'high',
      owner: 'Sanjay (Tech Lead)',
      detail: 'Statement of Work PO #994 sent Sep 29 is pending sign-off. Cloud resources provisioning scheduled for Monday is blocked.',
      evidence: [
        'SOW sent: Sep 29, 2026',
        'Follow-up pending from Sanjay',
        'AWS reserved instances promo expires in 48 hours'
      ],
      impact: 'High: Loss of 15% cloud discount if sign-off missed before Monday.',
      suggestedAction: 'Review and dispatch executive reminder email to Apex Corp VP.',
      toolCallName: 'request_client_approval',
      toolParams: {
        clientName: 'Apex Corp',
        contactPerson: 'Manish Verma (VP Tech)',
        deliverable: 'Cloud Migration SOW PO-994',
        urgency: 'High'
      }
    },
    {
      id: 'jt-alert-3',
      title: 'Tech Lead Sanjay overloaded at 92% capacity',
      priority: 'medium',
      owner: 'Sanjay (Tech Lead)',
      detail: 'Sanjay is assigned to 7 active sprint tasks across 3 client projects.',
      evidence: [
        '92% sprint load',
        '2 tasks overdue',
        'Deepak (Designer) has 45% available bandwidth'
      ],
      impact: 'Medium: Code review bottleneck slowing down frontend team.',
      suggestedAction: 'Reassign documentation and client updates from Sanjay to Deepak.',
      toolCallName: 'reallocate_team_workload',
      toolParams: {
        sourcePerson: 'Sanjay',
        targetPerson: 'Deepak',
        taskTitle: 'Client Staging Demo Preparation'
      }
    }
  ],
  tasks: [
    {
      id: 't-101',
      title: 'Secure cloud deployment SOW sign-off from Apex Corp',
      assignee: 'Sanjay',
      status: 'waiting',
      dueDate: 'Today',
      priority: 'high',
      category: 'Operations',
      workloadContribution: 25
    },
    {
      id: 't-102',
      title: 'Resolve Gateway API latency bottleneck for PayQuick',
      assignee: 'Kavita',
      status: 'in_progress',
      dueDate: 'Today',
      priority: 'critical',
      category: 'Support',
      workloadContribution: 35
    },
    {
      id: 't-103',
      title: 'Prepare Q4 developer resource allocation plan',
      assignee: 'Deepak',
      status: 'pending',
      dueDate: 'Oct 8',
      priority: 'low',
      category: 'Management',
      workloadContribution: 15
    },
    {
      id: 't-104',
      title: 'Finalize mobile app staging deployment scripts',
      assignee: 'Sanjay',
      status: 'overdue',
      dueDate: 'Yesterday',
      priority: 'high',
      category: 'Supply Chain',
      workloadContribution: 30
    },
    {
      id: 't-105',
      title: 'Sign ISO security audit compliance verification',
      assignee: 'Kavita',
      status: 'overdue',
      dueDate: '2 days ago',
      priority: 'medium',
      category: 'Finance',
      workloadContribution: 20
    },
    {
      id: 't-106',
      title: 'Update client status report for weekly sync',
      assignee: 'Deepak',
      status: 'completed',
      dueDate: 'Today',
      priority: 'low',
      category: 'Operations',
      workloadContribution: 10
    }
  ],
  waitingItems: [
    {
      id: 'w-101',
      title: 'Waiting for Apex Corp VP sign-off on AWS Cloud Architecture proposal',
      waitingSince: 'Sep 29, 2026 (5 days)',
      responsiblePerson: 'Sanjay',
      impact: 'high',
      nextExpectedStep: 'VP signed SOW copy returned via DocuSign',
      blockerContext: 'SOW sent Sep 29; AWS reserved instance pricing discount window closing.',
      actionableTool: 'request_client_approval'
    },
    {
      id: 'w-102',
      title: 'Waiting for PayQuick Lead Engineer API key release',
      waitingSince: 'Oct 1, 2026 (3 days)',
      responsiblePerson: 'Kavita',
      impact: 'critical',
      nextExpectedStep: 'Production API credentials shared via secure vault',
      blockerContext: 'Staging deployment completed; awaiting OAuth keys for sandbox integration.',
      actionableTool: 'request_client_approval'
    },
    {
      id: 'w-103',
      title: 'Waiting for client UI design feedback on Mobile App v2',
      waitingSince: 'Oct 2, 2026 (2 days)',
      responsiblePerson: 'Deepak',
      impact: 'high',
      nextExpectedStep: 'Figma approval comments from client product manager',
      blockerContext: 'Design prototype submitted; frontend team waiting before starting React Native code.'
    },
    {
      id: 'w-104',
      title: 'Waiting for vendor invoice sign-off for SSL certificate renewal',
      waitingSince: 'Oct 3, 2026 (1 day)',
      responsiblePerson: 'Sanjay',
      impact: 'medium',
      nextExpectedStep: 'Finance payment clearance',
      blockerContext: 'SSL cert expires in 6 days for api.jaipurtech.io.'
    },
    {
      id: 'w-105',
      title: 'Waiting for candidate contract signature for DevOps Engineer',
      waitingSince: 'Oct 2, 2026 (2 days)',
      responsiblePerson: 'Kavita',
      impact: 'medium',
      nextExpectedStep: 'Signed offer letter returned',
      blockerContext: 'Offer letter extended to Neha Agarwal.'
    },
    {
      id: 'w-106',
      title: 'Waiting for domain DNS record update propagation from GoDaddy',
      waitingSince: 'Oct 4, 2026 (6 hours)',
      responsiblePerson: 'Deepak',
      impact: 'low',
      nextExpectedStep: 'DNS propagation completion across global nameservers',
      blockerContext: 'CNAME record added for client preview portal.'
    }
  ],
  teamWorkload: [
    {
      person: 'Sanjay',
      role: 'Tech Lead & Cloud Architect',
      loadPercentage: 92,
      activeTasksCount: 7,
      isOverloaded: true
    },
    {
      person: 'Kavita',
      role: 'Senior Backend Engineer',
      loadPercentage: 88,
      activeTasksCount: 5,
      isOverloaded: true
    },
    {
      person: 'Deepak',
      role: 'UI/UX Designer & Frontend',
      loadPercentage: 45,
      activeTasksCount: 3,
      isOverloaded: false
    }
  ]
};
