export interface CollegeAdminUser {
  id: string;
  name: string;
  email: string;
  role: 'COLLEGE_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  collegeId?: string;
  collegeName?: string;
  collegeCode?: string;
  createdAt: string;
}

export interface PickupLocation {
  id: string;
  collegeId: string;
  name: string;
  building: string;
  description?: string;
  operatingHours: string;
  safetyTips?: string;
  isDefault: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface RevenueMetric {
  summary: {
    totalRevenue: number;
    subscriptionRevenue: number;
    transactionFeeRevenue: number;
    partnershipRevenue: number;
    premiumRevenue: number;
    activeSubscriptions: number;
  };
  monthlyTrends: Array<{
    month: string;
    amount: number;
  }>;
  revenueByCollege: Array<{
    collegeName: string;
    amount: number;
    count: number;
  }>;
  recentTransactions: Array<{
    id: string;
    source: string;
    amount: number;
    description: string;
    collegeName: string;
    date: string;
  }>;
}

export interface CollegeSubscription {
  id: string;
  collegeId: string;
  collegeName: string;
  collegeCode: string;
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
  amount: number;
  billingCycle: string;
}

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'ALL' | 'COLLEGE' | 'USER';
  collegeId?: string;
  collegeName?: string;
  scheduledAt?: string;
  sentAt: string;
  status: string;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  adminId: string;
  adminName: string;
  role: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: any;
  timestamp: string;
}
