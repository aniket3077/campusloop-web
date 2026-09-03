export type Role = 'SUPER_ADMIN' | 'COLLEGE_ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  collegeId?: string;
  collegeName?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
