import { apiClient } from './api';
import { PlatformNotification } from '../types/adminExtensions';

export const notificationService = {
  async getNotifications(): Promise<PlatformNotification[]> {
    return apiClient.get<PlatformNotification[]>('/notifications');
  },

  async sendAnnouncement(data: {
    title: string;
    message: string;
    targetAudience: 'ALL' | 'COLLEGE';
    collegeId?: string;
  }): Promise<PlatformNotification> {
    return apiClient.post<PlatformNotification>('/notifications', data);
  },
};
