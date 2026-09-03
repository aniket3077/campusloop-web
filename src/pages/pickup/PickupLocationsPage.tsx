import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { pickupService } from '../../services/pickupService';
import { PickupLocation } from '../../types/adminExtensions';
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

export const PickupLocationsPage: React.FC = () => {
  const { user, role } = useAuth();
  const { success, error } = useToast();
  const [locations, setLocations] = useState<PickupLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    building: '',
    description: '',
    operatingHours: '8:00 AM - 8:00 PM',
    safetyTips: 'Well-lit area under campus CCTV coverage',
    isDefault: false,
  });

  const loadLocations = async () => {
    setIsLoading(true);
    try {
      const collegeId = role === 'COLLEGE_ADMIN' ? user?.collegeId : undefined;
      const data = await pickupService.getPickupLocations(collegeId);
      setLocations(data);
    } catch (err) {
      error('Failed to load pickup locations', (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, [user?.collegeId, role]);

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.name || !newLocation.building) {
      error('Validation error', 'Name and building are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await pickupService.createPickupLocation({
        ...newLocation,
        collegeId: user?.collegeId,
      });
      success('Location Created', `Added ${newLocation.name} as a verified campus pickup hub`);
      setIsModalOpen(false);
      setNewLocation({
        name: '',
        building: '',
        description: '',
        operatingHours: '8:00 AM - 8:00 PM',
        safetyTips: 'Well-lit area under campus CCTV coverage',
        isDefault: false,
      });
      loadLocations();
    } catch (err) {
      error('Failed to add location', (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (loc: PickupLocation) => {
    const nextStatus = loc.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await pickupService.updatePickupLocation(loc.id, { status: nextStatus });
      success('Status Updated', `${loc.name} is now ${nextStatus.toLowerCase()}`);
      loadLocations();
    } catch (err) {
      error('Failed to update status', (err as Error).message);
    }
  };

  const columns: Column<PickupLocation>[] = [
    {
      header: 'Pickup Hub',
      render: (loc) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{loc.name}</span>
              {loc.isDefault && (
                <Badge variant="success">Primary Hub</Badge>
              )}
            </div>
            <span className="text-xs text-slate-500">{loc.description}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Building / Quad',
      render: (loc) => (
        <div className="flex items-center gap-1.5 text-slate-700 text-sm">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span>{loc.building}</span>
        </div>
      ),
    },
    {
      header: 'Operating Hours',
      render: (loc) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{loc.operatingHours}</span>
        </div>
      ),
    },
    {
      header: 'Safety Verification',
      render: (loc) => (
        <div className="flex items-center gap-1 text-xs text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{loc.safetyTips || 'Monitored Hub'}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (loc) => (
        <Badge variant={loc.status === 'ACTIVE' ? 'success' : 'default'}>
          {loc.status === 'ACTIVE' ? (
            <CheckCircle2 className="w-3 h-3 mr-1" />
          ) : (
            <AlertCircle className="w-3 h-3 mr-1" />
          )}
          {loc.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (loc) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleToggleStatus(loc)}
          className="flex items-center gap-1 text-xs"
        >
          {loc.status === 'ACTIVE' ? (
            <>
              <ToggleRight className="w-4 h-4 text-emerald-600" />
              Deactivate
            </>
          ) : (
            <>
              <ToggleLeft className="w-4 h-4 text-slate-400" />
              Activate
            </>
          )}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner size="lg" label="Loading verified campus pickup hubs..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-emerald-600" />
            Campus Pickup Hubs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Designate safe on-campus physical locations for secure QR-verified student exchanges.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pickup Location
        </Button>
      </div>

      {/* Locations Table */}
      {locations.length === 0 ? (
        <EmptyState
          icon={<MapPin className="w-8 h-8" />}
          title="No pickup locations configured"
          description="Create designated meeting spots (e.g. Library, Student Center, Main Gate) for students to safely exchange items."
        />
      ) : (
        <Table columns={columns} data={locations} keyExtractor={(l) => l.id} />
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Campus Pickup Location"
      >
        <form onSubmit={handleCreateLocation} className="space-y-4">
          <Input
            label="Location Name *"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            placeholder="e.g. Central Library Study Lounge"
            required
          />
          <Input
            label="Building / Landmark *"
            value={newLocation.building}
            onChange={(e) => setNewLocation({ ...newLocation, building: e.target.value })}
            placeholder="e.g. 1st Floor Study Concourse"
            required
          />
          <Input
            label="Operating Hours"
            value={newLocation.operatingHours}
            onChange={(e) => setNewLocation({ ...newLocation, operatingHours: e.target.value })}
            placeholder="e.g. 8:00 AM - 10:00 PM"
          />
          <Input
            label="Description & Landmarks"
            value={newLocation.description}
            onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
            placeholder="e.g. Beside the main circulation information desk"
          />
          <Input
            label="Safety Verification Tips"
            value={newLocation.safetyTips}
            onChange={(e) => setNewLocation({ ...newLocation, safetyTips: e.target.value })}
            placeholder="e.g. Well-lit campus safety area with CCTV coverage"
          />
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={newLocation.isDefault}
              onChange={(e) => setNewLocation({ ...newLocation, isDefault: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <label htmlFor="isDefault" className="text-sm font-medium text-slate-700">
              Set as campus primary default pickup hub
            </label>
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
              {isSubmitting ? 'Adding...' : 'Add Location'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
