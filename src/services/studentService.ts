import { Student, StudentFilterParams, StudentVerificationStatus } from '../types/student';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_STUDENTS } from './mockData';

let inMemoryStudents = [...MOCK_STUDENTS];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const studentService = {
  async getStudents(params?: StudentFilterParams): Promise<Student[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<Student[]>('/students', params as Record<string, string | undefined>);
    }

    await delay(300);
    let result = [...inMemoryStudents];

    if (params?.collegeId && params.collegeId !== 'ALL') {
      result = result.filter((s) => s.collegeId === params.collegeId);
    }
    if (params?.status) {
      result = result.filter((s) => s.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async updateVerificationStatus(studentId: string, status: StudentVerificationStatus): Promise<Student> {
    if (!USE_MOCK_DATA) {
      return apiClient.patch<Student>(`/students/${studentId}/status`, { status });
    }

    await delay(300);
    const idx = inMemoryStudents.findIndex((s) => s.id === studentId);
    if (idx === -1) throw new Error('Student not found');

    inMemoryStudents[idx] = { ...inMemoryStudents[idx], status };
    return inMemoryStudents[idx];
  },

  async addStrike(studentId: string, reason: string): Promise<Student> {
    if (!USE_MOCK_DATA) {
      return apiClient.post<Student>(`/students/${studentId}/strikes`, { reason });
    }

    await delay(300);
    const idx = inMemoryStudents.findIndex((s) => s.id === studentId);
    if (idx === -1) throw new Error('Student not found');

    const newStrikes = inMemoryStudents[idx].strikes + 1;
    const newStatus = newStrikes >= 3 ? 'SUSPENDED' : inMemoryStudents[idx].status;

    inMemoryStudents[idx] = {
      ...inMemoryStudents[idx],
      strikes: newStrikes,
      status: newStatus,
      trustScore: Math.max(0, inMemoryStudents[idx].trustScore - 20),
    };
    return inMemoryStudents[idx];
  },
};
