import { College, CreateCollegeDto } from '../types/college';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_COLLEGES } from './mockData';

let inMemoryColleges = [...MOCK_COLLEGES];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const collegeService = {
  async getColleges(params?: { search?: string; status?: string }): Promise<College[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<College[]>('/colleges', params);
    }

    await delay(300);
    let result = [...inMemoryColleges];
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }
    if (params?.status && params.status !== 'ALL') {
      result = result.filter((c) => c.status === params.status);
    }
    return result;
  },

  async getCollegeById(id: string): Promise<College | null> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<College>(`/colleges/${id}`);
    }

    await delay(200);
    return inMemoryColleges.find((c) => c.id === id) || null;
  },

  async createCollege(data: CreateCollegeDto): Promise<College> {
    if (!USE_MOCK_DATA) {
      return apiClient.post<College>('/colleges', data);
    }

    await delay(400);
    const newCollege: College = {
      id: `col_${Date.now()}`,
      name: data.name,
      code: data.code.toUpperCase(),
      domain: data.domain.toLowerCase(),
      city: data.city,
      state: data.state,
      country: data.country || 'India',
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      adminName: data.adminName,
      status: 'ACTIVE',
      studentCount: 0,
      listingCount: 0,
      circularityScore: 75,
      onboardedAt: new Date().toISOString(),
      pickupHubs: data.pickupHubs || ['Central Campus Center', 'Main Library'],
    };

    inMemoryColleges.unshift(newCollege);
    return newCollege;
  },

  async updateCollegeStatus(id: string, status: College['status']): Promise<College> {
    if (!USE_MOCK_DATA) {
      return apiClient.patch<College>(`/colleges/${id}/status`, { status });
    }

    await delay(300);
    const idx = inMemoryColleges.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('College not found');

    inMemoryColleges[idx] = { ...inMemoryColleges[idx], status };
    return inMemoryColleges[idx];
  },
};
