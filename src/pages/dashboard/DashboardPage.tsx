import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Repeat,
  Leaf,
  Users,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Table, Column } from '../../components/common/Table';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { analyticsService } from '../../services/analyticsService';
import { transactionService } from '../../services/transactionService';
import { Transaction } from '../../types/transaction';
import { KpiMetric, CategoryMetric, MonthlyCirculation, CollegeLeaderboardItem } from '../../types/analytics';
import { TRANSACTION_STATUS_CONFIG } from '../../utils/constants';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';

export const DashboardPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const [kpis, setKpis] = useState<KpiMetric[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyCirculation[]>([]);
  const [categories, setCategories] = useState<CategoryMetric[]>([]);
  const [leaderboard, setLeaderboard] = useState<CollegeLeaderboardItem[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const filterId = role === 'COLLEGE_ADMIN' ? user?.collegeId : activeCollegeFilter;
        const [kpiRes, monthlyRes, catRes, leaderRes, txRes] = await Promise.all([
          analyticsService.getDashboardKpis(filterId),
          analyticsService.getMonthlyCirculation(filterId),
          analyticsService.getCategoryMetrics(filterId),
          analyticsService.getCollegeLeaderboard(),
          transactionService.getTransactions({ collegeId: filterId }),
        ]);

        setKpis(kpiRes);
        setMonthlyData(monthlyRes);
        setCategories(catRes);
        setLeaderboard(leaderRes);
        setRecentTransactions(txRes.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [role, user?.collegeId, activeCollegeFilter]);

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Loading campus circularity dashboard..." />;
  }

  const transactionColumns: Column<Transaction>[] = [
    {
      header: 'Resource Item',
      render: (tx) => (
        <div>
          <span className="font-semibold text-slate-900 block">{tx.listingTitle}</span>
          <span className="text-xs text-slate-500">{tx.listingCategory}</span>
        </div>
      ),
    },
    {
      header: 'Participants',
      render: (tx) => (
        <div className="text-xs">
          <span className="text-slate-900 font-medium">{tx.borrowerName}</span>
          <span className="text-slate-400 mx-1">&larr;</span>
          <span className="text-slate-600">{tx.ownerName}</span>
        </div>
      ),
    },
    {
      header: 'Pickup Hub',
      render: (tx) => (
        <div className="flex items-center text-xs text-slate-600 gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{tx.pickupHub}</span>
        </div>
      ),
    },
    {
      header: 'Deposit / Fee',
      render: (tx) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900">{formatCurrency(tx.totalFee)}</span>
          {tx.depositHeld > 0 && (
            <span className="text-slate-400 block text-[10px]">
              (Escrow: {formatCurrency(tx.depositHeld)})
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      render: (tx) => {
        const conf = TRANSACTION_STATUS_CONFIG[tx.status];
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${conf.badgeClass}`}>
            {conf.label}
          </span>
        );
      },
    },
    {
      header: 'Date',
      render: (tx) => (
        <span className="text-xs text-slate-500">{formatRelativeTime(tx.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Campus Circulation Hub
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {role === 'SUPER_ADMIN'
              ? 'Monitoring multi-campus circular exchange metrics and logistics'
              : `Managing circular sharing operations for ${user?.collegeName || 'Campus'}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
          >
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Review 2 Open Disputes</span>
          </Link>
          <Link
            to="/students?status=PENDING"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-50 text-primary-900 border border-primary-200 text-xs font-semibold hover:bg-primary-100 transition-colors"
          >
            <Users className="w-4 h-4 text-primary-600" />
            <span>ID Approvals</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const icons = [
            <Repeat key={0} className="w-5 h-5 text-primary-600" />,
            <Clock key={1} className="w-5 h-5 text-sky-600" />,
            <Leaf key={2} className="w-5 h-5 text-emerald-600" />,
            <TrendingUp key={3} className="w-5 h-5 text-amber-600" />,
          ];
          const bgs = [
            'bg-primary-50 text-primary-600',
            'bg-sky-50 text-sky-600',
            'bg-emerald-50 text-emerald-600',
            'bg-amber-50 text-amber-600',
          ];

          return (
            <StatCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              changePercent={kpi.changePercent}
              isPositive={kpi.isPositive}
              sublabel={kpi.sublabel}
              icon={icons[idx % icons.length]}
              iconBg={bgs[idx % bgs.length]}
            />
          );
        })}
      </div>

      {/* Middle Grid: Circulation Trend & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circulation Velocity Chart */}
        <Card
          className="lg:col-span-2"
          title="Campus Exchange Velocity (6-Month Trend)"
          subtitle="Total peer handoffs completed across semesters"
          action={
            <Link
              to="/analytics"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Detailed Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-4">
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
              {monthlyData.map((item) => {
                const maxExchanges = 750;
                const heightPercent = Math.round((item.exchanges / maxExchanges) * 100);
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.exchanges}
                    </div>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg h-36 flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-primary-600 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{item.month}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400">Peak Velocity</span>
                <p className="text-sm font-bold text-slate-800">August (680 handoffs)</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Average Turnaround</span>
                <p className="text-sm font-bold text-slate-800">4.2 hours to pickup</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Circulation Multiplier</span>
                <p className="text-sm font-bold text-emerald-600">3.6x reuse cycles</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Circular Resource Category Share */}
        <Card
          title="Circulating Resource Share"
          subtitle="Top shared product categories"
          action={
            <Link
              to="/listings"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-3.5">
            {categories.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{cat.category}</span>
                  <span className="font-bold text-slate-900">{cat.percentage}% ({cat.count})</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
              <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-800 leading-relaxed">
                <strong className="font-semibold">Textbooks & Calculators</strong> account for over 59% of all recirculated items, preventing massive end-of-semester discarding.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Recent Handoffs & Campus Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Campus Handoffs</h2>
            <Link
              to="/transactions"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All Transactions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <Table
            columns={transactionColumns}
            data={recentTransactions}
            keyExtractor={(tx) => tx.id}
          />
        </div>

        {/* Campus Leaderboard */}
        <Card
          title="Campus Sustainability Leaderboard"
          subtitle="Top colleges by waste diversion"
          action={
            <Link
              to="/impact"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Impact Scorecard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.collegeId}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-primary-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.rank === 1
                        ? 'bg-amber-100 text-amber-800'
                        : item.rank === 2
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">{item.collegeName}</h4>
                    <p className="text-[11px] text-slate-500">
                      {item.exchangesCount} handoffs &bull; {item.co2SavedKg} kg CO₂
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600">
                    {item.wasteDivertedKg} kg
                  </span>
                  <span className="block text-[10px] text-slate-400">diverted</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
