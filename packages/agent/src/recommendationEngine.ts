import { BusinessData, Recommendation } from '@bizops/shared';

export function generateTopRecommendation(data: BusinessData): Recommendation {
  const topAlert = data.alerts[0];

  if (data.id === 'sunrise-cafe') {
    return {
      id: 'rec-sc-1',
      title: 'Dispatch Urgent Follow-up to Jaipur Dairy Co',
      reasoning: 'Milk delivery is delayed by 2 days and current raw milk reserves will deplete tomorrow morning during peak breakfast service.',
      impact: 'High',
      owner: 'Rahul (Operations)',
      evidence: [
        'Raw milk inventory: 40L remaining (daily consumption: 65L)',
        'Delivery date shifted from Oct 3 → Oct 5',
        'Rahul currently waiting on supplier dispatch response'
      ],
      actionButtonLabel: 'Review Follow-up Action',
      toolName: 'draft_supplier_followup',
      toolPayload: {
        supplierName: 'Jaipur Dairy Co',
        contactPerson: 'Vikram Singh',
        item: 'Fresh Whole Milk (100L)',
        urgency: 'Immediate'
      },
      requiresApproval: true
    };
  } else {
    return {
      id: 'rec-jt-1',
      title: 'Escalate API Credentials Request to PayQuick Sponsor',
      reasoning: 'PayQuick milestone of ₹1.2L is due in 3 days, but staging deployment is blocked waiting for OAuth API credentials.',
      impact: 'High',
      owner: 'Kavita (Backend Lead)',
      evidence: [
        'Milestone target deadline: Oct 7, 2026',
        'Staging build verified and waiting on API keys for 3 days',
        'Kavita currently running at 88% capacity load'
      ],
      actionButtonLabel: 'Review Sign-off Escalation',
      toolName: 'request_client_approval',
      toolPayload: {
        clientName: 'PayQuick',
        contactPerson: 'Rohan Roy (Lead Eng)',
        deliverable: 'OAuth API Keys & Sandbox Access',
        urgency: 'Critical'
      },
      requiresApproval: true
    };
  }
}
