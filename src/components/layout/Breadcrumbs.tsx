import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_NAME_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  colleges: 'Colleges & Campuses',
  students: 'Student Directory',
  listings: 'Campus Listings',
  transactions: 'Transactions & Handoffs',
  reports: 'Reports & Disputes',
  analytics: 'Platform Analytics',
  impact: 'Sustainability & Circular Impact',
  settings: 'System & Campus Settings',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-primary-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>

      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = ROUTE_NAME_MAP[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-800">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-primary-600 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
