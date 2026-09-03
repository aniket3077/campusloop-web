import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  CreditCard,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  Tag,
  Handshake,
  Award,
} from 'lucide-react';
import { revenueService } from '../../services/revenueService';
import { RevenueMetric, CollegeSubscription } from '../../types/adminExtensions';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Table, Column } from '../../components/common/Table';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/formatters';

export const RevenuePage: React.FC = () => {
  const { error } = useToast();
  const [revenueData, setRevenueData] = useState<RevenueMetric | null>(null);
  const [subscriptions, setSubscriptions] = useState<CollegeSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRevenue = async () => {
      setIsLoading(true);
      try {
        const [metricRes, subRes] = await Promise.all([
          revenueService.getRevenueMetrics(),
          revenueService.getSubscriptions(),
        ]);
        setRevenueData(metricRes);
        setSubscriptions(subRes);
      } catch (err) {
        error('Failed to load revenue metrics', (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadRevenue();
  }, []);

  if (isLoading || !revenueData) {
    return <LoadingSpinner size="lg" label="Loading platform revenue & subscriptions..." />;
  }

  const { summary, monthlyTrends, revenueByCollege, recentTransactions } = revenueData;

  const subscriptionColumns: Column<CollegeSubscription>[] = [
    {
      header: 'University / Campus',
      render: (s) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-900">{s.collegeName}</span>
          <span className="text-xs text-slate-400 font-mono">({s.collegeCode})</span>
        </div>
      ),
    },
    {
      header: 'Plan Tier',
      render: (s) => (
        <Badge variant={s.plan === 'ENTERPRISE' ? 'purple' : 'info'}>
          {s.plan}
        </Badge>
      ),
    },
    {
      header: 'Billing Cycle',
      render: (s) => (
        <span className="text-xs text-slate-600 font-medium">{s.billingCycle}</span>
      ),
    },
    {
      header: 'Subscription Value',
      render: (s) => (
        <span className="font-semibold text-emerald-700">₹{s.amount.toLocaleString()}</span>
      ),
    },
    {
      header: 'Status',
      render: (s) => (
        <Badge variant={s.status === 'ACTIVE' ? 'success' : 'default'}>
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {s.status}
        </Badge>
      ),
    },
    {
      header: 'Term Validity',
      render: (s) => (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          Valid until {formatDate(s.endDate)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-emerald-600" />
          Revenue & Platform Monetization
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Comprehensive financial breakdown of university enterprise subscriptions, circular transaction fees, and partner sponsorships.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Platform Revenue"
          value={`₹${summary.totalRevenue.toLocaleString()}`}
          changePercent={24.8}
          isPositive={true}
          sublabel="vs last quarter"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
        />
        <StatCard
          label="College Subscriptions"
          value={`₹${summary.subscriptionRevenue.toLocaleString()}`}
          sublabel={`${summary.activeSubscriptions} active campus licenses`}
          icon={<Building2 className="w-5 h-5 text-sky-600" />}
          iconBg="bg-sky-50"
        />
        <StatCard
          label="Exchange Service Fees"
          value={`₹${summary.transactionFeeRevenue.toLocaleString()}`}
          changePercent={18.2}
          isPositive={true}
          sublabel="Platform micro-fees"
          icon={<CreditCard className="w-5 h-5 text-violet-600" />}
          iconBg="bg-violet-50"
        />
        <StatCard
          label="Partnerships & Grants"
          value={`₹${summary.partnershipRevenue.toLocaleString()}`}
          sublabel="Campus circularity sponsorships"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          iconBg="bg-amber-50"
        />
      </div>

      {/* Revenue Breakdown Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend */}
        <Card className="p-5 lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Monthly Revenue Trajectory
          </h2>
          <div className="grid grid-cols-6 gap-2 pt-2">
            {monthlyTrends.map((m) => (
              <div key={m.month} className="flex flex-col items-center">
                <div className="w-full bg-slate-100 rounded-t-lg h-36 relative flex items-end justify-center p-1">
                  <div
                    className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-t transition-all"
                    style={{ height: `${Math.min(100, Math.max(25, (m.amount / 250000) * 100))}%` }}
                    title={`₹${m.amount.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 mt-2">{m.month}</span>
                <span className="text-[10px] text-slate-500">₹{(m.amount / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue by Campus */}
        <Card className="p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Revenue by Campus
          </h2>
          <div className="space-y-3">
            {revenueByCollege.map((c) => (
              <div key={c.collegeName} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-900">{c.collegeName}</span>
                  <span className="font-bold text-emerald-700">₹{c.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>{c.count} transactions</span>
                  <span>{Math.round((c.amount / (summary.totalRevenue || 1)) * 100)}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* College Subscriptions Table */}
      <Card className="p-5 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          University Subscriptions & Enterprise Licensing
        </h2>
        <Table columns={subscriptionColumns} data={subscriptions} keyExtractor={(s) => s.id} />
      </Card>
    </div>
  );
};
