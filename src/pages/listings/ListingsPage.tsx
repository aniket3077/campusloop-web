import React, { useState, useEffect } from 'react';
import {
  Layers,
  Filter,
  Search,
  CheckCircle,
  Flag,
  Trash2,
  Eye,
  MapPin,
  Tag,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { listingService } from '../../services/listingService';
import { collegeService } from '../../services/collegeService';
import { Listing, ListingCategory, ListingStatus, ListingType } from '../../types/listing';
import { College } from '../../types/college';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  CATEGORY_CONFIG,
  CONDITION_CONFIG,
  LISTING_STATUS_CONFIG,
  LISTING_TYPE_CONFIG,
} from '../../utils/constants';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';

export const ListingsPage: React.FC = () => {
  const { user, role, activeCollegeFilter } = useAuth();
  const { success, error, warning } = useToast();

  const [listings, setListings] = useState<Listing[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCollege, setSelectedCollege] = useState<string>(() => {
    return role === 'COLLEGE_ADMIN' ? (user?.collegeId || 'ALL') : activeCollegeFilter;
  });

  // Modal inspection
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagReasonInput, setFlagReasonInput] = useState('');

  const loadListings = async () => {
    setIsLoading(true);
    try {
      const [listingsData, collegesData] = await Promise.all([
        listingService.getListings({
          search: searchQuery,
          category: selectedCategory === 'ALL' ? undefined : (selectedCategory as ListingCategory),
          status: selectedStatus === 'ALL' ? undefined : (selectedStatus as ListingStatus),
          collegeId: role === 'COLLEGE_ADMIN' ? user?.collegeId : selectedCollege,
        }),
        collegeService.getColleges(),
      ]);
      setListings(listingsData);
      setColleges(collegesData);
    } catch (err) {
      error('Failed to load listings', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [searchQuery, selectedCategory, selectedStatus, selectedCollege, activeCollegeFilter]);

  const handleUpdateStatus = async (id: string, status: ListingStatus, reason?: string) => {
    try {
      const updated = await listingService.updateListingStatus(id, status, reason);
      if (status === 'ACTIVE') {
        success('Listing Approved', `"${updated.title}" is now active and discoverable on campus.`);
      } else if (status === 'FLAGGED') {
        warning('Listing Flagged', `Flagged for inspection: ${reason || 'Community guideline notice'}`);
      } else if (status === 'ARCHIVED') {
        success('Listing Archived', `Item marked as archived.`);
      }
      setIsModalOpen(false);
      loadListings();
    } catch (err) {
      error('Update failed', (err as Error).message);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to permanently remove this listing?')) return;
    try {
      await listingService.deleteListing(id);
      success('Listing Removed', 'Item was permanently removed from the catalog.');
      setIsModalOpen(false);
      loadListings();
    } catch (err) {
      error('Deletion failed', (err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resource Listings Catalog</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Moderate textbooks, scientific equipment, cycles, and dorm essentials circulating on campus.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-80">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items, textbooks, equipment..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {role === 'SUPER_ADMIN' && (
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
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

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 px-3 py-2 focus:outline-none focus:border-primary-500 shadow-subtle"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="FLAGGED">Flagged</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key, conf]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {conf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Listings */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Loading campus listings..." />
      ) : listings.length === 0 ? (
        <EmptyState
          title="No resource listings found"
          description="Try broadening your category filter or clearing search keywords."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('ALL');
            setSelectedStatus('ALL');
            setSelectedCollege('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((item) => {
            const catConf = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.OTHER || { label: item.category || 'General', bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' };
            const condConf = CONDITION_CONFIG[item.condition] || { label: item.condition || 'Good', badgeClass: 'bg-blue-100 text-blue-800' };
            const statusConf = LISTING_STATUS_CONFIG[item.status] || { label: item.status || 'Active', badgeClass: 'bg-emerald-100 text-emerald-800' };
            const typeConf = LISTING_TYPE_CONFIG[item.type] || { label: item.type || 'Standard', badgeClass: 'bg-purple-100 text-purple-800 border-purple-300' };

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedListing(item);
                  setFlagReasonInput(item.flagReason || '');
                  setIsModalOpen(true);
                }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden cursor-pointer group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    {item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Layers className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-md font-semibold border ${catConf.bg} ${catConf.text} ${catConf.border}`}>
                        {catConf.label}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${statusConf.badgeClass}`}>
                        {statusConf.label}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${typeConf.badgeClass}`}>
                        {typeConf.label}
                      </span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500 font-medium">{condConf.label}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Lender / Student</span>
                        <span className="font-semibold text-slate-800">{item.studentName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Fee / Rate</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {item.price === 0 ? 'Free' : formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    {item.pickupLocation}
                  </span>
                  <span>{item.timesShared}x shared</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Listing Inspection Modal */}
      {selectedListing && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Listing Moderation Review"
          subtitle={`ID: ${selectedListing.id} &bull; ${selectedListing.collegeName}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteListing(selectedListing.id)}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete Permanently
              </Button>

              <div className="flex items-center gap-2">
                {selectedListing.status !== 'ACTIVE' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedListing.id, 'ACTIVE')}
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                  >
                    Approve Listing
                  </Button>
                )}
                {selectedListing.status !== 'FLAGGED' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(
                        selectedListing.id,
                        'FLAGGED',
                        flagReasonInput || 'Reported for administrative review'
                      )
                    }
                    icon={<Flag className="w-3.5 h-3.5 text-rose-600" />}
                  >
                    Flag Listing
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            {selectedListing.images[0] && (
              <div className="h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={selectedListing.images[0]}
                  alt={selectedListing.title}
                  className="w-full h-full object-contain bg-slate-900"
                />
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedListing.title}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{selectedListing.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Category</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedListing.category}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Condition</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedListing.condition}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Fee / Price</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {selectedListing.price === 0 ? 'Free' : formatCurrency(selectedListing.price)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block">Security Deposit</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {formatCurrency(selectedListing.depositAmount)}
                </span>
              </div>
            </div>

            {/* Flagging reason if applicable */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Moderation Notes / Flag Reason
              </label>
              <textarea
                value={flagReasonInput}
                onChange={(e) => setFlagReasonInput(e.target.value)}
                placeholder="Specify reason if flagging this listing for violations..."
                className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
                rows={3}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
