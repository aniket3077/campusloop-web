import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { CollegesPage } from '../pages/colleges/CollegesPage';
import { CollegeAdminsPage } from '../pages/college-admins/CollegeAdminsPage';
import { StudentsPage } from '../pages/students/StudentsPage';
import { ListingsPage } from '../pages/listings/ListingsPage';
import { TransactionsPage } from '../pages/transactions/TransactionsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { PickupLocationsPage } from '../pages/pickup/PickupLocationsPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { ImpactPage } from '../pages/impact/ImpactPage';
import { RevenuePage } from '../pages/revenue/RevenuePage';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { AuditLogsPage } from '../pages/audit/AuditLogsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Business Showcase Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Route */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Super Admin exclusive routes */}
        <Route
          path="/colleges"
          element={
            <RoleRoute allowedRoles={['SUPER_ADMIN']}>
              <CollegesPage />
            </RoleRoute>
          }
        />
        <Route
          path="/college-admins"
          element={
            <RoleRoute allowedRoles={['SUPER_ADMIN']}>
              <CollegeAdminsPage />
            </RoleRoute>
          }
        />
        <Route
          path="/revenue"
          element={
            <RoleRoute allowedRoles={['SUPER_ADMIN']}>
              <RevenuePage />
            </RoleRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <RoleRoute allowedRoles={['SUPER_ADMIN']}>
              <AuditLogsPage />
            </RoleRoute>
          }
        />

        {/* Accessible to both Super Admin & College Admin */}
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/pickup-locations" element={<PickupLocationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
