import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  Calendar,
  Layers,
} from 'lucide-react';
import { auditService } from '../../services/auditService';
import { AuditLogItem } from '../../types/adminExtensions';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Table, Column } from '../../components/common/Table';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/formatters';

export const AuditLogsPage: React.FC = () => {
  const { error } = useToast();
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await auditService.getAuditLogs();
      setLogs(data);
    } catch (err) {
      error('Failed to load audit trail', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.entityType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<AuditLogItem>[] = [
    {
      header: 'Action / Event',
      render: (l) => (
        <div className="flex items-center gap-2">
          <Badge variant="info">{l.action}</Badge>
        </div>
      ),
    },
    {
      header: 'Administrator',
      render: (l) => (
        <div>
          <span className="font-semibold text-slate-900 block">{l.adminName}</span>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            {l.role}
          </span>
        </div>
      ),
    },
    {
      header: 'Target Entity',
      render: (l) => (
        <div className="text-xs text-slate-700">
          <span className="font-medium">{l.entityType}</span>
          {l.entityId && (
            <span className="block text-[11px] font-mono text-slate-400 truncate max-w-[140px]">
              {l.entityId}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Metadata / Context',
      render: (l) => (
        <div className="text-xs text-slate-600 font-mono max-w-xs truncate bg-slate-50 px-2 py-1 rounded border border-slate-100">
          {l.metadata ? JSON.stringify(l.metadata) : 'N/A'}
        </div>
      ),
    },
    {
      header: 'Timestamp',
      render: (l) => (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          {formatDate(l.timestamp)}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Loading security audit trail..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-7 h-7 text-emerald-600" />
          Platform Audit Logs & Security Trail
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Immutable, read-only audit logging of all administrative actions, student verifications, and listing moderations.
        </p>
      </div>

      {/* Filter Card */}
      <Card className="p-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter audit events by action, administrator, or entity..."
        />
      </Card>

      {/* Audit Log Table */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          icon={<Layers className="w-8 h-8" />}
          title="No audit events found"
          description="Administrative mutations and moderation events are automatically recorded here."
        />
      ) : (
        <Table columns={columns} data={filteredLogs} keyExtractor={(l) => l.id} />
      )}
    </div>
  );
};
