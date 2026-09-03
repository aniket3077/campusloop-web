import React, { useState } from 'react';
import {
  Settings,
  MapPin,
  Shield,
  Key,
  Bell,
  Save,
  Plus,
  Trash2,
  Copy,
  Check,
  Server,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { API_BASE_URL, USE_MOCK_DATA } from '../../services/api';

export const SettingsPage: React.FC = () => {
  const { user, role } = useAuth();
  const { success, info } = useToast();

  const [pickupHubs, setPickupHubs] = useState<string[]>([
    'Central Library Desk A',
    'Hostel 14 Common Room',
    'Student Activity Center (SAC) Desk',
    'Campus Main Portico Loop Box',
  ]);
  const [newHubInput, setNewHubInput] = useState('');

  // Policy Settings
  const [maxBorrowDays, setMaxBorrowDays] = useState(90);
  const [maxStrikes, setMaxStrikes] = useState(3);
  const [requireIdCard, setRequireIdCard] = useState(true);
  const [escrowProtection, setEscrowProtection] = useState(true);

  // API Token Copy state
  const [copied, setCopied] = useState(false);

  const handleAddHub = () => {
    if (!newHubInput.trim()) return;
    setPickupHubs([...pickupHubs, newHubInput.trim()]);
    setNewHubInput('');
    success('Pickup Point Added', 'Students can now select this handoff spot.');
  };

  const handleRemoveHub = (index: number) => {
    setPickupHubs(pickupHubs.filter((_, i) => i !== index));
    info('Pickup Point Removed', 'Location removed from student dropdowns.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Platform policy and campus hub configurations updated.');
  };

  const handleCopyApiToken = () => {
    navigator.clipboard.writeText('loop_live_adm_89f02384a20b92d8f921');
    setCopied(true);
    success('API Token Copied', 'Copied administrative authorization token to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Campus & Platform Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure campus handoff spots, escrow lending limits, and REST API integration hooks.
          </p>
        </div>

        <Button
          onClick={handleSaveSettings}
          variant="primary"
          icon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Designated Campus Pickup Hubs */}
        <Card
          title="Campus Pickup & Handoff Hubs"
          subtitle="Safe locations where students exchange borrowed textbooks and hardware"
        >
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Mechanical Workshop Handoff Locker"
                value={newHubInput}
                onChange={(e) => setNewHubInput(e.target.value)}
              />
              <Button onClick={handleAddHub} variant="primary" icon={<Plus className="w-4 h-4" />}>
                Add Hub
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pickupHubs.map((hub, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span>{hub}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveHub(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                    aria-label="Remove hub"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Security & Lending Policies */}
        <Card
          title="Lending & Community Safeguards"
          subtitle="Escrow thresholds and account discipline rules"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Maximum Borrowing Duration (Days)
              </label>
              <input
                type="number"
                value={maxBorrowDays}
                onChange={(e) => setMaxBorrowDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-primary-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Standard semester textbook lending limit before auto-reminder alerts.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Disciplinary Strikes Before Auto-Suspension
              </label>
              <input
                type="number"
                value={maxStrikes}
                onChange={(e) => setMaxStrikes(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-primary-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Accounts reaching this threshold are blocked from requesting handoffs.
              </span>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireIdCard}
                  onChange={(e) => setRequireIdCard(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">Mandatory Student ID Upload</span>
                  <span className="text-slate-500 text-[11px]">Require photo scan of college ID in addition to .edu email</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={escrowProtection}
                  onChange={(e) => setEscrowProtection(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">Campus Escrow Deposit Protection</span>
                  <span className="text-slate-500 text-[11px]">Hold security deposits in escrow until item return confirmation</span>
                </div>
              </label>
            </div>
          </div>
        </Card>

        {/* REST API & Backend Connection */}
        <Card
          className="lg:col-span-2"
          title="Backend REST API Connectivity"
          subtitle="Connect this web dashboard directly to your live production server"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary-600" />
                  <span className="font-bold text-slate-800">REST API Gateway:</span>
                  <code className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px]">
                    {API_BASE_URL}
                  </code>
                </div>

                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 text-[11px]">
                  {USE_MOCK_DATA ? 'Mock Adapter Mode (Active Demo)' : 'Live REST API'}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed text-[11px]">
                To connect your real backend, configure <code className="bg-slate-200 px-1 rounded">VITE_API_BASE_URL=https://your-backend-api.com/v1</code> and <code className="bg-slate-200 px-1 rounded">VITE_USE_MOCK_DATA=false</code> in your environment. All services in <code className="bg-slate-200 px-1 rounded">src/services/</code> are already prepared with JWT Bearer token headers!
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Webhook & API Secret Token
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  readOnly
                  value="loop_live_adm_89f02384a20b92d8f921"
                  className="w-full font-mono p-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 select-all"
                />
                <Button
                  onClick={handleCopyApiToken}
                  variant="outline"
                  icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
