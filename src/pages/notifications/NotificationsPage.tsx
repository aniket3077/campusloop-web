import React, { useState, useEffect } from 'react';
import {
  Bell,
  Send,
  Building2,
  Globe,
  Calendar,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { collegeService } from '../../services/collegeService';
import { PlatformNotification } from '../../types/adminExtensions';
import { College } from '../../types/college';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Table, Column } from '../../components/common/Table';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/formatters';

export const NotificationsPage: React.FC = () => {
  const { user, role } = useAuth();
  const { success, error } = useToast();
  const [notifications, setNotifications] = useState<PlatformNotification[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    message: '',
    targetAudience: role === 'COLLEGE_ADMIN' ? ('COLLEGE' as const) : ('ALL' as const),
    collegeId: user?.collegeId || '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [noticeList, collegeList] = await Promise.all([
        notificationService.getNotifications(),
        collegeService.getColleges(),
      ]);
      setNotifications(noticeList);
      setColleges(collegeList);
    } catch (err) {
      error('Failed to load notifications', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.collegeId, role]);

  const handleSendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.message) {
      error('Validation error', 'Title and message are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await notificationService.sendAnnouncement({
        title: newNotice.title,
        message: newNotice.message,
        targetAudience: newNotice.targetAudience,
        collegeId: newNotice.targetAudience === 'COLLEGE' ? newNotice.collegeId : undefined,
      });

      success('Announcement Sent', 'Broadcast dispatched to students via FCM notification service');
      setIsModalOpen(false);
      setNewNotice({
        title: '',
        message: '',
        targetAudience: role === 'COLLEGE_ADMIN' ? 'COLLEGE' : 'ALL',
        collegeId: user?.collegeId || '',
      });
      loadData();
    } catch (err) {
      error('Failed to dispatch announcement', (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: Column<PlatformNotification>[] = [
    {
      header: 'Announcement',
      render: (n) => (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{n.title}</span>
            <span className="text-xs text-slate-600 line-clamp-2 mt-0.5">{n.message}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Target Audience',
      render: (n) => (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {n.targetAudience === 'ALL' ? (
            <Badge variant="purple">
              <Globe className="w-3 h-3 mr-1" />
              Platform Wide
            </Badge>
          ) : (
            <Badge variant="info">
              <Building2 className="w-3 h-3 mr-1" />
              {n.collegeName || 'Campus Specific'}
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Delivery Status',
      render: (n) => (
        <Badge variant={n.status === 'SENT' ? 'success' : 'default'}>
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {n.status}
        </Badge>
      ),
    },
    {
      header: 'Dispatched Date',
      render: (n) => (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          {formatDate(n.sentAt)}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Loading student announcements..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-emerald-600" />
            Campus Announcements & Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Dispatch urgent updates, safety notices, and circularity initiatives to verified students.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      {/* Notifications Table */}
      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-8 h-8" />}
          title="No announcements sent"
          description="Send platform-wide or campus-specific notifications directly to student mobile devices."
        />
      ) : (
        <Table columns={columns} data={notifications} keyExtractor={(n) => n.id} />
      )}

      {/* Send Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dispatch Campus Announcement"
      >
        <form onSubmit={handleSendAnnouncement} className="space-y-4">
          <Input
            label="Announcement Title *"
            value={newNotice.title}
            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            placeholder="e.g. Campus Pickup Safety Guidelines"
            required
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message Content *
            </label>
            <textarea
              value={newNotice.message}
              onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="Enter announcement text to broadcast to students..."
              required
            />
          </div>

          {role === 'SUPER_ADMIN' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target Audience
              </label>
              <select
                value={newNotice.targetAudience}
                onChange={(e) =>
                  setNewNotice({
                    ...newNotice,
                    targetAudience: e.target.value as 'ALL' | 'COLLEGE',
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                <option value="ALL">All Campuses (Platform Wide Broadcast)</option>
                <option value="COLLEGE">Specific Campus Only</option>
              </select>
            </div>
          )}

          {newNotice.targetAudience === 'COLLEGE' && role === 'SUPER_ADMIN' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Target Campus
              </label>
              <select
                value={newNotice.collegeId}
                onChange={(e) => setNewNotice({ ...newNotice, collegeId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                required
              >
                <option value="">Select a college...</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Broadcast Now'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
