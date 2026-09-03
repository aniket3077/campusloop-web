import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Building2,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { collegeService } from '../../services/collegeService';
import { College, CreateCollegeDto } from '../../types/college';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/formatters';

export const CollegesPage: React.FC = () => {
  const { success, error } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCollege, setNewCollege] = useState<CreateCollegeDto>({
    name: '',
    code: '',
    domain: '',
    city: '',
    state: '',
    country: 'India',
    contactEmail: '',
    contactPhone: '',
    adminName: '',
    pickupHubs: ['Main Library Desk', 'Student Center'],
  });

  const loadColleges = async () => {
    setIsLoading(true);
    try {
      const data = await collegeService.getColleges({
        search: searchQuery,
        status: statusFilter,
      });
      setColleges(data);
    } catch (err) {
      error('Failed to load campuses', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadColleges();
  }, [searchQuery, statusFilter]);

  const handleCreateCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollege.name || !newCollege.code || !newCollege.domain || !newCollege.adminName) {
      error('Missing fields', 'Please fill in all required campus details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await collegeService.createCollege(newCollege);
      success('Campus Onboarded', `${created.name} successfully configured on CampusLoop.`);
      setIsModalOpen(false);
      setNewCollege({
        name: '',
        code: '',
        domain: '',
        city: '',
        state: '',
        country: 'India',
        contactEmail: '',
        contactPhone: '',
        adminName: '',
        pickupHubs: ['Main Library Desk', 'Student Center'],
      });
      loadColleges();
    } catch (err) {
      error('Onboarding Error', (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (college: College) => {
    const nextStatus = college.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await collegeService.updateCollegeStatus(college.id, nextStatus);
      success('Status Updated', `${college.name} is now marked as ${nextStatus}.`);
      loadColleges();
    } catch (err) {
      error('Update failed', (err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Partner Colleges & Campuses
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure partner universities, domain verifications, campus admins, and designated handoff hubs.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
        >
          Onboard New Campus
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by campus, code, domain, or city..."
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'ACTIVE', 'PENDING_APPROVAL', 'SUSPENDED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st === 'ALL'
                ? 'All Campuses'
                : st === 'PENDING_APPROVAL'
                ? 'Pending Approval'
                : st.charAt(0) + st.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Campus Grid */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Loading colleges..." />
      ) : colleges.length === 0 ? (
        <EmptyState
          title="No campuses found"
          description="No colleges matched your search query or status filter. Try clearing filters or onboarding a new campus."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((college) => {
            const statusBadges = {
              ACTIVE: <Badge variant="success" hasDot>Active Campus</Badge>,
              PENDING_APPROVAL: <Badge variant="warning" hasDot>Pending Verification</Badge>,
              SUSPENDED: <Badge variant="danger" hasDot>Suspended</Badge>,
            };

            return (
              <div
                key={college.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-primary-700 font-bold text-lg overflow-hidden">
                        {college.logo ? (
                          <img
                            src={college.logo}
                            alt={college.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          college.code
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 leading-tight">
                            {college.name}
                          </h3>
                        </div>
                        <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100 inline-block mt-1">
                          @{college.domain}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        Location
                      </span>
                      <span className="font-semibold text-slate-800">
                        {college.city}, {college.state}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Users className="w-3.5 h-3.5" />
                        Verified Students
                      </span>
                      <span className="font-bold text-slate-900">
                        {college.studentCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Circularity Rating
                      </span>
                      <span className="font-bold text-emerald-600">
                        {college.circularityScore} / 100
                      </span>
                    </div>
                  </div>

                  {/* Pickup Hubs */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Designated Handoff Hubs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {college.pickupHubs.map((hub, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <div>{statusBadges[college.status]}</div>
                  <Button
                    onClick={() => handleToggleStatus(college)}
                    variant={college.status === 'ACTIVE' ? 'outline' : 'primary'}
                    size="sm"
                  >
                    {college.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Onboard New Campus Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Onboard New College / University"
        subtitle="Authorize campus domain for student .edu verification and setup hub coordinates"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCollege} className="space-y-4">
          <Input
            label="College / University Full Name"
            placeholder="e.g. Indian Institute of Technology Delhi"
            value={newCollege.name}
            onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Campus Code / Abbr."
              placeholder="e.g. IITD"
              value={newCollege.code}
              onChange={(e) => setNewCollege({ ...newCollege, code: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Student Email Domain"
              placeholder="e.g. iitd.ac.in"
              value={newCollege.domain}
              onChange={(e) => setNewCollege({ ...newCollege, domain: e.target.value.toLowerCase() })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              placeholder="e.g. New Delhi"
              value={newCollege.city}
              onChange={(e) => setNewCollege({ ...newCollege, city: e.target.value })}
              required
            />
            <Input
              label="State"
              placeholder="e.g. Delhi"
              value={newCollege.state}
              onChange={(e) => setNewCollege({ ...newCollege, state: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Campus Admin Lead Name"
              placeholder="e.g. Prof. Rajesh Mehra"
              value={newCollege.adminName}
              onChange={(e) => setNewCollege({ ...newCollege, adminName: e.target.value })}
              required
            />
            <Input
              label="Admin Official Email"
              type="email"
              placeholder="e.g. loop-admin@iitd.ac.in"
              value={newCollege.contactEmail}
              onChange={(e) => setNewCollege({ ...newCollege, contactEmail: e.target.value })}
              required
            />
          </div>

          <Input
            label="Official Contact Phone"
            placeholder="e.g. +91 11 2659 1000"
            value={newCollege.contactPhone}
            onChange={(e) => setNewCollege({ ...newCollege, contactPhone: e.target.value })}
            required
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Onboard Campus
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
