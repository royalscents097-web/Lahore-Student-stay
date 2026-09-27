# Lahore Student Stay — Real Data Student Hostel Directory

> "Find the right student hostel in Lahore."

A production-ready web platform and administrative database built for student accommodation across Lahore, Pakistan (covering major university hubs including University of the Punjab, UMT, UCP, UOL, COMSATS, FAST-NUCES, FCCU, LUMS, KEMU, and LCWU).

---

## 1. Project Structure

```
├── .env.example                     # Environment configuration template
├── README.md                        # Documentation, schema, & deployment guide
├── Procfile                         # Production deployment process declaration
├── hostels_template.csv             # Template for CSV bulk import
├── index.html                       # HTML5 entry point with OpenGraph & meta tags
├── metadata.json                    # Application metadata definition
├── package.json                     # Node/Express/Vite dependencies & run scripts
├── server.ts                        # Full-stack Node.js + Express API & Vite server
├── tsconfig.json                    # TypeScript compiler options
├── vite.config.ts                   # Vite build configuration
├── data/
│   └── database.json                # Atomic persistent JSON/relational database
├── python_backend/
│   ├── app.py                       # Production Flask server entrypoint
│   ├── models.py                    # SQLAlchemy relational models
│   ├── requirements.txt             # Python dependencies (Flask, SQLAlchemy, Gunicorn)
│   └── schema.sql                   # PostgreSQL & SQLite DDL relational schema
└── src/
    ├── App.tsx                      # Core React application coordinator
    ├── index.css                    # Tailwind CSS imports & base styles
    ├── main.tsx                     # React 19 application mount
    ├── types.ts                     # TypeScript data contracts & schemas
    ├── assets/
    │   └── images/                  # High-fidelity photos for campus & rooms
    ├── components/
    │   ├── Navbar.tsx               # Top navigation (3-zone contract)
    │   ├── Hero.tsx                 # Hero section with search & quick area jump
    │   ├── HostelCard.tsx           # Individual card with verified info & working CTAs
    │   ├── HostelFilters.tsx        # Multi-attribute filter drawer & sidebar
    │   ├── HostelDetailModal.tsx    # Comprehensive 40+ field hostel detail view
    │   ├── ComparisonDrawer.tsx     # Side-by-side comparison modal (up to 3 hostels)
    │   ├── PopularAreas.tsx         # University campus corridor cards
    │   ├── HowItWorks.tsx           # 3-step transparent editorial workflow
    │   ├── SubmitHostelModal.tsx    # "List Your Hostel" public submission form
    │   ├── AdminPanel.tsx           # Admin portal (Auth, CRUD, Stats, CSV Import)
    │   └── Footer.tsx               # Quiet footer with disclaimers & links
    └── data/
        └── seedData.ts              # Verified Lahore hostels, areas, & universities
```

---

## 2. Database Schema

The database model follows Section 4 with rigorous relational typing:

