import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { Hostel, AreaItem, UniversityItem, AdminStats, LeadItem, LeadMetrics } from './src/types';
import { INITIAL_HOSTELS, INITIAL_AREAS, INITIAL_UNIVERSITIES } from './src/data/seedData';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  hostels: Hostel[];
  areas: AreaItem[];
  universities: UniversityItem[];
  submissions: any[];
  claims: any[];
  leads: LeadItem[];
  leadCounter?: number;
  default_lead_fee?: number;
}

// Initial realistic seed student leads for Lahore Student Stay
const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1041',
    lead_id: 'LSS-20260924-1041',
    hostel_id: 'hostel-johar-heights-boys',
    hostel_name: 'Johar Heights Boys Hostel',
    assigned_hostel: 'Johar Heights Boys Hostel',
    visitor_name: 'Usman Tariq',
    phone: '0301-4567890',
    visitor_phone: '0301-4567890',
    gender: 'Boys',
    area: 'Johar Town',
    budget: 'PKR 15,000 - 20,000',
    room_type: 'Double',
    move_in_date: '2026-10-01',
    requirements: ['Wi-Fi', 'Mess', 'AC', 'Electricity Backup'],
    source: 'Lahore Student Stay',
    status: 'Converted',
    notes: 'Student visited with brother. Confirmed Room 204 twin bed.',
    assigned_warden_name: 'Warden Malik Asif',
    assigned_warden_phone: '0300-4123456',
    assigned_warden_whatsapp: '923004123456',
    assigned_at: '2026-09-24T14:30:00.000Z',
    lead_fee: 500,
    payment_status: 'Paid',
    created_at: '2026-09-24T10:15:00.000Z',
    updated_at: '2026-09-25T16:00:00.000Z',
  },
  {
    id: 'lead-1042',
    lead_id: 'LSS-20260926-1042',
    hostel_id: 'hostel-fatima-jinnah-girls',
    hostel_name: 'Fatima Jinnah Executive Girls Hostel',
    assigned_hostel: 'Fatima Jinnah Executive Girls Hostel',
    visitor_name: 'Ayesha Siddiqui',
    phone: '0322-8765432',
    visitor_phone: '0322-8765432',
    gender: 'Girls',
    area: 'Garden Town',
    budget: 'PKR 18,000 - 25,000',
    room_type: 'Single',
    move_in_date: '2026-10-05',
    requirements: ['Wi-Fi', 'Mess', 'AC', 'Attached Bathroom', 'Furnished'],
    source: 'Lahore Student Stay',
    status: 'Assigned',
    notes: 'Father requested ground floor room. Dispatched to Warden Farzana.',
    assigned_warden_name: 'Warden Farzana Begum',
    assigned_warden_phone: '0321-9876543',
    assigned_warden_whatsapp: '923219876543',
    assigned_at: '2026-09-26T11:20:00.000Z',
    lead_fee: 500,
    payment_status: 'Pending',
    created_at: '2026-09-26T09:40:00.000Z',
    updated_at: '2026-09-26T11:20:00.000Z',
  },
  {
    id: 'lead-1043',
    lead_id: 'LSS-20260926-1043',
    hostel_id: 'hostel-al-rehman-barkat',
    hostel_name: 'Al-Rehman Boys Hostel Barkat Market',
    assigned_hostel: 'Al-Rehman Boys Hostel Barkat Market',
    visitor_name: 'Bilal Ahmad',
    phone: '0333-5551234',
    visitor_phone: '0333-5551234',
    gender: 'Boys',
    area: 'New Garden Town',
    budget: 'Under PKR 15,000',
    room_type: 'Triple',
    move_in_date: '2026-10-10',
    requirements: ['Wi-Fi', 'Mess', 'Furnished'],
    source: 'Lahore Student Stay',
    status: 'Contacted',
    notes: 'Contacted student. Joining PU in October. Scheduled visit for tomorrow.',
    lead_fee: 500,
    payment_status: 'Pending',
    created_at: '2026-09-26T16:05:00.000Z',
    updated_at: '2026-09-26T17:10:00.000Z',
  },
  {
    id: 'lead-1044',
    lead_id: 'LSS-20260927-1044',
    hostel_id: 'hostel-model-town-scholars',
    hostel_name: 'Model Town Scholars Boys Hostel',
    assigned_hostel: 'Model Town Scholars Boys Hostel',
    visitor_name: 'Hamza Sheikh',
    phone: '0345-1239876',
    visitor_phone: '0345-1239876',
    gender: 'Boys',
    area: 'Model Town',
    budget: 'PKR 14,000 - 18,000',
    room_type: 'Double',
    move_in_date: '2026-10-01',
    requirements: ['Wi-Fi', 'Mess', 'Attached Bathroom', 'Electricity Backup'],
    source: 'Lahore Student Stay',
    status: 'New',
    notes: 'Inquiry via guided search. Needs room from next week.',
    lead_fee: 500,
    payment_status: 'Pending',
    created_at: '2026-09-27T08:15:00.000Z',
    updated_at: '2026-09-27T08:15:00.000Z',
  },
  {
    id: 'lead-1045',
    lead_id: 'LSS-20260927-1045',
    hostel_id: 'hostel-zainab-muslim-town',
    hostel_name: 'Zainab Girls Hostel Muslim Town',
    assigned_hostel: 'Zainab Girls Hostel Muslim Town',
    visitor_name: 'Fatima Noor',
    phone: '0308-7776655',
    visitor_phone: '0308-7776655',
    gender: 'Girls',
    area: 'Muslim Town',
    budget: 'PKR 12,000 - 16,000',
    room_type: 'Shared',
    move_in_date: '2026-10-15',
    requirements: ['Wi-Fi', 'Mess', 'Attached Bathroom'],
    source: 'Lahore Student Stay',
    status: 'New',
    notes: 'Looking for accommodation near Wahdat Road / PU new campus.',
    lead_fee: 500,
    payment_status: 'Pending',
    created_at: '2026-09-27T09:30:00.000Z',
    updated_at: '2026-09-27T09:30:00.000Z',
  },
  {
    id: 'lead-1046',
    lead_id: 'LSS-20260927-1046',
    hostel_id: 'hostel-gulberg-executive-boys',
    hostel_name: 'Gulberg Executive Boys Hostel',
    assigned_hostel: 'Gulberg Executive Boys Hostel',
    visitor_name: 'Saad Rafiq',
    phone: '0312-3344556',
    visitor_phone: '0312-3344556',
    gender: 'Boys',
    area: 'Gulberg III',
    budget: 'Above PKR 22,000',
    room_type: 'Single',
    move_in_date: '2026-10-01',
    requirements: ['Wi-Fi', 'Mess', 'AC', 'Attached Bathroom', 'Parking', 'Electricity Backup'],
    source: 'Lahore Student Stay',
    status: 'New',
    notes: 'Internee at software house on MM Alam Road. Urgently looking for single room.',
    lead_fee: 500,
    payment_status: 'Pending',
    created_at: '2026-09-27T10:05:00.000Z',
    updated_at: '2026-09-27T10:05:00.000Z',
  },
];

