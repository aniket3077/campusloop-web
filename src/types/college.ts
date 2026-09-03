export type CollegeStatus = 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED';

export interface College {
  id: string;
  name: string;
  code: string;
  domain: string;
  city: string;
  state: string;
  country: string;
  logo?: string;
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  status: CollegeStatus;
  studentCount: number;
  listingCount: number;
  circularityScore: number; // 0 - 100 index
  onboardedAt: string;
  pickupHubs: string[];
}

export interface CreateCollegeDto {
  name: string;
  code: string;
  domain: string;
  city: string;
  state: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  pickupHubs?: string[];
}
