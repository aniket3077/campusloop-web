import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Layers,
  ArrowLeftRight,
  AlertTriangle,
  BarChart3,
  Leaf,
  Settings,
  LogOut,
  X,
  Repeat,
  UserCheck,
  MapPin,
  DollarSign,
  Bell,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, role, logout } = useAuth();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/colleges',
      label: 'Colleges & Campuses',
      icon: GraduationCap,
      roles: ['SUPER_ADMIN'],
    },
    {
      to: '/college-admins',
      label: 'College Admins',
      icon: UserCheck,
      roles: ['SUPER_ADMIN'],
    },
    {
      to: '/students',
      label: 'Students',
      icon: Users,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/listings',
      label: 'Resource Listings',
      icon: Layers,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/transactions',
      label: 'Handoffs & Exchanges',
      icon: ArrowLeftRight,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/reports',
      label: 'Reports & Disputes',
      icon: AlertTriangle,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/pickup-locations',
      label: 'Pickup Hubs',
      icon: MapPin,
      roles: ['COLLEGE_ADMIN', 'SUPER_ADMIN'],
    },
    {
      to: '/analytics',
      label: 'Circulation Analytics',
      icon: BarChart3,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/impact',
      label: 'Circular Impact',
      icon: Leaf,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/revenue',
      label: 'Platform Revenue',
      icon: DollarSign,
      roles: ['SUPER_ADMIN'],
    },
    {
      to: '/notifications',
      label: 'Announcements',
      icon: Bell,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN'],
    },
    {
      to: '/audit-logs',
      label: 'Audit Logs',
      icon: FileText,
      roles: ['SUPER_ADMIN'],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar element */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-primary-950">
              <Repeat className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-white tracking-tight">CampusLoop</span>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">Circular Campus Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Main Menu
            </span>
          </div>

          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white font-semibold shadow-sm shadow-primary-900/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User profile footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0) || 'A'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                    role === 'SUPER_ADMIN'
                      ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                      : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                  }`}
                >
                  {role === 'SUPER_ADMIN' ? 'Super Admin' : user?.collegeName || 'Campus Admin'}
                </span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Log out"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
