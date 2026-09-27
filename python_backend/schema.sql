-- Lahore Student Stay - Relational Database Schema
-- Compatible with PostgreSQL 14+ and SQLite 3

CREATE TABLE IF NOT EXISTS areas (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS universities (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    short_name VARCHAR(32) NOT NULL,
    area VARCHAR(120) NOT NULL,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hostels (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    gender VARCHAR(16) NOT NULL CHECK (gender IN ('Boys', 'Girls')),
    area VARCHAR(120) NOT NULL,
    sub_area VARCHAR(150) DEFAULT '',
    full_address TEXT NOT NULL,
    description TEXT,
    monthly_rent_min INTEGER NOT NULL DEFAULT 0,
    monthly_rent_max INTEGER NOT NULL DEFAULT 0,
    security_deposit INTEGER DEFAULT NULL,
    room_type VARCHAR(64) NOT NULL DEFAULT 'Double',
    room_options TEXT, -- JSON array string
    capacity INTEGER DEFAULT NULL,
    availability_status VARCHAR(32) NOT NULL DEFAULT 'Unknown' CHECK (availability_status IN ('Available', 'Limited Availability', 'Full', 'Unknown')),
    available_beds INTEGER DEFAULT NULL,
    furnished BOOLEAN DEFAULT FALSE,
    ac BOOLEAN DEFAULT FALSE,
    attached_bathroom BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    wifi_speed VARCHAR(64) DEFAULT 'Not provided',
    electricity VARCHAR(120) DEFAULT 'Not provided',
    backup VARCHAR(64) DEFAULT 'Not provided',
    mess BOOLEAN DEFAULT FALSE,
    mess_frequency VARCHAR(120) DEFAULT 'Not provided',
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
    contact_name VARCHAR(120) DEFAULT '',
    phone VARCHAR(32) DEFAULT '',
    whatsapp VARCHAR(32) DEFAULT '',
    website VARCHAR(255) DEFAULT '',
    google_maps_url TEXT DEFAULT '',
    latitude DOUBLE PRECISION DEFAULT NULL,
    longitude DOUBLE PRECISION DEFAULT NULL,
    photos TEXT, -- JSON array string
    verification_status VARCHAR(32) NOT NULL DEFAULT 'Pending Verification' CHECK (verification_status IN ('Verified', 'Unverified', 'Pending Verification')),
    verified_date VARCHAR(32) DEFAULT NULL,
    last_checked VARCHAR(32) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    nearby_universities TEXT, -- JSON array string
    source_url TEXT DEFAULT '',
    source_name VARCHAR(150) DEFAULT 'Public Directory',
    notes TEXT DEFAULT '',
    
    -- Analytics & Monetization Architecture
    listing_views INTEGER DEFAULT 0,
    contact_clicks INTEGER DEFAULT 0,
    whatsapp_clicks INTEGER DEFAULT 0,
    map_clicks INTEGER DEFAULT 0,
    phone_clicks INTEGER DEFAULT 0,
    sponsored BOOLEAN DEFAULT FALSE,
    tier VARCHAR(32) DEFAULT 'standard',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hostels_gender ON hostels(gender);
CREATE INDEX IF NOT EXISTS idx_hostels_area ON hostels(area);
CREATE INDEX IF NOT EXISTS idx_hostels_verification ON hostels(verification_status);
CREATE INDEX IF NOT EXISTS idx_hostels_published ON hostels(published);
CREATE INDEX IF NOT EXISTS idx_hostels_rent ON hostels(monthly_rent_min, monthly_rent_max);
