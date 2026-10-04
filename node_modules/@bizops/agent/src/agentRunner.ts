import { BusinessData } from '@bizops/shared';
import { computeBusinessHealth } from './healthEngine.js';
import { detectOperationalChanges } from './changeDetector.js';
import { rankNeedsAttentionItems } from './priorityEngine.js';
import { generateTopRecommendation } from './recommendationEngine.js';
import { processCopilotQuery } from './copilotEngine.js';

export class OperationsAgent {
  static getHealthSummary(data: BusinessData) {
    return computeBusinessHealth(data);
  }

  static getChanges(data: BusinessData) {
    return detectOperationalChanges(data);
  }

  static getNeedsAttention(data: BusinessData) {
    return rankNeedsAttentionItems(data);
  }

  static getRecommendation(data: BusinessData) {
    return generateTopRecommendation(data);
  }

  static async queryCopilot(query: string, data: BusinessData) {
    return processCopilotQuery(query, data);
  }
}
