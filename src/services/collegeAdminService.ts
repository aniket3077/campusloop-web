import { apiClient } from './api';
import { CollegeAdminUser } from '../types/adminExtensions';

export const collegeAdminService = {
  async getCollegeAdmins(): Promise<CollegeAdminUser[]> {
    return apiClient.get<CollegeAdminUser[]>('/college-admins');
  },

  async createCollegeAdmin(data: {
    name: string;
    email: string;
    password: string;
    collegeId: string;
  }): Promise<CollegeAdminUser> {
    return apiClient.post<CollegeAdminUser>('/college-admins', data);
  },

  async assignCollege(adminId: string, collegeId: string): Promise<CollegeAdminUser> {
    return apiClient.patch<CollegeAdminUser>(`/college-admins/${adminId}/assign`, { collegeId });
  },
};
