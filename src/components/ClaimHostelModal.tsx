import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ShieldAlert, Building, Phone, Send } from 'lucide-react';
import { Hostel } from '../types';

interface ClaimHostelModalProps {
  hostel: Hostel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimHostelModal: React.FC<ClaimHostelModalProps> = ({
  hostel,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !hostel) return null;

  const [claimantName, setClaimantName] = useState('');
  const [claimantRole, setClaimantRole] = useState<'Owner' | 'Warden' | 'Manager' | 'Authorized Representative'>('Warden');
  const [phone, setPhone] = useState(hostel.phone || '');
  const [whatsapp, setWhatsapp] = useState(hostel.whatsapp || '');
  const [email, setEmail] = useState('');
  const [proofNote, setProofNote] = useState('');

  // Proposed updates
  const [updatedMinRent, setUpdatedMinRent] = useState<number>(hostel.monthly_rent_min);
  const [updatedMaxRent, setUpdatedMaxRent] = useState<number>(hostel.monthly_rent_max);
  const [updatedDeposit, setUpdatedDeposit] = useState<number>(hostel.security_deposit || 0);
  const [updatedAvailability, setUpdatedAvailability] = useState(hostel.availability_status);
  const [updatedBeds, setUpdatedBeds] = useState<number | ''>(hostel.available_beds || '');
  const [electricityPolicy, setElectricityPolicy] = useState(hostel.pricing_breakdown?.electricity.description || hostel.electricity || '');
  const [messPolicy, setMessPolicy] = useState(hostel.pricing_breakdown?.mess.description || hostel.mess_frequency || '');
  const [otherCharges, setOtherCharges] = useState(hostel.pricing_breakdown?.other_charges.description || '');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState<{ referenceId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!claimantName.trim()) {
      setErrorMsg('Claimant name is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('A verifiable phone number is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostel_id: hostel.id,
          hostel_name: hostel.name,
          claimant_name: claimantName.trim(),
          claimant_role: claimantRole,
          phone: phone.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim(),
          proof_document_note: proofNote.trim(),
          proposed_changes: {
            monthly_rent_min: Number(updatedMinRent),
            monthly_rent_max: Number(updatedMaxRent),
            security_deposit: Number(updatedDeposit),
            availability_status: updatedAvailability,
            available_beds: updatedBeds !== '' ? Number(updatedBeds) : null,
            phone: phone.trim(),
            whatsapp: whatsapp.trim(),
            electricity_policy: electricityPolicy.trim(),
            mess_policy: messPolicy.trim(),
            other_charges: otherCharges.trim(),
            additional_notes: additionalNotes.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit claim');
      }

      setClaimSuccess({ referenceId: data.reference_id });
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please check inputs.');
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner & Warden Verification</span>
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
              Claim / Update This Hostel
            </h2>
            <p className="text-xs text-neutral-500">
              Update factual pricing, room vacancies, and contact numbers for: <strong>{hostel.name}</strong> ({hostel.area})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {claimSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Update Submitted — Entered "Pending Review"
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your updates for <strong className="text-neutral-900">"{hostel.name}"</strong> have been queued.
              In accordance with our strict data-integrity rules, no listing is automatically updated or marked verified without verification. Our administration team will verify details at <strong className="text-neutral-900">{phone}</strong>.
            </p>
            <div className="p-3 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-700 max-w-xs mx-auto">
              Audit Reference ID: {claimSuccess.referenceId}
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl leading-relaxed">
              <strong>Data Verification Protocol:</strong> Submissions directly enter our administrative audit queue as <em>Pending Review</em>. Rents, vacancy counts, and phone numbers are verified via callback before publication.
            </div>

            {/* Section 1: Claimant Identity */}
            <div className="space-y-3">
              <h3 className="font-bold text-neutral-900 text-sm border-b pb-1.5">
                1. Your Affiliation & Role
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    placeholder="e.g. Malik Arshad"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Role at Hostel *
                  </label>
                  <select
                    value={claimantRole}
                    onChange={(e) => setClaimantRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-700 outline-none cursor-pointer"
                  >
                    <option value="Warden">Hostel Warden / Incharge</option>
                    <option value="Owner">Property Owner</option>
                    <option value="Manager">Hostel Manager</option>
                    <option value="Authorized Representative">Authorized Representative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Official Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 03001234567"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 923001234567"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Email Address (Optional, for status updates)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hostel@example.com"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Updated Pricing & Availability */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-neutral-900 text-sm border-b pb-1.5">
                2. Updated Rates & Current Availability
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Min Monthly Rent (PKR)
                  </label>
                  <input
                    type="number"
                    value={updatedMinRent}
                    onChange={(e) => setUpdatedMinRent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Max Monthly Rent (PKR)
                  </label>
                  <input
                    type="number"
                    value={updatedMaxRent}
                    onChange={(e) => setUpdatedMaxRent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Security Deposit (PKR)
                  </label>
                  <input
                    type="number"
                    value={updatedDeposit}
                    onChange={(e) => setUpdatedDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Vacancy Status
                  </label>
                  <select
                    value={updatedAvailability}
                    onChange={(e) => setUpdatedAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="Available">Available Beds</option>
                    <option value="Limited Availability">Limited Vacancies</option>
                    <option value="Full">Full (No Vacancy)</option>
                    <option value="Unknown">Availability Not Confirmed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Available Beds Count
                  </label>
                  <input
                    type="number"
                    value={updatedBeds}
                    onChange={(e) => setUpdatedBeds(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 3"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Detailed Charges Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-neutral-900 text-sm border-b pb-1.5">
                3. Electricity, Mess & Additional Charges
              </h3>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Electricity Policy & AC Metering
                  </label>
                  <input
                    type="text"
                    value={electricityPolicy}
                    onChange={(e) => setElectricityPolicy(e.target.value)}
                    placeholder="e.g. Basic electricity included; AC rooms sub-metered @ LESCO tariff"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Mess / Meals Policy
                  </label>
                  <input
                    type="text"
                    value={messPolicy}
                    onChange={(e) => setMessPolicy(e.target.value)}
                    placeholder="e.g. 2 meals daily included in rent (Lunch & Dinner)"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Other / One-time Charges
                  </label>
                  <input
                    type="text"
                    value={otherCharges}
                    onChange={(e) => setOtherCharges(e.target.value)}
                    placeholder="e.g. PKR 1,500 one-time registration fee / Nil"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Verification Note / Proof of Authority
                  </label>
                  <textarea
                    rows={2}
                    value={proofNote}
                    onChange={(e) => setProofNote(e.target.value)}
                    placeholder="Provide details for verification (e.g. property title, warden name registered with local police station/hostel association)"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting to Review Queue...' : 'Submit Update for Administrative Review'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
