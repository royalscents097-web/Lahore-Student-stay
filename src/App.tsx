/**
 * Lahore Student Stay
 * Real Data Student Hostel Directory for Lahore, Pakistan.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  Check,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { Hostel, AreaItem, UniversityItem, FilterState } from './types';
import { INITIAL_AREAS, INITIAL_UNIVERSITIES, INITIAL_HOSTELS } from './data/seedData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HostelCard } from './components/HostelCard';
import { HostelFilters } from './components/HostelFilters';
import { HostelDetailModal } from './components/HostelDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { PopularAreas } from './components/PopularAreas';
import { HowItWorks } from './components/HowItWorks';
import { SubmitHostelModal } from './components/SubmitHostelModal';
import { ClaimHostelModal } from './components/ClaimHostelModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

export default function App() {
  const [hostels, setHostels] = useState<Hostel[]>(INITIAL_HOSTELS);
  const [areas, setAreas] = useState<AreaItem[]>(INITIAL_AREAS);
  const [universities, setUniversities] = useState<UniversityItem[]>(INITIAL_UNIVERSITIES);
  const [loading, setLoading] = useState(false);

  // Filters State
  const initialFilters: FilterState = {
    gender: 'All',
    area: 'All',
    minRent: 0,
    maxRent: 40000,
    roomType: 'All',
    wifi: false,
    mess: false,
    ac: false,
    furnished: false,
    attachedBath: false,
    cctv: false,
    parking: false,
    backup: false,
    availability: 'All',
    verifiedOnly: false,
    searchQuery: '',
    university: 'All',
    sortBy: 'featured',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Interactive UI state
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [comparedHostelIds, setComparedHostelIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [claimTargetHostel, setClaimTargetHostel] = useState<Hostel | null>(null);

  // Fetch hostels from API
  const loadHostels = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hostels');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setHostels(data.data);
      }
    } catch (err) {
      console.warn('API load failed, fallback to initial state:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch areas and universities
  const loadMetadata = async () => {
    try {
      const [areasRes, unisRes] = await Promise.all([
        fetch('/api/areas'),
        fetch('/api/universities'),
      ]);
      const areasData = await areasRes.json();
      const unisData = await unisRes.json();
      if (areasData.success) setAreas(areasData.data);
      if (unisData.success) setUniversities(unisData.data);
    } catch (err) {
      console.warn('Metadata fetch error, fallback to seed:', err);
    }
  };

  useEffect(() => {
    loadHostels();
    loadMetadata();
  }, []);

  // Update filter helper
  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Track clicks for analytics
  const handleTrackClick = (hostelId: string, type: 'contact' | 'whatsapp' | 'map' | 'phone' | 'instagram' | 'facebook' | 'website') => {
    fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostel_id: hostelId, type }),
    }).catch(() => {});
  };

  // Open claim modal
  const handleOpenClaim = (hostel: Hostel) => {
    setClaimTargetHostel(hostel);
    setIsClaimOpen(true);
  };

  // Open single hostel detail
  const handleViewDetails = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    fetch(`/api/hostels/${hostel.id}`).catch(() => {});
  };

  // Compare toggling
  const handleToggleCompare = (hostel: Hostel) => {
    setComparedHostelIds((prev) => {
      if (prev.includes(hostel.id)) {
        return prev.filter((id) => id !== hostel.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 hostels at a time.');
          return prev;
        }
        return [...prev, hostel.id];
      }
    });
  };

  const comparedHostels = useMemo(() => {
    return hostels.filter((h) => comparedHostelIds.includes(h.id));
  }, [hostels, comparedHostelIds]);

  // Client-side filtering & sorting
  const filteredHostels = useMemo(() => {
    return hostels.filter((h) => {
      // 1. Gender category
      if (filters.gender !== 'All' && h.gender.toLowerCase() !== filters.gender.toLowerCase()) {
        return false;
      }

      // 2. Area
      if (filters.area !== 'All' && h.area.toLowerCase() !== filters.area.toLowerCase()) {
        return false;
      }

      // 3. Rent
      if (filters.maxRent && h.monthly_rent_min > filters.maxRent) {
        return false;
      }

      // 4. Room type
      if (filters.roomType !== 'All') {
        const target = filters.roomType.toLowerCase();
        const matchesType = h.room_type.toLowerCase() === target;
        const matchesOptions = h.room_options && h.room_options.some((o) => o.toLowerCase() === target);
        if (!matchesType && !matchesOptions) return false;
      }

      // 5. Facilities
      if (filters.wifi && !h.wifi) return false;
      if (filters.mess && !h.mess) return false;
      if (filters.ac && !h.ac) return false;
      if (filters.furnished && !h.furnished) return false;
      if (filters.attachedBath && !h.attached_bathroom) return false;
      if (filters.cctv && !h.cctv) return false;
      if (filters.parking && !h.parking) return false;
      if (filters.backup && !(h.generator || (h.backup && h.backup !== 'None' && h.backup !== 'Not provided'))) return false;

      // 6. Availability
      if (filters.availability !== 'All' && h.availability_status !== filters.availability) {
        return false;
      }

      // 7. Verified only
      if (filters.verifiedOnly && h.verification_status !== 'Verified') {
        return false;
      }

      // 8. University
      if (filters.university !== 'All') {
        const uTarget = filters.university.toLowerCase();
        const hasUni = h.nearby_universities?.some(
          (u) => u.university_name.toLowerCase().includes(uTarget) || u.university_id === filters.university
        );
        if (!hasUni) return false;
      }

      // 9. Free-form search
      if (filters.searchQuery.trim()) {
        const queryTerms = filters.searchQuery.toLowerCase().trim().split(/\s+/);
        const searchableBlob = [
          h.name,
          h.area,
          h.sub_area,
          h.full_address,
          h.gender,
          h.room_type,
          ...(h.room_options || []),
          h.description,
          h.notes,
          ...(h.nearby_universities?.map((u) => `${u.university_name} ${u.distance_text || ''}`) || []),
          h.wifi ? 'wifi internet' : '',
          h.mess ? 'mess food cafeteria' : '',
          h.ac ? 'ac air conditioning' : '',
          h.generator ? 'generator backup ups' : '',
        ].join(' ').toLowerCase();

        return queryTerms.every((term) => searchableBlob.includes(term));
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'lowest_rent':
          return a.monthly_rent_min - b.monthly_rent_min;
        case 'highest_rent':
          return b.monthly_rent_min - a.monthly_rent_min;
        case 'recently_verified':
          if (a.verification_status === 'Verified' && b.verification_status !== 'Verified') return -1;
          if (b.verification_status === 'Verified' && a.verification_status !== 'Verified') return 1;
          return (b.verified_date || '').localeCompare(a.verified_date || '');
        case 'recently_updated':
          return (b.last_checked || '').localeCompare(a.last_checked || '');
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.last_checked || '').localeCompare(a.last_checked || '');
      }
    });
  }, [hostels, filters]);

  const popularAreaNames = useMemo(() => {
    return areas.map((a) => a.name);
  }, [areas]);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 selection:bg-emerald-200">
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentCategory={filters.gender}
        onSelectCategory={(cat) => handleFilterChange({ gender: cat })}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        compareCount={comparedHostelIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Hero Section with Search & Area Quick Jump */}
      <Hero
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        onSelectCategory={(cat) => {
          handleFilterChange({ gender: cat });
          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedArea={filters.area}
        onSelectArea={(area) => {
          handleFilterChange({ area });
          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
        }}
        popularAreas={popularAreaNames}
      />

      {/* Popular Student Neighborhoods */}
      <PopularAreas
        areas={areas}
        selectedArea={filters.area}
        onSelectArea={(area) => {
          handleFilterChange({ area });
          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Hostel Directory Section */}
      <main id="directory" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Heading & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Directory Listings
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-xs text-neutral-500 font-medium">
                {filteredHostels.length} {filteredHostels.length === 1 ? 'hostel' : 'hostels'} found
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              {filters.gender === 'Boys'
                ? 'Boys Hostels in Lahore'
                : filters.gender === 'Girls'
                ? 'Girls Hostels in Lahore'
                : 'All Student Hostels in Lahore'}
              {filters.area !== 'All' ? ` — ${filters.area}` : ''}
            </h2>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 text-xs font-semibold bg-white border border-neutral-300 rounded-lg shadow-sm text-neutral-800 flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600" />
              <span>Filter Options</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <label htmlFor="sortBy" className="text-neutral-500 font-medium hidden sm:inline">
                Sort:
              </label>
              <select
                id="sortBy"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent text-neutral-900 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="lowest_rent">Lowest Rent</option>
                <option value="highest_rent">Highest Rent</option>
                <option value="recently_updated">Recently Checked</option>
                <option value="recently_verified">Verified First</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout (Desktop) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Sticky Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-20">
            <HostelFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              areas={areas}
              universities={universities}
              totalResults={filteredHostels.length}
            />
          </aside>

          {/* Right Column: Hostels Grid */}
          <div className="lg:col-span-3">
            {filteredHostels.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  No matching hostels found
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                  Try broadening your search criteria, adjusting rent thresholds, or resetting specific facility filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard
                    key={hostel.id}
                    hostel={hostel}
                    onViewDetails={handleViewDetails}
                    onTrackClick={handleTrackClick}
                    isCompared={comparedHostelIds.includes(hostel.id)}
                    onToggleCompare={handleToggleCompare}
                    onClaimHostel={handleOpenClaim}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* How It Works Editorial Section */}
      <HowItWorks />

      {/* "List Your Hostel" Call-to-Action Bar */}
      <section className="bg-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
              Hostel Owners & Wardens
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Manage student accommodation in Lahore?
            </h2>
            <p className="text-sm text-emerald-100 mt-1 max-w-xl">
              List your boys or girls hostel directly on Lahore Student Stay. Every submission enters our review pipeline for factual verification.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-6 py-3 bg-white text-emerald-950 font-bold rounded-xl text-sm shadow-md hover:bg-emerald-50 transition-all shrink-0 cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-800" />
            <span>List Your Hostel (Free)</span>
          </button>
        </div>
      </section>

      {/* Quiet Professional Footer */}
      <Footer
        onSelectCategory={(cat) => {
          handleFilterChange({ gender: cat });
          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectArea={(area) => {
          handleFilterChange({ area });
          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      {/* Sticky Bottom Comparison Floating Bar */}
      {comparedHostelIds.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40 bg-neutral-900 text-white p-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold tabular-nums">
              {comparedHostelIds.length}
            </span>
            <span className="text-xs font-medium">
              {comparedHostelIds.length} of 3 hostels selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparedHostelIds([])}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <HostelDetailModal
        hostel={selectedHostel}
        onClose={() => setSelectedHostel(null)}
        onTrackClick={handleTrackClick}
        onClaimHostel={handleOpenClaim}
      />

      <ClaimHostelModal
        hostel={claimTargetHostel}
        isOpen={isClaimOpen}
        onClose={() => setIsClaimOpen(false)}
      />

      <ComparisonDrawer
        hostels={comparedHostels}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setComparedHostelIds((prev) => prev.filter((i) => i !== id))}
        onViewDetails={handleViewDetails}
      />

      <SubmitHostelModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        areas={areas}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        areas={areas}
        universities={universities}
        onHostelsModified={() => {
          loadHostels();
          loadMetadata();
        }}
      />

      {/* Mobile Filters Slide-in Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <HostelFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              areas={areas}
              universities={universities}
              totalResults={filteredHostels.length}
              isMobileModal={true}
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
