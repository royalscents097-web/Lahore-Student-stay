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
  ArrowRight,
  Clock,
  Sparkles,
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
  onBackToHostel?: () => void;
}

// Strict phone validation for genuine Pakistani numbers (Section 1)
function validatePhoneNumber(raw: string): { isValid: boolean; error?: string } {
  const clean = raw.trim();
  if (!clean) {
    return { isValid: false, error: 'Phone Number is required.' };
  }
  if (/[a-zA-Z]/.test(clean)) {
    return { isValid: false, error: 'Phone number cannot contain letters.' };
  }
  const digits = clean.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) {
    return {
      isValid: false,
      error: 'Please enter a valid mobile number (10 to 12 digits, e.g. 0300-1234567).',
    };
  }
  if (/^(\d)\1+$/.test(digits)) {
    return { isValid: false, error: 'Please enter a genuine phone number, not repeated digits.' };
  }
  if (digits === '1234567890' || digits === '0123456789' || digits === '0987654321') {
    return { isValid: false, error: 'Please enter a genuine mobile number.' };
  }
  if (digits.length === 11 && !digits.startsWith('03')) {
    return { isValid: false, error: 'Pakistani mobile numbers must start with 03 (e.g. 0300-1234567).' };
  }
  return { isValid: true };
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
  onBackToHostel,
}) => {
  if (!isOpen) return null;

  // Form State (Section 1 Fields)
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
  const [moveInDate, setMoveInDate] = useState<string>('');
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
  const [phoneTouchError, setPhoneTouchError] = useState('');
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
    setPhoneTouchError('');
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

  const handlePhoneBlur = () => {
    if (visitorPhone.trim()) {
      const check = validatePhoneNumber(visitorPhone);
      if (!check.isValid) {
        setPhoneTouchError(check.error || 'Invalid phone number');
      } else {
        setPhoneTouchError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setPhoneTouchError('');

    // Validation (Section 1: Required fields: Full Name, Phone Number, Boys/Girls, Budget)
    if (!visitorName.trim() || visitorName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    const phoneCheck = validatePhoneNumber(visitorPhone);
    if (!phoneCheck.isValid) {
      setErrorMsg(phoneCheck.error || 'Please enter a valid phone number.');
      setPhoneTouchError(phoneCheck.error || '');
      return;
    }

    if (!gender || (gender !== 'Boys' && gender !== 'Girls')) {
      setErrorMsg('Please select Boys or Girls category.');
      return;
    }

    if (!budget.trim()) {
      setErrorMsg('Please specify your monthly budget.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        visitor_name: visitorName.trim(),
        visitor_phone: visitorPhone.trim(),
        phone: visitorPhone.trim(),
        preferred_hostel: preferredHostelName || (hostel ? hostel.name : 'General Inquiry'),
        hostel_id: preferredHostelId || (hostel ? hostel.id : 'general'),
        hostel_name: preferredHostelName || (hostel ? hostel.name : 'General Inquiry'),
        gender,
        area,
        budget,
        room_type: roomType,
        move_in_date: moveInDate,
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
        throw new Error(data.error || 'Failed to submit enquiry.');
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

  const handleBrowseMore = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReturnToHostel = () => {
    onClose();
    if (onBackToHostel) {
      onBackToHostel();
    }
  };

  // Get current date string for min date in move-in date
  const todayDateStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xs">
              LSS
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                {submittedLead ? 'Enquiry Received' : 'Contact / Enquire About This Hostel'}
              </h2>
              <p className="text-[11px] text-neutral-400">
                Lahore Student Stay · Direct Accommodation Verification & Lead Tracking
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
            /* SUCCESS PAGE (Section 2 & Success Page Requirements) */
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Submission Confirmed
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-1">
                  Your enquiry has been submitted successfully.
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Your hostel enquiry has been received. Our accommodation desk and the hostel warden will verify room availability and reach out to you.
                </p>
              </div>

              {/* Unique Lead ID Box (Section 2: LSS-YYYYMMDD-XXXX) */}
              <div className="bg-emerald-50/60 rounded-xl border border-emerald-200 p-4.5 max-w-sm mx-auto text-left shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950">
                    Your Lead ID
                  </span>
                  <button
                    onClick={handleCopyLeadId}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded border border-emerald-200"
                    title="Copy Lead ID to clipboard"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-wider font-mono select-all">
                  {submittedLead.lead_id}
                </div>

                <div className="mt-2 text-[11px] font-semibold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
                  <span>Please save this number for reference.</span>
                </div>
                <div className="text-[11px] text-neutral-600 mt-0.5">
                  Please keep this Lead ID for future reference with hostel management.
                </div>

                <div className="mt-3 pt-3 border-t border-emerald-200/80 space-y-1 text-xs text-neutral-700">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Hostel:</span>
                    <strong className="text-neutral-900 font-semibold truncate max-w-[200px]">
                      {submittedLead.hostel_name}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Student:</span>
                    <span className="text-neutral-900 font-medium">{submittedLead.visitor_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="text-neutral-900 font-medium">{submittedLead.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Category & Area:</span>
                    <span className="text-neutral-900 font-medium">
                      {submittedLead.gender} Hostel · {submittedLead.area}
                    </span>
                  </div>
                  {submittedLead.move_in_date && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Move-in Date:</span>
                      <span className="text-neutral-900 font-medium">{submittedLead.move_in_date}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      {submittedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Action Buttons (Success Page Requirement: Back to Hostel, Browse More Hostels) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 max-w-sm mx-auto">
                {hostel && (
                  <button
                    onClick={handleReturnToHostel}
                    className="w-full sm:w-1/2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Back to Hostel
                  </button>
                )}
                <button
                  onClick={handleBrowseMore}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Browse More Hostels
                </button>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM (Section 1 Requirements) */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Selected Hostel Banner */}
              {hostel ? (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <Building className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                      Target Accommodation
                    </div>
                    <div className="font-extrabold text-neutral-900 text-sm">{hostel.name}</div>
                    <div className="text-neutral-600 mt-0.5">
                      {hostel.gender} Hostel · {hostel.area} · Rent: PKR {hostel.monthly_rent_min.toLocaleString()} – {hostel.monthly_rent_max.toLocaleString()} / mo
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="prefHostelSelect" className="block text-xs font-bold text-neutral-800 mb-1">
                    Select Lahore Hostel
                  </label>
                  <select
                    id="prefHostelSelect"
                    value={preferredHostelId}
                    onChange={(e) => handleSelectHostel(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    <option value="">General Lahore Hostel Match (Advisor will suggest)</option>
                    {hostels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.gender} · {h.area})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Field 1 & 2: Full Name & Phone Number (Required) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="studentName" className="block text-xs font-bold text-neutral-800 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label htmlFor="studentPhone" className="block text-xs font-bold text-neutral-800 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentPhone"
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => {
                      setVisitorPhone(e.target.value);
                      if (phoneTouchError) setPhoneTouchError('');
                    }}
                    onBlur={handlePhoneBlur}
                    placeholder="0300-1234567"
                    className={`w-full px-3 py-2 text-xs bg-neutral-50 border rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 ${
                      phoneTouchError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-neutral-300 focus:ring-emerald-700'
                    }`}
                  />
                  {phoneTouchError ? (
                    <span className="text-[10px] text-red-600 mt-0.5 block font-medium">
                      {phoneTouchError}
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 mt-0.5 block">
                      Pakistani mobile number (11 digits, e.g. 03xx-xxxxxxx)
                    </span>
                  )}
                </div>
              </div>

              {/* Field 3 & 4: Boys / Girls (Required) & Preferred Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Boys / Girls <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('Boys')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer text-center ${
                        gender === 'Boys'
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      Boys Hostel
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Girls')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer text-center ${
                        gender === 'Girls'
                          ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      Girls Hostel
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredAreaSelect" className="block text-xs font-bold text-neutral-800 mb-1">
                    Preferred Area
                  </label>
                  <select
                    id="preferredAreaSelect"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    {areas.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 5 & 6: Budget (Required) & Room Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="budgetSelect" className="block text-xs font-bold text-neutral-800 mb-1">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budgetSelect"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    <option value="Under PKR 12,000">Under PKR 12,000 / mo</option>
                    <option value="PKR 12,000 – 18,000">PKR 12,000 – 18,000 / mo (Standard)</option>
                    <option value="PKR 18,000 – 25,000">PKR 18,000 – 25,000 / mo (Comfort)</option>
                    <option value="Above PKR 25,000">Above PKR 25,000 / mo (Executive)</option>
                    <option value="Flexible">Flexible Budget</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="roomTypeSelect" className="block text-xs font-bold text-neutral-800 mb-1">
                    Room Type
                  </label>
                  <select
                    id="roomTypeSelect"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
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

              {/* Field 7: Preferred Move-in Date */}
              <div>
                <label htmlFor="moveInDate" className="block text-xs font-bold text-neutral-800 mb-1">
                  Preferred Move-in Date
                </label>
                <div className="relative">
                  <input
                    id="moveInDate"
                    type="date"
                    min={todayDateStr}
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Field 8: Additional Requirements Checkboxes & Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Additional Requirements
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
                            ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-bold'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-emerald-800 border-emerald-800 text-white'
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

              {/* Special Instructions / Notes */}
              <div>
                <label htmlFor="studentNotes" className="block text-xs font-bold text-neutral-800 mb-1">
                  Additional Details / Notes (Optional)
                </label>
                <textarea
                  id="studentNotes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Attending UMT / PU, ground floor room preferred, coming with luggage next week."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Security & Verification Notice */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Your inquiry receives an official Lead Reference (LSS-YYYYMMDD-XXXX). No advance booking payment is charged on this form.
                </span>
              </div>

              {/* Submit Action */}
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
                  className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-700 active:scale-98 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting Enquiry...' : 'Submit Hostel Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
