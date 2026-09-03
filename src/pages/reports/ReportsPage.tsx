import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ShieldAlert,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { reportService } from '../../services/reportService';
import { collegeService } from '../../services/collegeService';
import { Report, ReportStatus, ReportPriority } from '../../types/report';
import { College } from '../../types/college';
import { Table, Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { REPORT_STATUS_CONFIG, REPORT_PRIORITY_CONFIG } from '../../utils/constants';
import { formatDate, formatRelativeTime } from '../../utils/formatters';

export const ReportsPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const { success, error } = useToast();

  const [reports, setReports] = useState<Report[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [collegeFilter, setCollegeFilter] = useState<string>(() => {
    return role === 'COLLEGE_ADMIN' ? (user?.collegeId || 'ALL') : activeCollegeFilter;
  });

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const [reportsData, collegesData] = await Promise.all([
        reportService.getReports({
          status: statusFilter,
          collegeId: role === 'COLLEGE_ADMIN' ? user?.collegeId : collegeFilter,
        }),
        collegeService.getColleges(),
      ]);
      setReports(reportsData);
      setColleges(collegesData);
    } catch (err) {
      error('Failed to load reports', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [statusFilter, collegeFilter, activeCollegeFilter]);

  const handleResolve = async (newStatus: ReportStatus) => {
    if (!selectedReport) return;
    try {
      await reportService.resolveReport(
        selectedReport.id,
        newStatus,
        resolutionNote || 'Resolved according to campus community safety policies.',
        user?.name || 'Administrator'
      );
      success('Report Updated', `Ticket ${selectedReport.id} marked as ${newStatus}.`);
      setIsModalOpen(false);
      setResolutionNote('');
      loadReports();
    } catch (err) {
      error('Update failed', (err as Error).message);
    }
  };

  const columns: Column<Report>[] = [
    {
      header: 'Incident Target',
      render: (r) => (
        <div>
          <span className="font-semibold text-slate-900 text-xs block">{r.targetTitle}</span>
          <span className="text-[11px] text-slate-400">Target Type: {r.targetType}</span>
        </div>
      ),
    },
    {
      header: 'Reported Parties',
      render: (r) => (
        <div className="text-xs space-y-0.5">
          <span className="text-slate-500 block text-[11px]">By: {r.reportedByName}</span>
          <span className="text-rose-600 font-semibold block text-[11px]">Accused: {r.accusedName}</span>
        </div>
      ),
    },
    {
      header: 'Reason',
      render: (r) => (
        <span className="text-xs font-medium text-slate-700">
          {r.reason.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      header: 'Priority',
      render: (r) => {
        const conf = REPORT_PRIORITY_CONFIG[r.priority];
        return (
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${conf.badgeClass}`}>
            {conf.label}
          </span>
        );
      },
    },
    {
      header: 'Status',
      render: (r) => {
        const conf = REPORT_STATUS_CONFIG[r.status];
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${conf.badgeClass}`}>
            {conf.label}
          </span>
        );
      },
    },
    {
      header: 'Date',
      render: (r) => (
        <span className="text-xs text-slate-500">{formatRelativeTime(r.createdAt)}</span>
      ),
    },
    {
      header: 'Action',
      render: (r) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSelectedReport(r);
            setResolutionNote(r.resolutionNote || '');
            setIsModalOpen(true);
          }}
        >
          Review
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Campus Reports & Disputes
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Resolve student incident reports, damaged resource disputes, and guideline violations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {role === 'SUPER_ADMIN' && (
          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 px-3 py-2 focus:outline-none focus:border-primary-500 shadow-subtle"
          >
            <option value="ALL">All Partner Campuses</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {['ALL', 'OPEN', 'UNDER_INVESTIGATION', 'RESOLVED', 'DISMISSED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL'
                ? 'All Tickets'
                : st === 'UNDER_INVESTIGATION'
                ? 'Investigating'
                : st.charAt(0) + st.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Loading reports..." />
      ) : reports.length === 0 ? (
        <EmptyState
          title="No incident tickets found"
          description="There are currently no reports matching the filter criteria. Good job on campus harmony!"
          actionLabel="Clear Filters"
          onAction={() => {
            setStatusFilter('ALL');
            setCollegeFilter('ALL');
          }}
        />
      ) : (
        <Table
          columns={columns}
          data={reports}
          keyExtractor={(r) => r.id}
          onRowClick={(r) => {
            setSelectedReport(r);
            setResolutionNote(r.resolutionNote || '');
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Review Modal */}
      {selectedReport && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Incident Report Review"
          subtitle={`Ticket ID: ${selectedReport.id} &bull; ${selectedReport.collegeName}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResolve('DISMISSED')}
              >
                Dismiss Report
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResolve('UNDER_INVESTIGATION')}
                >
                  Mark In Progress
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleResolve('RESOLVED')}
                >
                  Resolve & Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Student Complaint Description:
              </span>
              <p className="text-sm text-slate-800 leading-relaxed">{selectedReport.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Reported By</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedReport.reportedByName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Accused Member</span>
                <span className="font-semibold text-rose-700 mt-0.5 block">{selectedReport.accusedName}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Resolution Notes & Action Taken
              </label>
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Detail resolution, penalties applied, or dismissal rationale..."
                className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-primary-500"
                rows={3}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
