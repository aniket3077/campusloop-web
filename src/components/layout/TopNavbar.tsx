import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Building2,
  ShieldCheck,
  UserCheck,
  Check,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_COLLEGES } from '../../services/mockData';

export interface TopNavbarProps {
  onOpenSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenSidebar }) => {
  const { user, role, activeCollegeFilter, setActiveCollegeFilter, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Student ID Card Pending',
      message: 'Sneha Chawla (DTU) uploaded student ID for verification.',
      time: '5m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Handoff Dispute Flagged',
      message: 'Godrej Dorm Fridge at Hostel 14 reported damaged.',
      time: '25m ago',
      unread: true,
    },
    {
      id: '3',
      title: 'New College Registered',
      message: 'Manipal Academy submitted campus onboarding request.',
      time: '2h ago',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* College Filter (for Super Admin) or College Badge (for College Admin) */}
        {role === 'SUPER_ADMIN' ? (
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-600">Campus View:</span>
            <select
              value={activeCollegeFilter}
              onChange={(e) => setActiveCollegeFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Partner Campuses (Global)</option>
              {MOCK_COLLEGES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-3 py-1.5 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Campus: {user?.collegeName || 'IIT Bombay'}</span>
          </div>
        )}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Quick Role Switcher for previewing permissions */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => switchRole('SUPER_ADMIN')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              role === 'SUPER_ADMIN'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to Super Admin view"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden md:inline">Super Admin</span>
          </button>
          <button
            onClick={() => switchRole('COLLEGE_ADMIN')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              role === 'COLLEGE_ADMIN'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to College Admin view"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">College Admin</span>
          </button>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-elevated border border-slate-200 py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
                  <p className="text-[11px] text-slate-500">
                    {unreadCount} unread administrative alerts
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-slate-50 transition-colors ${
                      n.unread ? 'bg-primary-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0)}
            </div>
          )}
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-[11px] text-slate-500 leading-tight truncate max-w-[120px]">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
