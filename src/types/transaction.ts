export type TransactionStatus =
  | 'REQUESTED'
  | 'ESCROW_PAID'
  | 'PICKED_UP'
  | 'ACTIVE'
  | 'RETURNED'
  | 'DISPUTED'
  | 'COMPLETED'
  | 'RATED'
  | 'CANCELLED';

export interface Transaction {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCategory: string;
  ownerId: string;
  ownerName: string;
  borrowerId: string;
  borrowerName: string;
  collegeId: string;
  collegeName: string;
  pickupHub: string;
  rentalDurationDays?: number;
  depositHeld: number;
  totalFee: number;
  status: TransactionStatus;
  startDate: string;
  dueDate?: string;
  returnDate?: string;
  disputeReason?: string;
  createdAt: string;
}

export interface TransactionFilterParams {
  status?: TransactionStatus;
  collegeId?: string;
  search?: string;
}
