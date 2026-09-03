import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Building2,
  Award,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { studentService } from '../../services/studentService';
import { collegeService } from '../../services/collegeService';
import { Student, StudentVerificationStatus } from '../../types/student';
import { College } from '../../types/college';
import { Table, Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { VERIFICATION_STATUS_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

export const StudentsPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const { success, error, warning } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [collegeFilter, setCollegeFilter] = useState<string>(() => {
    return role === 'COLLEGE_ADMIN' ? (user?.collegeId || 'ALL') : activeCollegeFilter;
  });

  // Modal State for Student Inspection
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, collegesData] = await Promise.all([
        studentService.getStudents({
          search: searchQuery,
          status: statusFilter === 'ALL' ? undefined : (statusFilter as StudentVerificationStatus),
          collegeId: role === 'COLLEGE_ADMIN' ? user?.collegeId : collegeFilter,
        }),
        collegeService.getColleges(),
      ]);
      setStudents(studentsData);
      setColleges(collegesData);
    } catch (err) {
      error('Failed to load students', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, statusFilter, collegeFilter, activeCollegeFilter]);

  const handleUpdateStatus = async (studentId: string, newStatus: StudentVerificationStatus) => {
    try {
      const updated = await studentService.updateVerificationStatus(studentId, newStatus);
      success('Verification Updated', `${updated.fullName}'s account is now ${newStatus}.`);
      if (selectedStudent?.id === studentId) {
        setSelectedStudent(updated);
      }
      loadData();
    } catch (err) {
      error('Update failed', (err as Error).message);
    }
  };

  const handleAddStrike = async (studentId: string) => {
    try {
      const updated = await studentService.addStrike(studentId, 'Violation of campus community guidelines');
      warning('Strike Issued', `Disciplinary strike logged. Current strikes: ${updated.strikes}/3.`);
      if (selectedStudent?.id === studentId) {
        setSelectedStudent(updated);
      }
      loadData();
    } catch (err) {
      error('Failed to issue strike', (err as Error).message);
    }
  };

  const columns: Column<Student>[] = [
    {
      header: 'Student Name & ID',
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
            {s.fullName.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block leading-tight">{s.fullName}</span>
            <span className="text-xs text-slate-500 font-mono">{s.rollNumber}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Campus & Department',
      render: (s) => (
        <div>
          <span className="font-medium text-slate-800 block text-xs">{s.collegeName}</span>
          <span className="text-slate-500 text-[11px] block">{s.department} &bull; Class of {s.graduationYear}</span>
        </div>
      ),
    },
    {
      header: 'Trust / Karma Score',
      render: (s) => (
        <div className="w-28 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-700">{s.trustScore}</span>
            <span className="text-slate-400 text-[10px]">/ 100</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${s.trustScore}%` }}
              className={`h-full rounded-full ${
                s.trustScore >= 80 ? 'bg-emerald-500' : s.trustScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Circulation Activity',
      render: (s) => (
        <div className="text-xs space-y-0.5">
          <span className="text-emerald-700 font-medium block">
            {s.itemsShared} shared &bull; {s.itemsBorrowed} borrowed
          </span>
          <span className="text-slate-400 text-[11px] block">
            {s.co2SavedKg} kg CO₂ saved
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (s) => {
        const key = s.verificationStatus || s.status || 'VERIFIED';
        const conf = VERIFICATION_STATUS_CONFIG[key] ||
          VERIFICATION_STATUS_CONFIG[s.status] || {
            label: String(key),
            badgeClass: 'bg-emerald-100 text-emerald-800',
          };
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${conf.badgeClass}`}>
            {conf.label}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      render: (s) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(s);
              setIsModalOpen(true);
            }}
            icon={<Eye className="w-3.5 h-3.5" />}
          >
            Inspect
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage student campus ID verifications, disciplinary strikes, and peer trust ratings.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by student name, roll #, or dept..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* College Filter (visible if Super Admin) */}
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

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {['ALL', 'VERIFIED', 'PENDING', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'ALL' ? 'All' : st === 'PENDING' ? 'ID Pending' : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Loading student directory..." />
      ) : students.length === 0 ? (
        <EmptyState
          title="No students match the criteria"
          description="Try clearing search filters or changing the campus selection."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('ALL');
            setCollegeFilter('ALL');
          }}
        />
      ) : (
        <Table
          columns={columns}
          data={students}
          keyExtractor={(s) => s.id}
          onRowClick={(s) => {
            setSelectedStudent(s);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Student Details & ID Inspection Modal */}
      {selectedStudent && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Student Profile & ID Verification"
          subtitle={`Roll No: ${selectedStudent.rollNumber} &bull; ${selectedStudent.collegeName}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleAddStrike(selectedStudent.id)}
                icon={<AlertTriangle className="w-3.5 h-3.5" />}
              >
                Issue Strike ({selectedStudent.strikes}/3)
              </Button>

              <div className="flex items-center gap-2">
                {selectedStudent.status === 'PENDING' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedStudent.id, 'REJECTED')}
                      icon={<XCircle className="w-3.5 h-3.5" />}
                    >
                      Reject ID
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedStudent.id, 'VERIFIED')}
                      icon={<CheckCircle className="w-3.5 h-3.5" />}
                    >
                      Approve Student ID
                    </Button>
                  </>
                ) : selectedStudent.status === 'SUSPENDED' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedStudent.id, 'VERIFIED')}
                  >
                    Reinstate Student
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedStudent.id, 'SUSPENDED')}
                  >
                    Suspend Student
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-5">
            {/* Student ID Card Preview */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
                Official Campus ID Card Document:
              </span>
              {selectedStudent.idCardUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-300 max-h-56 bg-slate-900 flex items-center justify-center">
                  <img
                    src={selectedStudent.idCardUrl}
                    alt="Student ID card"
                    className="max-h-56 w-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                    Verified against {selectedStudent.email}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No ID card uploaded yet.</p>
              )}
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Department</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedStudent.department}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Campus Email</span>
                <span className="font-semibold text-slate-800 mt-0.5 block truncate">{selectedStudent.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Trust Score</span>
                <span className="font-bold text-emerald-600 mt-0.5 block">{selectedStudent.trustScore} / 100</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Items Shared</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedStudent.itemsShared} items</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Items Borrowed</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedStudent.itemsBorrowed} items</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">CO₂ Prevented</span>
                <span className="font-bold text-emerald-600 mt-0.5 block">{selectedStudent.co2SavedKg} kg</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
