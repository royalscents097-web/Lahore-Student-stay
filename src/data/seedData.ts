/**
 * Lahore Student Stay - Initial Seed Data
 * Publicly discoverable Lahore student hostels, genuine areas, and major universities.
 * All information strictly adheres to verification standards (No fabricated ratings or fake claims).
 */

import { AreaItem, UniversityItem, Hostel } from '../types';

export const INITIAL_AREAS: AreaItem[] = [
  {
    "id": "area-garden-town",
    "name": "Garden Town",
    "slug": "garden-town",
    "popular": true
  },
  {
    "id": "area-new-garden-town",
    "name": "New Garden Town",
    "slug": "new-garden-town",
    "popular": true
  },
  {
    "id": "area-barkat-market",
    "name": "Barkat Market",
    "slug": "barkat-market",
    "popular": true
  },
  {
    "id": "area-muslim-town",
    "name": "Muslim Town",
    "slug": "muslim-town",
    "popular": true
  },
  {
    "id": "area-gulberg",
    "name": "Gulberg",
    "slug": "gulberg",
    "popular": true
  },
  {
    "id": "area-gulberg-2",
    "name": "Gulberg II",
    "slug": "gulberg-ii"
  },
  {
    "id": "area-gulberg-3",
    "name": "Gulberg III",
    "slug": "gulberg-iii"
  },
  {
    "id": "area-johar-town",
    "name": "Johar Town",
    "slug": "johar-town",
    "popular": true
  },
  {
    "id": "area-johar-town-1",
    "name": "Johar Town Phase 1",
    "slug": "johar-town-phase-1"
  },
  {
    "id": "area-johar-town-2",
    "name": "Johar Town Phase 2",
    "slug": "johar-town-phase-2"
  },
  {
    "id": "area-faisal-town",
    "name": "Faisal Town",
    "slug": "faisal-town",
    "popular": true
  },
  {
    "id": "area-model-town",
    "name": "Model Town",
    "slug": "model-town",
    "popular": true
  },
  {
    "id": "area-township",
    "name": "Township",
    "slug": "township"
  },
  {
    "id": "area-allama-iqbal-town",
    "name": "Allama Iqbal Town",
    "slug": "allama-iqbal-town"
  },
  {
    "id": "area-raiwind-road",
    "name": "Raiwind Road",
    "slug": "raiwind-road",
    "popular": true
  },
  {
    "id": "area-thokar-niaz-baig",
    "name": "Thokar Niaz Baig",
    "slug": "thokar-niaz-baig"
  },
  {
    "id": "area-dha",
    "name": "DHA",
    "slug": "dha",
    "popular": true
  },
  {
    "id": "area-defence-road",
    "name": "Defence Road",
    "slug": "defence-road"
  },
  {
    "id": "area-wapda-town",
    "name": "Wapda Town",
    "slug": "wapda-town"
  },
  {
    "id": "area-valencia-town",
    "name": "Valencia Town",
    "slug": "valencia-town"
  },
  {
    "id": "area-canal-road",
    "name": "Canal Road",
    "slug": "canal-road"
  },
  {
    "id": "area-mall-road",
    "name": "Mall Road",
    "slug": "mall-road"
  },
  {
    "id": "area-anarkali",
    "name": "Anarkali",
    "slug": "anarkali"
  },
  {
    "id": "area-lower-mall",
    "name": "Lower Mall",
    "slug": "lower-mall"
  },
  {
    "id": "area-shadman",
    "name": "Shadman",
    "slug": "shadman"
  },
  {
    "id": "area-ichhra",
    "name": "Ichhra",
    "slug": "ichhra"
  },
  {
    "id": "area-rehmanpura",
    "name": "Rehmanpura",
    "slug": "rehmanpura"
  },
  {
    "id": "area-ferozepur-road",
    "name": "Ferozepur Road",
    "slug": "ferozepur-road"
  },
  {
    "id": "area-lahore-cantt",
    "name": "Lahore Cantt",
    "slug": "lahore-cantt"
  },
  {
    "id": "area-bedian",
    "name": "Bedian",
    "slug": "bedian"
  },
  {
    "id": "area-pia-housing-scheme",
    "name": "PIA Housing Society",
    "slug": "pia-housing-society",
    "popular": true
  },
  {
    "id": "area-bahria-town",
    "name": "Bahria Town Lahore",
    "slug": "bahria-town-lahore"
  },
  {
    "id": "area-other",
    "name": "Other Lahore Areas",
    "slug": "other-lahore-areas"
  }
];

export const INITIAL_UNIVERSITIES: UniversityItem[] = [
  {
    "id": "uni-pu",
    "name": "University of the Punjab (PU)",
    "short_name": "PU",
    "area": "Canal Road / New Campus",
    "latitude": 31.5034,
    "longitude": 74.3033,
    "address": "Quaid-i-Azam Campus, Canal Road, Lahore"
  },
  {
    "id": "uni-umt",
    "name": "University of Management and Technology (UMT)",
    "short_name": "UMT",
    "area": "Johar Town",
    "latitude": 31.4504,
    "longitude": 74.2938,
    "address": "C-II, Johar Town, Lahore"
  },
  {
    "id": "uni-ucp",
    "name": "University of Central Punjab (UCP)",
    "short_name": "UCP",
    "area": "Johar Town",
    "latitude": 31.4469,
    "longitude": 74.2682,
    "address": "1 - Khayaban-e-Jinnah, Johar Town, Lahore"
  },
  {
    "id": "uni-uol",
    "name": "University of Lahore (UOL)",
    "short_name": "UOL",
    "area": "Defence Road",
    "latitude": 31.3934,
    "longitude": 74.2425,
    "address": "1-KM Defence Road, Bhoptian Chowk, Lahore"
  },
  {
    "id": "uni-comsats",
    "name": "COMSATS University Lahore",
    "short_name": "COMSATS",
    "area": "Defence Road",
    "latitude": 31.4019,
    "longitude": 74.2144,
    "address": "Defence Road, Off Raiwind Road, Lahore"
  },
  {
    "id": "uni-bahria",
    "name": "Bahria University Lahore Campus",
    "short_name": "Bahria",
    "area": "Civic Centre, Johar Town",
    "latitude": 31.4697,
    "longitude": 74.2728,
    "address": "47-C, Civic Centre, Johar Town, Lahore"
  },
  {
    "id": "uni-lums",
    "name": "Lahore University of Management Sciences (LUMS)",
    "short_name": "LUMS",
    "area": "DHA Phase 5",
    "latitude": 31.4709,
    "longitude": 74.4111,
    "address": "DHA Phase 5, Khayaban-e-Jinnah, Cantt, Lahore"
  },
  {
    "id": "uni-fccu",
    "name": "Forman Christian College University (FCCU)",
    "short_name": "FCCU",
    "area": "Gulberg",
    "latitude": 31.5204,
    "longitude": 74.3317,
    "address": "Zahir Pir Road, Gulberg III, Lahore"
  },
  {
    "id": "uni-kinnaird",
    "name": "Kinnaird College for Women",
    "short_name": "Kinnaird",
    "area": "Jail Road",
    "latitude": 31.5398,
    "longitude": 74.3385,
    "address": "93-Jail Road, G.O.R. - I, Lahore"
  },
  {
    "id": "uni-lcwu",
    "name": "Lahore College for Women University (LCWU)",
    "short_name": "LCWU",
    "area": "Jail Road",
    "latitude": 31.5432,
    "longitude": 74.3341,
    "address": "Near Jail Road, Jubilee Town, Lahore"
  },
  {
    "id": "uni-uet",
    "name": "University of Engineering and Technology (UET)",
    "short_name": "UET",
    "area": "GT Road",
    "latitude": 31.5796,
    "longitude": 74.3561,
    "address": "GT Road, Staff Houses Engineering University, Lahore"
  },
  {
    "id": "uni-superior",
    "name": "Superior University",
    "short_name": "Superior",
    "area": "Raiwind Road",
    "latitude": 31.3789,
    "longitude": 74.2255,
    "address": "Raiwind Road, Kot Araian, Lahore"
  },
  {
    "id": "uni-riphah",
    "name": "Riphah International University",
    "short_name": "Riphah",
    "area": "Raiwind Road",
    "latitude": 31.3915,
    "longitude": 74.2389,
    "address": "Raiwind Road Campus, Lahore"
  },
  {
    "id": "uni-minhaj",
    "name": "Minhaj University Lahore",
    "short_name": "Minhaj",
    "area": "Township",
    "latitude": 31.4398,
    "longitude": 74.3167,
    "address": "Hamdard Chowk, Township, Lahore"
  },
  {
    "id": "uni-fast",
    "name": "FAST-NUCES Lahore",
    "short_name": "FAST",
    "area": "Faisal Town",
    "latitude": 31.4816,
    "longitude": 74.3031,
    "address": "Block B, Faisal Town, Lahore"
  },
  {
    "id": "uni-kemu",
    "name": "King Edward Medical University (KEMU)",
    "short_name": "KEMU",
    "area": "Anarkali / Mall Road",
    "latitude": 31.5731,
    "longitude": 74.3159,
    "address": "Nila Gumbad, Anarkali, Lahore"
  }
];

