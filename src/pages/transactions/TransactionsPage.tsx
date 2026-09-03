import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { transactionService } from '../../services/transactionService';
import { collegeService } from '../../services/collegeService';
import { Transaction, TransactionStatus } from '../../types/transaction';
import { College } from '../../types/college';
import { Table, Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { TRANSACTION_STATUS_CONFIG } from '../../utils/constants';
import { formatCurrency, formatDate, formatRelativeTime } from '../../utils/formatters';

export const TransactionsPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const { success, error } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [collegeFilter, setCollegeFilter] = useState<string>(() => {
    return role === 'COLLEGE_ADMIN' ? (user?.collegeId || 'ALL') : activeCollegeFilter;
  });

  // Modal State for Dispute Resolution
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const [txData, colData] = await Promise.all([
        transactionService.getTransactions({
          search: searchQuery,
          status: statusFilter === 'ALL' ? undefined : (statusFilter as TransactionStatus),
          collegeId: role === 'COLLEGE_ADMIN' ? user?.collegeId : collegeFilter,
        }),
        collegeService.getColleges(),
      ]);
      setTransactions(txData);
      setColleges(colData);
    } catch (err) {
      error('Failed to load transactions', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [searchQuery, statusFilter, collegeFilter, activeCollegeFilter]);

  const handleResolveDispute = async (status: TransactionStatus) => {
    if (!selectedTx) return;
    try {
      await transactionService.updateTransactionStatus(selectedTx.id, status, resolutionNote);
      success('Transaction Updated', `Transaction ${selectedTx.id} marked as ${status}.`);
      setIsModalOpen(false);
      setResolutionNote('');
      loadTransactions();
    } catch (err) {
      error('Resolution failed', (err as Error).message);
    }
  };

  const columns: Column<Transaction>[] = [
    {
      header: 'Tx ID & Date',
      render: (tx) => (
        <div>
          <span className="font-mono text-xs font-bold text-slate-900 block">{tx.id}</span>
          <span className="text-[11px] text-slate-400">{formatRelativeTime(tx.createdAt)}</span>
        </div>
      ),
    },
    {
      header: 'Shared Resource',
      render: (tx) => (
        <div>
          <span className="font-semibold text-slate-900 text-xs block">{tx.listingTitle}</span>
          <span className="text-[11px] text-slate-500">{tx.listingCategory}</span>
        </div>
      ),
    },
    {
      header: 'Handoff Participants',
      render: (tx) => (
        <div className="text-xs space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Borrower:</span>
            <span className="font-medium text-slate-800">{tx.borrowerName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Lender:</span>
            <span className="text-slate-600">{tx.ownerName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Campus Hub',
      render: (tx) => (
        <div className="flex items-center gap-1 text-xs text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{tx.pickupHub}</span>
        </div>
      ),
    },
    {
      header: 'Escrow & Fee',
      render: (tx) => (
        <div className="text-xs">
          <span className="font-bold text-slate-900 block">{formatCurrency(tx.totalFee)}</span>
          {tx.depositHeld > 0 && (
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded inline-block">
              Escrow: {formatCurrency(tx.depositHeld)}
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
      header: 'Actions',
      render: (tx) => (
        <Button
          size="sm"
          variant={tx.status === 'DISPUTED' ? 'danger' : 'outline'}
          onClick={() => {
            setSelectedTx(tx);
            setResolutionNote(tx.disputeReason || '');
            setIsModalOpen(true);
          }}
        >
          {tx.status === 'DISPUTED' ? 'Resolve Dispute' : 'Inspect'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Handoffs & Exchanges</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor circular resource transfers, escrow holds, return deadlines, and resolve campus dispute claims.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Tx ID, item, or student name..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
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
            {['ALL', 'ACTIVE', 'PICKED_UP', 'RETURNED', 'DISPUTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'ALL' ? 'All' : st.charAt(0) + st.slice(1).toLowerCase().replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Loading transactions..." />
      ) : transactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="No campus exchanges matched the selected filter criteria."
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
          data={transactions}
          keyExtractor={(tx) => tx.id}
          onRowClick={(tx) => {
            setSelectedTx(tx);
            setResolutionNote(tx.disputeReason || '');
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Dispute / Detail Inspection Modal */}
      {selectedTx && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedTx.status === 'DISPUTED' ? 'Resolve Disputed Exchange' : 'Transaction Details'}
          subtitle={`Tx ID: ${selectedTx.id} &bull; ${selectedTx.collegeName}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>

              {selectedTx.status === 'DISPUTED' ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveDispute('CANCELLED')}
                  >
                    Refund Escrow to Borrower
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleResolveDispute('COMPLETED')}
                  >
                    Release Escrow to Lender
                  </Button>
                </div>
              ) : selectedTx.status === 'ACTIVE' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleResolveDispute('RETURNED')}
                >
                  Mark Returned to Hub
                </Button>
              ) : null}
            </div>
          }
        >
          <div className="space-y-4">
            {selectedTx.status === 'DISPUTED' && selectedTx.disputeReason && (
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Dispute Claim Details:</span>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">{selectedTx.disputeReason}</p>
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-slate-900">{selectedTx.listingTitle}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Category: {selectedTx.listingCategory}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Lender / Owner</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedTx.ownerName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Borrower</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedTx.borrowerName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Pickup Hub</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedTx.pickupHub}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Rental Fee</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{formatCurrency(selectedTx.totalFee)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Escrow Deposit</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{formatCurrency(selectedTx.depositHeld)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Due Date</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {selectedTx.dueDate ? formatDate(selectedTx.dueDate) : 'No due date'}
                </span>
              </div>
            </div>

            {selectedTx.status === 'DISPUTED' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution Decision & Audit Note
                </label>
                <textarea
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Record why escrow was released or refunded..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-primary-500"
                  rows={3}
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
