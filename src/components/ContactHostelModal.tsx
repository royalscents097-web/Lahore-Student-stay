import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Building,
  MapPin,
  Calendar,
  ShieldCheck,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { Hostel, AreaItem, LeadItem, GenderType } from '../types';

interface ContactHostelModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostel?: Hostel | null;
  defaultGender?: GenderType;
  defaultArea?: string;
  areas: AreaItem[];
  hostels: Hostel[];
  onLeadSuccess?: (lead: LeadItem) => void;
}

export const ContactHostelModal: React.FC<ContactHostelModalProps> = ({
  isOpen,
  onClose,
  hostel,
  defaultGender = 'Boys',
  defaultArea = 'Johar Town',
  areas,
  hostels,
  onLeadSuccess,
}) => {
  if (!isOpen) return null;

  // Form State
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [preferredHostelId, setPreferredHostelId] = useState<string>(hostel?.id || '');
  const [preferredHostelName, setPreferredHostelName] = useState<string>(hostel?.name || '');
  const [gender, setGender] = useState<GenderType>(hostel?.gender || defaultGender);
  const [area, setArea] = useState<string>(hostel?.area || defaultArea || 'Johar Town');
  const [budget, setBudget] = useState<string>(
    hostel
      ? `PKR ${hostel.monthly_rent_min.toLocaleString()} – ${hostel.monthly_rent_max.toLocaleString()} / mo`
      : 'PKR 12,000 – 18,000'
  );
  const [roomType, setRoomType] = useState<string>(hostel?.room_type || 'Double');
  const [requirements, setRequirements] = useState<string[]>([
    ...(hostel?.wifi ? ['Wi-Fi'] : []),
    ...(hostel?.mess ? ['Mess'] : []),
    ...(hostel?.ac ? ['AC'] : []),
    ...(hostel?.attached_bathroom ? ['Attached Bathroom'] : []),
  ]);
  const [notes, setNotes] = useState('');

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLead, setSubmittedLead] = useState<LeadItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync state when incoming hostel changes
  useEffect(() => {
    if (hostel) {
      setPreferredHostelId(hostel.id);
      setPreferredHostelName(hostel.name);
      setGender(hostel.gender);
      setArea(hostel.area);
      setRoomType(hostel.room_type || 'Double');
      setBudget(`PKR ${hostel.monthly_rent_min.toLocaleString()} – ${hostel.monthly_rent_max.toLocaleString()} / mo`);
      const reqs: string[] = [];
      if (hostel.wifi) reqs.push('Wi-Fi');
      if (hostel.mess) reqs.push('Mess');
      if (hostel.ac) reqs.push('AC');
      if (hostel.attached_bathroom) reqs.push('Attached Bathroom');
      if (hostel.generator || (hostel.backup && hostel.backup !== 'None')) reqs.push('Electricity Backup');
      if (hostel.furnished) reqs.push('Furnished');
      if (hostel.parking) reqs.push('Parking');
      setRequirements(reqs);
    } else {
      setPreferredHostelId('');
      setPreferredHostelName('');
      setGender(defaultGender);
      setArea(defaultArea || 'Johar Town');
      setBudget('PKR 12,000 – 18,000');
      setRoomType('Double');
      setRequirements(['Wi-Fi', 'Mess']);
    }
    setSubmittedLead(null);
    setErrorMsg('');
  }, [hostel, defaultGender, defaultArea]);

  const toggleReq = (req: string) => {
    setRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleSelectHostel = (hId: string) => {
    setPreferredHostelId(hId);
    if (!hId || hId === 'general') {
      setPreferredHostelName('General Lahore Student Inquiry');
      return;
    }
    const found = hostels.find((h) => h.id === hId);
    if (found) {
      setPreferredHostelName(found.name);
      setGender(found.gender);
      setArea(found.area);
      setRoomType(found.room_type || 'Double');
      setBudget(`PKR ${found.monthly_rent_min.toLocaleString()} – ${found.monthly_rent_max.toLocaleString()} / mo`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!visitorName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!visitorPhone.trim() || visitorPhone.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number (e.g. 0300-1234567).');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        visitor_name: visitorName.trim(),
        visitor_phone: visitorPhone.trim(),
        preferred_hostel: preferredHostelName || (hostel ? hostel.name : 'General Inquiry'),
        hostel_id: preferredHostelId || (hostel ? hostel.id : 'general'),
        gender,
        area,
        budget,
        room_type: roomType,
        requirements,
        notes: notes.trim(),
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmittedLead(data.data);
      if (onLeadSuccess) onLeadSuccess(data.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyLeadId = () => {
    if (!submittedLead) return;
    navigator.clipboard.writeText(submittedLead.lead_id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleOpenWhatsAppLead = () => {
    if (!submittedLead) return;
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum, I submitted student accommodation inquiry reference ${submittedLead.lead_id} on Lahore Student Stay.\n\n` +
      `Student Name: ${submittedLead.visitor_name}\n` +
      `Category: ${submittedLead.gender} Hostel\n` +
      `Preferred Area: ${submittedLead.area}\n` +
      `Hostel: ${submittedLead.hostel_name}\n` +
      `Budget: ${submittedLead.budget}\n` +
      `Room Type: ${submittedLead.room_type}\n` +
      `Requirements: ${submittedLead.requirements.join(', ')}\n\n` +
      `Please confirm room availability and warden contact.`
    );

    // If preferred hostel has real whatsapp number, open it, otherwise open general support or wa.me
    const targetHostel = hostels.find((h) => h.id === submittedLead.hostel_id);
    const waNumber = targetHostel?.whatsapp || submittedLead.assigned_warden_whatsapp || '';
    if (waNumber) {
      window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://wa.me/?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4.5 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
              LS
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                {submittedLead ? 'Inquiry Confirmed' : 'Contact This Hostel'}
              </h2>
              <p className="text-[11px] text-neutral-400">
                Lahore Student Stay · Direct Warden & Accommodation Lead
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedLead ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Inquiry Registered
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-900 mt-1">
                  Thank You, {submittedLead.visitor_name}!
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Your hostel inquiry has been assigned into our lead management pipeline. The hostel management or Lahore Student Stay representative will contact you shortly.
                </p>
              </div>

              {/* Lead Reference Box */}
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 max-w-sm mx-auto text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Lead Reference ID
                  </span>
                  <button
                    onClick={handleCopyLeadId}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="text-xl font-extrabold text-neutral-900 tracking-wider font-mono">
                  {submittedLead.lead_id}
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-200 space-y-1 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Hostel:</span>
                    <strong className="text-neutral-900 font-semibold">{submittedLead.hostel_name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Category / Area:</span>
                    <span className="text-neutral-900 font-medium">
                      {submittedLead.gender} · {submittedLead.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="text-neutral-900 font-medium">{submittedLead.visitor_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                      {submittedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 max-w-sm mx-auto">
                <button
                  onClick={handleOpenWhatsAppLead}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Lead to Warden via WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* LEAD GENERATION FORM */
            <form onSubmit={handleSubmit} className="space-y-4.5">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Target Hostel Banner if pre-selected */}
              {hostel ? (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <Building className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider">
                      Selected Hostel
                    </div>
                    <div className="font-extrabold text-neutral-900 text-sm">{hostel.name}</div>
                    <div className="text-neutral-600 mt-0.5">
                      {hostel.gender} Hostel · {hostel.area} · PKR {hostel.monthly_rent_min.toLocaleString()} / mo
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="prefHostelSelect" className="block text-xs font-bold text-neutral-800 mb-1">
                    Preferred Hostel in Lahore
                  </label>
                  <select
                    id="prefHostelSelect"
                    value={preferredHostelId}
                    onChange={(e) => handleSelectHostel(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                  >
                    <option value="">General Hostel Match (Let team recommend)</option>
                    {hostels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.gender} · {h.area})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Student Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="studentName" className="block text-xs font-bold text-neutral-800 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label htmlFor="studentPhone" className="block text-xs font-bold text-neutral-800 mb-1">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentPhone"
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    Warden will call or WhatsApp on this number
                  </span>
                </div>
              </div>

              {/* Gender & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('Boys')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        gender === 'Boys'
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300'
                      }`}
                    >
                      Boys Hostel
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Girls')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        gender === 'Girls'
                          ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300'
                      }`}
                    >
                      Girls Hostel
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredAreaSelect" className="block text-xs font-bold text-neutral-800 mb-1">Preferred Area</label>
                  <select
                    id="preferredAreaSelect"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                  >
                    {areas.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget & Room Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="budgetSelect" className="block text-xs font-bold text-neutral-800 mb-1">Monthly Budget</label>
                  <select
                    id="budgetSelect"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                  >
                    <option value="Under PKR 12,000">Under PKR 12,000 / month</option>
                    <option value="PKR 12,000 – 18,000">PKR 12,000 – 18,000 / month (Standard)</option>
                    <option value="PKR 18,000 – 25,000">PKR 18,000 – 25,000 / month (Comfort)</option>
                    <option value="Above PKR 25,000">Above PKR 25,000 / month (Premium)</option>
                    <option value="Flexible">Flexible Budget</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="roomTypeSelect" className="block text-xs font-bold text-neutral-800 mb-1">Preferred Room Type</label>
                  <select
                    id="roomTypeSelect"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                  >
                    <option value="Single">Single Room (Private)</option>
                    <option value="Double">Double Room (2-Seater)</option>
                    <option value="Triple">Triple Room (3-Seater)</option>
                    <option value="4-Seater">4-Seater</option>
                    <option value="Shared">Shared / Dormitory</option>
                    <option value="Any Room Type">Any Available Room</option>
                  </select>
                </div>
              </div>

              {/* Requirements Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Hostel Requirements
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Wi-Fi',
                    'Mess',
                    'AC',
                    'Furnished',
                    'Attached Bathroom',
                    'Parking',
                    'Electricity Backup',
                  ].map((req) => {
                    const isChecked = requirements.includes(req);
                    return (
                      <button
                        key={req}
                        type="button"
                        onClick={() => toggleReq(req)}
                        className={`p-2 rounded-lg border text-left transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-neutral-400 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{req}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="studentNotes" className="block text-xs font-bold text-neutral-800 mb-1">
                  Move-in Date / Additional Requirements (Optional)
                </label>
                <textarea
                  id="studentNotes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Planning to move in next Monday. University student at UMT."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  No booking fee required now. Your inquiry generates a unique Lead ID (e.g. LS-1047) tracked directly with the warden.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-6 bg-emerald-800 hover:bg-emerald-700 disabled:bg-neutral-400 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {submitting ? (
                    <span>Registering Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