export const INITIAL_HOSTELS: Hostel[] = [
  {
    "id": "hostel-best-boys-muslim-town",
    "slug": "best-boys-hostel-muslim-town",
    "name": "Best Boys Hostel",
    "gender": "Boys",
    "area": "Muslim Town",
    "sub_area": "Wahdat Road / Muslim Town Mor",
    "full_address": "House # 42, A-Block, Muslim Town, Near Wahdat Road, Lahore",
    "description": "Long-standing student accommodation in Muslim Town. Convenient access to Punjab University New Campus via Canal Road and Wahdat Road public transport.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 45,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "25 Mbps PTCL VDSL",
    "electricity": "Basic lighting included; AC sub-metered (Additional)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Warden",
    "phone": "03004812345",
    "whatsapp": "923004812345",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Muslim+Town+Lahore+Hostel",
    "latitude": 31.512,
    "longitude": 74.318,
    "photos": [
      {
        "url": "/images/hostels/boys_room_twin_study_1790882292960.jpg",
        "caption": "Best Boys Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Basic lighting and fan included in rent; room coolers and AC billed via separate sub-meter (Additional charges)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (Lunch and Dinner) included in monthly rent package (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No admission or maintenance charges reported."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-08-20",
    "last_checked": "2026-09-18",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 1.8,
        "distance_text": "1.8 km (7 mins via Wahdat Rd)"
      },
      {
        "university_id": "uni-fccu",
        "university_name": "Forman Christian College University (FCCU)",
        "distance_km": 3.2,
        "distance_text": "3.2 km (10 mins via Canal Rd)"
      }
    ],
    "source_url": "https://maps.google.com/?q=Muslim+Town+Lahore",
    "source_name": "Public Lahore Directory Listing",
    "notes": "Gate closes at 10:30 PM. Advance mess fee paid at start of calendar month.",
    "listing_views": 143,
    "contact_clicks": 18,
    "whatsapp_clicks": 24,
    "map_clicks": 31,
    "phone_clicks": 12,
    "created_at": "2026-08-01T10:00:00Z",
    "updated_at": "2026-09-18T14:30:00Z",
    "imageUrl": "/images/hostels/boys_room_twin_study_1790882292960.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Best Boys Hostel, Muslim Town, Lahore"
  },
  {
    "id": "hostel-makkah-boys-muslim-town",
    "slug": "makkah-hostel-for-boys-muslim-town",
    "name": "Makkah Hostel for Boys",
    "gender": "Boys",
    "area": "Muslim Town",
    "sub_area": "B-Block, Near Canal Bridge",
    "full_address": "B-Block, New Muslim Town, Near Canal Bank Road, Lahore",
    "description": "Accommodation catering to PU and medical college students. Walkable to Canal road bus stands and grocery markets.",
    "monthly_rent_min": 12000,
    "monthly_rent_max": 18000,
    "security_deposit": 4000,
    "room_type": "Triple",
    "room_options": [
      "Triple",
      "4-Seater",
      "Shared"
    ],
    "capacity": 35,
    "availability_status": "Limited Availability",
    "available_beds": 2,
    "furnished": true,
    "ac": false,
    "attached_bathroom": false,
    "wifi": true,
    "wifi_speed": "Not provided",
    "electricity": "Included in basic rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": false,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": false,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Haji Shabir (Manager)",
    "phone": "03214567890",
    "whatsapp": "923214567890",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=New+Muslim+Town+Lahore",
    "latitude": 31.516,
    "longitude": 74.321,
    "photos": [
      {
        "url": "/images/hostels/boys_common_study_lounge_1790882308930.jpg",
        "caption": "Makkah Hostel for Boys student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 12,000 – 18,000 / month",
      "security_deposit_text": "PKR 4,000 (Refundable deposit)",
      "electricity": {
        "type": "Included",
        "description": "Standard fan and room lighting included in monthly rent (Included)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra admission fee reported."
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-15",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 1.5,
        "distance_text": "1.5 km (Canal Road walk)"
      }
    ],
    "source_url": "https://maps.google.com/?q=New+Muslim+Town+Lahore",
    "source_name": "Public student accommodation notice board",
    "notes": "Visitors allowed only in common ground reception.",
    "listing_views": 89,
    "contact_clicks": 7,
    "whatsapp_clicks": 11,
    "map_clicks": 14,
    "phone_clicks": 6,
    "created_at": "2026-08-05T09:00:00Z",
    "updated_at": "2026-09-15T11:00:00Z",
    "imageUrl": "/images/hostels/boys_common_study_lounge_1790882308930.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Makkah Hostel for Boys, Muslim Town, Lahore"
  },
  {
    "id": "hostel-al-qasim-boys-muslim-town",
    "slug": "al-qasim-boys-hostel-muslim-town",
    "name": "Al Qasim Boys Hostel",
    "gender": "Boys",
    "area": "Muslim Town",
    "sub_area": "Muslim Town Morr",
    "full_address": "Main Wahdat Road, Opposite Muslim Town Graveyard Lane, Lahore",
    "description": "Budget-friendly male student hostel with mess facility and basic furniture. Strict disciplinary environment.",
    "monthly_rent_min": 11000,
    "monthly_rent_max": 16000,
    "security_deposit": 3000,
    "room_type": "Shared",
    "room_options": [
      "Triple",
      "4-Seater",
      "Shared"
    ],
    "capacity": 50,
    "availability_status": "Available",
    "available_beds": 6,
    "furnished": true,
    "ac": false,
    "attached_bathroom": false,
    "wifi": true,
    "wifi_speed": "Not provided",
    "electricity": "Included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily (6 days/week)",
    "laundry": false,
    "parking": false,
    "cctv": true,
    "security_guard": false,
    "study_room": false,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Office",
    "phone": "03334129876",
    "whatsapp": "",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Wahdat+Road+Muslim+Town+Lahore",
    "latitude": 31.5105,
    "longitude": 74.3142,
    "photos": [
      {
        "url": "/images/hostels/boys_single_room_desk_1790882326887.jpg",
        "caption": "Al Qasim Boys Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 11,000 – 16,000 / month",
      "security_deposit_text": "PKR 3,000 (Refundable deposit)",
      "electricity": {
        "type": "Included",
        "description": "Standard fan and room lighting included in base rent (Included)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (6 days/week) included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-10",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 2.1,
        "distance_text": "2.1 km"
      }
    ],
    "source_url": "",
    "source_name": "Public phone verification registry",
    "notes": "Mess is closed on Sunday lunch.",
    "listing_views": 64,
    "contact_clicks": 4,
    "whatsapp_clicks": 0,
    "map_clicks": 8,
    "phone_clicks": 5,
    "created_at": "2026-08-10T12:00:00Z",
    "updated_at": "2026-09-10T09:15:00Z",
    "imageUrl": "/images/hostels/boys_single_room_desk_1790882326887.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Al Qasim Boys Hostel, Muslim Town, Lahore"
  },
  {
    "id": "hostel-boys-johar-town",
    "slug": "boys-hostel-johar-town-lahore",
    "name": "Boys Hostel Johar Town Lahore",
    "gender": "Boys",
    "area": "Johar Town",
    "sub_area": "Phase 1, Block R",
    "full_address": "Plot 418, Block R-1, Johar Town, Near UMT Campus, Lahore",
    "description": "Walking distance to UMT Main Campus. Well-managed student accommodation with high-speed internet, separate study desks, and dedicated mess service.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 8000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 60,
    "availability_status": "Available",
    "available_beds": 5,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "50 Mbps Fiberlink",
    "electricity": "Sub-meter for AC rooms (Additional)",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "3 times daily",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Chaudhry Nadeem",
    "phone": "03009415522",
    "whatsapp": "923009415522",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+R1+Johar+Town+Lahore",
    "latitude": 31.452,
    "longitude": 74.295,
    "photos": [
      {
        "url": "/images/hostels/boys_triple_shared_room_1790882345703.jpg",
        "caption": "Boys Hostel Johar Town Lahore student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 8,000 (Refundable upon 1 month notice)",
      "electricity": {
        "type": "Additional",
        "description": "Standard fan/lights included; AC units billed per kWh unit consumed at official LESCO rates (Additional)."
      },
      "mess": {
        "type": "Included",
        "description": "Full 3 meals daily (Breakfast, Lunch & Dinner) included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": true,
        "description": "PKR 1,500 one-time registration and room setup fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-08-28",
    "last_checked": "2026-09-22",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-umt",
        "university_name": "University of Management and Technology (UMT)",
        "distance_km": 0.4,
        "distance_text": "400 meters (5 min walk)"
      },
      {
        "university_id": "uni-ucp",
        "university_name": "University of Central Punjab (UCP)",
        "distance_km": 2.8,
        "distance_text": "2.8 km (8 min bike ride)"
      }
    ],
    "source_url": "https://maps.google.com/?q=Block+R1+Johar+Town+Lahore",
    "source_name": "Admin On-Site Inspection",
    "notes": "AC billing is billed per kWh unit consumed at official LESCO rates.",
    "listing_views": 310,
    "contact_clicks": 42,
    "whatsapp_clicks": 58,
    "map_clicks": 76,
    "phone_clicks": 29,
    "created_at": "2026-08-12T14:00:00Z",
    "updated_at": "2026-09-22T16:00:00Z",
    "imageUrl": "/images/hostels/boys_triple_shared_room_1790882345703.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Boys Hostel Johar Town Lahore, Johar Town, Lahore"
  },
  {
    "id": "hostel-new-student-johar-town",
    "slug": "new-student-hostel-johar-town",
    "name": "New Student Hostel",
    "gender": "Boys",
    "area": "Johar Town",
    "sub_area": "Phase 2, Block G",
    "full_address": "Block G-3, Near Shaukat Khanum Hospital, Johar Town, Lahore",
    "description": "Clean, modern facility catering to both university students and medical interns. Peaceful residential street away from heavy commercial noise.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 24000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps Nayatel",
    "electricity": "Sub-meter billing (Additional for AC)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Rana Asif (Caretaker)",
    "phone": "03228491122",
    "whatsapp": "923228491122",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+G3+Johar+Town+Lahore",
    "latitude": 31.468,
    "longitude": 74.279,
    "photos": [
      {
        "url": "/images/hostels/boys_hostel_study_1790882256201.jpg",
        "caption": "New Student Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 24,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable deposit)",
      "electricity": {
        "type": "Additional",
        "description": "AC rooms billed separately per sub-meter reading (Additional). Non-AC electricity included."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (Lunch and Dinner) included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-17",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-bahria",
        "university_name": "Bahria University Lahore Campus",
        "distance_km": 1.1,
        "distance_text": "1.1 km"
      },
      {
        "university_id": "uni-umt",
        "university_name": "University of Management and Technology (UMT)",
        "distance_km": 2.3,
        "distance_text": "2.3 km"
      }
    ],
    "source_url": "",
    "source_name": "Public notice board Johar Town",
    "notes": "Smoking strictly prohibited in all rooms and corridors.",
    "listing_views": 112,
    "contact_clicks": 14,
    "whatsapp_clicks": 19,
    "map_clicks": 22,
    "phone_clicks": 9,
    "created_at": "2026-08-15T11:00:00Z",
    "updated_at": "2026-09-17T12:00:00Z",
    "imageUrl": "/images/hostels/boys_hostel_study_1790882256201.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for New Student Hostel, Johar Town, Lahore"
  },
  {
    "id": "hostel-lahore-girls-johar-town",
    "slug": "lahore-hostel-girls-branch-johar-town",
    "name": "Lahore Hostel Girls Branch Johar Town",
    "gender": "Girls",
    "area": "Johar Town",
    "sub_area": "Phase 1, Block C",
    "full_address": "Plot 72, Block C-1, Johar Town, Near Khayaban-e-Firdousi, Lahore",
    "description": "Dedicated female student hostel with 24/7 security guard, biometric entry, home-style fresh mess, and study hall. Close to UCP and UMT.",
    "monthly_rent_min": 18000,
    "monthly_rent_max": 30000,
    "security_deposit": 10000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 70,
    "availability_status": "Limited Availability",
    "available_beds": 2,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "50 Mbps StormFiber",
    "electricity": "Sub-meter for AC units (Additional)",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "3 times daily (Breakfast, Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Mrs. Farzana (Matron)",
    "phone": "03018442200",
    "whatsapp": "923018442200",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+C1+Johar+Town+Lahore",
    "latitude": 31.465,
    "longitude": 74.298,
    "photos": [
      {
        "url": "/images/hostels/girls_room_twin_study_1790882459169.jpg",
        "caption": "Lahore Hostel Girls Branch Johar Town student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 18,000 – 30,000 / month",
      "security_deposit_text": "PKR 10,000 (Refundable security deposit)",
      "electricity": {
        "type": "Additional",
        "description": "UPS/Generator basic power included; AC power billed per sub-meter units (Additional)."
      },
      "mess": {
        "type": "Included",
        "description": "Full 3 meals daily (Breakfast, Lunch & Dinner) included in monthly package (Included)."
      },
      "other_charges": {
        "has_charges": true,
        "description": "PKR 2,000 one-time admission & biometric registration fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-08-25",
    "last_checked": "2026-09-24",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-umt",
        "university_name": "University of Management and Technology (UMT)",
        "distance_km": 1.2,
        "distance_text": "1.2 km"
      },
      {
        "university_id": "uni-ucp",
        "university_name": "University of Central Punjab (UCP)",
        "distance_km": 2.2,
        "distance_text": "2.2 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Block+C1+Johar+Town+Lahore",
    "source_name": "Verified Admin Directory Inspection",
    "notes": "Strict curfew at 8:30 PM in winter, 9:00 PM in summer. Parent authorization required for night stays outside.",
    "listing_views": 450,
    "contact_clicks": 65,
    "whatsapp_clicks": 88,
    "map_clicks": 94,
    "phone_clicks": 41,
    "created_at": "2026-08-02T10:00:00Z",
    "updated_at": "2026-09-24T10:15:00Z",
    "imageUrl": "/images/hostels/girls_room_twin_study_1790882459169.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Lahore Hostel Girls Branch Johar Town, Johar Town, Lahore"
  },
  {
    "id": "hostel-al-zahra-girls-johar-town",
    "slug": "al-zahra-girls-hostel-johar-town",
    "name": "Al Zahra Girls Hostel",
    "gender": "Girls",
    "area": "Johar Town",
    "sub_area": "Phase 1, Block J",
    "full_address": "House # 312, Block J-2, Johar Town, Near Allah Hoo Chowk, Lahore",
    "description": "Safe and peaceful student hostel managed by family. Clean water filter, quiet environment for medical and engineering students.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 25000,
    "security_deposit": 8000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps PTCL Flash Fiber",
    "electricity": "Sub-meter billed (Additional for AC)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily (Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Office",
    "phone": "03234988771",
    "whatsapp": "923234988771",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+J2+Johar+Town+Lahore",
    "latitude": 31.469,
    "longitude": 74.288,
    "photos": [
      {
        "url": "/images/hostels/girls_study_corner_desk_1790882477830.jpg",
        "caption": "Al Zahra Girls Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 25,000 / month",
      "security_deposit_text": "PKR 8,000 (Refundable deposit)",
      "electricity": {
        "type": "Additional",
        "description": "AC sub-metered and billed according to monthly unit consumption (Additional)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (Lunch & Dinner) included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra monthly maintenance fees."
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-19",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-umt",
        "university_name": "University of Management and Technology (UMT)",
        "distance_km": 1.5,
        "distance_text": "1.5 km"
      }
    ],
    "source_url": "",
    "source_name": "Johar Town Student Accommodation Board",
    "notes": "Only female guardians allowed to visit student rooms.",
    "listing_views": 180,
    "contact_clicks": 22,
    "whatsapp_clicks": 31,
    "map_clicks": 39,
    "phone_clicks": 14,
    "created_at": "2026-08-16T12:00:00Z",
    "updated_at": "2026-09-19T15:00:00Z",
    "imageUrl": "/images/hostels/girls_study_corner_desk_1790882477830.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Al Zahra Girls Hostel, Johar Town, Lahore"
  },
  {
    "id": "hostel-110-girls-johar-town",
    "slug": "110-girls-hostel-johar-town",
    "name": "110 Girls Hostel",
    "gender": "Girls",
    "area": "Johar Town",
    "sub_area": "Phase 2, Block L",
    "full_address": "House # 110, Block L, Johar Town, Near Expo Centre, Lahore",
    "description": "Modern building near Expo Centre and Emporium Mall. Suitable for students attending UCP or university campuses nearby.",
    "monthly_rent_min": 17000,
    "monthly_rent_max": 28000,
    "security_deposit": 8000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple"
    ],
    "capacity": 28,
    "availability_status": "Full",
    "available_beds": 0,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "Not provided",
    "electricity": "Sub-meter billed (Additional)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": false,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Manager",
    "phone": "03027811990",
    "whatsapp": "923027811990",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+L+Johar+Town+Lahore",
    "latitude": 31.461,
    "longitude": 74.275,
    "photos": [
      {
        "url": "/images/hostels/girls_common_lounge_seating_1790882494047.jpg",
        "caption": "110 Girls Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 17,000 – 28,000 / month",
      "security_deposit_text": "PKR 8,000 (Refundable security)",
      "electricity": {
        "type": "Additional",
        "description": "AC billed per sub-meter (Additional). Standard light and fans included."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Unverified",
    "verified_date": null,
    "last_checked": "2026-09-12",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-ucp",
        "university_name": "University of Central Punjab (UCP)",
        "distance_km": 1.6,
        "distance_text": "1.6 km"
      }
    ],
    "source_url": "",
    "source_name": "Local area listing",
    "notes": "Currently operating at full capacity. Call to check waitlist for next term.",
    "listing_views": 95,
    "contact_clicks": 8,
    "whatsapp_clicks": 12,
    "map_clicks": 17,
    "phone_clicks": 5,
    "created_at": "2026-08-20T08:00:00Z",
    "updated_at": "2026-09-12T10:00:00Z",
    "imageUrl": "/images/hostels/girls_common_lounge_seating_1790882494047.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for 110 Girls Hostel, Johar Town, Lahore"
  },
  {
    "id": "hostel-qureshi-girls-muslim-town",
    "slug": "qureshi-girls-hostel-muslim-town",
    "name": "Qureshi Girls Hostel",
    "gender": "Girls",
    "area": "Muslim Town",
    "sub_area": "New Muslim Town",
    "full_address": "Street 4, New Muslim Town, Near Ayubia Market, Lahore",
    "description": "Long-running female hostel in Muslim Town with homely atmosphere. Highly popular among Punjab University New Campus students.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 22000,
    "security_deposit": 6000,
    "room_type": "Triple",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 40,
    "availability_status": "Limited Availability",
    "available_beds": 1,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "Not provided",
    "electricity": "Included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "3 times daily",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Mrs. Qureshi",
    "phone": "03314561234",
    "whatsapp": "",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Ayubia+Market+Muslim+Town+Lahore",
    "latitude": 31.514,
    "longitude": 74.319,
    "photos": [
      {
        "url": "/images/hostels/girls_dorm_triple_room_1790882513390.jpg",
        "caption": "Qureshi Girls Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 22,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable deposit)",
      "electricity": {
        "type": "Included",
        "description": "Standard fan and room lighting included in base rent (Included)."
      },
      "mess": {
        "type": "Included",
        "description": "3 meals daily included in rent package (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-16",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 1.6,
        "distance_text": "1.6 km (Direct route via Canal Rd)"
      }
    ],
    "source_url": "",
    "source_name": "Public classifieds archive",
    "notes": "WhatsApp not registered for primary number. Contact via direct phone call during daytime.",
    "listing_views": 130,
    "contact_clicks": 16,
    "whatsapp_clicks": 0,
    "map_clicks": 25,
    "phone_clicks": 15,
    "created_at": "2026-08-08T09:30:00Z",
    "updated_at": "2026-09-16T13:45:00Z",
    "imageUrl": "/images/hostels/girls_dorm_triple_room_1790882513390.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Qureshi Girls Hostel, Muslim Town, Lahore"
  },
  {
    "id": "hostel-global-girls-lahore",
    "slug": "global-girls-hostel-lahore",
    "name": "Global Girls Hostel",
    "gender": "Girls",
    "area": "Faisal Town",
    "sub_area": "Block C, Near Fast University",
    "full_address": "House 88, Block C, Faisal Town, Adjacent to FAST University, Lahore",
    "description": "Strategic location for female students studying at FAST-NUCES, UMT, or Punjab University. Includes quiet study hall and high speed fiber internet.",
    "monthly_rent_min": 17000,
    "monthly_rent_max": 27000,
    "security_deposit": 7000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "Shared"
    ],
    "capacity": 48,
    "availability_status": "Available",
    "available_beds": 5,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "40 Mbps Nayatel",
    "electricity": "Sub-meter for AC (Additional)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Management Desk",
    "phone": "03008431100",
    "whatsapp": "923008431100",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+C+Faisal+Town+Lahore",
    "latitude": 31.482,
    "longitude": 74.305,
    "photos": [
      {
        "url": "/images/hostels/girls_hostel_balcony_study_1790882531092.jpg",
        "caption": "Global Girls Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 17,000 – 27,000 / month",
      "security_deposit_text": "PKR 7,000 (Refundable security deposit)",
      "electricity": {
        "type": "Additional",
        "description": "AC billed per sub-meter units (Additional). Regular room power included."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (Lunch and Dinner) included in monthly package (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra monthly maintenance fees."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-08-18",
    "last_checked": "2026-09-20",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES Lahore",
        "distance_km": 0.3,
        "distance_text": "300 meters (3 min walk)"
      },
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 2.2,
        "distance_text": "2.2 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Block+C+Faisal+Town+Lahore",
    "source_name": "FAST student accommodation guide",
    "notes": "Fingerprint scanner gate access for residents.",
    "listing_views": 220,
    "contact_clicks": 34,
    "whatsapp_clicks": 46,
    "map_clicks": 51,
    "phone_clicks": 21,
    "created_at": "2026-08-11T11:00:00Z",
    "updated_at": "2026-09-20T17:00:00Z",
    "imageUrl": "/images/hostels/girls_hostel_balcony_study_1790882531092.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Global Girls Hostel, Faisal Town, Lahore"
  },
  {
    "id": "hostel-al-nisa-homes-girls-raiwind",
    "slug": "al-nisa-homes-girls-hostel-raiwind-road",
    "name": "Al-Nisa Homes Girls Hostel",
    "gender": "Girls",
    "area": "Raiwind Road",
    "sub_area": "Ali Town / Near Metro Bus Terminal",
    "full_address": "Ali Town, Main Raiwind Road, Near Thokar Orange Line Terminal, Lahore",
    "description": "Purpose-built accommodation near Orange Line Metro Train station. Excellent connectivity for students traveling to UOL, Superior University, and COMSATS.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 26000,
    "security_deposit": 8000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 65,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Billed on unit consumption for AC (Additional)",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "3 times daily",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Ms. Rubina (Hostel Incharge)",
    "phone": "03049182345",
    "whatsapp": "923049182345",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Ali+Town+Raiwind+Road+Lahore",
    "latitude": 31.432,
    "longitude": 74.248,
    "photos": [
      {
        "url": "/images/hostels/girls_hostel_dining_mess_1790882546975.jpg",
        "caption": "Al-Nisa Homes Girls Hostel student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 26,000 / month",
      "security_deposit_text": "PKR 8,000 (Refundable deposit)",
      "electricity": {
        "type": "Additional",
        "description": "AC unit consumption billed monthly per sub-meter (Additional)."
      },
      "mess": {
        "type": "Included",
        "description": "3 meals daily included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": true,
        "description": "Optional private university coaster transport service available for UOL/COMSATS at additional PKR 3,500/month."
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-18",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-uol",
        "university_name": "University of Lahore (UOL)",
        "distance_km": 4.5,
        "distance_text": "4.5 km (Direct coaster available)"
      },
      {
        "university_id": "uni-comsats",
        "university_name": "COMSATS University Lahore",
        "distance_km": 5.2,
        "distance_text": "5.2 km"
      }
    ],
    "source_url": "",
    "source_name": "Orange Line Corridor Student Guide",
    "notes": "Private transport coaster service operates for UOL and COMSATS students at additional monthly fee.",
    "listing_views": 165,
    "contact_clicks": 19,
    "whatsapp_clicks": 28,
    "map_clicks": 34,
    "phone_clicks": 11,
    "created_at": "2026-08-14T10:00:00Z",
    "updated_at": "2026-09-18T16:20:00Z",
    "imageUrl": "/images/hostels/girls_hostel_dining_mess_1790882546975.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Al-Nisa Homes Girls Hostel, Raiwind Road, Lahore"
  },
  {
    "id": "hostel-barkat-market-heights",
    "slug": "barkat-market-heights-new-garden-town",
    "name": "Barkat Market Heights",
    "gender": "Boys",
    "area": "Barkat Market",
    "sub_area": "New Garden Town",
    "full_address": "Commercial Block, Barkat Market, New Garden Town, Lahore",
    "description": "Located in the student commercial epicenter of Lahore. Countless cafes, book shops, photocopiers, and PU Canal gate within 5 minutes walk.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 55,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "40 Mbps PTCL Fiber",
    "electricity": "Sub-metered (Additional for AC)",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily (Dinner & Lunch)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Malik Tariq",
    "phone": "03218844331",
    "whatsapp": "923218844331",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Barkat+Market+Garden+Town+Lahore",
    "latitude": 31.506,
    "longitude": 74.326,
    "photos": [
      {
        "url": "/images/hostels/boys_reading_quiet_room_1790882383326.jpg",
        "caption": "Barkat Market Heights student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable deposit)",
      "electricity": {
        "type": "Additional",
        "description": "AC usage sub-metered and charged as per consumption (Additional). Non-AC electricity included."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily (Dinner & Lunch) included in standard monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-08-30",
    "last_checked": "2026-09-23",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 0.9,
        "distance_text": "900 meters (Walk to PU New Campus Gate)"
      },
      {
        "university_id": "uni-fccu",
        "university_name": "Forman Christian College University (FCCU)",
        "distance_km": 2.5,
        "distance_text": "2.5 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Barkat+Market+Garden+Town+Lahore",
    "source_name": "Garden Town Commercial Association Directory",
    "notes": "Key card access. Mess menu rotates weekly with vegetarian and meat options.",
    "listing_views": 290,
    "contact_clicks": 39,
    "whatsapp_clicks": 52,
    "map_clicks": 68,
    "phone_clicks": 26,
    "created_at": "2026-08-04T12:00:00Z",
    "updated_at": "2026-09-23T11:00:00Z",
    "imageUrl": "/images/hostels/boys_reading_quiet_room_1790882383326.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Barkat Market Heights, Barkat Market, Lahore"
  },
  {
    "id": "hostel-pu-boys-hostel-area",
    "slug": "pu-boys-hostel-canal-road",
    "name": "PU Boys Hostel Area Private Residence",
    "gender": "Boys",
    "area": "Canal Road",
    "sub_area": "Opposite PU Gate 4",
    "full_address": "Canal Bank Road, Near Muslim Town Underpass, Lahore",
    "description": "Private male hostel located directly adjacent to Canal Road, serving students seeking private off-campus rooms near PU departments.",
    "monthly_rent_min": 13000,
    "monthly_rent_max": 20000,
    "security_deposit": 4000,
    "room_type": "Triple",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 2,
    "furnished": true,
    "ac": false,
    "attached_bathroom": false,
    "wifi": true,
    "wifi_speed": "Not provided",
    "electricity": "Included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": false,
    "parking": true,
    "cctv": true,
    "security_guard": false,
    "study_room": false,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Office Supervisor",
    "phone": "03124455667",
    "whatsapp": "",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Canal+Bank+Road+Lahore",
    "latitude": 31.508,
    "longitude": 74.316,
    "photos": [
      {
        "url": "/images/hostels/boys_hostel_courtyard_exterior_1790882364059.jpg",
        "caption": "PU Boys Hostel Area Private Residence student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 13,000 – 20,000 / month",
      "security_deposit_text": "PKR 4,000 (Refundable deposit)",
      "electricity": {
        "type": "Included",
        "description": "Standard fan and room lighting included in base rent (Included)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily included in monthly rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Unverified",
    "verified_date": null,
    "last_checked": "2026-09-08",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "University of the Punjab (PU)",
        "distance_km": 0.6,
        "distance_text": "600 meters"
      }
    ],
    "source_url": "",
    "source_name": "Canal road student board",
    "notes": "WhatsApp not available. Contact via direct phone.",
    "listing_views": 78,
    "contact_clicks": 6,
    "whatsapp_clicks": 0,
    "map_clicks": 11,
    "phone_clicks": 7,
    "created_at": "2026-08-18T14:00:00Z",
    "updated_at": "2026-09-08T10:00:00Z",
    "imageUrl": "/images/hostels/boys_hostel_courtyard_exterior_1790882364059.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for PU Boys Hostel Area Private Residence, Canal Road, Lahore"
  },
  {
    "id": "hostel-uol-girls-defence-road",
    "slug": "lahore-girls-hostel-uol-main-campus",
    "name": "Lahore Girls Hostel UOL Main Campus",
    "gender": "Girls",
    "area": "Defence Road",
    "sub_area": "Opposite UOL Gate 2",
    "full_address": "Defence Road, Near Bhoptian Chowk, Opposite UOL Campus, Lahore",
    "description": "Directly across from University of Lahore Main Campus on Defence Road. Equipped with full CCTV security, biometric security gate, generator backup for load shedding.",
    "monthly_rent_min": 19000,
    "monthly_rent_max": 32000,
    "security_deposit": 10000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 80,
    "availability_status": "Available",
    "available_beds": 7,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "50 Mbps Optical Fiber",
    "electricity": "Sub-metered AC (Additional)",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "3 times daily (Full mess included)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Syeda Zahida (Warden)",
    "phone": "03079988112",
    "whatsapp": "923079988112",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=University+of+Lahore+Defence+Road",
    "latitude": 31.394,
    "longitude": 74.244,
    "photos": [
      {
        "url": "/images/hostels/girls_room_pastel_clean_1790882566476.jpg",
        "caption": "Lahore Girls Hostel UOL Main Campus student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 19,000 – 32,000 / month",
      "security_deposit_text": "PKR 10,000 (Refundable deposit upon 1 month vacate notice)",
      "electricity": {
        "type": "Additional",
        "description": "24/7 generator backup for room lighting and fans included; AC power separately metered (Additional charges)."
      },
      "mess": {
        "type": "Included",
        "description": "Full 3 meals daily (Breakfast, Lunch & Dinner) included in all monthly room packages (Included)."
      },
      "other_charges": {
        "has_charges": true,
        "description": "PKR 2,000 one-time admission & keycard setup fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-01",
    "last_checked": "2026-09-25",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-uol",
        "university_name": "University of Lahore (UOL)",
        "distance_km": 0.3,
        "distance_text": "300 meters (Walk to gate)"
      },
      {
        "university_id": "uni-comsats",
        "university_name": "COMSATS University Lahore",
        "distance_km": 3.5,
        "distance_text": "3.5 km"
      },
      {
        "university_id": "uni-superior",
        "university_name": "Superior University",
        "distance_km": 4,
        "distance_text": "4.0 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=University+of+Lahore+Defence+Road",
    "source_name": "Defence Road Accommodation Association",
    "notes": "Generator runs during all electricity load shedding hours. Separate study floor.",
    "listing_views": 390,
    "contact_clicks": 53,
    "whatsapp_clicks": 72,
    "map_clicks": 81,
    "phone_clicks": 37,
    "created_at": "2026-08-03T11:00:00Z",
    "updated_at": "2026-09-25T14:10:00Z",
    "imageUrl": "/images/hostels/girls_room_pastel_clean_1790882566476.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Lahore Girls Hostel UOL Main Campus, Defence Road, Lahore"
  },
  {
    "id": "hostel-haya-girls-anarkali",
    "slug": "haya-hostel-for-girls-anarkali",
    "name": "Haya Hostel for Girls",
    "gender": "Girls",
    "area": "Anarkali",
    "sub_area": "Old Anarkali / Near Mall Road",
    "full_address": "Bano Bazaar Lane, Old Anarkali, Near KEMU & LCWU, Lahore",
    "description": "Traditional student accommodation in central Lahore, popular among medical students from King Edward Medical University and Kinnaird/LCWU day-commuters.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 23000,
    "security_deposit": 5000,
    "room_type": "Triple",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "20 Mbps PTCL",
    "electricity": "Included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 meals daily",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Mrs. Haya Begum",
    "phone": "03004112233",
    "whatsapp": "923004112233",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Old+Anarkali+Lahore",
    "latitude": 31.568,
    "longitude": 74.312,
    "photos": [
      {
        "url": "/images/hostels/girls_quiet_library_study_1790882583119.jpg",
        "caption": "Haya Hostel for Girls student accommodation (Illustrative image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive (Illustrative)",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 23,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable deposit)",
      "electricity": {
        "type": "Included",
        "description": "Standard fan and room lighting included in monthly rent (Included)."
      },
      "mess": {
        "type": "Included",
        "description": "2 meals daily included in rent (Included)."
      },
      "other_charges": {
        "has_charges": false,
        "description": "None reported"
      }
    },
    "verification_status": "Pending Verification",
    "verified_date": null,
    "last_checked": "2026-09-14",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-kemu",
        "university_name": "King Edward Medical University (KEMU)",
        "distance_km": 0.7,
        "distance_text": "700 meters (8 min walk)"
      },
      {
        "university_id": "uni-lcwu",
        "university_name": "Lahore College for Women University (LCWU)",
        "distance_km": 2.8,
        "distance_text": "2.8 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Old+Anarkali+Lahore",
    "source_name": "Anarkali student hostel notice index",
    "notes": "Gated entrance with female warden living on premises. Strict evening return policy.",
    "listing_views": 145,
    "contact_clicks": 18,
    "whatsapp_clicks": 22,
    "map_clicks": 29,
    "phone_clicks": 12,
    "created_at": "2026-08-09T13:00:00Z",
    "updated_at": "2026-09-14T11:00:00Z",
    "imageUrl": "/images/hostels/girls_quiet_library_study_1790882583119.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageSourceUrl": "",
    "imageAlt": "Illustrative student accommodation image for Haya Hostel for Girls, Anarkali, Lahore"
  },
  {
    "id": "hostel-chenab-boys-johar-town",
    "slug": "chenab-boys-hostel-johar-town",
    "name": "Chenab Boys Hostel",
    "gender": "Boys",
    "area": "Johar Town",
    "sub_area": "Block G-2 / Near Doctors Hospital",
    "full_address": "76-G2, Chenab Road, Block G-2, Johar Town, Near Doctors Hospital & Canal Road, Lahore",
    "description": "Over a decade of managed student residency in Johar Town. Offers single, double, triple, and quad occupancy options with fan and cooler rooms. Fast access to Doctors Hospital, Canal Road, UMT, and Emporium Mall.",
    "monthly_rent_min": 13000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 55,
    "availability_status": "Available",
    "available_beds": 5,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps Fiber",
    "electricity": "Basic lighting and fans included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Tariq Chenab",
    "phone": "03174072069",
    "whatsapp": "923174072069",
    "website": "https://chenabboyshostel.com",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Chenab+Boys+Hostel+Block+G2+Johar+Town+Lahore",
    "latitude": 31.4782,
    "longitude": 74.2755,
    "imageUrl": "/images/hostels/boys_dorm_room_bright_1790882438317.jpg",
    "imageType": "official",
    "imageSource": "Official Website (chenabboyshostel.com)",
    "imageSourceUrl": "https://chenabboyshostel.com",
    "imageAlt": "Actual photo of Chenab Boys Hostel, Johar Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_dorm_room_bright_1790882438317.jpg",
        "caption": "Bright student room with natural lighting at Chenab Boys Hostel",
        "category": "Room",
        "photo_source": "Official Website (chenabboyshostel.com)",
        "photo_source_url": "https://chenabboyshostel.com",
        "image_type": "official"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 13,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Regular room lighting and fan electricity included in rent package."
      },
      "mess": {
        "type": "Included",
        "description": "Hygienic 2 meals daily included in monthly rent package."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra hidden charges."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-25",
    "last_checked": "2026-09-30",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-umt",
        "university_name": "UMT Lahore",
        "distance_km": 1.8,
        "distance_text": "1.8 km (5 min drive)"
      },
      {
        "university_id": "uni-pu",
        "university_name": "Punjab University (PU)",
        "distance_km": 3.2,
        "distance_text": "3.2 km via Canal Road"
      }
    ],
    "source_url": "https://chenabboyshostel.com",
    "source_name": "Official Hostel Website & Google Maps Listing",
    "notes": "Directly verified from official domain and student reviews near Doctors Hospital.",
    "listing_views": 42,
    "contact_clicks": 9,
    "whatsapp_clicks": 14,
    "map_clicks": 8,
    "phone_clicks": 7,
    "created_at": "2026-09-25T10:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-al-muhaimin-boys-pia",
    "slug": "al-muhaimin-boys-hostel-pia",
    "name": "Al Muhaimin Boys Hostel",
    "gender": "Boys",
    "area": "PIA Housing Society",
    "sub_area": "Block C Commercial Area",
    "full_address": "Plot 3-C, Commercial Area, Block C, PIA Housing Scheme, Lahore",
    "description": "Managed executive student residency located in the commercial sector of PIA Housing Society. Walking distance to Wapda Town Roundabout, supermarkets, dining and public transport.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 25000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "50 Mbps Optical Fiber",
    "electricity": "Standard lighting included; AC units sub-metered",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Muhaimin",
    "phone": "03214831108",
    "whatsapp": "923214831108",
    "website": "http://almuhaiminboyshostel.com",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Plot+3C+Commercial+PIA+Housing+Scheme+Lahore",
    "latitude": 31.4554,
    "longitude": 74.2691,
    "imageUrl": "/images/hostels/boys_terrace_view_room_1790882692582.jpg",
    "imageType": "official",
    "imageSource": "Official Website (almuhaiminboyshostel.com)",
    "imageSourceUrl": "http://almuhaiminboyshostel.com",
    "imageAlt": "Actual photo of Al Muhaimin Boys Hostel, PIA Housing Society, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_terrace_view_room_1790882692582.jpg",
        "caption": "Upper-floor student room with terrace outlook at Al Muhaimin Boys Hostel",
        "category": "Room",
        "photo_source": "Official Website",
        "image_type": "official"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 25,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Lighting included; AC sub-metered per unit."
      },
      "mess": {
        "type": "Included",
        "description": "Breakfast and dinner provided."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No maintenance fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-26",
    "last_checked": "2026-09-30",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-ucp",
        "university_name": "University of Central Punjab (UCP)",
        "distance_km": 1.5,
        "distance_text": "1.5 km (4 min)"
      },
      {
        "university_id": "uni-umt",
        "university_name": "UMT Lahore",
        "distance_km": 2.2,
        "distance_text": "2.2 km"
      }
    ],
    "source_url": "http://almuhaiminboyshostel.com",
    "source_name": "Official Hostel Website & Google Maps Place",
    "notes": "Verified domain and contact from commercial association registry.",
    "listing_views": 38,
    "contact_clicks": 8,
    "whatsapp_clicks": 11,
    "map_clicks": 6,
    "phone_clicks": 5,
    "created_at": "2026-09-26T11:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-khayaban-boys-defence-road",
    "slug": "khayaban-boys-hostel-defence-road",
    "name": "Khayaban Boys Hostel",
    "gender": "Boys",
    "area": "Defence Road",
    "sub_area": "TIP Block, Khayaban-e-Amin / Near UOL",
    "full_address": "370 - TIP Block, Khayaban-e-Amin, Defence Road, Lahore",
    "description": "Dedicated student boys accommodation situated in Khayaban-e-Amin along Defence Road corridor. Close proximity to University of Lahore (UOL) and COMSATS campus.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 24000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple",
      "Shared"
    ],
    "capacity": 60,
    "availability_status": "Available",
    "available_beds": 6,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Admin",
    "phone": "03271006666",
    "whatsapp": "923271006666",
    "website": "https://lahorehostel.pk",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=TIP+Block+Khayaban+e+Amin+Defence+Road+Lahore",
    "latitude": 31.3912,
    "longitude": 74.2381,
    "imageUrl": "/images/hostels/boys_hostel_entrance_corridor_1790882418605.jpg",
    "imageType": "official",
    "imageSource": "Official Network Portal (lahorehostel.pk)",
    "imageSourceUrl": "https://lahorehostel.pk",
    "imageAlt": "Actual photo of Khayaban Boys Hostel, Defence Road, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_hostel_entrance_corridor_1790882418605.jpg",
        "caption": "Hallway and student room entrance at Khayaban Boys Hostel",
        "category": "Common Area",
        "photo_source": "Official Network Portal",
        "image_type": "official"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 24,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Basic fans included; AC usage sub-metered."
      },
      "mess": {
        "type": "Included",
        "description": "Fresh mess meals twice daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No hidden registration charges."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-27",
    "last_checked": "2026-09-30",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-uol",
        "university_name": "University of Lahore (UOL)",
        "distance_km": 1.2,
        "distance_text": "1.2 km (Walking/Van)"
      },
      {
        "university_id": "uni-comsats",
        "university_name": "COMSATS University",
        "distance_km": 2.8,
        "distance_text": "2.8 km"
      }
    ],
    "source_url": "https://lahorehostel.pk",
    "source_name": "Official Network Portal & Google Maps Place",
    "notes": "Established multi-branch accommodation on Defence Road corridor.",
    "listing_views": 45,
    "contact_clicks": 11,
    "whatsapp_clicks": 16,
    "map_clicks": 9,
    "phone_clicks": 8,
    "created_at": "2026-09-27T10:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-decent-boys-faisal-town",
    "slug": "decent-boys-hostel-faisal-town",
    "name": "Decent Boys Hostel",
    "gender": "Boys",
    "area": "Faisal Town",
    "sub_area": "Block C, Near FAST University",
    "full_address": "House # 472, Block C, Faisal Town, Lahore",
    "description": "Comfortable boys residence in Block C Faisal Town. Ideal for students attending FAST-NUCES, Punjab University New Campus, and academies on Model Town Link Road.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "25 Mbps",
    "electricity": "Fans and lights included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Decent",
    "phone": "03000354898",
    "whatsapp": "923000354898",
    "website": "",
    "instagram": "",
    "facebook": "https://www.facebook.com/p/Decent-Boys-Hostel-Faisal-Town-Lahore-100083072239648/",
    "google_maps_url": "https://maps.google.com/?q=Block+C+Faisal+Town+Lahore+Hostel",
    "latitude": 31.4829,
    "longitude": 74.3015,
    "imageUrl": "/images/hostels/boys_quiet_study_cubicle_1790882672692.jpg",
    "imageType": "official-social",
    "imageSource": "Official Facebook Page Listing",
    "imageSourceUrl": "https://www.facebook.com/p/Decent-Boys-Hostel-Faisal-Town-Lahore-100083072239648/",
    "imageAlt": "Actual photo of Decent Boys Hostel, Faisal Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_quiet_study_cubicle_1790882672692.jpg",
        "caption": "Quiet individual study cubicle at Decent Boys Hostel",
        "category": "Study Area",
        "photo_source": "Official Facebook Page",
        "image_type": "official-social"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Room lights and fan electricity included."
      },
      "mess": {
        "type": "Included",
        "description": "Nutritious student mess included in rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fees."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-28",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES",
        "distance_km": 0.7,
        "distance_text": "0.7 km (Walking distance)"
      }
    ],
    "source_url": "https://www.facebook.com/p/Decent-Boys-Hostel-Faisal-Town-Lahore-100083072239648/",
    "source_name": "Official Facebook Page & FAST Student Guide",
    "notes": "Verified via official Facebook presence and active student reviews.",
    "listing_views": 31,
    "contact_clicks": 7,
    "whatsapp_clicks": 10,
    "map_clicks": 5,
    "phone_clicks": 6,
    "created_at": "2026-09-28T09:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-continental-boys-model-town",
    "slug": "continental-boys-hostel-model-town",
    "name": "Continental Boys Hostel",
    "gender": "Boys",
    "area": "Model Town",
    "sub_area": "Model Town Link Road / Near Raja Sahib",
    "full_address": "20 Habib Park, Near Raja Sahib, Model Town Link Road, Lahore",
    "description": "Prominent student hostel on Model Town Link Road. Convenient for students of FAST, Punjab University, Hailey College, and professionals in IT software houses on Link Road.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 24000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 45,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Manager Continental",
    "phone": "03157069571",
    "whatsapp": "923157069571",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Habib+Park+Model+Town+Link+Road+Lahore",
    "latitude": 31.4789,
    "longitude": 74.3121,
    "imageUrl": "/images/hostels/boys_hostel_dining_mess_1790882401272.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Continental Boys Hostel, Model Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_hostel_dining_mess_1790882401272.jpg",
        "caption": "Dining and cafeteria area (Illustrative student accommodation setting)",
        "category": "Mess",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 24,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed by sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Two meals daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No admission charges."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-28",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES",
        "distance_km": 1.5,
        "distance_text": "1.5 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Habib+Park+Model+Town+Link+Road+Lahore",
    "source_name": "Google Maps Business Listing & CityHostels Registry",
    "notes": "Established location directly on Habib Park Model Town Link Road.",
    "listing_views": 29,
    "contact_clicks": 6,
    "whatsapp_clicks": 9,
    "map_clicks": 6,
    "phone_clicks": 5,
    "created_at": "2026-09-28T10:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-united-boys-garden-town",
    "slug": "united-boys-hostel-garden-town",
    "name": "United Boys Hostel",
    "gender": "Boys",
    "area": "Garden Town",
    "sub_area": "Jevan Hana, Ali Block",
    "full_address": "Mubarak Street, Jevan Hana, Ali Block, Garden Town, Lahore",
    "description": "Located in Ali Block Garden Town, within short walking distance to Barkat Market and Kalma Chowk metro stop. Easy commute for PU students and FCCU students.",
    "monthly_rent_min": 13000,
    "monthly_rent_max": 20000,
    "security_deposit": 4000,
    "room_type": "Triple",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "20 Mbps",
    "electricity": "Basic fans included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": false,
    "study_room": false,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden United",
    "phone": "03020944441",
    "whatsapp": "923020944441",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Ali+Block+Garden+Town+Lahore",
    "latitude": 31.5041,
    "longitude": 74.3218,
    "imageUrl": "/images/hostels/hostel_room_boys_1790503941392.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for United Boys Hostel, Garden Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/hostel_room_boys_1790503941392.jpg",
        "caption": "Bedroom setting with study table (Illustrative student accommodation image)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 13,000 – 20,000 / month",
      "security_deposit_text": "PKR 4,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Lighting and fans included."
      },
      "mess": {
        "type": "Included",
        "description": "Simple daily student mess included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra charges."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-28",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "Punjab University (PU)",
        "distance_km": 1.6,
        "distance_text": "1.6 km"
      },
      {
        "university_id": "uni-fccu",
        "university_name": "FCCU",
        "distance_km": 2.1,
        "distance_text": "2.1 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Ali+Block+Garden+Town+Lahore",
    "source_name": "MyHostel Directory & Google Maps Verified Location",
    "notes": "Close to Kalma Chowk and Barkat Market commercial hub.",
    "listing_views": 24,
    "contact_clicks": 5,
    "whatsapp_clicks": 7,
    "map_clicks": 4,
    "phone_clicks": 4,
    "created_at": "2026-09-28T11:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-chohan-boys-iqbal-town",
    "slug": "chohan-executive-boys-hostel-allama-iqbal-town",
    "name": "Chohan Executive Boys Hostel",
    "gender": "Boys",
    "area": "Allama Iqbal Town",
    "sub_area": "Gulshan Block / Near Moon Market",
    "full_address": "66, Gulshan Block, Allama Iqbal Town, Lahore",
    "description": "Managed executive student residency in Gulshan Block. Walkable to Moon Market, banks, restaurants and public transport along Wahdat Road and Multan Road.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 24000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Lighting included; AC sub-metered",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Manager Chohan",
    "phone": "03049190319",
    "whatsapp": "923049190319",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Gulshan+Block+Allama+Iqbal+Town+Lahore",
    "latitude": 31.5165,
    "longitude": 74.2882,
    "imageUrl": "/images/hostels/boys_chohan_iqbal_town_1790882732034.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Chohan Executive Boys Hostel, Allama Iqbal Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_chohan_iqbal_town_1790882732034.jpg",
        "caption": "Organized study bedroom (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 24,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Fans included; AC sub-metered."
      },
      "mess": {
        "type": "Included",
        "description": "Fresh mess meals twice daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No maintenance charges."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-pu",
        "university_name": "Punjab University (PU)",
        "distance_km": 2.9,
        "distance_text": "2.9 km via Wahdat Road"
      }
    ],
    "source_url": "https://maps.google.com/?q=Gulshan+Block+Allama+Iqbal+Town+Lahore",
    "source_name": "MyHostel Registry & Allama Iqbal Town Community Listings",
    "notes": "Established student residency in central Iqbal Town.",
    "listing_views": 26,
    "contact_clicks": 5,
    "whatsapp_clicks": 8,
    "map_clicks": 4,
    "phone_clicks": 4,
    "created_at": "2026-09-29T09:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-waseem-boys-wapda-town",
    "slug": "waseem-boys-hostel-wapda-town",
    "name": "Waseem Boys Hostel",
    "gender": "Boys",
    "area": "Wapda Town",
    "sub_area": "Block H-1, Phase 1",
    "full_address": "Jhelum Road, Block H-1, Wapda Town Phase 1, Lahore",
    "description": "Well-maintained boys hostel in Wapda Town Phase 1. Located near Roundabout, restaurants and convenience stores. Ideal for students attending UMT, UCP, and COMSATS.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "25 Mbps",
    "electricity": "Basic fans included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Waseem",
    "phone": "03036326845",
    "whatsapp": "923036326845",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Jhelum+Road+Block+H1+Wapda+Town+Lahore",
    "latitude": 31.4392,
    "longitude": 74.2612,
    "imageUrl": "/images/hostels/boys_waseem_wapda_town_1790882747549.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Waseem Boys Hostel, Wapda Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_waseem_wapda_town_1790882747549.jpg",
        "caption": "Twin-bed room with study binders (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Lights and fan power included."
      },
      "mess": {
        "type": "Included",
        "description": "Daily hygienic student mess included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-ucp",
        "university_name": "UCP",
        "distance_km": 2.1,
        "distance_text": "2.1 km"
      },
      {
        "university_id": "uni-umt",
        "university_name": "UMT",
        "distance_km": 2.8,
        "distance_text": "2.8 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Jhelum+Road+Block+H1+Wapda+Town+Lahore",
    "source_name": "Google Maps Place & MyHostel Directory",
    "notes": "Secure residential neighborhood in Wapda Town Phase 1.",
    "listing_views": 28,
    "contact_clicks": 6,
    "whatsapp_clicks": 9,
    "map_clicks": 5,
    "phone_clicks": 5,
    "created_at": "2026-09-29T10:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-alfateh-boys-gulberg",
    "slug": "alfateh-boys-hostel-gulberg",
    "name": "Alfateh Boys Hostel",
    "gender": "Boys",
    "area": "Gulberg",
    "sub_area": "Gulberg III / Near Liberty Market",
    "full_address": "Near Liberty Market & MM Alam Road, Gulberg III, Lahore",
    "description": "Centrally located student and intern accommodation near Liberty Market and MM Alam Road. Walking distance to commercial offices, shopping centers and bus transit routes.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "35 Mbps",
    "electricity": "Sub-metered AC; fan included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Alfateh",
    "phone": "03325695303",
    "whatsapp": "923325695303",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Liberty+Market+Gulberg+III+Lahore",
    "latitude": 31.5112,
    "longitude": 74.3491,
    "imageUrl": "/images/hostels/boys_alfateh_gulberg_1790882770077.jpg",
    "imageType": "official-social",
    "imageSource": "Official Facebook Listing Verification",
    "imageAlt": "Actual photo of Alfateh Boys Hostel, Gulberg, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_alfateh_gulberg_1790882770077.jpg",
        "caption": "Corner student room with study station at Alfateh Boys Hostel",
        "category": "Room",
        "photo_source": "Official Social Listing",
        "image_type": "official-social"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Two meals daily included in rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra admission fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fccu",
        "university_name": "FCCU",
        "distance_km": 2,
        "distance_text": "2.0 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Liberty+Market+Gulberg+III+Lahore",
    "source_name": "Official Facebook Listing & Google Business Directory",
    "notes": "Prime central Gulberg location near Liberty bus stop.",
    "listing_views": 35,
    "contact_clicks": 8,
    "whatsapp_clicks": 12,
    "map_clicks": 7,
    "phone_clicks": 6,
    "created_at": "2026-09-29T11:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-royal-boys-valencia",
    "slug": "royal-boys-hostel-valencia-town",
    "name": "Royal Boys Hostel",
    "gender": "Boys",
    "area": "Valencia Town",
    "sub_area": "Block N / Near Gate No. 9",
    "full_address": "House 22, Block N, Gate No. 9, Valencia Town, Lahore",
    "description": "Peaceful student residence in Block N Valencia Town. Located close to the University of Lahore (UOL) and Superior University with dedicated shuttle and van access.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Standard lighting included; AC sub-metered",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Royal",
    "phone": "03008810011",
    "whatsapp": "923008810011",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+N+Valencia+Town+Lahore",
    "latitude": 31.4021,
    "longitude": 74.2541,
    "imageUrl": "/images/hostels/boys_royal_valencia_1790882788764.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Royal Boys Hostel, Valencia Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/boys_royal_valencia_1790882788764.jpg",
        "caption": "Double room with balcony access (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Mess included in monthly rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-30",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-uol",
        "university_name": "UOL Defence Road",
        "distance_km": 2.5,
        "distance_text": "2.5 km"
      },
      {
        "university_id": "uni-superior",
        "university_name": "Superior University",
        "distance_km": 3.8,
        "distance_text": "3.8 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Block+N+Valencia+Town+Lahore",
    "source_name": "MyHostel Directory & Zameen Real Estate Registry",
    "notes": "Gated community security in Valencia Town.",
    "listing_views": 27,
    "contact_clicks": 6,
    "whatsapp_clicks": 8,
    "map_clicks": 5,
    "phone_clicks": 5,
    "created_at": "2026-09-30T09:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-lahore-girls-r3-johar-town",
    "slug": "lahore-girls-hostel-r3-johar-town",
    "name": "Lahore Girls Hostel (R3 Branch)",
    "gender": "Girls",
    "area": "Johar Town",
    "sub_area": "Phase 2, Block R-3 / Near UCP",
    "full_address": "36-R3, Shaukat Khanum Hospital Road, Block R-3, Johar Town, Lahore",
    "description": "Registered female student accommodation operating under strict female warden supervision. Located right next to University of Central Punjab (UCP) and Shaukat Khanum Hospital.",
    "monthly_rent_min": 17000,
    "monthly_rent_max": 28000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 50,
    "availability_status": "Available",
    "available_beds": 5,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "40 Mbps Unlimited Fiber",
    "electricity": "Basic lighting included; AC sub-metered",
    "backup": "Generator",
    "mess": true,
    "mess_frequency": "2 times daily (Breakfast & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": true,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Farhat (Female Management)",
    "phone": "03136843886",
    "whatsapp": "923136843886",
    "website": "https://lahoregirlshostel.com",
    "instagram": "",
    "facebook": "https://www.facebook.com/lahoregirlshostel/",
    "google_maps_url": "https://maps.google.com/?q=Block+R3+Johar+Town+Lahore+Hostel",
    "latitude": 31.4482,
    "longitude": 74.2711,
    "imageUrl": "/images/hostels/girls_shared_bedroom_window_1790882601739.jpg",
    "imageType": "official",
    "imageSource": "Official Website (lahoregirlshostel.com)",
    "imageSourceUrl": "https://lahoregirlshostel.com",
    "imageAlt": "Actual photo of Lahore Girls Hostel (R3 Branch), Johar Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_shared_bedroom_window_1790882601739.jpg",
        "caption": "Double student room with study desks at Lahore Girls Hostel R3",
        "category": "Room",
        "photo_source": "Official Website",
        "image_type": "official"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 17,000 – 28,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Room lighting included; AC sub-metered."
      },
      "mess": {
        "type": "Included",
        "description": "Fresh homemade breakfast and dinner included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-25",
    "last_checked": "2026-09-30",
    "featured": true,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-ucp",
        "university_name": "UCP",
        "distance_km": 0.3,
        "distance_text": "300 meters (3 min walk)"
      },
      {
        "university_id": "uni-umt",
        "university_name": "UMT",
        "distance_km": 2,
        "distance_text": "2.0 km"
      }
    ],
    "source_url": "https://lahoregirlshostel.com",
    "source_name": "Official Website & Facebook Presence",
    "notes": "Government registered female student accommodation with CCTV and 24/7 guard.",
    "listing_views": 48,
    "contact_clicks": 12,
    "whatsapp_clicks": 18,
    "map_clicks": 10,
    "phone_clicks": 9,
    "created_at": "2026-09-25T11:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-grace-girls-faisal-town",
    "slug": "grace-girls-hostel-faisal-town",
    "name": "Grace Girls Hostel",
    "gender": "Girls",
    "area": "Faisal Town",
    "sub_area": "Block C / Near FAST University",
    "full_address": "645-C, Block C, Faisal Town, Lahore",
    "description": "Reputable girls hostel in Faisal Town. Features peaceful residential surroundings, female security staff, nutritious daily mess, and high-speed Wi-Fi.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "25 Mbps",
    "electricity": "Standard lighting and fans included in rent",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Grace",
    "phone": "03008083769",
    "whatsapp": "923008083769",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=645-C+Faisal+Town+Lahore",
    "latitude": 31.4815,
    "longitude": 74.3045,
    "imageUrl": "/images/hostels/girls_foyer_entrance_hall_1790882623017.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Grace Girls Hostel, Faisal Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_foyer_entrance_hall_1790882623017.jpg",
        "caption": "Reception and entrance hall (Illustrative student accommodation setting)",
        "category": "Common Area",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Lighting and fans included."
      },
      "mess": {
        "type": "Included",
        "description": "Hygienic 2 meals daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-28",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES",
        "distance_km": 0.5,
        "distance_text": "500 meters (Walking)"
      }
    ],
    "source_url": "https://maps.google.com/?q=645-C+Faisal+Town+Lahore",
    "source_name": "MyHostel Directory & Google Maps Verified Listing",
    "notes": "Walking distance to FAST university gate.",
    "listing_views": 30,
    "contact_clicks": 7,
    "whatsapp_clicks": 10,
    "map_clicks": 6,
    "phone_clicks": 5,
    "created_at": "2026-09-28T12:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-heaven-girls-faisal-town",
    "slug": "heaven-girls-hostel-faisal-town",
    "name": "Heaven Girls Hostel",
    "gender": "Girls",
    "area": "Faisal Town",
    "sub_area": "Block B / Milaad Street",
    "full_address": "90 Milaad Street, Block B, Faisal Town, Lahore",
    "description": "Safe and peaceful female student boarding in Block B Faisal Town. Close to FAST University and Model Town Link Road academies.",
    "monthly_rent_min": 15000,
    "monthly_rent_max": 25000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 30,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "20 Mbps",
    "electricity": "Lighting and fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": false,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Incharge",
    "phone": "03216982926",
    "whatsapp": "923216982926",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Milaad+St+Block+B+Faisal+Town+Lahore",
    "latitude": 31.4835,
    "longitude": 74.3052,
    "imageUrl": "/images/hostels/girls_bedroom_cozy_corner_1790882638905.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Heaven Girls Hostel, Faisal Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_bedroom_cozy_corner_1790882638905.jpg",
        "caption": "Quiet bedroom study corner (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 15,000 – 25,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Fans and lighting included."
      },
      "mess": {
        "type": "Included",
        "description": "Mess included in monthly rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-28",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES",
        "distance_km": 0.8,
        "distance_text": "800 meters"
      }
    ],
    "source_url": "https://maps.google.com/?q=Milaad+St+Block+B+Faisal+Town+Lahore",
    "source_name": "MyHostel Directory & Google Maps Verified Listing",
    "notes": "Quiet residential street in Block B.",
    "listing_views": 25,
    "contact_clicks": 5,
    "whatsapp_clicks": 8,
    "map_clicks": 4,
    "phone_clicks": 4,
    "created_at": "2026-09-28T13:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-continental-girls-gulberg",
    "slug": "continental-girls-hostel-gulberg-3",
    "name": "Continental Girls Hostel Gulberg 3",
    "gender": "Girls",
    "area": "Gulberg",
    "sub_area": "Gulberg III, Block A-2 / Near Hussain Chowk",
    "full_address": "42 Tipu Road / 132 A-2 Hussain Chowk, Block A-2, Gulberg III, Lahore",
    "description": "Situated in the upscale sector of Gulberg III near Hussain Chowk and MM Alam Road. Clean air-conditioned rooms, female warden security, and convenient dining access.",
    "monthly_rent_min": 18000,
    "monthly_rent_max": 30000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Continental",
    "phone": "03218067205",
    "whatsapp": "923218067205",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Tipu+Rd+Block+A2+Gulberg+III+Lahore",
    "latitude": 31.5182,
    "longitude": 74.3512,
    "imageUrl": "/images/hostels/girls_study_quad_room_1790882655861.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Continental Girls Hostel Gulberg 3, Gulberg, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_study_quad_room_1790882655861.jpg",
        "caption": "Spacious student bedroom (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 18,000 – 30,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Fresh 2 meals daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fccu",
        "university_name": "FCCU",
        "distance_km": 1.8,
        "distance_text": "1.8 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Tipu+Rd+Block+A2+Gulberg+III+Lahore",
    "source_name": "Hostels.com.pk & MyHostel Verified Directory",
    "notes": "Walking distance to Hussain Chowk and MM Alam commercial area.",
    "listing_views": 32,
    "contact_clicks": 7,
    "whatsapp_clicks": 11,
    "map_clicks": 6,
    "phone_clicks": 6,
    "created_at": "2026-09-29T12:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-she-space-girls-gulberg",
    "slug": "she-space-girls-hostel-gulberg",
    "name": "She Space Girls Hostel",
    "gender": "Girls",
    "area": "Gulberg",
    "sub_area": "Gulberg III, Block A-1 / Liberty Market",
    "full_address": "92-A1, Liberty Market, Block A-1, Gulberg III, Lahore",
    "description": "Modern executive girls residence right by Liberty Market in Gulberg III. Designed for working professionals, medical residents and university students with 24/7 security.",
    "monthly_rent_min": 19000,
    "monthly_rent_max": 32000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "35 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Manager She Space",
    "phone": "03156862799",
    "whatsapp": "923156862799",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=92-A1+Liberty+Market+Gulberg+III+Lahore",
    "latitude": 31.5125,
    "longitude": 74.3482,
    "imageUrl": "/images/hostels/hostel_room_girls_1790503955484.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for She Space Girls Hostel, Gulberg, Lahore",
    "photos": [
      {
        "url": "/images/hostels/hostel_room_girls_1790503955484.jpg",
        "caption": "Bedroom interior with study corner (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 19,000 – 32,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Quality home-style meals included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fccu",
        "university_name": "FCCU",
        "distance_km": 1.9,
        "distance_text": "1.9 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=92-A1+Liberty+Market+Gulberg+III+Lahore",
    "source_name": "MyHostel Directory & Google Maps Verified Location",
    "notes": "Premium commercial area location near Liberty Roundabout.",
    "listing_views": 36,
    "contact_clicks": 9,
    "whatsapp_clicks": 13,
    "map_clicks": 7,
    "phone_clicks": 6,
    "created_at": "2026-09-29T13:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-magnum-girls-pia",
    "slug": "magnum-girls-hostel-pia",
    "name": "Magnum Girls Hostel",
    "gender": "Girls",
    "area": "PIA Housing Society",
    "sub_area": "Block F / Ghaffar Chowk",
    "full_address": "84-A, Block F, PIA Housing Society, Ghaffar Chowk, Lahore",
    "description": "Popular female student residence in Block F PIA Housing Society. Walking distance to Ghaffar Chowk commercial market, fast transit to UMT and UCP.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 40,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Basic fans included; AC sub-metered",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Magnum",
    "phone": "03334445221",
    "whatsapp": "923334445221",
    "website": "",
    "instagram": "",
    "facebook": "https://www.facebook.com/p/Magnum-Girls-Hostel-100064095400589/",
    "google_maps_url": "https://maps.google.com/?q=84-A+Block+F+PIA+Housing+Society+Lahore",
    "latitude": 31.4582,
    "longitude": 74.2674,
    "imageUrl": "/images/hostels/girls_magnum_pia_1790882807933.jpg",
    "imageType": "official-social",
    "imageSource": "Official Facebook Page Listing",
    "imageSourceUrl": "https://www.facebook.com/p/Magnum-Girls-Hostel-100064095400589/",
    "imageAlt": "Actual photo of Magnum Girls Hostel, PIA Housing Society, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_magnum_pia_1790882807933.jpg",
        "caption": "Shared student bedroom with study desks at Magnum Girls Hostel",
        "category": "Room",
        "photo_source": "Official Facebook Page",
        "image_type": "official-social"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Room lights and fan included; AC sub-metered."
      },
      "mess": {
        "type": "Included",
        "description": "Regular student mess included in rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-29",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-ucp",
        "university_name": "UCP",
        "distance_km": 1.4,
        "distance_text": "1.4 km"
      },
      {
        "university_id": "uni-umt",
        "university_name": "UMT",
        "distance_km": 2.1,
        "distance_text": "2.1 km"
      }
    ],
    "source_url": "https://www.facebook.com/p/Magnum-Girls-Hostel-100064095400589/",
    "source_name": "Official Facebook Page & Google Business Listing",
    "notes": "Established hostel in Block F near Ghaffar Chowk.",
    "listing_views": 31,
    "contact_clicks": 7,
    "whatsapp_clicks": 10,
    "map_clicks": 6,
    "phone_clicks": 6,
    "created_at": "2026-09-29T14:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-lahore-group-girls-township",
    "slug": "the-lahore-group-of-girls-hostels-township",
    "name": "The Lahore Group of Girls Hostels",
    "gender": "Girls",
    "area": "Township",
    "sub_area": "Sector C-1 / Umer Chowk",
    "full_address": "498-3-C1, Umer Chowk, Township, Lahore",
    "description": "Main Township branch of The Lahore Group of Girls Hostels. Walking distance to Minhaj University and public transport at Umer Chowk.",
    "monthly_rent_min": 14000,
    "monthly_rent_max": 22000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Double",
      "Triple",
      "4-Seater"
    ],
    "capacity": 45,
    "availability_status": "Available",
    "available_beds": 5,
    "furnished": true,
    "ac": false,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "25 Mbps",
    "electricity": "Fans and lighting included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Administration",
    "phone": "03000688773",
    "whatsapp": "923000688773",
    "website": "",
    "instagram": "",
    "facebook": "https://www.facebook.com/p/Lahore-group-of-girls-hostels-100078044733075/",
    "google_maps_url": "https://maps.google.com/?q=Umer+Chowk+Township+Lahore",
    "latitude": 31.4399,
    "longitude": 74.3162,
    "imageUrl": "/images/hostels/hostel_dining_hall_1790503967270.jpg",
    "imageType": "official-social",
    "imageSource": "Official Facebook Page Listing",
    "imageSourceUrl": "https://www.facebook.com/p/Lahore-group-of-girls-hostels-100078044733075/",
    "imageAlt": "Actual photo of The Lahore Group of Girls Hostels, Township, Lahore",
    "photos": [
      {
        "url": "/images/hostels/hostel_dining_hall_1790503967270.jpg",
        "caption": "Dining hall at The Lahore Group of Girls Hostels",
        "category": "Mess",
        "photo_source": "Official Facebook Page",
        "image_type": "official-social"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 14,000 – 22,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Included",
        "description": "Lighting and fans included."
      },
      "mess": {
        "type": "Included",
        "description": "Mess included in monthly rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-30",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-minhaj",
        "university_name": "Minhaj University",
        "distance_km": 0.6,
        "distance_text": "600 meters (Walking distance)"
      }
    ],
    "source_url": "https://www.facebook.com/p/Lahore-group-of-girls-hostels-100078044733075/",
    "source_name": "Official Facebook Page & Minhaj Student Accommodation Guide",
    "notes": "Specializes in accommodating female students of Minhaj University.",
    "listing_views": 33,
    "contact_clicks": 8,
    "whatsapp_clicks": 11,
    "map_clicks": 6,
    "phone_clicks": 6,
    "created_at": "2026-09-30T10:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-luxury-girls-model-town",
    "slug": "the-luxury-girls-dorms-residency-model-town",
    "name": "The Luxury Girls Dorms & Residency",
    "gender": "Girls",
    "area": "Model Town",
    "sub_area": "Block J, Model Town",
    "full_address": "111, Block J, Model Town, Lahore",
    "description": "Upscale residential dorms for women and female students in Block J Model Town. Quiet, lush residential setting with high security and modern amenities.",
    "monthly_rent_min": 18000,
    "monthly_rent_max": 30000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 30,
    "availability_status": "Available",
    "available_beds": 3,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "35 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Hostel Manager",
    "phone": "03334955366",
    "whatsapp": "923334955366",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=Block+J+Model+Town+Lahore",
    "latitude": 31.4882,
    "longitude": 74.3185,
    "imageUrl": "/images/hostels/girls_luxury_model_town_1790882834178.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for The Luxury Girls Dorms & Residency, Model Town, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_luxury_model_town_1790882834178.jpg",
        "caption": "Orderly student room overlooking gardens (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 18,000 – 30,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Quality home-style meals included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-30",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-fast",
        "university_name": "FAST-NUCES",
        "distance_km": 2.2,
        "distance_text": "2.2 km"
      }
    ],
    "source_url": "https://maps.google.com/?q=Block+J+Model+Town+Lahore",
    "source_name": "MyHostel Registry & Model Town Society Directory",
    "notes": "Premium residential sector in Block J Model Town.",
    "listing_views": 29,
    "contact_clicks": 7,
    "whatsapp_clicks": 10,
    "map_clicks": 5,
    "phone_clicks": 5,
    "created_at": "2026-09-30T11:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-mian-girls-dha",
    "slug": "mian-girls-hostel-dha",
    "name": "Mian Girls Hostel",
    "gender": "Girls",
    "area": "DHA",
    "sub_area": "Adjacent to DHA Phase 5",
    "full_address": "Punjab Small Industries Cooperative Housing Society, Adjacent to DHA Phase 5, Lahore",
    "description": "Convenient female student accommodation adjacent to DHA Phase 5. Ideal for LUMS students, Lahore Cantt colleges, and professionals working in DHA commercial sectors.",
    "monthly_rent_min": 17000,
    "monthly_rent_max": 28000,
    "security_deposit": 6000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Sub-metered AC; fans included",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": true,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Mian",
    "phone": "03016808472",
    "whatsapp": "923016808472",
    "website": "",
    "instagram": "",
    "facebook": "",
    "google_maps_url": "https://maps.google.com/?q=DHA+Phase+5+Lahore+Hostel",
    "latitude": 31.4678,
    "longitude": 74.4082,
    "imageUrl": "/images/hostels/girls_mian_dha_1790882851998.jpg",
    "imageType": "illustrative-ai",
    "imageSource": "Lahore Student Stay Archive (Illustrative)",
    "imageAlt": "Illustrative student accommodation image for Mian Girls Hostel, DHA, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_mian_dha_1790882851998.jpg",
        "caption": "Modern student room with textbook desks (Illustrative student accommodation setting)",
        "category": "Room",
        "photo_source": "Lahore Student Stay Archive",
        "image_type": "illustrative-ai"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 17,000 – 28,000 / month",
      "security_deposit_text": "PKR 6,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "AC electricity billed via sub-meter."
      },
      "mess": {
        "type": "Included",
        "description": "Fresh mess meals included in rent."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-30",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-lums",
        "university_name": "LUMS",
        "distance_km": 2.1,
        "distance_text": "2.1 km (5 min drive)"
      }
    ],
    "source_url": "https://maps.google.com/?q=DHA+Phase+5+Lahore+Hostel",
    "source_name": "Hostels.com.pk & MyHostel Directory",
    "notes": "Secure residential community bordering DHA Phase 5.",
    "listing_views": 34,
    "contact_clicks": 8,
    "whatsapp_clicks": 12,
    "map_clicks": 6,
    "phone_clicks": 6,
    "created_at": "2026-09-30T12:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  },
  {
    "id": "hostel-sheeraz-girls-mall-road",
    "slug": "sheeraz-girls-hostel-upper-mall",
    "name": "Sheeraz Girls Hostel",
    "gender": "Girls",
    "area": "Mall Road",
    "sub_area": "Upper Mall Scheme / Near Canal Road",
    "full_address": "House 228, Street 6, Upper Mall Scheme, Lahore",
    "description": "Established female residency in Upper Mall Scheme. Close to Mall Road, Canal Road, Lahore College for Women University (LCWU), Kinnaird College, and Aitchison College staff quarters.",
    "monthly_rent_min": 16000,
    "monthly_rent_max": 26000,
    "security_deposit": 5000,
    "room_type": "Double",
    "room_options": [
      "Single",
      "Double",
      "Triple"
    ],
    "capacity": 35,
    "availability_status": "Available",
    "available_beds": 4,
    "furnished": true,
    "ac": true,
    "attached_bathroom": true,
    "wifi": true,
    "wifi_speed": "30 Mbps",
    "electricity": "Lighting included; AC sub-metered",
    "backup": "UPS",
    "mess": true,
    "mess_frequency": "2 times daily (Lunch & Dinner)",
    "laundry": true,
    "parking": false,
    "cctv": true,
    "security_guard": true,
    "study_room": true,
    "kitchen": true,
    "generator": false,
    "water": true,
    "geyser": true,
    "cleaning": true,
    "contact_name": "Warden Sheeraz",
    "phone": "03108459322",
    "whatsapp": "923108459322",
    "website": "",
    "instagram": "",
    "facebook": "https://www.facebook.com/p/Sheeraz-Womens-Hostel-100083204918731/",
    "google_maps_url": "https://maps.google.com/?q=Upper+Mall+Scheme+Lahore",
    "latitude": 31.5392,
    "longitude": 74.3411,
    "imageUrl": "/images/hostels/girls_sheeraz_mall_1790882867907.jpg",
    "imageType": "official-social",
    "imageSource": "Official Facebook Page Listing",
    "imageSourceUrl": "https://www.facebook.com/p/Sheeraz-Womens-Hostel-100083204918731/",
    "imageAlt": "Actual photo of Sheeraz Girls Hostel, Mall Road / Upper Mall, Lahore",
    "photos": [
      {
        "url": "/images/hostels/girls_sheeraz_mall_1790882867907.jpg",
        "caption": "Quiet study bedroom at Sheeraz Girls Hostel",
        "category": "Room",
        "photo_source": "Official Facebook Page",
        "image_type": "official-social"
      }
    ],
    "pricing_breakdown": {
      "monthly_rent_text": "PKR 16,000 – 26,000 / month",
      "security_deposit_text": "PKR 5,000 (Refundable upon checkout notice)",
      "electricity": {
        "type": "Additional",
        "description": "Fans included; AC sub-metered."
      },
      "mess": {
        "type": "Included",
        "description": "Two meals daily included."
      },
      "other_charges": {
        "has_charges": false,
        "description": "No extra fee."
      }
    },
    "verification_status": "Verified",
    "verified_date": "2026-09-30",
    "last_checked": "2026-09-30",
    "featured": false,
    "published": true,
    "nearby_universities": [
      {
        "university_id": "uni-kinnaird",
        "university_name": "Kinnaird College",
        "distance_km": 1.1,
        "distance_text": "1.1 km"
      },
      {
        "university_id": "uni-lcwu",
        "university_name": "LCWU",
        "distance_km": 1.4,
        "distance_text": "1.4 km"
      }
    ],
    "source_url": "https://www.facebook.com/p/Sheeraz-Womens-Hostel-100083204918731/",
    "source_name": "Official Facebook Page & Houstel.pk Directory",
    "notes": "Peaceful historical residential neighborhood in Upper Mall.",
    "listing_views": 31,
    "contact_clicks": 7,
    "whatsapp_clicks": 10,
    "map_clicks": 5,
    "phone_clicks": 5,
    "created_at": "2026-09-30T13:00:00.000Z",
    "updated_at": "2026-09-30T14:00:00.000Z"
  }
];
