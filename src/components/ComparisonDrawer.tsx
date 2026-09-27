import React from 'react';
import { X, ShieldCheck, Check, Minus, MessageCircle, Phone } from 'lucide-react';
import { Hostel } from '../types';

interface ComparisonDrawerProps {
  hostels: Hostel[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (hostelId: string) => void;
  onViewDetails: (hostel: Hostel) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  hostels,
  isOpen,
  onClose,
  onRemove,
  onViewDetails,
}) => {
  if (!isOpen || hostels.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Hostel Comparison ({hostels.length} of 3 selected)
            </h2>
            <p className="text-xs text-neutral-500">
              Side-by-side comparison of rents, verified amenities, and campus locations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 max-h-[75vh] overflow-x-auto overflow-y-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="p-3 w-40 font-bold uppercase tracking-wider text-neutral-500 bg-neutral-50">
                  Feature
                </th>
                {hostels.map((h) => (
                  <th key={h.id} className="p-3 min-w-[220px] align-top bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                            h.gender === 'Girls' ? 'bg-rose-800 text-white' : 'bg-emerald-800 text-white'
                          }`}
                        >
                          {h.gender}
                        </span>
                        <h3 className="font-bold text-sm text-neutral-900 mt-1 line-clamp-1">
                          {h.name}
                        </h3>
                        <span className="text-neutral-500 text-xs block">{h.area}</span>
                      </div>
                      <button
                        onClick={() => onRemove(h.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Monthly Rent</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 font-bold text-neutral-900 tabular-nums">
                    PKR {h.monthly_rent_min.toLocaleString()}
                    {h.monthly_rent_max > h.monthly_rent_min ? ` – ${h.monthly_rent_max.toLocaleString()}` : ''}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Security Deposit</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-700 tabular-nums">
                    {h.security_deposit ? `PKR ${h.security_deposit.toLocaleString()}` : 'Not provided / Nil'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Room Options</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.room_options?.join(', ') || h.room_type}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Availability</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 font-semibold text-neutral-900">
                    {h.availability_status}
                    {h.available_beds ? ` (${h.available_beds} beds)` : ''}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Mess / Food</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.mess ? `Yes (${h.mess_frequency || 'Included'})` : 'No mess service'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Wi-Fi & Speed</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.wifi ? `Yes (${h.wifi_speed})` : 'Not provided'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Air Conditioning (AC)</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.ac ? 'Available (Sub-metered)' : 'Non-AC only'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Attached Bathroom</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.attached_bathroom ? 'Yes (Attached)' : 'Common / Shared'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Electricity Backup</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.backup || (h.generator ? 'Generator' : 'Not provided')}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">CCTV & Guard</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3 text-neutral-800">
                    {h.cctv ? 'CCTV Active' : 'No CCTV'} · {h.security_guard ? '24/7 Guard' : 'No Guard'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Verification Status</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3">
                    <span className="font-semibold text-neutral-900 block">
                      {h.verification_status}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Last checked: {h.last_checked || 'Recent'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-neutral-700 bg-neutral-50">Actions</td>
                {hostels.map((h) => (
                  <td key={h.id} className="p-3">
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          onViewDetails(h);
                        }}
                        className="py-1.5 px-3 bg-neutral-900 text-white rounded font-medium hover:bg-neutral-800 text-center cursor-pointer"
                      >
                        Full Details
                      </button>
                      {h.whatsapp && (
                        <a
                          href={`https://wa.me/${h.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 bg-emerald-700 text-white rounded font-medium hover:bg-emerald-800 text-center inline-flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