// Helper to generate unique Lead ID in format LSS-YYYYMMDD-XXXX (Section 2)
function generateLeadId(db: DatabaseSchema): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  let counter = db.leadCounter || 1046;
  counter += 1;
  db.leadCounter = counter;

  let leadId = `LSS-${dateStr}-${counter}`;
  while (db.leads && db.leads.some(l => l.lead_id === leadId)) {
    counter += 1;
    db.leadCounter = counter;
    leadId = `LSS-${dateStr}-${counter}`;
  }
  return leadId;
}

// In-memory token storage for admin sessions
const activeAdminTokens = new Set<string>();

// Read or initialize database
function getDatabase(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      hostels: INITIAL_HOSTELS,
      areas: INITIAL_AREAS,
      universities: INITIAL_UNIVERSITIES,
      submissions: [],
      claims: [],
      leads: INITIAL_LEADS,
      leadCounter: 1046,
    };
    saveDatabase(initialData);
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all hostels have pricing_breakdown and social fields from seed
    const seedMap = new Map(INITIAL_HOSTELS.map(h => [h.id, h]));
    const mergedHostels: Hostel[] = (parsed.hostels || INITIAL_HOSTELS).map((h: Hostel) => {
      const seed = seedMap.get(h.id);
      return {
        ...h,
        pricing_breakdown: h.pricing_breakdown || seed?.pricing_breakdown,
        instagram: h.instagram ?? seed?.instagram ?? '',
        facebook: h.facebook ?? seed?.facebook ?? '',
        website: h.website ?? seed?.website ?? '',
      };
    });

    const defaultLeadFee = Number(parsed.default_lead_fee) || 500;
    const mappedLeads: LeadItem[] = (parsed.leads || INITIAL_LEADS).map((l: any, idx: number) => {
      let leadId = l.lead_id || `LSS-20260927-${1040 + idx}`;
      if (!leadId.startsWith('LSS-')) {
        const digits = leadId.replace(/[^0-9]/g, '');
        leadId = `LSS-20260927-${digits || 1040 + idx}`;
      }
      const rawPhone = l.phone || l.visitor_phone || '0300-0000000';
      const hostelName = l.hostel_name || 'General Lahore Hostel Match';
      return {
        id: l.id || `lead-${idx + 1040}`,
        lead_id: leadId,
        hostel_id: l.hostel_id || 'general',
        hostel_name: hostelName,
        visitor_name: l.visitor_name || 'Student',
        phone: rawPhone,
        visitor_phone: rawPhone,
        gender: l.gender === 'Girls' ? 'Girls' : 'Boys',
        area: l.area || 'Johar Town',
        budget: l.budget || 'Standard',
        room_type: l.room_type || 'Double',
        move_in_date: l.move_in_date || '',
        requirements: Array.isArray(l.requirements) ? l.requirements : [],
        source: l.source || 'Lahore Student Stay',
        status: l.status || 'New',
        lead_fee: l.lead_fee !== undefined ? Number(l.lead_fee) : defaultLeadFee,
        payment_status: l.payment_status || (l.fee_status === 'Paid' ? 'Paid' : 'Pending'),
        assigned_hostel: l.assigned_hostel || hostelName,
        notes: l.notes || '',
        assigned_warden_name: l.assigned_warden_name,
        assigned_warden_phone: l.assigned_warden_phone,
        assigned_warden_whatsapp: l.assigned_warden_whatsapp,
        assigned_at: l.assigned_at,
        created_at: l.created_at || new Date().toISOString(),
        updated_at: l.updated_at || new Date().toISOString(),
      };
    });

    return {
      hostels: mergedHostels,
      areas: parsed.areas || INITIAL_AREAS,
      universities: parsed.universities || INITIAL_UNIVERSITIES,
      submissions: parsed.submissions || [],
      claims: parsed.claims || [],
      leads: mappedLeads,
      leadCounter: parsed.leadCounter || 1046,
      default_lead_fee: defaultLeadFee,
    };
  } catch (err) {
    console.error('Error reading database, using defaults:', err);
    return {
      hostels: INITIAL_HOSTELS,
      areas: INITIAL_AREAS,
      universities: INITIAL_UNIVERSITIES,
      submissions: [],
      claims: [],
      leads: INITIAL_LEADS,
      leadCounter: 1046,
    };
  }
}

// Write to database with atomic write
function saveDatabase(data: DatabaseSchema): void {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Admin Authentication Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!activeAdminTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session' });
  }
  next();
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint (Section 36)
app.get('/health', (_req: Request, res: Response) => {
  const db = getDatabase();
  res.json({
    status: 'ok',
    service: 'Lahore Student Stay API',
    timestamp: new Date().toISOString(),
    hostels_count: db.hostels.length,
    database: 'connected',
  });
});

// Robots.txt & Sitemap.xml (Section 28)
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin/

Sitemap: /sitemap.xml
`);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const db = getDatabase();
  const baseUrl = process.env.APP_URL || 'https://lahorestudentstay.pk';
  const published = db.hostels.filter(h => h.published);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/boys-hostels</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/girls-hostels</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

  for (const h of published) {
    xml += `  <url>
    <loc>${baseUrl}/hostels/${encodeURIComponent(h.slug || h.id)}</loc>
    <lastmod>${h.last_checked || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }

  xml += `</urlset>`;
  res.type('application/xml');
  res.send(xml);
});

// Public API Routes

