export type StudentVerificationStatus =
  | 'VERIFIED'
  | 'ACTIVE'
  | 'PENDING'
  | 'ID_PENDING'
  | 'EMAIL_PENDING'
  | 'UNVERIFIED'
  | 'REJECTED'
  | 'SUSPENDED';

export interface Student {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  rollNumber: string;
  collegeId: string;
  collegeName: string;
  department: string;
  graduationYear: number;
  idCardUrl?: string;
  trustScore: number; // 0 - 100
  strikes: number; // Disciplinary strikes
  status: StudentVerificationStatus;
  verificationStatus?: string;
  joinedAt: string;
  itemsShared: number;
  itemsBorrowed: number;
  co2SavedKg: number;
  phone?: string;
}

export interface StudentFilterParams {
  collegeId?: string;
  status?: StudentVerificationStatus;
  department?: string;
  search?: string;
}
