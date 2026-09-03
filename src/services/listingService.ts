import { Listing, ListingFilterParams, ListingStatus } from '../types/listing';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_LISTINGS } from './mockData';

let inMemoryListings = [...MOCK_LISTINGS];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const listingService = {
  async getListings(params?: ListingFilterParams): Promise<Listing[]> {
    if (!USE_MOCK_DATA) {
      return apiClient.get<Listing[]>('/listings', params as Record<string, string | undefined>);
    }

    await delay(300);
    let result = [...inMemoryListings];

    if (params?.collegeId && params.collegeId !== 'ALL') {
      result = result.filter((l) => l.collegeId === params.collegeId);
    }
    if (params?.category) {
      result = result.filter((l) => l.category === params.category);
    }
    if (params?.status) {
      result = result.filter((l) => l.status === params.status);
    }
    if (params?.type) {
      result = result.filter((l) => l.type === params.type);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.studentName.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async updateListingStatus(listingId: string, status: ListingStatus, flagReason?: string): Promise<Listing> {
    if (!USE_MOCK_DATA) {
      return apiClient.patch<Listing>(`/listings/${listingId}/status`, { status, flagReason });
    }

    await delay(300);
    const idx = inMemoryListings.findIndex((l) => l.id === listingId);
    if (idx === -1) throw new Error('Listing not found');

    inMemoryListings[idx] = {
      ...inMemoryListings[idx],
      status,
      flagReason: flagReason || (status === 'ACTIVE' ? undefined : inMemoryListings[idx].flagReason),
      updatedAt: new Date().toISOString(),
    };
    return inMemoryListings[idx];
  },

  async deleteListing(listingId: string): Promise<void> {
    if (!USE_MOCK_DATA) {
      return apiClient.delete(`/listings/${listingId}`);
    }

    await delay(300);
    inMemoryListings = inMemoryListings.filter((l) => l.id !== listingId);
  },
};
