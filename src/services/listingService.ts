import { Listing, ListingFilterParams, ListingStatus } from '../types/listing';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_LISTINGS } from './mockData';

let inMemoryListings = [...MOCK_LISTINGS];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const listingService = {
  async getListings(params?: ListingFilterParams): Promise<Listing[]> {
    if (!USE_MOCK_DATA) {
      const data = await apiClient.get<any[]>('/items', params as Record<string, string | undefined>);
      return (data || []).map((item: any) => ({
        id: item.id,
        title: item.title || 'Untitled Resource',
        description: item.description || '',
        category: (item.category || 'OTHER') as any,
        condition: (item.condition || 'GOOD') as any,
        type: (item.type || item.transactionType || 'SELL') as any,
        price: Number(item.price) || 0,
        depositAmount: Number(item.depositAmount) || 0,
        images: Array.isArray(item.images) && item.images.length > 0
          ? item.images
          : Array.isArray(item.imageUrls) && item.imageUrls.length > 0
          ? item.imageUrls
          : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'],
        studentId: item.studentId || item.sellerId || item.ownerId || '',
        studentName: item.studentName || item.sellerName || item.ownerName || 'Campus Student',
        studentEmail: item.studentEmail || item.ownerEmail || '',
        collegeId: item.collegeId || '',
        collegeName: item.collegeName || item.university || 'MIT CSN',
        status: (item.status || 'ACTIVE') as any,
        flagReason: item.flagReason,
        viewCount: Number(item.viewCount) || 12,
        timesShared: Number(item.timesShared) || 0,
        pickupLocation: item.pickupLocation || 'Campus Main Hub',
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
      }));
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
      return apiClient.patch<Listing>(`/items/${listingId}/status`, { status, flagReason });
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
      return apiClient.delete(`/items/${listingId}`);
    }

    await delay(300);
    inMemoryListings = inMemoryListings.filter((l) => l.id !== listingId);
  },
};
