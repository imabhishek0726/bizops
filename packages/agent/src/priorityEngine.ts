import { BusinessData, OperationalAlert } from '@bizops/shared';

export function rankNeedsAttentionItems(data: BusinessData): OperationalAlert[] {
  const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
  return [...data.alerts].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
