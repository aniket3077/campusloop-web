import { AuthResponse, LoginCredentials, User } from '../types/auth';
import { apiClient, USE_MOCK_DATA } from './api';
import { MOCK_SUPER_ADMIN, MOCK_COLLEGE_ADMIN } from './mockData';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!USE_MOCK_DATA) {
      const res = await apiClient.post<AuthResponse>('/auth/admin/login', credentials);
      this.persistSession(res);
      return res;
    }

    await delay(500);

    let user: User = MOCK_SUPER_ADMIN;
    if (credentials.email.includes('iitb') || credentials.email.toLowerCase().includes('college')) {
      user = MOCK_COLLEGE_ADMIN;
    }

    const mockResponse: AuthResponse = {
      user,
      tokens: {
        accessToken: 'mock_jwt_access_token_' + Date.now(),
        refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
      },
    };

    this.persistSession(mockResponse);
    return mockResponse;
  },

  async getCurrentUser(): Promise<User | null> {
    const savedUser = storage.get<User | null>(STORAGE_KEYS.USER_DATA, null);
    if (!savedUser) return null;

    if (!USE_MOCK_DATA) {
      return apiClient.get<User>('/auth/me');
    }

    return savedUser;
  },

  async logout(): Promise<void> {
    if (!USE_MOCK_DATA) {
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // Continue clearing storage
      }
    }
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
  },

  persistSession(authResponse: AuthResponse): void {
    storage.setString(STORAGE_KEYS.ACCESS_TOKEN, authResponse.tokens.accessToken);
    storage.setString(STORAGE_KEYS.REFRESH_TOKEN, authResponse.tokens.refreshToken);
    storage.set(STORAGE_KEYS.USER_DATA, authResponse.user);
  },

  getStoredToken(): string | null {
    return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) || null;
  },

  getStoredUser(): User | null {
    return storage.get<User | null>(STORAGE_KEYS.USER_DATA, null);
  },
};
