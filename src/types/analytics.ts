export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  changePercent: number;
  isPositive: boolean;
  sublabel: string;
}

export interface MonthlyCirculation {
  month: string;
  exchanges: number;
  newUsers: number;
  co2SavedKg: number;
}

export interface CategoryMetric {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CollegeLeaderboardItem {
  rank: number;
  collegeId: string;
  collegeName: string;
  exchangesCount: number;
  wasteDivertedKg: number;
  co2SavedKg: number;
  studentSavingsINR: number;
}
