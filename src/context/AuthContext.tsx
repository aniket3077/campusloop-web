import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role, LoginCredentials } from '../types/auth';
import { authService } from '../services/authService';
import { MOCK_SUPER_ADMIN, MOCK_COLLEGE_ADMIN } from '../services/mockData';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

import { USE_MOCK_DATA } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeCollegeFilter: string; // 'ALL' or specific collegeId (used by Super Admin)
  setActiveCollegeFilter: (collegeId: string) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = authService.getStoredUser();
    const token = authService.getStoredToken();
    if (stored && token && (!token.startsWith('mock_') || USE_MOCK_DATA)) {
      return stored;
    }
    return USE_MOCK_DATA ? MOCK_SUPER_ADMIN : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCollegeFilter, setActiveCollegeFilterState] = useState<string>(() => {
    return storage.getString(STORAGE_KEYS.ACTIVE_COLLEGE, 'ALL');
  });

  const setActiveCollegeFilter = useCallback((collegeId: string) => {
    setActiveCollegeFilterState(collegeId);
    storage.setString(STORAGE_KEYS.ACTIVE_COLLEGE, collegeId);
  }, []);

  useEffect(() => {
    // Initial token verification
    const initAuth = async () => {
      try {
        const token = authService.getStoredToken();
        if (!token) {
          setUser(USE_MOCK_DATA ? MOCK_SUPER_ADMIN : null);
          return;
        }

        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else if (USE_MOCK_DATA) {
          setUser(MOCK_SUPER_ADMIN);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore auth session', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener('campusloop:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('campusloop:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      if (res.user.role === 'COLLEGE_ADMIN' && res.user.collegeId) {
        setActiveCollegeFilter(res.user.collegeId);
      } else {
        setActiveCollegeFilter('ALL');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = (newRole: Role) => {
    const updatedUser = newRole === 'SUPER_ADMIN' ? MOCK_SUPER_ADMIN : MOCK_COLLEGE_ADMIN;
    setUser(updatedUser);
    authService.persistSession({
      user: updatedUser,
      tokens: {
        accessToken: 'mock_jwt_' + newRole.toLowerCase(),
        refreshToken: 'mock_jwt_refresh',
      },
    });
    if (newRole === 'COLLEGE_ADMIN' && updatedUser.collegeId) {
      setActiveCollegeFilter(updatedUser.collegeId);
    } else {
      setActiveCollegeFilter('ALL');
    }
  };

  const role = user?.role || null;
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        activeCollegeFilter,
        setActiveCollegeFilter,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