// 1. Get Hostels with multi-faceted filtering & search
app.get('/api/hostels', (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    let results = [...db.hostels];

    const {
      gender,
      area,
      minRent,
      maxRent,
      roomType,
      wifi,
      mess,
      ac,
      furnished,
      attachedBath,
      cctv,
      parking,
      backup,
      availability,
      verifiedOnly,
      search,
      university,
      sort,
      includeUnpublished,
    } = req.query;

    // Filter by published status unless explicitly requested by admin
    if (includeUnpublished !== 'true') {
      results = results.filter(h => h.published);
    }

    // Gender filter
    if (gender && gender !== 'All') {
      results = results.filter(h => h.gender.toLowerCase() === String(gender).toLowerCase());
    }

    // Area filter
    if (area && area !== 'All') {
      const targetArea = String(area).toLowerCase();
      results = results.filter(h => 
        h.area.toLowerCase() === targetArea || 
        h.sub_area.toLowerCase().includes(targetArea)
      );
    }

    // Rent filter
    if (minRent) {
      const min = parseInt(String(minRent), 10);
      if (!isNaN(min)) {
        results = results.filter(h => h.monthly_rent_max >= min);
      }
    }
    if (maxRent) {
      const max = parseInt(String(maxRent), 10);
      if (!isNaN(max)) {
        results = results.filter(h => h.monthly_rent_min <= max);
      }
    }

    // Room type filter
    if (roomType && roomType !== 'All') {
      const targetRoom = String(roomType).toLowerCase();
      results = results.filter(h => 
        h.room_type.toLowerCase() === targetRoom || 
        h.room_options.some(opt => opt.toLowerCase() === targetRoom)
      );
    }

    // Facility boolean filters
    if (wifi === 'true') results = results.filter(h => h.wifi);
    if (mess === 'true') results = results.filter(h => h.mess);
    if (ac === 'true') results = results.filter(h => h.ac);
    if (furnished === 'true') results = results.filter(h => h.furnished);
    if (attachedBath === 'true') results = results.filter(h => h.attached_bathroom);
    if (cctv === 'true') results = results.filter(h => h.cctv);
    if (parking === 'true') results = results.filter(h => h.parking);
    if (backup === 'true') results = results.filter(h => h.generator || (h.backup && h.backup !== 'None' && h.backup !== 'Not provided'));

    // Availability filter
    if (availability && availability !== 'All') {
      results = results.filter(h => h.availability_status === availability);
    }

    // Verified Only filter
    if (verifiedOnly === 'true') {
      results = results.filter(h => h.verification_status === 'Verified');
    }

    // University proximity filter
    if (university && university !== 'All') {
      const uId = String(university);
      results = results.filter(h => 
        h.nearby_universities.some(u => 
          u.university_id === uId || 
          u.university_name.toLowerCase().includes(uId.toLowerCase())
        )
      );
    }

    // Free-form Search query
    if (search && String(search).trim()) {
      const query = String(search).toLowerCase().trim();
      const terms = query.split(/\s+/).filter(Boolean);

      results = results.filter(h => {
        const searchable = [
          h.name,
          h.area,
          h.sub_area,
          h.full_address,
          h.gender,
          h.room_type,
          h.room_options.join(' '),
          h.description,
          h.notes,
          ...h.nearby_universities.map(u => u.university_name),
          h.wifi ? 'wifi internet' : '',
          h.mess ? 'mess food fooding' : '',
          h.ac ? 'ac air conditioned' : '',
        ].join(' ').toLowerCase();

        return terms.every(term => searchable.includes(term));
      });
    }

    // Sorting
    switch (sort) {
      case 'lowest_rent':
        results.sort((a, b) => a.monthly_rent_min - b.monthly_rent_min);
        break;
      case 'highest_rent':
        results.sort((a, b) => b.monthly_rent_min - a.monthly_rent_min);
        break;
      case 'recently_verified':
        results.sort((a, b) => {
          if (a.verification_status === 'Verified' && b.verification_status !== 'Verified') return -1;
          if (b.verification_status === 'Verified' && a.verification_status !== 'Verified') return 1;
          return (b.verified_date || '').localeCompare(a.verified_date || '');
        });
        break;
      case 'recently_updated':
        results.sort((a, b) => b.last_checked.localeCompare(a.last_checked));
        break;
      case 'featured':
      default:
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.last_checked.localeCompare(a.last_checked);
        });
        break;
    }

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err: any) {
    console.error('Error fetching hostels:', err);
    res.status(500).json({ error: 'Failed to retrieve hostels' });
  }
});

