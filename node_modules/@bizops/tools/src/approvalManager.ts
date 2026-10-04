import { ApprovalRequest } from '@bizops/shared';

class ApprovalManager {
  private approvalQueue: ApprovalRequest[] = [];

  createApprovalRequest(params: {
    title: string;
    toolName: string;
    payload: Record<string, any>;
    targetEntity: string;
    riskAssessment: string;
    proposedMessage?: string;
  }): ApprovalRequest {
    const request: ApprovalRequest = {
      id: `appr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: params.title,
      toolName: params.toolName,
      payload: params.payload,
      targetEntity: params.targetEntity,
      riskAssessment: params.riskAssessment,
      proposedMessage: params.proposedMessage,
      status: 'pending',
      createdAt: new Date().toLocaleTimeString()
    };
    this.approvalQueue.push(request);
    return request;
  }

  getPendingRequests(): ApprovalRequest[] {
    return this.approvalQueue.filter(r => r.status === 'pending');
  }

  simulateApproval(id: string): ApprovalRequest | undefined {
    const req = this.approvalQueue.find(r => r.id === id);
    if (req) {
      req.status = 'simulated';
    }
    return req;
  }
}

export const approvalManager = new ApprovalManager();
