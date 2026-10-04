import { BusinessData, OperationalChange } from '@bizops/shared';

export function detectOperationalChanges(data: BusinessData): OperationalChange[] {
  return data.changes || [];
}
