import { Transaction, TransactionFilterParams, TransactionStatus } from '../types/transaction';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_TRANSACTIONS } from './mockData';

let inMemoryTransactions = [...MOCK_TRANSACTIONS];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const transactionService = {
  async getTransactions(params?: TransactionFilterParams): Promise<Transaction[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<Transaction[]>('/transactions', params as Record<string, string | undefined>);
    }

    await delay(300);
    let result = [...inMemoryTransactions];

    if (params?.collegeId && params.collegeId !== 'ALL') {
      result = result.filter((t) => t.collegeId === params.collegeId);
    }
    if (params?.status) {
      result = result.filter((t) => t.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.listingTitle.toLowerCase().includes(q) ||
          t.ownerName.toLowerCase().includes(q) ||
          t.borrowerName.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async updateTransactionStatus(
    id: string,
    status: TransactionStatus,
    resolutionNote?: string
  ): Promise<Transaction> {
    if (!USE_MOCK_DATA) {
      return apiClient.patch<Transaction>(`/transactions/${id}/status`, { status, resolutionNote });
    }

    await delay(300);
    const idx = inMemoryTransactions.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Transaction not found');

    inMemoryTransactions[idx] = {
      ...inMemoryTransactions[idx],
      status,
      disputeReason: status !== 'DISPUTED' ? undefined : inMemoryTransactions[idx].disputeReason,
    };
    return inMemoryTransactions[idx];
  },
};
