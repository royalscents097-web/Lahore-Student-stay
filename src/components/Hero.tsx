import React from 'react';
import { Search, MapPin, Building, ArrowRight } from 'lucide-react';
import heroCampusImg from '../assets/images/hero_lahore_campus_1790503926476.jpg';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: 'All' | 'Boys' | 'Girls') => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  popularAreas: string[];
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  selectedArea,
  onSelectArea,
  popularAreas,
}) => {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="Lahore University Campus Student Living"
          className="w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-neutral-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            <span>Lahore Accommodation Directory</span>
            <span aria-hidden="true">·</span>
            <span>Real Data Only</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Find the right student hostel in Lahore.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Search verified boys & girls hostels near Punjab University, UMT, UCP, UOL, COMSATS, FAST, and FCCU. No fabricated ratings or fake rents.
          </p>

          {/* Quick Category Jump Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectCategory('Boys')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Find Boys Hostels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectCategory('Girls')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-800 hover:bg-rose-700 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Find Girls Hostels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Unified Search Bar */}
          <div className="mt-8 p-2 sm:p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by hostel name, area, university (e.g. UMT, PU, UOL) or facilities..."
                  className="w-full pl-11 pr-4 py-3 bg-white text-neutral-900 placeholder-neutral-500 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-inner"
                />
              </div>

              {/* Area Quick Selector in Search */}
              <div className="relative sm:w-56">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-neutral-400 pointer-events-none" />
                <select
                  value={selectedArea}
                  onChange={(e) => onSelectArea(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white text-neutral-900 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none cursor-pointer"
                >
                  <option value="All">All Lahore Areas</option>
                  {popularAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-4 pointer-events-none text-neutral-400 text-xs">▼</div>
              </div>
            </div>
          </div>

          {/* Quick Area Pill alternative: unboxed editorial list per Section 0/1 */}
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-300">
            <span className="text-neutral-400">Popular hubs:</span>
            {['Johar Town', 'Muslim Town', 'Garden Town', 'Gulberg', 'Defence Road', 'Raiwind Road'].map(
              (area, index, arr) => (
                <React.Fragment key={area}>
                  <button
                    onClick={() => onSelectArea(area)}
                    className="hover:text-emerald-400 underline-offset-4 hover:underline cursor-pointer"
                  >
                    {area}
                  </button>
                  {index < arr.length - 1 && <span className="text-neutral-600">·</span>}
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
