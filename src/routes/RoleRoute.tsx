import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types/auth';

export interface RoleRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!role || !allowedRoles.includes(role)) {
    // If user's role is not authorized, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
