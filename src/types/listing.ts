export type ListingCategory =
  | 'TEXTBOOKS'
  | 'ELECTRONICS'
  | 'LAB_EQUIPMENT'
  | 'BICYCLES_MOBILITY'
  | 'DORM_LIVING'
  | 'SPORTS_HOBBIES'
  | 'OTHER';

export type ListingCondition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR';

export type ListingType = 'FREE_GIVEAWAY' | 'BORROW_RENT' | 'SELL_FAIR_PRICE';

export type ListingStatus = 'ACTIVE' | 'PENDING_REVIEW' | 'FLAGGED' | 'COMPLETED' | 'ARCHIVED';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: ListingCategory;
  condition: ListingCondition;
  type: ListingType;
  price: number; // 0 for free giveaway, or rental fee/purchase price
  depositAmount: number; // Security deposit held in escrow
  images: string[];
  studentId: string;
  studentName: string;
  studentEmail: string;
  collegeId: string;
  collegeName: string;
  status: ListingStatus;
  flagReason?: string;
  viewCount: number;
  timesShared: number;
  pickupLocation: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingFilterParams {
  category?: ListingCategory;
  type?: ListingType;
  status?: ListingStatus;
  collegeId?: string;
  search?: string;
}
