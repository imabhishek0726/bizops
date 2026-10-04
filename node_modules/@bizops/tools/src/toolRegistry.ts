import { approvalManager } from './approvalManager.js';

export interface ToolDefinition {
  name: string;
  description: string;
  category: string;
  requiresApproval: boolean;
  execute: (params: Record<string, any>, contextBusinessId?: string) => Promise<{
    success: boolean;
    resultSummary: string;
    approvalRequest?: any;
    trace: string[];
  }>;
}

export const toolRegistry: Record<string, ToolDefinition> = {
  query_kpis: {
    name: 'query_kpis',
    description: 'Inspects real-time KPI metrics, revenue performance, and health breakdown for the active business entity.',
    category: 'Analytics',
    requiresApproval: false,
    execute: async (params, contextBusinessId) => {
      return {
        success: true,
        resultSummary: `Queried metrics snapshot for ${contextBusinessId || 'current business'}. Analyzed Revenue, Orders/Projects, Open Tasks, and Delays.`,
        trace: [
          'Read local business data store',
          'Computed trend percentages vs prior period',
          'Generated multi-factor health vectors'
        ]
      };
    }
  },

  draft_supplier_followup: {
    name: 'draft_supplier_followup',
    description: 'Drafts an urgent follow-up dispatch notice for supplier delayed shipments. Requires human review before sending.',
    category: 'Supply Chain',
    requiresApproval: true,
    execute: async (params) => {
      const supplierName = params.supplierName || 'Jaipur Dairy Co';
      const item = params.item || 'Fresh Milk Shipment';
      const proposedMessage = `URGENT DEMO NOTICE: High-priority follow-up requested for ${supplierName} regarding ${item}. Immediate dispatch confirmation required by 5:00 PM to avoid inventory stockout.`;

      const approval = approvalManager.createApprovalRequest({
        title: `Follow-up with Supplier: ${supplierName}`,
        toolName: 'draft_supplier_followup',
        payload: params,
        targetEntity: supplierName,
        riskAssessment: 'High Impact: Sends follow-up inquiry to vendor logistics lead. DEMO mode ensures zero actual external message transmission.',
        proposedMessage
      });

      return {
        success: true,
        resultSummary: `Action drafted: Follow-up message created for ${supplierName}. Pending user review and approval.`,
        approvalRequest: approval,
        trace: [
          `Prepared dispatch payload for ${supplierName}`,
          'Evaluated risk factor: High (Operational dependency)',
          'Constructed Human-in-the-Loop review request'
        ]
      };
    }
  },

  escalate_customer_ticket: {
    name: 'escalate_customer_ticket',
    description: 'Creates batch resolution vouchers and courtesy responses for unresolved customer complaints.',
    category: 'Customer Support',
    requiresApproval: true,
    execute: async (params) => {
      const batch = params.ticketBatch || 'Customer Complaint Batch';
      const action = params.action || 'Issue Courtesy Voucher';
      const proposedMessage = `DEMO RESOLUTION: Escalating ${batch}. Action: ${action}. Sending customer courtesy apology note and voucher code BIZ-RES-2026.`;

      const approval = approvalManager.createApprovalRequest({
        title: `Escalate Customer Ticket Batch: ${batch}`,
        toolName: 'escalate_customer_ticket',
        payload: params,
        targetEntity: batch,
        riskAssessment: 'Medium Impact: Prepares courtesy response and discount code for 12 pending customer tickets.',
        proposedMessage
      });

      return {
        success: true,
        resultSummary: `Action drafted: Customer ticket resolution batch prepared. Pending user review.`,
        approvalRequest: approval,
        trace: [
          `Aggregated ${batch} complaints`,
          'Generated compensation proposal',
          'Enqueued for Human Approval'
        ]
      };
    }
  },

  reallocate_team_workload: {
    name: 'reallocate_team_workload',
    description: 'Reassigns pending non-critical tasks from an overloaded team member to another available owner.',
    category: 'Team Management',
    requiresApproval: true,
    execute: async (params) => {
      const targetPerson = params.targetPerson || 'Rahul';
      const action = params.action || 'Workload Rebalance';
      const proposedMessage = `DEMO REASSIGNMENT: Moving non-urgent tasks from ${targetPerson} to balance sprint load. Target capacity target: 70%.`;

      const approval = approvalManager.createApprovalRequest({
        title: `Rebalance Workload for ${targetPerson}`,
        toolName: 'reallocate_team_workload',
        payload: params,
        targetEntity: targetPerson,
        riskAssessment: 'Medium Impact: Modifies task ownership in internal task queue.',
        proposedMessage
      });

      return {
        success: true,
        resultSummary: `Workload rebalancing plan generated for ${targetPerson}. Awaiting approval.`,
        approvalRequest: approval,
        trace: [
          `Analyzed capacity threshold for ${targetPerson}`,
          'Identified candidate tasks for reassignment',
          'Created approval modal review object'
        ]
      };
    }
  },

  request_client_approval: {
    name: 'request_client_approval',
    description: 'Drafts an executive approval escalation email for blocked client deliverables or pending SOW sign-offs.',
    category: 'Client Relations',
    requiresApproval: true,
    execute: async (params) => {
      const clientName = params.clientName || 'Apex Corp';
      const deliverable = params.deliverable || 'SOW Sign-off';
      const proposedMessage = `EXECUTIVE ESCALATION: Requesting urgent sign-off from ${clientName} for ${deliverable}. High priority milestone dependency.`;

      const approval = approvalManager.createApprovalRequest({
        title: `Escalate Sign-off: ${clientName}`,
        toolName: 'request_client_approval',
        payload: params,
        targetEntity: clientName,
        riskAssessment: 'High Impact: Prepares client executive outreach email for blocked milestone.',
        proposedMessage
      });

      return {
        success: true,
        resultSummary: `Client sign-off escalation created for ${clientName}. Pending user review.`,
        approvalRequest: approval,
        trace: [
          `Identified blocker on ${deliverable}`,
          `Formulated executive email draft for ${clientName}`,
          'Mounted action review trigger'
        ]
      };
    }
  }
};
