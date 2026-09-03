import { apiClient } from './api';
import { AuditLogItem } from '../types/adminExtensions';

export const auditService = {
  async getAuditLogs(params?: { search?: string; entityType?: string; action?: string }): Promise<AuditLogItem[]> {
    return apiClient.get<AuditLogItem[]>('/audit-logs', params as Record<string, string | undefined>);
  },
};
