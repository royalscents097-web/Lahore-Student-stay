/**
 * Lahore Student Stay - Type Definitions
 * Strict data types for hostels, universities, areas, and admin management.
 */

export type GenderType = 'Boys' | 'Girls';

export type VerificationStatus = 'Verified' | 'Unverified' | 'Pending Verification';

export type AvailabilityStatus = 'Available' | 'Limited Availability' | 'Full' | 'Unknown';

export type RoomType =
  | 'Single'
  | 'Double'
  | 'Triple'
  | '4-Seater'
  | '5-Seater'
  | 'Shared'
  | 'Private Room'
  | 'Other';

export interface NearbyUniversity {
  university_id: string;
  university_name: string;
  distance_km: number | null; // null if distance not strictly verified
  distance_text?: string;     // e.g. "0.8 km (Walking distance)"
  notes?: string;
}

export interface HostelPhoto {
  url: string;
  caption: string;
  category: 'Exterior' | 'Room' | 'Bathroom' | 'Mess' | 'Common Area' | 'Study Area' | 'Other';
}

export interface PricingBreakdown {
  monthly_rent_text: string;
  security_deposit_text: string;
  electricity: {
    type: 'Included' | 'Additional' | 'Not provided';
    description: string;
  };
  mess: {
    type: 'Included' | 'Additional' | 'Optional' | 'Not provided';
    description: string;
    estimated_cost?: string;
  };
  other_charges: {
    has_charges: boolean;
    description: string;
  };
}

export interface Hostel {
  id: string;
  slug: string;
  name: string;
  gender: GenderType;
  area: string;
  sub_area: string;
  full_address: string;
  description: string;
  monthly_rent_min: number;
  monthly_rent_max: number;
  security_deposit: number | null;
  room_type: RoomType;
  room_options: string[]; // e.g. ["Single", "Double", "Triple"]
  capacity: number | null;
  availability_status: AvailabilityStatus;
  available_beds: number | null;
  
  // Facilities
  furnished: boolean;
  ac: boolean;
  attached_bathroom: boolean;
  wifi: boolean;
  wifi_speed: string; // e.g. "30 Mbps" or "Not provided"
  electricity: string; // e.g. "Included in rent" or "Sub-meter billed" or "Not provided"
  backup: string; // "UPS", "Generator", "Solar", "None", "Not provided"
  mess: boolean;
  mess_frequency: string; // e.g. "3 times daily", "2 times daily (Lunch & Dinner)", "Optional", "Not provided"
  laundry: boolean;
  parking: boolean;
  cctv: boolean;
  security_guard: boolean;
  study_room: boolean;
  kitchen: boolean;
  generator: boolean;
  water: boolean;
  geyser: boolean;
  cleaning: boolean;

  // Contact & Social Media (Dynamically rendered only if valid)
  contact_name: string;
  phone: string; // Real public contact phone, or empty string
  whatsapp: string; // Real WhatsApp number formatted for wa.me, or empty string
  website: string;
  google_maps_url: string;
  instagram: string; // Real Instagram profile or empty string
  facebook: string; // Real Facebook page or empty string
  latitude: number | null;
  longitude: number | null;

  // Structured Pricing Breakdown
  pricing_breakdown?: PricingBreakdown;

  // Media
  photos: HostelPhoto[];

  // Verification & Metadata
  verification_status: VerificationStatus;
  verified_date: string | null;
  last_checked: string; // Date string: "YYYY-MM-DD"
  featured: boolean;
  published: boolean;
  nearby_universities: NearbyUniversity[];
  source_url: string;
  source_name: string;
  notes: string;

  // Analytics fields
  listing_views: number;
  contact_clicks: number;
  whatsapp_clicks: number;
  map_clicks: number;
  phone_clicks: number;
  instagram_clicks?: number;
  facebook_clicks?: number;
  website_clicks?: number;

  created_at: string;
  updated_at: string;
}

export interface HostelClaim {
  id: string;
  hostel_id: string;
  hostel_name: string;
  claimant_name: string;
  claimant_role: 'Owner' | 'Warden' | 'Manager' | 'Authorized Representative';
  phone: string;
  whatsapp: string;
  email: string;
  proof_document_note: string;
  proposed_changes: {
    monthly_rent_min?: number;
    monthly_rent_max?: number;
    security_deposit?: number;
    availability_status?: AvailabilityStatus;
    available_beds?: number | null;
    phone?: string;
    whatsapp?: string;
    electricity_policy?: string;
    mess_policy?: string;
    other_charges?: string;
    additional_notes?: string;
  };
  status: 'Pending Review' | 'Approved' | 'Rejected';
  submitted_at: string;
}

export interface AreaItem {
  id: string;
  name: string;
  slug: string;
  popular?: boolean;
  hostel_count?: number;
}

export interface UniversityItem {
  id: string;
  name: string;
  short_name: string;
  area: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Assigned' | 'Converted' | 'Not Converted' | 'Closed';

export interface LeadItem {
  lead_id: string; // Unique ID, e.g. "LS-1047"
  hostel_id: string;
  hostel_name: string;
  visitor_name: string;
  visitor_phone: string;
  gender: GenderType;
  area: string;
  budget: string;
  room_type: string;
  requirements: string[]; // e.g. ['Wi-Fi', 'Mess', 'AC', 'Furnished', 'Attached Bathroom', 'Parking', 'Electricity Backup']
  source: string; // Fixed to "Lahore Student Stay"
  status: LeadStatus;
  notes?: string;
  assigned_warden_name?: string;
  assigned_warden_phone?: string;
  assigned_warden_whatsapp?: string;
  assigned_at?: string;
  lead_fee?: number; // Fee in PKR, e.g. 1500
  fee_status?: 'Pending' | 'Paid' | 'Waived';
  created_at: string;
  updated_at: string;
}

export interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  contacted: number;
  assigned: number;
  converted: number;
  notConverted: number;
  closed: number;
  conversionRate: number;
  totalFeesEarned: number;
  pendingFees: number;
}

export interface FilterState {
  gender: 'All' | 'Boys' | 'Girls';
  area: string;
  minRent: number;
  maxRent: number;
  roomType: string;
  wifi: boolean;
  mess: boolean;
  ac: boolean;
  furnished: boolean;
  attachedBath: boolean;
  cctv: boolean;
  parking: boolean;
  backup: boolean;
  availability: string;
  verifiedOnly: boolean;
  searchQuery: string;
  university: string;
  sortBy: 'lowest_rent' | 'highest_rent' | 'recently_updated' | 'recently_verified' | 'featured';
}

export interface AdminStats {
  totalHostels: number;
  boysHostels: number;
  girlsHostels: number;
  verified: number;
  pendingVerification: number;
  unverified: number;
  available: number;
  featured: number;
  totalViews: number;
  totalContactClicks: number;
  totalWhatsappClicks: number;
  totalMapClicks: number;
  totalPhoneClicks: number;
  totalLeads?: number;
  newLeads?: number;
  convertedLeads?: number;
}
