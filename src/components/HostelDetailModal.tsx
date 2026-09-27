import React, { useState, useMemo } from 'react';
import {
  X,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Wifi,
  Utensils,
  Wind,
  Bath,
  Zap,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Calendar,
  AlertCircle,
  Share2,
  HelpCircle,
  Globe,
  Instagram,
  Facebook,
  ShieldAlert,
  Coins,
  Receipt,
  Sparkles,
  Info,
} from 'lucide-react';
import { Hostel, HostelPhoto } from '../types';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface HostelDetailModalProps {
  hostel: Hostel | null;
  onClose: () => void;
  onTrackClick: (hostelId: string, type: 'contact' | 'whatsapp' | 'map' | 'phone' | 'instagram' | 'facebook' | 'website') => void;
  onClaimHostel: (hostel: Hostel) => void;
  onContactHostel?: (hostel: Hostel) => void;
}

export const HostelDetailModal: React.FC<HostelDetailModalProps> = ({
  hostel,
  onClose,
  onTrackClick,
  onClaimHostel,
  onContactHostel,
}) => {
  if (!hostel) return null;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Gallery categories that actually have images (Requirement 2)
  const availableCategories = useMemo(() => {
    if (!hostel.photos || hostel.photos.length === 0) return [];
    const cats = new Set<string>();
    hostel.photos.forEach((p) => {
      if (p.url && p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [hostel.photos]);

  // Filtered photos based on selected category
  const filteredPhotos = useMemo(() => {
    if (!hostel.photos || hostel.photos.length === 0) return [];
    if (activeCategory === 'All') return hostel.photos.filter((p) => Boolean(p.url));
    return hostel.photos.filter((p) => p.category === activeCategory && Boolean(p.url));
  }, [hostel.photos, activeCategory]);

  const hasPhotos = filteredPhotos.length > 0;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handlePhone = () => {
    if (!hostel.phone) return;
    onTrackClick(hostel.id, 'phone');
  };

  const handleWhatsapp = () => {
    if (!hostel.whatsapp) return;
    onTrackClick(hostel.id, 'whatsapp');
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum, I am inquiring about room availability at ${hostel.name} (${hostel.area}) found on Lahore Student Stay.`
    );
    window.open(`https://wa.me/${hostel.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleMap = () => {
    onTrackClick(hostel.id, 'map');
    let mapUrl = hostel.google_maps_url;
    if (!mapUrl && hostel.latitude && hostel.longitude) {
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${hostel.latitude},${hostel.longitude}`;
    } else if (!mapUrl) {
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${hostel.name} ${hostel.full_address || hostel.area} Lahore Pakistan`
      )}`;
    }
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const pricing = hostel.pricing_breakdown;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-6 border border-neutral-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-neutral-200 bg-neutral-50/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded ${
                hostel.gender === 'Girls' ? 'bg-rose-800 text-white' : 'bg-emerald-800 text-white'
              }`}
            >
              {hostel.gender} Hostel
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              Area: <strong className="text-neutral-800 font-semibold">{hostel.area}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Claim / Update Trigger in Header */}
            <button
              onClick={() => onClaimHostel(hostel)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-neutral-300"
              title="Are you the owner or warden? Update this listing"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-800" />
              <span>Claim / Update Hostel</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors text-xs inline-flex items-center gap-1 cursor-pointer"
              title="Copy link to hostel"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedShare ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-7 text-xs sm:text-sm">
          {/* Section 1: Photo Gallery or Verified Placeholder (Requirement 1 & 2) */}
          <div>
            {hasPhotos ? (
              <div className="space-y-3">
                {/* Category Filters (Only categories for which images exist) */}
                {availableCategories.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <span className="text-neutral-500 font-medium pr-1">Views:</span>
                    <button
                      onClick={() => {
                        setActiveCategory('All');
                        setActivePhotoIndex(0);
                      }}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                        activeCategory === 'All' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      All ({hostel.photos.length})
                    </button>
                    {availableCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setActivePhotoIndex(0);
                        }}
                        className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          activeCategory === cat ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Photo Viewport */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900">
                  <img
                    src={filteredPhotos[activePhotoIndex]?.url}
                    alt={filteredPhotos[activePhotoIndex]?.caption || hostel.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {filteredPhotos[activePhotoIndex]?.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-3.5 text-white text-xs sm:text-sm font-medium">
                      <span>{filteredPhotos[activePhotoIndex].caption}</span>
                      <span className="text-neutral-400 text-xs ml-2">({filteredPhotos[activePhotoIndex].category})</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {filteredPhotos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {filteredPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                          activePhotoIndex === idx
                            ? 'border-emerald-700 ring-2 ring-emerald-500/20'
                            : 'border-transparent opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <PhotoPlaceholder
                  hostelName={hostel.name}
                  gender={hostel.gender}
                  area={hostel.area}
                  aspect="gallery"
                />
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-500 text-xs flex items-center justify-between">
                  <span>No unverified images displayed. Photos are only published following on-site staff verification.</span>
                  <button
                    onClick={() => onClaimHostel(hostel)}
                    className="text-emerald-800 font-semibold hover:underline cursor-pointer shrink-0"
                  >
                    Submit verified photos →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Immediate At-a-Glance Snapshot (Requirement 7) */}
          <div className="p-4 sm:p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  {hostel.name}
                </h1>
                <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="font-semibold text-neutral-900">{hostel.area}</span>
                  {hostel.sub_area && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{hostel.sub_area}</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="font-medium">{hostel.room_type} Room Available</span>
                </div>
              </div>

              {/* Verification & Last Checked Badges (Requirement 4) */}
              <div className="sm:text-right shrink-0">
                <div>
                  {hostel.verification_status === 'Verified' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 font-semibold text-xs rounded-md">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Verified {hostel.verified_date ? `(${hostel.verified_date})` : ''}</span>
                    </span>
                  ) : hostel.verification_status === 'Pending Verification' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 font-semibold text-xs rounded-md">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Pending Verification</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-md">
                      <HelpCircle className="w-4 h-4 text-neutral-500" />
                      <span>Unverified Listing</span>
                    </span>
                  )}
                </div>

                <div className="mt-1.5 text-xs text-neutral-600 flex items-center sm:justify-end gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Last checked: <strong className="text-neutral-800 font-medium">{hostel.last_checked || 'Recent'}</strong></span>
                </div>
              </div>
            </div>

            {hostel.description && (
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-200 pt-3">
                {hostel.description}
              </p>
            )}
          </div>

          {/* Section 3: Comprehensive Pricing & Charges Breakdown (Requirement 5) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-800" />
                <span>Pricing & Cost Breakdown</span>
              </h2>
              <span className="text-[11px] text-neutral-500">
                Clearly distinguishes included vs additional charges
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Monthly Rent */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                  Monthly Rent
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-neutral-900 tabular-nums">
                  PKR {hostel.monthly_rent_min.toLocaleString()}
                  {hostel.monthly_rent_max > hostel.monthly_rent_min && (
                    <span className="text-sm font-normal text-neutral-600">
                      {' '}– {hostel.monthly_rent_max.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Per occupant/bed depending on room capacity
                </span>
              </div>

              {/* Security Deposit */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  Security Deposit
                </span>
                <div className="text-lg font-bold text-neutral-900 tabular-nums">
                  {hostel.security_deposit ? `PKR ${hostel.security_deposit.toLocaleString()}` : 'Not provided / Nil'}
                </div>
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Refundable upon checkout notice
                </span>
              </div>

              {/* Current Vacancy / Beds */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  Vacancy Status
                </span>
                <div className="text-base font-bold text-neutral-900">
                  {hostel.availability_status}
                </div>
                <span className="text-[11px] text-neutral-500 block mt-1">
                  {hostel.available_beds !== null
                    ? `${hostel.available_beds} beds currently vacant`
                    : 'Call warden to confirm exact vacancy'}
                </span>
              </div>
            </div>

            {/* Detailed Included vs Additional Charges Table */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 text-xs">
              {/* Electricity Row */}
              <div className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Electricity & Air Conditioning</span>
                    <span className="text-neutral-600 text-[11px]">
                      {pricing?.electricity.description || hostel.electricity || 'Standard electricity usage terms'}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold self-start sm:self-center ${
                    pricing?.electricity.type === 'Additional' || hostel.electricity.includes('Sub-meter')
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {pricing?.electricity.type === 'Additional' || hostel.electricity.includes('Sub-meter')
                    ? 'Additional Charge (Sub-Metered)'
                    : 'Included in Rent'}
                </span>
              </div>

              {/* Mess Row */}
              <div className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Mess & Food Services</span>
                    <span className="text-neutral-600 text-[11px]">
                      {pricing?.mess.description || (hostel.mess ? hostel.mess_frequency : 'No mess facility on premises')}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold self-start sm:self-center ${
                    hostel.mess ? 'bg-emerald-100 text-emerald-900' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {hostel.mess ? 'Included in Base Rent' : 'No Mess Service'}
                </span>
              </div>

              {/* Other Charges Row */}
              <div className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-indigo-700 shrink-0" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Other Fees & Surcharges</span>
                    <span className="text-neutral-600 text-[11px]">
                      {pricing?.other_charges.description || 'No admission or maintenance surcharges reported.'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded text-xs font-semibold self-start sm:self-center">
                  {pricing?.other_charges.has_charges ? 'Additional' : 'None Reported'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Room Options Available */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2.5">
              Available Room Configurations
            </h2>
            <div className="flex flex-wrap gap-2">
              {hostel.room_options && hostel.room_options.length > 0 ? (
                hostel.room_options.map((opt) => (
                  <span
                    key={opt}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-semibold border border-neutral-200"
                  >
                    {opt} Room
                  </span>
                ))
              ) : (
                <span className="text-xs text-neutral-500">{hostel.room_type} Room</span>
              )}
            </div>
          </div>

          {/* Section 5: Facilities & Amenities Checklist */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2.5">
              Factual Facilities Checklist
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { label: 'Mess / Meals', active: hostel.mess, detail: hostel.mess_frequency },
                { label: 'Wi-Fi Internet', active: hostel.wifi, detail: hostel.wifi_speed },
                { label: 'Air Conditioning (AC)', active: hostel.ac, detail: hostel.electricity },
                { label: 'Attached Bathroom', active: hostel.attached_bathroom },
                { label: 'Electricity Backup', active: Boolean(hostel.generator || hostel.backup !== 'None'), detail: hostel.backup },
                { label: 'Furnished Bed & Desk', active: hostel.furnished },
                { label: 'CCTV Surveillance', active: hostel.cctv },
                { label: 'Security Guard (24/7)', active: hostel.security_guard },
                { label: 'Laundry Facility', active: hostel.laundry },
                { label: 'Quiet Study Room', active: hostel.study_room },
                { label: 'Geyser / Hot Water', active: hostel.geyser },
                { label: 'Vehicle Parking', active: hostel.parking },
                { label: 'Filtered Drinking Water', active: hostel.water },
                { label: 'Room Cleaning Service', active: hostel.cleaning },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                    item.active
                      ? 'bg-neutral-50 border-neutral-200 text-neutral-900'
                      : 'bg-neutral-50/40 border-neutral-100 text-neutral-400 opacity-60'
                  }`}
                >
                  {item.active ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-neutral-300 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold block">{item.label}</span>
                    {item.detail && item.detail !== 'Not provided' && (
                      <span className="text-[11px] text-neutral-500 block mt-0.5">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Nearby Universities (Section 15) */}
          {hostel.nearby_universities && hostel.nearby_universities.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-800" />
                <span>Nearby Universities & Commute</span>
              </h2>
              <div className="space-y-2">
                {hostel.nearby_universities.map((uni, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-neutral-900">{uni.university_name}</span>
                    <span className="text-emerald-800 font-medium tabular-nums">
                      {uni.distance_text || (uni.distance_km ? `${uni.distance_km} km` : 'Proximity area')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 7: Location & Full Address */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">
              Location & Full Physical Address
            </h2>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5 text-xs text-neutral-700">
              <p className="font-semibold text-neutral-900">{hostel.full_address || 'Address not provided'}</p>
              {hostel.latitude && hostel.longitude && (
                <p className="text-neutral-500 font-mono text-[11px]">
                  Coordinates: {hostel.latitude.toFixed(4)}, {hostel.longitude.toFixed(4)}
                </p>
              )}
              {(hostel.google_maps_url || (hostel.latitude && hostel.longitude)) && (
                <div className="pt-1">
                  <button
                    onClick={handleMap}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold inline-flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 8: Important Notes & Rules */}
          {hostel.notes && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">
                Important Notes & Hostel Rules
              </h2>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                {hostel.notes}
              </div>
            </div>
          )}

          {/* Section 9: Claim Listing Promotion Banner (Requirement 6) */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-800" />
                <span>Are you the owner, warden, or manager of {hostel.name}?</span>
              </div>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Update vacancy numbers, rent brackets, or upload verified photos. Submissions enter Pending Review.
              </p>
            </div>
            <button
              onClick={() => onClaimHostel(hostel)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors shadow-sm"
            >
              Claim / Update This Hostel
            </button>
          </div>

          {/* Section 10: Audit Log & Source Reference (Section 30) */}
          <div className="p-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-500 space-y-1">
            <span className="font-semibold block text-neutral-700">Verification & Audit Log</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>Source: {hostel.source_name || 'Not provided'}</span>
              <span>Last Checked: {hostel.last_checked || 'Not provided'}</span>
              {hostel.verified_date && <span>Verified On: {hostel.verified_date}</span>}
            </div>
          </div>
        </div>

        {/* Modal Fixed Footer: DYNAMIC VERIFIED CONTACT BUTTONS ONLY (Requirement 3) */}
        <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-600 text-center sm:text-left">
            <span className="block font-semibold text-neutral-900">
              Warden / Management: {hostel.contact_name || 'Hostel Office'}
            </span>
            <span className="text-neutral-500 text-[11px]">
              {hostel.phone ? `Direct Contact: ${hostel.phone}` : 'Contact information not provided'}
            </span>
          </div>

          {/* Dynamic Buttons Container: Only show when real data exists! */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
            {/* Primary Action: Contact this Hostel */}
            <button
              onClick={() => {
                onClose();
                onContactHostel?.(hostel);
              }}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Contact this Hostel</span>
            </button>

            {/* Call */}
            {hostel.phone && (
              <a
                href={`tel:${hostel.phone}`}
                onClick={handlePhone}
                className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-800" />
                <span>Call Hostel</span>
              </a>
            )}

            {/* WhatsApp */}
            {hostel.whatsapp && (
              <button
                onClick={handleWhatsapp}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </button>
            )}

            {/* Google Maps */}
            {(hostel.google_maps_url || (hostel.latitude && hostel.longitude)) && (
              <button
                onClick={handleMap}
                className="px-3 py-2.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-lg font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                title="Open location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Maps</span>
              </button>
            )}

            {/* Instagram */}
            {hostel.instagram && (
              <a
                href={hostel.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackClick(hostel.id, 'instagram')}
                className="p-2.5 bg-neutral-50 hover:bg-pink-50 text-neutral-700 hover:text-pink-600 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {/* Facebook */}
            {hostel.facebook && (
              <a
                href={hostel.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackClick(hostel.id, 'facebook')}
                className="p-2.5 bg-neutral-50 hover:bg-blue-50 text-neutral-700 hover:text-blue-600 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            {/* Website */}
            {hostel.website && (
              <a
                href={hostel.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackClick(hostel.id, 'website')}
                className="p-2.5 bg-neutral-50 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                title="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
