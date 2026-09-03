export type ReportReason =
  | 'MISREPRESENTED_ITEM'
  | 'DAMAGED_ITEM'
  | 'LATE_RETURN'
  | 'NO_SHOW_PICKUP'
  | 'PROHIBITED_ITEM'
  | 'HARASSMENT'
  | 'OTHER';

export type ReportStatus = 'OPEN' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'DISMISSED';

export type ReportPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Report {
  id: string;
  targetType: 'LISTING' | 'STUDENT' | 'TRANSACTION';
  targetId: string;
  targetTitle: string;
  reportedById: string;
  reportedByName: string;
  accusedId: string;
  accusedName: string;
  collegeId: string;
  collegeName: string;
  reason: ReportReason;
  priority: ReportPriority;
  description: string;
  evidenceUrls?: string[];
  status: ReportStatus;
  resolutionNote?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
}
