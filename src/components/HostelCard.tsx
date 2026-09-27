import React from 'react';
import {
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
  Check,
  AlertCircle,
  HelpCircle,
  Globe,
  Instagram,
  Facebook,
} from 'lucide-react';
import { Hostel } from '../types';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface HostelCardProps {
  hostel: Hostel;
  onViewDetails: (hostel: Hostel) => void;
  onTrackClick: (hostelId: string, type: 'contact' | 'whatsapp' | 'map' | 'phone' | 'instagram' | 'facebook' | 'website') => void;
  isCompared: boolean;
  onToggleCompare: (hostel: Hostel) => void;
  onClaimHostel?: (hostel: Hostel) => void;
  onContactHostel?: (hostel: Hostel) => void;
}

export const HostelCard: React.FC<HostelCardProps> = ({
  hostel,
  onViewDetails,
  onTrackClick,
  isCompared,
  onToggleCompare,
  onClaimHostel,
  onContactHostel,
}) => {
  const hasValidPhoto = hostel.photos && hostel.photos.length > 0 && Boolean(hostel.photos[0].url);

  const handlePhoneClick = () => {
    if (!hostel.phone) return;
    onTrackClick(hostel.id, 'phone');
  };

  const handleWhatsappClick = () => {
    if (!hostel.whatsapp) return;
    onTrackClick(hostel.id, 'whatsapp');
    const message = encodeURIComponent(
      `Assalam-o-Alaikum, I am inquiring about student accommodation at ${hostel.name} (${hostel.area}) via Lahore Student Stay.`
    );
    window.open(`https://wa.me/${hostel.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleMapClick = () => {
    onTrackClick(hostel.id, 'map');
    let mapUrl = hostel.google_maps_url;
    if (!mapUrl && hostel.latitude && hostel.longitude) {
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${hostel.latitude},${hostel.longitude}`;
    } else if (!mapUrl) {
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${hostel.name} ${hostel.area} Lahore Pakistan`
      )}`;
    }
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    if (!hostel.instagram) return;
    onTrackClick(hostel.id, 'instagram');
    window.open(hostel.instagram, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookClick = () => {
    if (!hostel.facebook) return;
    onTrackClick(hostel.id, 'facebook');
    window.open(hostel.facebook, '_blank', 'noopener,noreferrer');
  };

  const handleWebsiteClick = () => {
    if (!hostel.website) return;
    onTrackClick(hostel.id, 'website');
    window.open(hostel.website, '_blank', 'noopener,noreferrer');
  };

  // Pricing details helper
  const pricing = hostel.pricing_breakdown;

  return (
    <article className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Photo Container or Professional "Photo Not Available" Placeholder */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
          {hasValidPhoto ? (
            <img
              src={hostel.photos[0].url}
              alt={`${hostel.name} student accommodation ${hostel.area}`}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PhotoPlaceholder
              hostelName={hostel.name}
              gender={hostel.gender}
              area={hostel.area}
              aspect="card"
            />
          )}

          {/* Gender Indicator Flag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-sm text-white ${
                hostel.gender === 'Girls' ? 'bg-rose-800' : 'bg-emerald-800'
              }`}
            >
              {hostel.gender} Hostel
            </span>
          </div>

          {/* Compare Checkbox Button on Photo */}
          <button
            onClick={() => onToggleCompare(hostel)}
            className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded shadow-sm transition-colors cursor-pointer flex items-center gap-1 ${
              isCompared
                ? 'bg-emerald-700 text-white'
                : 'bg-white/95 text-neutral-800 hover:bg-white'
            }`}
            title="Add to side-by-side comparison"
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>

          {/* Availability Status Ribbon */}
          <div className="absolute bottom-2 left-3">
            {hostel.availability_status === 'Available' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-900 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Available {hostel.available_beds !== null ? `(${hostel.available_beds} beds)` : ''}
              </span>
            ) : hostel.availability_status === 'Limited Availability' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-900 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Limited Availability
              </span>
            ) : hostel.availability_status === 'Full' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-900 rounded shadow-sm">
                Full
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-neutral-200/90 text-neutral-700 rounded shadow-sm">
                Availability not confirmed
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Metadata Row (Zero-pill discipline per Section 1.A) */}
          <div className="flex items-center gap-2 text-xs text-neutral-600 mb-1.5">
            <span className="font-semibold text-neutral-900">{hostel.area}</span>
            {hostel.sub_area && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate max-w-[140px]">{hostel.sub_area}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{hostel.room_type} Room</span>
          </div>

          {/* Hostel Name */}
          <h2 className="text-lg font-bold text-neutral-900 leading-snug line-clamp-1 hover:text-emerald-800 transition-colors">
            <button
              onClick={() => onViewDetails(hostel)}
              className="text-left cursor-pointer focus:outline-none"
            >
              {hostel.name}
            </button>
          </h2>

          {/* Improved Pricing Display (Distinguishing Included vs Additional Charges) */}
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-neutral-900 tabular-nums">
                PKR {hostel.monthly_rent_min.toLocaleString()}
              </span>
              {hostel.monthly_rent_max > hostel.monthly_rent_min && (
                <span className="text-sm font-medium text-neutral-500 tabular-nums">
                  – {hostel.monthly_rent_max.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-neutral-500 font-normal">/ month</span>
            </div>

            {/* Clear Charges Breakdown Line */}
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
              <span className="text-neutral-500">
                Deposit: <strong className="text-neutral-800 font-medium">{hostel.security_deposit ? `PKR ${hostel.security_deposit.toLocaleString()}` : 'Not provided / Nil'}</strong>
              </span>
              <span className="text-neutral-300">·</span>
              <span className={pricing?.electricity.type === 'Additional' ? 'text-amber-800 font-medium' : 'text-emerald-800 font-medium'}>
                Electricity: {pricing?.electricity.type || (hostel.electricity.includes('Sub-meter') ? 'Additional' : 'Included')}
              </span>
              <span className="text-neutral-300">·</span>
              <span className={hostel.mess ? 'text-emerald-800 font-medium' : 'text-neutral-500'}>
                Mess: {hostel.mess ? 'Included' : 'No Mess'}
              </span>
            </div>
          </div>

          {/* Key Facilities Row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-700 border-t border-neutral-100 pt-3">
            {hostel.wifi && (
              <span className="inline-flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                <span>Wi-Fi</span>
              </span>
            )}
            {hostel.mess && (
              <span className="inline-flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-700" />
                <span>Mess</span>
              </span>
            )}
            {hostel.ac && (
              <span className="inline-flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-blue-700" />
                <span>AC</span>
              </span>
            )}
            {hostel.attached_bathroom && (
              <span className="inline-flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-indigo-700" />
                <span>Attached Bath</span>
              </span>
            )}
            {(hostel.generator || hostel.backup !== 'None') && (
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-600" />
                <span>Backup</span>
              </span>
            )}
          </div>

          {/* Verification Status & Last Checked Row (Requirement 4) */}
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 pt-2.5">
            <div className="flex items-center gap-1.5">
              {hostel.verification_status === 'Verified' ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified {hostel.verified_date ? `(${hostel.verified_date})` : ''}</span>
                </span>
              ) : hostel.verification_status === 'Pending Verification' ? (
                <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Pending Verification</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-500 font-medium">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Unverified</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-neutral-500">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>Last checked: {hostel.last_checked || 'Recent'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: DYNAMICALLY RENDERED ONLY WHEN DATA EXISTS (Requirement 3 + Lead Gen) */}
      <div className="p-4 sm:p-5 pt-0 bg-white">
        <div className="pt-2 border-t border-neutral-100">
          {/* Primary Lead Action: Contact this Hostel */}
          <button
            onClick={() => onContactHostel?.(hostel)}
            className="w-full mb-2 py-2.5 px-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-98 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>Contact this Hostel</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Details Button (Always available) */}
            <button
              onClick={() => onViewDetails(hostel)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer text-center"
            >
              View Details
            </button>

          {/* Google Maps Button (Only if valid URL or coords exist) */}
          {(hostel.google_maps_url || (hostel.latitude && hostel.longitude)) && (
            <button
              onClick={handleMapClick}
              className="py-2 px-2.5 text-xs font-semibold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
              title="Open Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden sm:inline">Map</span>
            </button>
          )}

          {/* Call Button (Only if valid phone number exists) */}
          {hostel.phone && (
            <a
              href={`tel:${hostel.phone}`}
              onClick={handlePhoneClick}
              className="py-2 px-2.5 text-xs font-semibold text-neutral-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors text-center flex items-center justify-center gap-1"
              title={`Call ${hostel.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Call</span>
            </a>
          )}

          {/* WhatsApp Button (Only if valid WhatsApp number exists) */}
          {hostel.whatsapp && (
            <button
              onClick={handleWhatsappClick}
              className="py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </button>
          )}

          {/* Instagram Button (Only if real URL exists) */}
          {hostel.instagram && (
            <button
              onClick={handleInstagramClick}
              className="p-2 text-neutral-700 hover:text-pink-600 bg-neutral-50 hover:bg-pink-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
              title="Hostel Instagram Profile"
            >
              <Instagram className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Facebook Button (Only if real URL exists) */}
          {hostel.facebook && (
            <button
              onClick={handleFacebookClick}
              className="p-2 text-neutral-700 hover:text-blue-600 bg-neutral-50 hover:bg-blue-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
              title="Hostel Facebook Page"
            >
              <Facebook className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Website Button (Only if real URL exists) */}
          {hostel.website && (
            <button
              onClick={handleWebsiteClick}
              className="p-2 text-neutral-700 hover:text-emerald-700 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
              title="Official Website"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  </article>
);
};
