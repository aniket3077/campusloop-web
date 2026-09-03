import { KpiMetric, MonthlyCirculation, CategoryMetric, CollegeLeaderboardItem } from '../types/analytics';
import { apiClient, USE_MOCK_DATA } from './api';
import {
  MOCK_DASHBOARD_KPIS,
  MOCK_MONTHLY_DATA,
  MOCK_CATEGORY_METRICS,
  MOCK_LEADERBOARD,
} from './mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyticsService = {
  async getDashboardKpis(collegeId?: string): Promise<KpiMetric[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<KpiMetric[]>('/analytics/kpis', { collegeId });
    }

    await delay(200);
    return MOCK_DASHBOARD_KPIS;
  },

  async getMonthlyCirculation(collegeId?: string): Promise<MonthlyCirculation[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<MonthlyCirculation[]>('/analytics/monthly', { collegeId });
    }

    await delay(200);
    return MOCK_MONTHLY_DATA;
  },

  async getCategoryMetrics(collegeId?: string): Promise<CategoryMetric[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<CategoryMetric[]>('/analytics/categories', { collegeId });
    }

    await delay(200);
    return MOCK_CATEGORY_METRICS;
  },

  async getCollegeLeaderboard(): Promise<CollegeLeaderboardItem[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<CollegeLeaderboardItem[]>('/analytics/leaderboard');
    }

    await delay(200);
    return MOCK_LEADERBOARD;
  },
};
