import React from 'react';
import { Filter, RotateCcw, Check, X, ShieldCheck } from 'lucide-react';
import { FilterState, AreaItem, UniversityItem } from '../types';

interface HostelFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  areas: AreaItem[];
  universities: UniversityItem[];
  totalResults: number;
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
}

export const HostelFilters: React.FC<HostelFiltersProps> = ({
  filters,
  onChange,
  onReset,
  areas,
  universities,
  totalResults,
  isMobileModal,
  onCloseMobile,
}) => {
  return (
    <div className={`bg-white rounded-xl border border-neutral-200 p-5 ${isMobileModal ? 'h-full overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-800" />
          <h2 className="text-base font-bold text-neutral-900">Filters</h2>
          <span className="text-xs text-neutral-500 font-normal">
            ({totalResults} {totalResults === 1 ? 'hostel' : 'hostels'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {isMobileModal && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-5">
        {/* 1. Category / Gender Toggle (Segmented control per Section 1.A) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Hostel Category
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-lg">
            {(['All', 'Boys', 'Girls'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => onChange({ gender: cat })}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  filters.gender === cat
                    ? cat === 'Boys'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : cat === 'Girls'
                      ? 'bg-rose-800 text-white shadow-sm'
                      : 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat === 'All' ? 'All' : `${cat}`}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Lahore Area Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Lahore Area
          </label>
          <select
            value={filters.area}
            onChange={(e) => onChange({ area: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="All">All Lahore Areas</option>
            {areas.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name} {a.hostel_count !== undefined && a.hostel_count > 0 ? `(${a.hostel_count})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* 3. University Proximity Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Nearby University
          </label>
          <select
            value={filters.university}
            onChange={(e) => onChange({ university: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="All">Any University</option>
            {universities.map((u) => (
              <option key={u.id} value={u.name}>
                {u.short_name} — {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Monthly Rent Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Monthly Rent (PKR)
            </label>
            <span className="text-xs font-semibold text-neutral-900 tabular-nums">
              Up to PKR {filters.maxRent.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={10000}
            max={40000}
            step={1000}
            value={filters.maxRent}
            onChange={(e) => onChange({ maxRent: Number(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
          />
          <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
            <span>PKR 10,000</span>
            <span>PKR 25,000</span>
            <span>PKR 40,000+</span>
          </div>
        </div>

        {/* 5. Room Type Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Room Type
          </label>
          <select
            value={filters.roomType}
            onChange={(e) => onChange({ roomType: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="All">All Room Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
            <option value="4-Seater">4-Seater</option>
            <option value="Shared">Shared</option>
          </select>
        </div>

        {/* 6. Facilities Checklist */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Required Facilities
          </label>
          <div className="space-y-2">
            {[
              { key: 'mess', label: 'Mess / Meals Included' },
              { key: 'wifi', label: 'Wi-Fi / Internet' },
              { key: 'ac', label: 'Air Conditioning (AC)' },
              { key: 'attachedBath', label: 'Attached Bathroom' },
              { key: 'backup', label: 'Electricity Backup / Generator' },
              { key: 'furnished', label: 'Furnished Bed & Desk' },
              { key: 'cctv', label: 'CCTV / Security Guard' },
              { key: 'parking', label: 'Bike / Car Parking' },
            ].map((item) => {
              const active = (filters as any)[item.key];
              return (
                <label
                  key={item.key}
                  className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-neutral-900 select-none"
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => onChange({ [item.key]: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-neutral-300"
                  />
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 7. Availability Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Availability Status
          </label>
          <select
            value={filters.availability}
            onChange={(e) => onChange({ availability: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="All">Any Status</option>
            <option value="Available">Available Beds Only</option>
            <option value="Limited Availability">Limited Availability</option>
          </select>
        </div>

        {/* 8. Verified Only Toggle */}
        <div className="pt-2 border-t border-neutral-100">
          <label className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/50 cursor-pointer">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-xs font-semibold text-neutral-900 block">Verified Only</span>
                <span className="text-[11px] text-neutral-500 block">Admin field-verified listings</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-neutral-300"
            />
          </label>
        </div>

        {isMobileModal && onCloseMobile && (
          <div className="pt-4 border-t border-neutral-200">
            <button
              onClick={onCloseMobile}
              className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold cursor-pointer"
            >
              Show {totalResults} Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