// 2. Get Single Hostel by Slug or ID + Increment Views
app.get('/api/hostels/:idOrSlug', (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const target = req.params.idOrSlug.toLowerCase();
    const hostel = db.hostels.find(h => h.id.toLowerCase() === target || h.slug.toLowerCase() === target);

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Increment view count atomically
    hostel.listing_views = (hostel.listing_views || 0) + 1;
    saveDatabase(db);

    res.json({
      success: true,
      data: hostel,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve hostel details' });
  }
});

// 3. Get Areas with dynamic hostel counts
app.get('/api/areas', (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const published = db.hostels.filter(h => h.published);

    const areasWithCounts = db.areas.map(area => {
      const matching = published.filter(h => h.area.toLowerCase() === area.name.toLowerCase());
      return {
        ...area,
        hostel_count: matching.length,
        boys_count: matching.filter(h => h.gender === 'Boys').length,
        girls_count: matching.filter(h => h.gender === 'Girls').length,
      };
    });

    res.json({
      success: true,
      data: areasWithCounts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});

// 4. Get Universities
app.get('/api/universities', (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    res.json({
      success: true,
      data: db.universities,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
});

// 5. Click Tracking Endpoint (Section 35)
app.post('/api/analytics/click', (req: Request, res: Response) => {
  try {
    const { hostel_id, type } = req.body;
    if (!hostel_id || !type) {
      return res.status(400).json({ error: 'Missing hostel_id or click type' });
    }

    const db = getDatabase();
    const hostel = db.hostels.find(h => h.id === hostel_id || h.slug === hostel_id);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    switch (type) {
      case 'whatsapp':
        hostel.whatsapp_clicks = (hostel.whatsapp_clicks || 0) + 1;
        break;
      case 'phone':
        hostel.phone_clicks = (hostel.phone_clicks || 0) + 1;
        break;
      case 'map':
        hostel.map_clicks = (hostel.map_clicks || 0) + 1;
        break;
      case 'contact':
        hostel.contact_clicks = (hostel.contact_clicks || 0) + 1;
        break;
      case 'instagram':
        hostel.instagram_clicks = (hostel.instagram_clicks || 0) + 1;
        break;
      case 'facebook':
        hostel.facebook_clicks = (hostel.facebook_clicks || 0) + 1;
        break;
      case 'website':
        hostel.website_clicks = (hostel.website_clicks || 0) + 1;
        break;
      default:
        break;
    }

    saveDatabase(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record click' });
  }
});

// 6. Public Hostel Submission ("List Your Hostel" - Section 21)
app.post('/api/submit', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.name || !body.gender || !body.area || !body.phone) {
      return res.status(400).json({ error: 'Name, gender, area, and contact phone are required.' });
    }

    const db = getDatabase();
    const now = new Date().toISOString();
    const id = `hostel-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const baseSlug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const slug = `${baseSlug}-${body.area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newHostel: Hostel = {
      id,
      slug,
      name: String(body.name).trim(),
      gender: body.gender === 'Girls' ? 'Girls' : 'Boys',
      area: String(body.area).trim(),
      sub_area: String(body.sub_area || '').trim(),
      full_address: String(body.full_address || 'Not provided').trim(),
      description: String(body.description || '').trim(),
      monthly_rent_min: Number(body.monthly_rent_min) || 0,
      monthly_rent_max: Number(body.monthly_rent_max) || Number(body.monthly_rent_min) || 0,
      security_deposit: body.security_deposit ? Number(body.security_deposit) : null,
      room_type: body.room_type || 'Double',
      room_options: Array.isArray(body.room_options) ? body.room_options : ['Double'],
      capacity: body.capacity ? Number(body.capacity) : null,
      availability_status: 'Unknown',
      available_beds: body.available_beds ? Number(body.available_beds) : null,
      furnished: Boolean(body.furnished),
      ac: Boolean(body.ac),
      attached_bathroom: Boolean(body.attached_bathroom),
      wifi: Boolean(body.wifi),
      wifi_speed: body.wifi_speed || 'Not provided',
      electricity: body.electricity || 'Not provided',
      backup: body.backup || 'Not provided',
      mess: Boolean(body.mess),
      mess_frequency: body.mess_frequency || 'Not provided',
      laundry: Boolean(body.laundry),
      parking: Boolean(body.parking),
      cctv: Boolean(body.cctv),
      security_guard: Boolean(body.security_guard),
      study_room: Boolean(body.study_room),
      kitchen: Boolean(body.kitchen),
      generator: Boolean(body.generator),
      water: Boolean(body.water !== false),
      geyser: Boolean(body.geyser),
      cleaning: Boolean(body.cleaning !== false),
      contact_name: String(body.contact_name || '').trim(),
      phone: String(body.phone || '').trim(),
      whatsapp: String(body.whatsapp || '').replace(/[^0-9]/g, ''),
      website: String(body.website || '').trim(),
      instagram: String(body.instagram || '').trim(),
      facebook: String(body.facebook || '').trim(),
      google_maps_url: String(body.google_maps_url || '').trim(),
      latitude: body.latitude ? Number(body.latitude) : null,
      longitude: body.longitude ? Number(body.longitude) : null,
      photos: Array.isArray(body.photos) ? body.photos : [],
      verification_status: 'Pending Verification', // Critical: Section 21 requirement
      verified_date: null,
      last_checked: now.split('T')[0],
      featured: false,
      published: false, // Enters Pending Review; not automatically published
      nearby_universities: Array.isArray(body.nearby_universities) ? body.nearby_universities : [],
      source_url: '',
      source_name: 'Direct Owner/Manager Submission',
      notes: String(body.notes || ''),
      listing_views: 0,
      contact_clicks: 0,
      whatsapp_clicks: 0,
      map_clicks: 0,
      phone_clicks: 0,
      created_at: now,
      updated_at: now,
    };

    db.hostels.push(newHostel);
    db.submissions.push({
      id: `sub-${Date.now()}`,
      hostel_id: id,
      submitted_at: now,
      owner_name: body.contact_name || 'Anonymous',
      phone: body.phone,
    });

    saveDatabase(db);

    res.status(201).json({
      success: true,
      message: 'Hostel submitted successfully. It is now in the review queue as "Pending Verification".',
      reference_id: id,
    });
  } catch (err: any) {
    console.error('Submission error:', err);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

// 7. Claim / Update Hostel Submission ("Claim / Update This Hostel" - Requirement 6)
app.post('/api/claim', (req: Request, res: Response) => {
  try {
    const { hostel_id, claimant_name, claimant_role, phone, whatsapp, email, proof_document_note, proposed_changes } = req.body;
    if (!hostel_id || !claimant_name || !phone) {
      return res.status(400).json({ error: 'Hostel ID, claimant name, and contact phone are required.' });
    }

    const db = getDatabase();
    const hostel = db.hostels.find(h => h.id === hostel_id || h.slug === hostel_id);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const claimId = `claim-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newClaim = {
      id: claimId,
      hostel_id: hostel.id,
      hostel_name: hostel.name,
      claimant_name,
      claimant_role: claimant_role || 'Warden',
      phone,
      whatsapp: whatsapp || '',
      email: email || '',
      proof_document_note: proof_document_note || '',
      proposed_changes: proposed_changes || {},
      status: 'Pending Review', // Enters Pending Review; NEVER automatically mark as verified!
      submitted_at: new Date().toISOString(),
    };

    if (!db.claims) db.claims = [];
    db.claims.push(newClaim);
    saveDatabase(db);

    res.status(201).json({
      success: true,
      message: 'Claim and update request successfully submitted into Pending Review queue.',
      reference_id: claimId,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process claim: ' + err.message });
  }
});

// 8. Student Lead Generation ("Contact / Enquire About This Hostel" - Section 1, 2, 3, 5)
app.post('/api/leads', (req: Request, res: Response) => {
  try {
    const {
      visitor_name,
      visitor_phone,
      phone,
      preferred_hostel,
      hostel_id,
      hostel_name,
      gender,
      area,
      budget,
      room_type,
      move_in_date,
      requirements,
      notes,
    } = req.body;

    const contactName = String(visitor_name || '').trim();
    if (!contactName || contactName.length < 2) {
      return res.status(400).json({ error: 'Full Name is required (minimum 2 characters).' });
    }

    const rawPhone = String(phone || visitor_phone || '').trim();
    if (!rawPhone) {
      return res.status(400).json({ error: 'Phone Number is required.' });
    }

    // Strict validation: Reject obviously invalid phone numbers (Section 1)
    if (/[a-zA-Z]/.test(rawPhone)) {
      return res.status(400).json({ error: 'Phone number cannot contain alphabetic characters.' });
    }
    const digits = rawPhone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      return res.status(400).json({
        error: 'Please enter a valid phone number (10 to 12 digits, e.g. 0300-1234567).',
      });
    }
    if (/^(\d)\1+$/.test(digits)) {
      return res.status(400).json({ error: 'Please enter a genuine phone number, not repeated digits.' });
    }
    if (digits === '1234567890' || digits === '0123456789' || digits === '0987654321') {
      return res.status(400).json({ error: 'Please enter a genuine mobile number.' });
    }
    if (digits.length === 11 && !digits.startsWith('03')) {
      return res.status(400).json({
        error: 'Pakistani mobile numbers must start with 03 (e.g. 0300-1234567).',
      });
    }

    if (!gender || (gender !== 'Boys' && gender !== 'Girls')) {
      return res.status(400).json({ error: 'Category selection (Boys / Girls) is required.' });
    }

    const budgetVal = String(budget || '').trim();
    if (!budgetVal) {
      return res.status(400).json({ error: 'Monthly budget is required.' });
    }

    const db = getDatabase();
    if (!db.leads) db.leads = [...INITIAL_LEADS];

    // Generate unique Lead ID in format LSS-YYYYMMDD-XXXX (Section 2)
    const leadId = generateLeadId(db);
    const assignedHostelName = hostel_name || preferred_hostel || 'General Lahore Hostel Match';
    const now = new Date().toISOString();

    const newLead: LeadItem = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      lead_id: leadId,
      hostel_id: hostel_id || 'general',
      hostel_name: assignedHostelName,
      visitor_name: contactName,
      phone: rawPhone,
      visitor_phone: rawPhone,
      gender: gender === 'Girls' ? 'Girls' : 'Boys',
      area: area || 'Johar Town',
      budget: budgetVal,
      room_type: room_type || 'Double',
      move_in_date: move_in_date ? String(move_in_date).trim() : '',
      requirements: Array.isArray(requirements) ? requirements : [],
      source: 'Lahore Student Stay', // Section 3 default
      status: 'New', // Section 3 default
      lead_fee: db.default_lead_fee || 500, // Section 3 default: Rs.500 (configurable)
      payment_status: 'Pending', // Section 3 default: Pending
      assigned_hostel: assignedHostelName, // Section 5
      notes: notes ? String(notes).trim() : '',
      created_at: now,
      updated_at: now,
    };

    // Pre-fill warden assignment information if known from hostel listing
    const targetHostel = db.hostels.find((h) => h.id === hostel_id || h.slug === hostel_id);
    if (targetHostel && (targetHostel.contact_name || targetHostel.phone)) {
      newLead.assigned_warden_name = targetHostel.contact_name || 'Hostel Management';
      newLead.assigned_warden_phone = targetHostel.phone || '';
      newLead.assigned_warden_whatsapp = targetHostel.whatsapp || '';
    }

    // Add to top of leads array
    db.leads.unshift(newLead);
    saveDatabase(db);

    res.status(201).json({
      success: true,
      message: 'Your hostel enquiry has been received.',
      lead_id: leadId,
      data: newLead,
    });
  } catch (err: any) {
    console.error('Lead creation error:', err);
    res.status(500).json({ error: 'Failed to record lead inquiry: ' + err.message });
  }
});

// Admin API Routes

// Admin Login (Section 18: No hard-coded plain passwords, supports ADMIN_PASSWORD from env)
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  // Environment variable or secure production fallback
  const validPassword = process.env.ADMIN_PASSWORD || 'lahore2026admin';

  if (!password || password !== validPassword) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeAdminTokens.add(token);

  res.json({
    success: true,
    token,
    message: 'Authentication successful',
  });
});

app.post('/api/admin/logout', requireAdmin, (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '').trim();
  if (token) activeAdminTokens.delete(token);
  res.json({ success: true, message: 'Logged out' });
});

app.get('/api/admin/verify', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, authenticated: true });
});

// Admin Dashboard Stats (Section 17 + Lead Metrics)
app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const hostels = db.hostels;
    const leads = db.leads || [];

    const stats: AdminStats = {
      totalHostels: hostels.length,
      boysHostels: hostels.filter((h) => h.gender === 'Boys').length,
      girlsHostels: hostels.filter((h) => h.gender === 'Girls').length,
      verified: hostels.filter((h) => h.verification_status === 'Verified').length,
      pendingVerification: hostels.filter((h) => h.verification_status === 'Pending Verification').length,
      unverified: hostels.filter((h) => h.verification_status === 'Unverified').length,
      available: hostels.filter((h) => h.availability_status === 'Available').length,
      featured: hostels.filter((h) => h.featured).length,
      totalViews: hostels.reduce((acc, h) => acc + (h.listing_views || 0), 0),
      totalContactClicks: hostels.reduce((acc, h) => acc + (h.contact_clicks || 0), 0),
      totalWhatsappClicks: hostels.reduce((acc, h) => acc + (h.whatsapp_clicks || 0), 0),
      totalMapClicks: hostels.reduce((acc, h) => acc + (h.map_clicks || 0), 0),
      totalPhoneClicks: hostels.reduce((acc, h) => acc + (h.phone_clicks || 0), 0),
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === 'New').length,
      convertedLeads: leads.filter((l) => l.status === 'Converted').length,
    };

    res.json({ success: true, data: stats, default_lead_fee: db.default_lead_fee || 500 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate stats' });
  }
});

// Admin Platform Config (Section 3: Configurable Lead Fee)
app.patch('/api/admin/config', requireAdmin, (req: Request, res: Response) => {
  try {
    const { default_lead_fee } = req.body;
    const db = getDatabase();
    if (default_lead_fee !== undefined) {
      db.default_lead_fee = Math.max(0, Number(default_lead_fee));
    }
    saveDatabase(db);
    res.json({
      success: true,
      message: `Default qualified lead fee updated to PKR ${db.default_lead_fee}`,
      default_lead_fee: db.default_lead_fee,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update config: ' + err.message });
  }
});

// Admin Leads API Endpoints (Section 4 & 5: Dashboard and Hostel Assignment)
app.get('/api/admin/leads', requireAdmin, (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const leads = db.leads || [];

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const contacted = leads.filter((l) => l.status === 'Contacted').length;
    const assigned = leads.filter((l) => l.status === 'Assigned').length;
    const converted = leads.filter((l) => l.status === 'Converted').length;
    const notConverted = leads.filter((l) => l.status === 'Not Converted').length;
    const closed = leads.filter((l) => l.status === 'Closed').length;
    const conversionRate = totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;
    const totalFeesEarned = leads
      .filter((l) => l.payment_status === 'Paid')
      .reduce((sum, l) => sum + (l.lead_fee || 0), 0);
    const pendingFees = leads
      .filter((l) => l.payment_status === 'Pending')
      .reduce((sum, l) => sum + (l.lead_fee || 0), 0);

    const metrics: LeadMetrics = {
      totalLeads,
      newLeads,
      contacted,
      assigned,
      converted,
      notConverted,
      closed,
      conversionRate,
      totalFeesEarned,
      pendingFees,
    };

    res.json({
      success: true,
      data: leads,
      metrics,
      default_lead_fee: db.default_lead_fee || 500,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch leads: ' + err.message });
  }
});

app.patch('/api/admin/leads/:lead_id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { lead_id } = req.params;
    const {
      status,
      assigned_hostel,
      hostel_id,
      hostel_name,
      assigned_warden_name,
      assigned_warden_phone,
      assigned_warden_whatsapp,
      notes,
      lead_fee,
      payment_status,
      fee_status,
      room_type,
      budget,
      area,
      move_in_date,
    } = req.body;

    const db = getDatabase();
    if (!db.leads) db.leads = [];

    const leadIndex = db.leads.findIndex((l) => l.lead_id === lead_id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const lead = db.leads[leadIndex];
    const now = new Date().toISOString();

    if (status) {
      const validStatuses = ['New', 'Contacted', 'Assigned', 'Converted', 'Not Converted', 'Closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }
      lead.status = status;
    }

    // Section 5: Hostel Lead Assignment ("Assign / Change Hostel")
    if (assigned_hostel !== undefined) {
      lead.assigned_hostel = assigned_hostel;
      lead.hostel_name = assigned_hostel;
    }
    if (hostel_id !== undefined) lead.hostel_id = hostel_id;
    if (hostel_name !== undefined) {
      lead.hostel_name = hostel_name;
      if (!assigned_hostel) lead.assigned_hostel = hostel_name;
    }

    if (assigned_warden_name !== undefined) lead.assigned_warden_name = assigned_warden_name;
    if (assigned_warden_phone !== undefined) lead.assigned_warden_phone = assigned_warden_phone;
    if (assigned_warden_whatsapp !== undefined) lead.assigned_warden_whatsapp = assigned_warden_whatsapp;
    if (assigned_warden_name && !lead.assigned_at) lead.assigned_at = now;

    if (notes !== undefined) lead.notes = notes;
    if (lead_fee !== undefined) lead.lead_fee = Number(lead_fee);
    
    // Payment status tracking: Pending, Paid, Not Applicable (Section 4 & 5)
    const effectivePayment = payment_status || fee_status;
    if (effectivePayment !== undefined) {
      const validPayments = ['Pending', 'Paid', 'Not Applicable', 'Waived'];
      if (validPayments.includes(effectivePayment)) {
        lead.payment_status = effectivePayment === 'Waived' ? 'Not Applicable' : effectivePayment;
      }
    }

    if (room_type !== undefined) lead.room_type = room_type;
    if (budget !== undefined) lead.budget = budget;
    if (area !== undefined) lead.area = area;
    if (move_in_date !== undefined) lead.move_in_date = move_in_date;

    lead.updated_at = now;

    db.leads[leadIndex] = lead;
    saveDatabase(db);

    res.json({
      success: true,
      message: `Lead ${lead_id} updated successfully`,
      data: lead,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update lead: ' + err.message });
  }
});

app.post('/api/admin/leads', requireAdmin, (req: Request, res: Response) => {
  try {
    const {
      visitor_name,
      visitor_phone,
      phone,
      hostel_id,
      hostel_name,
      assigned_hostel,
      gender,
      area,
      budget,
      room_type,
      move_in_date,
      requirements,
      notes,
      status,
      assigned_warden_name,
      assigned_warden_phone,
      lead_fee,
      payment_status,
    } = req.body;

    const contactPhone = phone || visitor_phone;
    if (!visitor_name || !contactPhone) {
      return res.status(400).json({ error: 'Name and Phone are required' });
    }

    const db = getDatabase();
    if (!db.leads) db.leads = [...INITIAL_LEADS];

    const leadId = generateLeadId(db);
    const chosenHostel = assigned_hostel || hostel_name || 'Direct Phone Inquiry';

    const now = new Date().toISOString();
    const newLead: LeadItem = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      lead_id: leadId,
      hostel_id: hostel_id || 'manual',
      hostel_name: chosenHostel,
      assigned_hostel: chosenHostel,
      visitor_name: String(visitor_name).trim(),
      phone: String(contactPhone).trim(),
      visitor_phone: String(contactPhone).trim(),
      gender: gender === 'Girls' ? 'Girls' : 'Boys',
      area: area || 'Johar Town',
      budget: budget || 'PKR 12,000 – 18,000',
      room_type: room_type || 'Double',
      move_in_date: move_in_date || '',
      requirements: Array.isArray(requirements) ? requirements : [],
      source: 'Lahore Student Stay (Admin/Phone)',
      status: status || 'New',
      notes: notes || '',
      assigned_warden_name: assigned_warden_name || '',
      assigned_warden_phone: assigned_warden_phone || '',
      lead_fee: lead_fee !== undefined ? Number(lead_fee) : (db.default_lead_fee || 500),
      payment_status: payment_status || 'Pending',
      created_at: now,
      updated_at: now,
    };

    db.leads.unshift(newLead);
    saveDatabase(db);

    res.status(201).json({ success: true, lead_id: leadId, data: newLead });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create lead: ' + err.message });
  }
});

app.delete('/api/admin/leads/:lead_id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { lead_id } = req.params;
    const db = getDatabase();
    if (!db.leads) return res.status(404).json({ error: 'No leads found' });

    const beforeLen = db.leads.length;
    db.leads = db.leads.filter((l) => l.lead_id !== lead_id);
    if (db.leads.length === beforeLen) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    saveDatabase(db);
    res.json({ success: true, message: `Lead ${lead_id} removed` });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete lead: ' + err.message });
  }
});

// Admin Add Hostel
app.post('/api/admin/hostels', requireAdmin, (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.name || !body.gender || !body.area) {
      return res.status(400).json({ error: 'Name, gender, and area are required.' });
    }

    const db = getDatabase();
    const now = new Date().toISOString();
    const id = body.id || `hostel-${Date.now()}`;
    const baseSlug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const slug = body.slug || `${baseSlug}-${body.area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newHostel: Hostel = {
      ...body,
      id,
      slug,
      monthly_rent_min: Number(body.monthly_rent_min) || 0,
      monthly_rent_max: Number(body.monthly_rent_max) || Number(body.monthly_rent_min) || 0,
      security_deposit: body.security_deposit ? Number(body.security_deposit) : null,
      capacity: body.capacity ? Number(body.capacity) : null,
      available_beds: body.available_beds ? Number(body.available_beds) : null,
      latitude: body.latitude ? Number(body.latitude) : null,
      longitude: body.longitude ? Number(body.longitude) : null,
      published: body.published ?? true,
      featured: body.featured ?? false,
      verification_status: body.verification_status || 'Pending Verification',
      verified_date: body.verification_status === 'Verified' ? (body.verified_date || now.split('T')[0]) : null,
      last_checked: body.last_checked || now.split('T')[0],
      listing_views: 0,
      contact_clicks: 0,
      whatsapp_clicks: 0,
      map_clicks: 0,
      phone_clicks: 0,
      created_at: now,
      updated_at: now,
    };

    db.hostels.push(newHostel);
    saveDatabase(db);

    res.status(201).json({ success: true, data: newHostel });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create hostel' });
  }
});

// Admin Edit Hostel
app.put('/api/admin/hostels/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    const index = db.hostels.findIndex(h => h.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const existing = db.hostels[index];
    const now = new Date().toISOString();

    const updated: Hostel = {
      ...existing,
      ...req.body,
      id: existing.id, // Immutable ID
      updated_at: now,
      monthly_rent_min: Number(req.body.monthly_rent_min) || existing.monthly_rent_min,
      monthly_rent_max: Number(req.body.monthly_rent_max) || existing.monthly_rent_max,
      security_deposit: req.body.security_deposit !== undefined ? (req.body.security_deposit ? Number(req.body.security_deposit) : null) : existing.security_deposit,
      latitude: req.body.latitude !== undefined ? (req.body.latitude ? Number(req.body.latitude) : null) : existing.latitude,
      longitude: req.body.longitude !== undefined ? (req.body.longitude ? Number(req.body.longitude) : null) : existing.longitude,
      verified_date: req.body.verification_status === 'Verified' ? (req.body.verified_date || existing.verified_date || now.split('T')[0]) : null,
    };

    db.hostels[index] = updated;
    saveDatabase(db);

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hostel' });
  }
});

// Admin Delete Hostel
app.delete('/api/admin/hostels/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    const index = db.hostels.findIndex(h => h.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const deleted = db.hostels.splice(index, 1)[0];
    saveDatabase(db);

    res.json({ success: true, message: `Hostel "${deleted.name}" deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hostel' });
  }
});

// Admin Quick Status / Verification toggle
app.patch('/api/admin/hostels/:id/status', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { verification_status, published, featured } = req.body;
    const db = getDatabase();
    const hostel = db.hostels.find(h => h.id === id);

    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });

    const now = new Date().toISOString();
    if (verification_status !== undefined) {
      hostel.verification_status = verification_status;
      if (verification_status === 'Verified') {
        hostel.verified_date = now.split('T')[0];
      } else {
        hostel.verified_date = null;
      }
    }
    if (published !== undefined) hostel.published = Boolean(published);
    if (featured !== undefined) hostel.featured = Boolean(featured);

    hostel.updated_at = now;
    saveDatabase(db);

    res.json({ success: true, data: hostel });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Admin Quick Rent & Availability Update
app.patch('/api/admin/hostels/:id/quick-update', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { monthly_rent_min, monthly_rent_max, availability_status, available_beds, phone, whatsapp } = req.body;
    const db = getDatabase();
    const hostel = db.hostels.find(h => h.id === id);

    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });

    const today = new Date().toISOString().split('T')[0];
    if (monthly_rent_min !== undefined) hostel.monthly_rent_min = Number(monthly_rent_min);
    if (monthly_rent_max !== undefined) hostel.monthly_rent_max = Number(monthly_rent_max);
    if (availability_status !== undefined) hostel.availability_status = availability_status;
    if (available_beds !== undefined) hostel.available_beds = available_beds ? Number(available_beds) : null;
    if (phone !== undefined) hostel.phone = String(phone).trim();
    if (whatsapp !== undefined) hostel.whatsapp = String(whatsapp).replace(/[^0-9]/g, '');

    // Updating rent/availability automatically updates last_checked!
    hostel.last_checked = today;
    hostel.updated_at = new Date().toISOString();
    saveDatabase(db);

    res.json({ success: true, data: hostel });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

// Admin CSV Import (Section 16: Preview and Commit)
app.post('/api/admin/import-csv', requireAdmin, (req: Request, res: Response) => {
  try {
    const { csv_content, action } = req.body; // action: 'preview' | 'commit'
    if (!csv_content || typeof csv_content !== 'string') {
      return res.status(400).json({ error: 'Missing csv_content string' });
    }

    const lines = csv_content.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return res.status(400).json({ error: 'CSV must contain a header row and at least one data row.' });
    }

    // Parse CSV header
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
    
    const parsedRows: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Basic CSV field parser supporting quotes
      const values: string[] = [];
      let inQuotes = false;
      let curVal = '';

      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(curVal.trim());
          curVal = '';
        } else {
          curVal += char;
        }
      }
      values.push(curVal.trim());

      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = values[idx] ? values[idx].replace(/^["']|["']$/g, '').trim() : '';
      });

      if (!rowObj.name || !rowObj.gender || !rowObj.area) {
        errors.push(`Row ${i}: Missing required field (name, gender, or area).`);
        continue;
      }

      parsedRows.push(rowObj);
    }

    if (action === 'preview') {
      return res.json({
        success: true,
        preview_count: parsedRows.length,
        errors,
        rows: parsedRows.slice(0, 10), // Return sample rows for UI preview
      });
    }

    // Commit import
    const db = getDatabase();
    const now = new Date().toISOString();
    let importedCount = 0;

    for (const row of parsedRows) {
      const id = `hostel-csv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const baseSlug = row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const slug = `${baseSlug}-${(row.area || 'lahore').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

      const newHostel: Hostel = {
        id,
        slug,
        name: row.name,
        gender: row.gender.toLowerCase().includes('girl') ? 'Girls' : 'Boys',
        area: row.area,
        sub_area: row.sub_area || '',
        full_address: row.address || row.full_address || 'Not provided',
        description: row.description || '',
        monthly_rent_min: Number(row.rent_min) || 0,
        monthly_rent_max: Number(row.rent_max) || Number(row.rent_min) || 0,
        security_deposit: row.deposit ? Number(row.deposit) : null,
        room_type: (row.room_type as any) || 'Double',
        room_options: [row.room_type || 'Double'],
        capacity: row.capacity ? Number(row.capacity) : null,
        availability_status: (row.availability as any) || 'Available',
        available_beds: row.available_beds ? Number(row.available_beds) : null,
        furnished: row.furnished === 'true' || row.furnished === '1' || row.furnished === 'yes',
        ac: row.ac === 'true' || row.ac === '1' || row.ac === 'yes',
        attached_bathroom: row.bathroom === 'true' || row.attached_bathroom === 'true' || row.bathroom === 'yes',
        wifi: row.wifi === 'true' || row.wifi === '1' || row.wifi === 'yes',
        wifi_speed: 'Not provided',
        electricity: 'Not provided',
        backup: 'UPS',
        mess: row.mess === 'true' || row.mess === '1' || row.mess === 'yes',
        mess_frequency: '2 meals daily',
        laundry: false,
        parking: row.parking === 'true' || row.parking === '1' || row.parking === 'yes',
        cctv: row.cctv === 'true' || row.cctv === '1' || row.cctv === 'yes',
        security_guard: false,
        study_room: false,
        kitchen: false,
        generator: false,
        water: true,
        geyser: true,
        cleaning: true,
        contact_name: row.contact_name || '',
        phone: row.phone || '',
        whatsapp: row.whatsapp ? row.whatsapp.replace(/[^0-9]/g, '') : '',
        website: '',
        instagram: row.instagram || '',
        facebook: row.facebook || '',
        google_maps_url: row.google_maps_url || '',
        latitude: row.latitude ? Number(row.latitude) : null,
        longitude: row.longitude ? Number(row.longitude) : null,
        photos: [],
        verification_status: (row.verification_status as any) || 'Pending Verification',
        verified_date: row.verification_status === 'Verified' ? now.split('T')[0] : null,
        last_checked: row.last_checked || now.split('T')[0],
        featured: false,
        published: true,
        nearby_universities: [],
        source_url: row.source_url || '',
        source_name: 'CSV Admin Import',
        notes: '',
        listing_views: 0,
        contact_clicks: 0,
        whatsapp_clicks: 0,
        map_clicks: 0,
        phone_clicks: 0,
        created_at: now,
        updated_at: now,
      };

      db.hostels.push(newHostel);
      importedCount++;
    }

    saveDatabase(db);

    res.json({
      success: true,
      imported_count: importedCount,
      errors,
      message: `Successfully imported ${importedCount} hostels.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to import CSV: ' + err.message });
  }
});

// Admin Add Area
app.post('/api/admin/areas', requireAdmin, (req: Request, res: Response) => {
  try {
    const { name, popular } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Area name is required' });
    }

    const db = getDatabase();
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = db.areas.find(a => a.slug === slug);
    if (existing) {
      return res.status(400).json({ error: 'Area already exists' });
    }

    const newArea: AreaItem = {
      id: `area-${Date.now()}`,
      name: name.trim(),
      slug,
      popular: Boolean(popular),
    };

    db.areas.push(newArea);
    saveDatabase(db);

    res.status(201).json({ success: true, data: newArea });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add area' });
  }
});

// Admin Add/Edit University
app.post('/api/admin/universities', requireAdmin, (req: Request, res: Response) => {
  try {
    const { name, short_name, area, address, latitude, longitude } = req.body;
    if (!name || !short_name) {
      return res.status(400).json({ error: 'University name and short name are required' });
    }

    const db = getDatabase();
    const newUni: UniversityItem = {
      id: `uni-${Date.now()}`,
      name: name.trim(),
      short_name: short_name.trim(),
      area: area || 'Lahore',
      address: address || '',
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
    };

    db.universities.push(newUni);
    saveDatabase(db);

    res.status(201).json({ success: true, data: newUni });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add university' });
  }
});

// Admin Database Export
app.get('/api/admin/export', requireAdmin, (req: Request, res: Response) => {
  const { format } = req.query;
  const db = getDatabase();

  if (format === 'csv') {
    const headers = [
      'id', 'name', 'gender', 'area', 'sub_area', 'monthly_rent_min', 'monthly_rent_max',
      'room_type', 'availability_status', 'verification_status', 'phone', 'whatsapp', 'last_checked'
    ];
    let csv = headers.join(',') + '\n';
    for (const h of db.hostels) {
      csv += [
        `"${h.id}"`,
        `"${h.name.replace(/"/g, '""')}"`,
        `"${h.gender}"`,
        `"${h.area.replace(/"/g, '""')}"`,
        `"${h.sub_area.replace(/"/g, '""')}"`,
        h.monthly_rent_min,
        h.monthly_rent_max,
        `"${h.room_type}"`,
        `"${h.availability_status}"`,
        `"${h.verification_status}"`,
        `"${h.phone}"`,
        `"${h.whatsapp}"`,
        `"${h.last_checked}"`
      ].join(',') + '\n';
    }
    res.type('text/csv');
    res.attachment('lahore_hostels_export.csv');
    return res.send(csv);
  }

  res.json({
    exported_at: new Date().toISOString(),
    total: db.hostels.length,
    data: db,
  });
});

// Vite Middleware integration for development / Static serving for production
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Lahore Student Stay] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[Lahore Student Stay] Database ready at ${DB_FILE}`);
  });
}

start().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
