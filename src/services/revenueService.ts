import { apiClient } from './api';
import { RevenueMetric, CollegeSubscription } from '../types/adminExtensions';

export const revenueService = {
  async getRevenueMetrics(): Promise<RevenueMetric> {
    return apiClient.get<RevenueMetric>('/revenue');
  },

  async getSubscriptions(): Promise<CollegeSubscription[]> {
    return apiClient.get<CollegeSubscription[]>('/revenue/subscriptions');
  },
};
