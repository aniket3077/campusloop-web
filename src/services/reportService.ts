import { Report, ReportStatus } from '../types/report';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_REPORTS } from './mockData';

let inMemoryReports = [...MOCK_REPORTS];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const reportService = {
  async getReports(params?: { collegeId?: string; status?: string }): Promise<Report[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<Report[]>('/reports', params);
    }

    await delay(300);
    let result = [...inMemoryReports];

    if (params?.collegeId && params.collegeId !== 'ALL') {
      result = result.filter((r) => r.collegeId === params.collegeId);
    }
    if (params?.status && params.status !== 'ALL') {
      result = result.filter((r) => r.status === params.status);
    }
    return result;
  },

  async resolveReport(
    id: string,
    status: ReportStatus,
    resolutionNote: string,
    resolvedBy: string
  ): Promise<Report> {
    if (!USE_MOCK_DATA) {
      return apiClient.patch<Report>(`/reports/${id}/resolve`, { status, resolutionNote, resolvedBy });
    }

    await delay(300);
    const idx = inMemoryReports.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Report not found');

    inMemoryReports[idx] = {
      ...inMemoryReports[idx],
      status,
      resolutionNote,
      resolvedBy,
      resolvedAt: new Date().toISOString(),
    };
    return inMemoryReports[idx];
  },
};
