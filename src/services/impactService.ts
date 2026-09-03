import { EnvironmentalImpactSummary, ImpactByDepartment } from '../types/impact';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_IMPACT_SUMMARY, MOCK_IMPACT_DEPARTMENTS } from './mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const impactService = {
  async getImpactSummary(collegeId?: string): Promise<EnvironmentalImpactSummary> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<EnvironmentalImpactSummary>('/impact/summary', { collegeId });
    }

    await delay(200);
    return MOCK_IMPACT_SUMMARY;
  },

  async getImpactByDepartment(collegeId?: string): Promise<ImpactByDepartment[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<ImpactByDepartment[]>('/impact/departments', { collegeId });
    }

    await delay(200);
    return MOCK_IMPACT_DEPARTMENTS;
  },
};
