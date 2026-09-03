import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Building2,
  Mail,
  UserCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { collegeAdminService } from '../../services/collegeAdminService';
import { collegeService } from '../../services/collegeService';
import { CollegeAdminUser } from '../../types/adminExtensions';
import { College } from '../../types/college';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Table, Column } from '../../components/common/Table';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/formatters';

export const CollegeAdminsPage: React.FC = () => {
  const { success, error } = useToast();
  const [admins, setAdmins] = useState<CollegeAdminUser[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    collegeId: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [adminList, collegeList] = await Promise.all([
        collegeAdminService.getCollegeAdmins(),
        collegeService.getColleges(),
      ]);
      setAdmins(adminList);
      setColleges(collegeList);
    } catch (err) {
      error('Failed to load college administrators', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.collegeId) {
      error('Validation error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await collegeAdminService.createCollegeAdmin(newAdmin);
      success('Admin Created', `College admin account created for ${newAdmin.name}`);
      setIsModalOpen(false);
      setNewAdmin({ name: '', email: '', password: '', collegeId: '' });
      loadData();
    } catch (err) {
      error('Failed to create college admin', (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.collegeName && a.collegeName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columns: Column<CollegeAdminUser>[] = [
    {
      header: 'Administrator',
      render: (a) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            {a.name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{a.name}</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              {a.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Campus',
      render: (a) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-slate-800">{a.collegeName || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      header: 'Role / Access',
      render: () => (
        <Badge variant="info">
          <ShieldCheck className="w-3 h-3 mr-1" />
          COLLEGE_ADMIN
        </Badge>
      ),
    },
    {
      header: 'Account Status',
      render: (a) => (
        <Badge variant={a.status === 'ACTIVE' ? 'success' : 'danger'}>
          {a.status === 'ACTIVE' ? (
            <CheckCircle2 className="w-3 h-3 mr-1" />
          ) : (
            <AlertCircle className="w-3 h-3 mr-1" />
          )}
          {a.status}
        </Badge>
      ),
    },
    {
      header: 'Created Date',
      render: (a) => (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          {formatDate(a.createdAt)}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Loading college administrators..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-emerald-600" />
            College Administrators
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Authorize and manage campus-specific administrators for participating colleges.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create College Admin
        </Button>
      </div>

      {/* Filter and Search */}
      <Card className="p-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search administrators by name, email, or college..."
        />
      </Card>

      {/* Table */}
      {filteredAdmins.length === 0 ? (
        <EmptyState
          icon={<UserCheck className="w-8 h-8" />}
          title="No college administrators found"
          description="Create and assign campus administrators to manage verified students and listings."
        />
      ) : (
        <Table columns={columns} data={filteredAdmins} keyExtractor={(a) => a.id} />
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New College Administrator"
      >
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <Input
            label="Full Name *"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            placeholder="e.g. Prof. Rajesh Sharma"
            required
          />
          <Input
            label="Official College Admin Email *"
            type="email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            placeholder="e.g. admin.iitb@campusloop.in"
            required
          />
          <Input
            label="Temporary Password *"
            type="password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            placeholder="At least 6 characters"
            required
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Assigned College Campus *
            </label>
            <select
              value={newAdmin.collegeId}
              onChange={(e) => setNewAdmin({ ...newAdmin, collegeId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              required
            >
              <option value="">Select a college...</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code}) - {c.city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