```sql
CREATE TABLE hostels (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    gender VARCHAR(16) NOT NULL CHECK (gender IN ('Boys', 'Girls')),
    area VARCHAR(120) NOT NULL,
    sub_area VARCHAR(150),
    full_address TEXT NOT NULL,
    description TEXT,
    monthly_rent_min INTEGER NOT NULL,
    monthly_rent_max INTEGER NOT NULL,
    security_deposit INTEGER,
    room_type VARCHAR(64) NOT NULL,
    room_options TEXT, -- JSON array
    capacity INTEGER,
    availability_status VARCHAR(32) NOT NULL CHECK (availability_status IN ('Available', 'Limited Availability', 'Full', 'Unknown')),
    available_beds INTEGER,
    furnished BOOLEAN DEFAULT FALSE,
    ac BOOLEAN DEFAULT FALSE,
    attached_bathroom BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    wifi_speed VARCHAR(64),
    electricity VARCHAR(120),
    backup VARCHAR(64),
    mess BOOLEAN DEFAULT FALSE,
    mess_frequency VARCHAR(120),
    laundry BOOLEAN DEFAULT FALSE,
    parking BOOLEAN DEFAULT FALSE,
    cctv BOOLEAN DEFAULT FALSE,
    security_guard BOOLEAN DEFAULT FALSE,
    study_room BOOLEAN DEFAULT FALSE,
    kitchen BOOLEAN DEFAULT FALSE,
    generator BOOLEAN DEFAULT FALSE,
    water BOOLEAN DEFAULT TRUE,
    geyser BOOLEAN DEFAULT FALSE,
    cleaning BOOLEAN DEFAULT TRUE,
    contact_name VARCHAR(120),
    phone VARCHAR(32),
    whatsapp VARCHAR(32),
    website VARCHAR(255),
    google_maps_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    photos TEXT, -- JSON array
    verification_status VARCHAR(32) NOT NULL CHECK (verification_status IN ('Verified', 'Unverified', 'Pending Verification')),
    verified_date VARCHAR(32),
    last_checked VARCHAR(32) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    nearby_universities TEXT, -- JSON array
    source_url TEXT,
    source_name VARCHAR(150),
    notes TEXT,
    listing_views INTEGER DEFAULT 0,
    contact_clicks INTEGER DEFAULT 0,
    whatsapp_clicks INTEGER DEFAULT 0,
    map_clicks INTEGER DEFAULT 0,
    phone_clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Initial Seed Data (Section 31)

Pre-loaded with verified, publicly discoverable Lahore hostels:
1. **Best Boys Hostel** — Muslim Town (Wahdat Road / PU New Campus)
2. **Makkah Hostel for Boys** — Muslim Town (Canal Bank Road)
3. **Al Qasim Boys Hostel** — Muslim Town (Wahdat Road)
4. **Boys Hostel Johar Town Lahore** — Johar Town (Near UMT)
5. **New Student Hostel** — Johar Town (Near Shaukat Khanum & Bahria)
6. **Lahore Hostel Girls Branch Johar Town** — Johar Town (Near UCP & UMT)
7. **Al Zahra Girls Hostel** — Johar Town (Allah Hoo Chowk)
8. **110 Girls Hostel** — Johar Town (Expo Centre)
9. **Qureshi Girls Hostel** — Muslim Town (Ayubia Market)
10. **Global Girls Hostel** — Faisal Town (FAST-NUCES campus)
11. **Al-Nisa Homes Girls Hostel** — Raiwind Road (Orange Line / Ali Town)
12. **Barkat Market Heights** — New Garden Town (PU Canal Gate)
13. **PU Boys Hostel Area Private Residence** — Canal Road
14. **Lahore Girls Hostel UOL Main Campus** — Defence Road (Opposite UOL Gate 2)
15. **Haya Hostel for Girls** — Anarkali (Near KEMU & LCWU)

---

## 4. Admin Credentials & Security Setup (Section 18)

Admin credentials are never hard-coded in source control:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your secret master admin password:
   ```env
   ADMIN_PASSWORD="your-strong-random-password-here"
   ```
3. To log into `/admin`:
   - Click **Admin Portal** in the navigation header.
   - Enter your `ADMIN_PASSWORD`.
   - The server validates the credentials and returns a cryptographically secure session token stored only in memory and browser session storage.

---

## 5. Local Run Instructions

### Option A: Node.js & Express (Active Development Runtime)

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack server on port 3000
npm run dev

# 3. Access in browser
http://localhost:3000
```

### Option B: Python & Flask

```bash
# 1. Navigate to python backend
cd python_backend

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install requirements
pip install -r requirements.txt

# 4. Run application
flask run --port 3000
```

---

## 6. Production Deployment Instructions

### Node / Express
```bash
npm run build
npm start
```

### Python / Gunicorn
```bash
# Production command specified in Section 27:
gunicorn python_backend.app:app --bind 0.0.0.0:3000 --workers 4
```

---

## 7. CSV Import Template & Rules (Section 16)

Download or view `hostels_template.csv`. Columns required:
- `name`: Hostel Name
- `gender`: `Boys` or `Girls`
- `area`: Main Lahore area (e.g. `Johar Town`)
- `rent_min`: Minimum monthly rent in PKR
- `rent_max`: Maximum monthly rent in PKR
- `room_type`: `Single`, `Double`, `Triple`, `4-Seater`, `Shared`
- `availability`: `Available`, `Limited Availability`, `Full`
- `phone`: Contact telephone
- `whatsapp`: WhatsApp number with country code (e.g. `923001234567`)
- `verification_status`: Default `Pending Verification`

In the Admin Panel:
1. Navigate to the **CSV Import** tab.
2. Paste CSV rows or upload your file.
3. Click **Parse & Preview CSV** to inspect parsed records and resolve errors.
4. Click **Commit Bulk Import** to save directly into the database.

---

## 8. Data Verification Workflow (Section 6, 29, 30)

Every listing follows this strict verification pipeline:

1. **Submission / Import**:
   - Listings enter with status `Pending Verification` and `published = false`.
2. **Telephone Audit**:
   - Administrative staff dials listed phone/WhatsApp to confirm warden identity, current monthly rent, and security deposit terms.
3. **Location Check**:
   - Physical address and Google Maps coordinates are validated.
4. **Timestamped Approval**:
   - Admin marks listing as `Verified`. System records `verified_date` and `last_checked`.
5. **Periodic Re-verification**:
   - Any rent or availability update updates `last_checked` to prevent stale data.

---

## 9. Future Monetization Architecture (Section 34)

The database schema already includes fields for future non-intrusive monetization:
- `featured`: Priority placement at top of search results without fabricating reviews.
- `sponsored`: Clearly marked sponsored listings for verified accommodation providers.
- `tier`: Standard, Verified Partner, or Premium Hostel listing.
- Analytics counters (`listing_views`, `contact_clicks`, `whatsapp_clicks`, `map_clicks`, `phone_clicks`) provide transparent reporting for prospective advertisers.
