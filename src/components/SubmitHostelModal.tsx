import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Building, Phone, MapPin } from 'lucide-react';
import { AreaItem } from '../types';

interface SubmitHostelModalProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AreaItem[];
}

export const SubmitHostelModal: React.FC<SubmitHostelModalProps> = ({
  isOpen,
  onClose,
  areas,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Boys' as 'Boys' | 'Girls',
    area: areas[0]?.name || 'Johar Town',
    sub_area: '',
    full_address: '',
    description: '',
    monthly_rent_min: 15000,
    monthly_rent_max: 22000,
    security_deposit: 5000,
    room_type: 'Double',
    contact_name: '',
    phone: '',
    whatsapp: '',
    google_maps_url: '',
    wifi: true,
    mess: true,
    ac: false,
    attached_bathroom: true,
    generator: false,
    backup: 'UPS',
    furnished: true,
    cctv: true,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ reference_id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name.trim()) {
      setErrorMsg('Hostel name is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('A valid contact phone number is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setSuccessResponse({ reference_id: data.reference_id });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit hostel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">List Your Hostel in Lahore</h2>
            <p className="text-xs text-neutral-500">
              Submit your accommodation details for administrative review and verification.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successResponse ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Submission Received for Review</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your hostel <strong className="text-neutral-900">"{formData.name}"</strong> has entered the review pipeline as{' '}
              <span className="font-semibold text-amber-800">Pending Verification</span>.
              Our team will verify contact details and address before publishing.
            </p>
            <div className="p-3 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-700 max-w-xs mx-auto">
              Reference ID: {successResponse.reference_id}
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs">
              <strong>Strict Verification Policy:</strong> All submissions undergo telephone and address verification. Fake phone numbers or fabricated facility claims will be rejected.
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-900 mb-1">
                  Hostel Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Al-Madina Boys Hostel"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 mb-1">
                  Hostel Category *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  <option value="Boys">Boys Hostel</option>
                  <option value="Girls">Girls Hostel</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 mb-1">
                  Lahore Area *
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  {areas.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 mb-1">
                  Sub-Area / Sector / Block
                </label>
                <input
                  type="text"
                  value={formData.sub_area}
                  onChange={(e) => setFormData({ ...formData, sub_area: e.target.value })}
                  placeholder="e.g. Block R-1 / Near UMT Gate 2"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 mb-1">
                  Primary Room Type
                </label>
                <select
                  value={formData.room_type}
                  onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="4-Seater">4-Seater</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-900 mb-1">
                  Full Physical Address
                </label>
                <input
                  type="text"
                  value={formData.full_address}
                  onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
                  placeholder="e.g. House # 12, Street 4, Wahdat Road, Muslim Town, Lahore"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Rent & Deposit */}
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-bold text-neutral-900 text-sm mb-3">Rent & Deposits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Min Monthly Rent (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.monthly_rent_min}
                    onChange={(e) => setFormData({ ...formData, monthly_rent_min: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Max Monthly Rent (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.monthly_rent_max}
                    onChange={(e) => setFormData({ ...formData, monthly_rent_max: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Security Deposit (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.security_deposit}
                    onChange={(e) => setFormData({ ...formData, security_deposit: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Facilities Checkboxes */}
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-bold text-neutral-900 text-sm mb-3">Available Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'mess', label: 'Mess / Meals' },
                  { key: 'wifi', label: 'Wi-Fi / Internet' },
                  { key: 'ac', label: 'Air Conditioning (AC)' },
                  { key: 'attached_bathroom', label: 'Attached Bath' },
                  { key: 'furnished', label: 'Furnished Bed/Desk' },
                  { key: 'cctv', label: 'CCTV Security' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={(formData as any)[item.key]}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-700"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-bold text-neutral-900 text-sm mb-3">Manager / Warden Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Manager / Warden Name
                  </label>
                  <input
                    type="text"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    placeholder="e.g. Rana Naveed"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Phone Number (Required) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 03001234567"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. 923001234567"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    value={formData.google_maps_url}
                    onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Submitting Details...' : 'Submit Hostel for Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
