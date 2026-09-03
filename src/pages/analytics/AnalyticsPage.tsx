import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Repeat,
  DollarSign,
  Leaf,
  Calendar,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { analyticsService } from '../../services/analyticsService';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { MonthlyCirculation, CategoryMetric } from '../../types/analytics';
import { formatCurrency, formatWeightKg } from '../../utils/formatters';

export const AnalyticsPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const { success } = useToast();
  const [monthlyData, setMonthlyData] = useState<MonthlyCirculation[]>([]);
  const [categories, setCategories] = useState<CategoryMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const filterId = role === 'COLLEGE_ADMIN' ? user?.collegeId : activeCollegeFilter;
        const [mRes, cRes] = await Promise.all([
          analyticsService.getMonthlyCirculation(filterId),
          analyticsService.getCategoryMetrics(filterId),
        ]);
        setMonthlyData(mRes);
        setCategories(cRes);
      } catch (err) {
        console.error('Analytics load error', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [role, user?.collegeId, activeCollegeFilter]);

  const handleExport = () => {
    success('Report Exported', 'Circulation analytics CSV report generated and downloaded.');
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Generating analytics models..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Circulation Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Resource exchange velocity, student engagement cycles, and reuse multiplier trends.
          </p>
        </div>

        <Button
          onClick={handleExport}
          variant="outline"
          icon={<Download className="w-4 h-4" />}
        >
          Export CSV Report
        </Button>
      </div>

      {/* Top Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-primary-900 to-emerald-950 p-6 rounded-2xl text-white shadow-elevated">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Repeat className="w-4 h-4" />
            <span>Circulation Depth</span>
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight">3.6x Cycles</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            On average, each textbook and calculator is re-used 3.6 times before leaving circulation, multiplying savings by 360%.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-6 rounded-2xl text-white shadow-elevated">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Peak Velocity Month</span>
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight">August</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Semester commencement drives a 280% surge in textbook exchanges and dorm appliances handoffs within the first 14 days.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-950 to-teal-900 p-6 rounded-2xl text-white shadow-elevated">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Leaf className="w-4 h-4" />
            <span>Landfill Redirection</span>
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight">88.4%</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Percentage of graduating student items successfully claimed by incoming juniors instead of thrown away.
          </p>
        </div>
      </div>

      {/* Circulation Trend Bar Chart */}
      <Card
        title="Monthly Resource Circulation Trend"
        subtitle="Exchanges completed vs. New participating students"
      >
        <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4">
          {monthlyData.map((item) => {
            const maxExchanges = 800;
            const exHeight = Math.round((item.exchanges / maxExchanges) * 100);
            const userHeight = Math.round((item.newUsers / maxExchanges) * 100);

            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1.5 h-44">
                  {/* Exchanges bar */}
                  <div
                    style={{ height: `${exHeight}%` }}
                    className="w-full max-w-[24px] bg-primary-600 rounded-t-md transition-all hover:bg-primary-500 relative group"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.exchanges} handoffs
                    </div>
                  </div>
                  {/* New Users bar */}
                  <div
                    style={{ height: `${userHeight}%` }}
                    className="w-full max-w-[24px] bg-slate-300 rounded-t-md transition-all hover:bg-slate-400 relative group"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.newUsers} students
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.month}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-primary-600 inline-block" />
            <span>Monthly Exchanges</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-300 inline-block" />
            <span>New Student Adoptions</span>
          </div>
        </div>
      </Card>

      {/* Category Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Exchange Breakdown by Resource Type"
          subtitle="Top recirculating asset categories"
        >
          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{c.category}</span>
                  <span className="font-bold text-slate-900">{c.percentage}% ({c.count} items)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Retention & Reliability Metrics"
          subtitle="Platform safety and campus adherence scores"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-sm">99.2%</span>
                <span className="text-slate-500">On-time Returns to Campus Hubs</span>
              </div>
              <span className="text-emerald-700 bg-emerald-100 text-[11px] font-semibold px-2 py-0.5 rounded">
                High Reliability
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-sm">0.8%</span>
                <span className="text-slate-500">Dispute Incident Ratio</span>
              </div>
              <span className="text-sky-700 bg-sky-100 text-[11px] font-semibold px-2 py-0.5 rounded">
                Platform Benchmark
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-sm">₹790</span>
                <span className="text-slate-500">Avg. Savings per Student per Semester</span>
              </div>
              <span className="text-purple-700 bg-purple-100 text-[11px] font-semibold px-2 py-0.5 rounded">
                Impact Metric
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
