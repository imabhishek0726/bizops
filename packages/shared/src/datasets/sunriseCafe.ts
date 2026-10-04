import { BusinessData } from '../types.js';

export const sunriseCafeData: BusinessData = {
  id: 'sunrise-cafe',
  name: 'Sunrise Café',
  type: 'Restaurant',
  location: 'C-Scheme, Jaipur',
  date: 'October 4, 2026',
  metrics: {
    revenue: 184000,
    revenueFormatted: '₹1.84L',
    revenueTrendPercent: 12.4,
    ordersOrProjects: 428,
    ordersOrProjectsLabel: 'Total Orders',
    openTasks: 18,
    overdueTasks: 3,
    waitingItemsCount: 5,
    healthScore: 82,
    previousHealthScore: 86
  },
  changes: [
    {
      id: 'sc-change-1',
      title: 'Orders increased 18%',
      description: 'Daily breakfast & beverage orders jumped from 362 to 428 units compared to last week.',
      metricDelta: '+18% Orders',
      impact: 'positive',
      type: 'order_spike',
      timestamp: '2 hours ago'
    },
    {
      id: 'sc-change-2',
      title: 'Supplier delivery delayed by 2 days',
      description: 'Fresh dairy and milk shipment from Jaipur Dairy Co moved from Oct 3 → Oct 5 due to logistics bottleneck.',
      metricDelta: '2 Days Late',
      impact: 'high',
      type: 'supplier_delay',
      timestamp: '4 hours ago',
      recommendedActionId: 'sc-rec-supplier'
    },
    {
      id: 'sc-change-3',
      title: 'Support response time worsened',
      description: 'Average resolution time for online order delivery queries increased by 21% (from 14m to 17m).',
      metricDelta: '+21% Delay',
      impact: 'medium',
      type: 'support_decline',
      timestamp: 'Today, 09:30 AM'
    },
    {
      id: 'sc-change-4',
      title: 'Team workload shifted to Rahul',
      description: 'Rahul is managing 5 active high-priority operational tasks, reaching 85% capacity limits.',
      metricDelta: '85% Capacity',
      impact: 'medium',
      type: 'workload_shift',
      timestamp: 'Yesterday'
    }
  ],
  alerts: [
    {
      id: 'sc-alert-1',
      title: 'Supplier delivery delayed — stock risk for tomorrow',
      priority: 'high',
      owner: 'Rahul (Operations)',
      detail: 'Jaipur Dairy Co fresh milk delivery delayed by 2 days. Raw material inventory will hit critical minimum threshold tomorrow morning.',
      evidence: [
        'Delivery expected Oct 3, updated to Oct 5',
        'Current inventory: 40L remaining (Daily burn: 65L)',
        'Rahul contacted vendor; awaiting revised confirmation'
      ],
      impact: 'High: Risk of running out of milk for breakfast beverage peak hours tomorrow morning.',
      suggestedAction: 'Review and approve automated follow-up message to Jaipur Dairy Co dispatcher or trigger backup supplier dispatch.',
      toolCallName: 'draft_supplier_followup',
      toolParams: {
        supplierName: 'Jaipur Dairy Co',
        contactPerson: 'Vikram Singh',
        item: 'Fresh Whole Milk (100L)',
        urgency: 'Immediate'
      }
    },
    {
      id: 'sc-alert-2',
      title: '12 unresolved customer delivery feedback tickets',
      priority: 'medium',
      owner: 'Priya (Customer Support)',
      detail: 'Customer complaints regarding 15-minute morning delivery delays during peak 8 AM hour.',
      evidence: [
        '12 tickets pending resolution',
        'Average queue wait time: 38 minutes',
        'Priya handling both in-store and online customer desk'
      ],
      impact: 'Medium: Risk of negative Google/Zomato reviews if unaddressed today.',
      suggestedAction: 'Send automated resolution courtesy discount code to affected customers.',
      toolCallName: 'escalate_customer_ticket',
      toolParams: {
        ticketBatch: 'Morning Delivery Delay',
        action: 'Issue ₹50 Courtesy Coupon'
      }
    },
    {
      id: 'sc-alert-3',
      title: '3 Overdue operational tasks pending completion',
      priority: 'low',
      owner: 'Amit (Kitchen Manager)',
      detail: 'Weekly kitchen inventory audit and staff shift schedule update overdue by 24 hours.',
      evidence: [
        'Weekend staffing schedule pending update',
        'Ingredient purchase order PO-882 pending approval'
      ],
      impact: 'Low: Administrative delay, may affect weekend shift assignment.',
      suggestedAction: 'Remind Amit to finalize inventory PO sign-off.',
      toolCallName: 'reallocate_team_workload',
      toolParams: {
        targetPerson: 'Amit',
        action: 'Send task reminder'
      }
    }
  ],
  tasks: [
    {
      id: 't-1',
      title: 'Confirm milk supplier delivery timeline',
      assignee: 'Rahul',
      status: 'waiting',
      dueDate: 'Today',
      priority: 'high',
      category: 'Supply Chain',
      workloadContribution: 30
    },
    {
      id: 't-2',
      title: 'Resolve morning delivery customer complaint',
      assignee: 'Priya',
      status: 'in_progress',
      dueDate: 'Today',
      priority: 'medium',
      category: 'Support',
      workloadContribution: 25
    },
    {
      id: 't-3',
      title: 'Review weekly kitchen inventory count',
      assignee: 'Amit',
      status: 'pending',
      dueDate: 'Tomorrow',
      priority: 'low',
      category: 'Operations',
      workloadContribution: 15
    },
    {
      id: 't-4',
      title: 'Update weekend cafe staffing roster',
      assignee: 'Rahul',
      status: 'overdue',
      dueDate: 'Yesterday',
      priority: 'high',
      category: 'Management',
      workloadContribution: 30
    },
    {
      id: 't-5',
      title: 'Approve ingredient purchase order PO-882',
      assignee: 'Amit',
      status: 'overdue',
      dueDate: 'Yesterday',
      priority: 'medium',
      category: 'Finance',
      workloadContribution: 20
    },
    {
      id: 't-6',
      title: 'Sanitize refrigeration unit #2',
      assignee: 'Priya',
      status: 'completed',
      dueDate: 'Today',
      priority: 'low',
      category: 'Operations',
      workloadContribution: 10
    }
  ],
  waitingItems: [
    {
      id: 'w-1',
      title: 'Waiting for Jaipur Dairy Co supplier dispatch confirmation',
      waitingSince: 'Oct 2, 2026 (2 days)',
      responsiblePerson: 'Rahul',
      impact: 'high',
      nextExpectedStep: 'Dispatch confirmation call or message from supplier logistics',
      blockerContext: 'Milk shipment delayed; pending confirmed ETA before scheduling evening backup purchase.',
      actionableTool: 'draft_supplier_followup'
    },
    {
      id: 'w-2',
      title: 'Waiting for customer reply on late delivery apology email',
      waitingSince: 'Oct 3, 2026 (1 day)',
      responsiblePerson: 'Priya',
      impact: 'medium',
      nextExpectedStep: 'Customer response to compensation offer',
      blockerContext: 'Resolution voucher offered; awaiting customer acceptance.',
      actionableTool: 'escalate_customer_ticket'
    },
    {
      id: 'w-3',
      title: 'Waiting for Store Manager sign-off on refrigerator maintenance quote',
      waitingSince: 'Oct 1, 2026 (3 days)',
      responsiblePerson: 'Amit',
      impact: 'medium',
      nextExpectedStep: 'Manager approval of ₹4,500 maintenance expense',
      blockerContext: 'Quote received from CoolCare Technicians; waiting for budget sign-off.'
    },
    {
      id: 'w-4',
      title: 'Waiting for POS vendor terminal software patch',
      waitingSince: 'Oct 3, 2026 (1 day)',
      responsiblePerson: 'Rahul',
      impact: 'low',
      nextExpectedStep: 'Vendor update push over-the-air',
      blockerContext: 'Card reader occasional retry bug reported to Pine Labs.'
    },
    {
      id: 'w-5',
      title: 'Waiting for employee bank details for new barista onboarding',
      waitingSince: 'Oct 2, 2026 (2 days)',
      responsiblePerson: 'Priya',
      impact: 'low',
      nextExpectedStep: 'Passbook copy upload by candidate',
      blockerContext: 'HR documentation incomplete for Rohan Sharma.'
    }
  ],
  teamWorkload: [
    {
      person: 'Rahul',
      role: 'Operations Lead',
      loadPercentage: 85,
      activeTasksCount: 5,
      isOverloaded: true
    },
    {
      person: 'Priya',
      role: 'Customer Support & Front Desk',
      loadPercentage: 65,
      activeTasksCount: 3,
      isOverloaded: false
    },
    {
      person: 'Amit',
      role: 'Kitchen & Inventory Manager',
      loadPercentage: 50,
      activeTasksCount: 3,
      isOverloaded: false
    }
  ]
};
