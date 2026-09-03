import { apiClient } from './api';
import { PickupLocation } from '../types/adminExtensions';

export const pickupService = {
  async getPickupLocations(collegeId?: string): Promise<PickupLocation[]> {
    return apiClient.get<PickupLocation[]>('/pickup-locations', { collegeId });
  },

  async createPickupLocation(data: {
    name: string;
    building: string;
    description?: string;
    operatingHours?: string;
    safetyTips?: string;
    isDefault?: boolean;
    collegeId?: string;
  }): Promise<PickupLocation> {
    return apiClient.post<PickupLocation>('/pickup-locations', data);
  },

  async updatePickupLocation(
    id: string,
    data: Partial<PickupLocation>
  ): Promise<PickupLocation> {
    return apiClient.put<PickupLocation>(`/pickup-locations/${id}`, data);
  },
};
