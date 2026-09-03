import { ListingCategory, ListingCondition, ListingStatus, ListingType } from '../types/listing';
import { StudentVerificationStatus } from '../types/student';
import { TransactionStatus } from '../types/transaction';
import { ReportPriority, ReportStatus } from '../types/report';

export const APP_NAME = 'CampusLoop';
export const APP_TAGLINE = 'Circular Resource-Sharing for Campuses';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'campusloop_access_token',
  REFRESH_TOKEN: 'campusloop_refresh_token',
  USER_DATA: 'campusloop_user_data',
  ACTIVE_COLLEGE: 'campusloop_active_college_filter',
  THEME: 'campusloop_theme',
};

export const CATEGORY_CONFIG: Record<
  ListingCategory,
  { label: string; bg: string; text: string; border: string }
> = {
  TEXTBOOKS: {
    label: 'Textbooks & Notes',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  ELECTRONICS: {
    label: 'Calculators & Electronics',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  LAB_EQUIPMENT: {
    label: 'Lab Coats & Tools',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  BICYCLES_MOBILITY: {
    label: 'Cycles & Mobility',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  DORM_LIVING: {
    label: 'Dorm & Room Essentials',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  SPORTS_HOBBIES: {
    label: 'Sports & Music',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  OTHER: {
    label: 'General Resources',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
};

export const CONDITION_CONFIG: Record<
  ListingCondition,
  { label: string; badgeClass: string }
> = {
  NEW: { label: 'Brand New', badgeClass: 'bg-emerald-100 text-emerald-800' },
  LIKE_NEW: { label: 'Like New', badgeClass: 'bg-teal-100 text-teal-800' },
  GOOD: { label: 'Good Condition', badgeClass: 'bg-blue-100 text-blue-800' },
  FAIR: { label: 'Fair / Usable', badgeClass: 'bg-amber-100 text-amber-800' },
};

export const LISTING_TYPE_CONFIG: Record<
  ListingType,
  { label: string; badgeClass: string }
> = {
  FREE_GIVEAWAY: { label: 'Free Giveaway (Pay-it-forward)', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  BORROW_RENT: { label: 'Borrow / Micro-Rent', badgeClass: 'bg-sky-100 text-sky-800 border-sky-300' },
  SELL_FAIR_PRICE: { label: 'Fair Resale', badgeClass: 'bg-purple-100 text-purple-800 border-purple-300' },
};

export const LISTING_STATUS_CONFIG: Record<
  ListingStatus,
  { label: string; badgeClass: string }
> = {
  ACTIVE: { label: 'Active', badgeClass: 'bg-emerald-100 text-emerald-800' },
  PENDING_REVIEW: { label: 'Pending Review', badgeClass: 'bg-amber-100 text-amber-800' },
  FLAGGED: { label: 'Flagged', badgeClass: 'bg-rose-100 text-rose-800' },
  COMPLETED: { label: 'Transferred', badgeClass: 'bg-slate-100 text-slate-800' },
  ARCHIVED: { label: 'Archived', badgeClass: 'bg-slate-100 text-slate-600' },
};

export const VERIFICATION_STATUS_CONFIG: Record<
  StudentVerificationStatus,
  { label: string; badgeClass: string }
> = {
  VERIFIED: { label: 'Verified Student', badgeClass: 'bg-emerald-100 text-emerald-800' },
  PENDING: { label: 'ID Pending Review', badgeClass: 'bg-amber-100 text-amber-800' },
  REJECTED: { label: 'ID Rejected', badgeClass: 'bg-rose-100 text-rose-800' },
  SUSPENDED: { label: 'Suspended Account', badgeClass: 'bg-slate-200 text-slate-800' },
};

export const TRANSACTION_STATUS_CONFIG: Record<
  TransactionStatus,
  { label: string; badgeClass: string }
> = {
  REQUESTED: { label: 'Requested', badgeClass: 'bg-sky-100 text-sky-800' },
  ESCROW_PAID: { label: 'Escrow Paid', badgeClass: 'bg-indigo-100 text-indigo-800' },
  PICKED_UP: { label: 'Picked Up', badgeClass: 'bg-amber-100 text-amber-800' },
  ACTIVE: { label: 'Currently in Use', badgeClass: 'bg-emerald-100 text-emerald-800' },
  RETURNED: { label: 'Returned to Hub', badgeClass: 'bg-teal-100 text-teal-800' },
  DISPUTED: { label: 'Dispute Flagged', badgeClass: 'bg-rose-100 text-rose-800' },
  COMPLETED: { label: 'Completed Cycle', badgeClass: 'bg-slate-100 text-slate-800' },
  CANCELLED: { label: 'Cancelled', badgeClass: 'bg-slate-200 text-slate-600' },
};

export const REPORT_STATUS_CONFIG: Record<
  ReportStatus,
  { label: string; badgeClass: string }
> = {
  OPEN: { label: 'Open Ticket', badgeClass: 'bg-rose-100 text-rose-800' },
  UNDER_INVESTIGATION: { label: 'Investigating', badgeClass: 'bg-amber-100 text-amber-800' },
  RESOLVED: { label: 'Resolved', badgeClass: 'bg-emerald-100 text-emerald-800' },
  DISMISSED: { label: 'Dismissed', badgeClass: 'bg-slate-100 text-slate-700' },
};

export const REPORT_PRIORITY_CONFIG: Record<
  ReportPriority,
  { label: string; badgeClass: string }
> = {
  LOW: { label: 'Low', badgeClass: 'bg-slate-100 text-slate-700' },
  MEDIUM: { label: 'Medium', badgeClass: 'bg-blue-100 text-blue-800' },
  HIGH: { label: 'High', badgeClass: 'bg-amber-100 text-amber-800' },
  CRITICAL: { label: 'Critical Incident', badgeClass: 'bg-rose-100 text-rose-800' },
};
