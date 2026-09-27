import React, { useState } from 'react';
import {
  Search,
  MapPin,
  DollarSign,
  Check,
  RotateCcw,
  Sparkles,
  Wifi,
  Utensils,
  Wind,
  Bath,
  Zap,
  Car,
  BedDouble,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { AreaItem, GenderType } from '../types';

export interface GuidedSearchState {
  gender: GenderType | 'All';
  area: string;
  budgetMax: number;
  budgetLabel: string;
  requirements: {
    wifi: boolean;
    mess: boolean;
    ac: boolean;
    furnished: boolean;
    attachedBath: boolean;
    parking: boolean;
    backup: boolean;
  };
}

interface GuidedHostelSearchProps {
  areas: AreaItem[];
  currentSearch: GuidedSearchState;
  hasSearched: boolean;
  onSearch: (criteria: GuidedSearchState) => void;
  onReset: () => void;
}

const BUDGET_OPTIONS = [
  { label: 'Any Budget', max: 50000, desc: 'All rent brackets' },
  { label: 'Under PKR 12,000', max: 12000, desc: 'Budget friendly' },
  { label: 'PKR 12,000 – 18,000', max: 18000, desc: 'Standard student range' },
  { label: 'PKR 18,000 – 25,000', max: 25000, desc: 'Comfort & executive' },
  { label: 'Above PKR 25,000', max: 50000, desc: 'Premium & private rooms' },
];

export const GuidedHostelSearch: React.FC<GuidedHostelSearchProps> = ({
  areas,
  currentSearch,
  hasSearched,
  onSearch,
  onReset,
}) => {
  const [gender, setGender] = useState<GenderType | 'All'>(currentSearch.gender === 'All' ? 'Boys' : currentSearch.gender);
  const [area, setArea] = useState<string>(currentSearch.area || 'All');
  const [budgetIndex, setBudgetIndex] = useState<number>(() => {
    const found = BUDGET_OPTIONS.findIndex((b) => b.max === currentSearch.budgetMax);
    return found >= 0 ? found : 0;
  });
  const [requirements, setRequirements] = useState(currentSearch.requirements);

  const toggleReq = (key: keyof typeof requirements) => {
    setRequirements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const selectedBudget = BUDGET_OPTIONS[budgetIndex];
    onSearch({
      gender,
      area,
      budgetMax: selectedBudget.max,
      budgetLabel: selectedBudget.label,
      requirements,
    });
  };

  const handleQuickPreset = (preset: {
    gender: GenderType;
    area: string;
    budgetMax: number;
    budgetLabel: string;
    reqs: Partial<typeof requirements>;
  }) => {
    setGender(preset.gender);
    setArea(preset.area);
    const bIndex = BUDGET_OPTIONS.findIndex((b) => b.max === preset.budgetMax);
    setBudgetIndex(bIndex >= 0 ? bIndex : 0);
    const newReqs = {
      wifi: false,
      mess: false,
      ac: false,
      furnished: false,
      attachedBath: false,
      parking: false,
      backup: false,
      ...preset.reqs,
    };
    setRequirements(newReqs);
    onSearch({
      gender: preset.gender,
      area: preset.area,
      budgetMax: preset.budgetMax,
      budgetLabel: preset.budgetLabel,
      requirements: newReqs,
    });
  };

  const activeReqCount = Object.values(requirements).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-neutral-900 text-white px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">
                Guided Hostel Search
              </span>
              <span className="text-xs text-neutral-400">· 5 Simple Steps</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-white">
              Find Matching Student Hostels in Lahore
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
              Select your gender category, preferred Lahore area, budget range, and room requirements to see verified hostels with direct warden contact.
            </p>
          </div>

          {hasSearched && (
            <button
              type="button"
              onClick={onReset}
              className="self-start sm:self-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          )}
        </div>
      </div>

      {/* 5-Step Guided Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
        {/* STEP 1: Who are you looking for? */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center">
                1
              </span>
              <span>Who are you looking for? <strong className="text-neutral-900 font-semibold">(Required)</strong></span>
            </label>
            <span className="text-xs text-neutral-400">Strictly segregated boys & girls listings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Boys Hostels Option */}
            <button
              type="button"
              onClick={() => setGender('Boys')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex items-center gap-4 ${
                gender === 'Boys'
                  ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-600/30 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
                  gender === 'Boys' ? 'bg-emerald-700 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                👦
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-neutral-900">Boys Hostels</span>
                  {gender === 'Boys' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Hostels for male students & university attendees in Lahore
                </p>
              </div>
            </button>

            {/* Girls Hostels Option */}
            <button
              type="button"
              onClick={() => setGender('Girls')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex items-center gap-4 ${
                gender === 'Girls'
                  ? 'border-rose-700 bg-rose-50/60 ring-2 ring-rose-600/30 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
                  gender === 'Girls' ? 'bg-rose-700 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                👧
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-neutral-900">Girls Hostels</span>
                  {gender === 'Girls' && (
                    <span className="w-5 h-5 rounded-full bg-rose-700 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Secure hostels with female wardens & strict campus curfews
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* STEP 2: Select Area */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="guidedArea" className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center">
                2
              </span>
              <span>Select Area in Lahore</span>
            </label>
            <span className="text-xs text-neutral-400">Choose campus area or neighborhood</span>
          </div>

          <div className="space-y-2.5">
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                id="guidedArea"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full pl-10 pr-9 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer appearance-none shadow-sm"
              >
                <option value="All">All Lahore Student Areas ({areas.length} areas covered)</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-4 pointer-events-none text-neutral-400 text-xs">▼</div>
            </div>

            {/* Quick Area Chips for Major Student Corridors */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-neutral-400 text-[11px] font-medium mr-1">Quick select:</span>
              {['Johar Town', 'Garden Town', 'Muslim Town', 'Gulberg', 'Model Town', 'Faisal Town', 'Raiwind Road'].map(
                (quickName) => (
                  <button
                    key={quickName}
                    type="button"
                    onClick={() => setArea(quickName)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      area === quickName
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {quickName}
                  </button>
                )
              )}
              {area !== 'All' && (
                <button
                  type="button"
                  onClick={() => setArea('All')}
                  className="px-2 py-1 text-[11px] text-emerald-800 hover:underline font-medium cursor-pointer"
                >
                  Show All Areas
                </button>
              )}
            </div>
          </div>
        </div>

        {/* STEP 3: Select Budget */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center">
                3
              </span>
              <span>Select Monthly Budget</span>
            </label>
            <span className="text-xs text-neutral-500 font-medium">
              Active: {BUDGET_OPTIONS[budgetIndex].label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {BUDGET_OPTIONS.map((opt, idx) => {
              const isSelected = budgetIndex === idx;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setBudgetIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700 font-bold shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{opt.label}</div>
                  <div className="text-[11px] text-neutral-500 font-normal mt-0.5 line-clamp-1">
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Select Requirements */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center">
                4
              </span>
              <span>Select Requirements</span>
            </label>
            <span className="text-xs text-neutral-400">
              {activeReqCount === 0 ? 'Any facilities' : `${activeReqCount} requirement${activeReqCount > 1 ? 's' : ''} selected`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {/* Wi-Fi */}
            <button
              type="button"
              onClick={() => toggleReq('wifi')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.wifi
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.wifi ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Wifi className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Wi-Fi Internet</div>
            </button>

            {/* Mess */}
            <button
              type="button"
              onClick={() => toggleReq('mess')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.mess
                  ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.mess ? 'bg-amber-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Mess / Food</div>
            </button>

            {/* AC */}
            <button
              type="button"
              onClick={() => toggleReq('ac')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.ac
                  ? 'border-blue-700 bg-blue-50 text-blue-950 font-bold ring-1 ring-blue-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.ac ? 'bg-blue-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Air Conditioning (AC)</div>
            </button>

            {/* Furnished */}
            <button
              type="button"
              onClick={() => toggleReq('furnished')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.furnished
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.furnished ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <BedDouble className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Furnished Room</div>
            </button>

            {/* Attached Bathroom */}
            <button
              type="button"
              onClick={() => toggleReq('attachedBath')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.attachedBath
                  ? 'border-indigo-700 bg-indigo-50 text-indigo-950 font-bold ring-1 ring-indigo-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.attachedBath ? 'bg-indigo-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Bath className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Attached Bathroom</div>
            </button>

            {/* Parking */}
            <button
              type="button"
              onClick={() => toggleReq('parking')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.parking
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.parking ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Car className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Bike / Car Parking</div>
            </button>

            {/* Electricity Backup */}
            <button
              type="button"
              onClick={() => toggleReq('backup')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                requirements.backup
                  ? 'border-yellow-700 bg-yellow-50 text-yellow-950 font-bold ring-1 ring-yellow-700'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${requirements.backup ? 'bg-yellow-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold">Electricity Backup (UPS/Gen)</div>
            </button>
          </div>
        </div>

        {/* STEP 5: Find Hostels Action Button */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500">
            Matching <span className="font-bold text-neutral-900">{gender} Hostels</span> in{' '}
            <span className="font-bold text-neutral-900">{area === 'All' ? 'All Lahore' : area}</span>
            {budgetIndex > 0 ? ` (${BUDGET_OPTIONS[budgetIndex].label})` : ''}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {hasSearched && (
              <button
                type="button"
                onClick={onReset}
                className="py-3 px-4 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              className="flex-1 sm:flex-initial py-3.5 px-8 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-extrabold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Find Hostels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Popular Student Search Shortcuts */}
      <div className="bg-neutral-50 border-t border-neutral-200 px-6 py-4 sm:px-8 text-xs">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-neutral-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Popular Student Searches:</span>
          </span>

          <button
            type="button"
            onClick={() =>
              handleQuickPreset({
                gender: 'Boys',
                area: 'Johar Town',
                budgetMax: 20000,
                budgetLabel: 'PKR 12,000 – 18,000',
                reqs: { wifi: true, mess: true, ac: true },
              })
            }
            className="text-neutral-700 hover:text-emerald-800 underline underline-offset-2 font-medium cursor-pointer"
          >
            Boys in Johar Town (Near UMT)
          </button>

          <span className="text-neutral-300">·</span>

          <button
            type="button"
            onClick={() =>
              handleQuickPreset({
                gender: 'Girls',
                area: 'Garden Town',
                budgetMax: 25000,
                budgetLabel: 'PKR 18,000 – 25,000',
                reqs: { wifi: true, mess: true, attachedBath: true },
              })
            }
            className="text-neutral-700 hover:text-rose-800 underline underline-offset-2 font-medium cursor-pointer"
          >
            Girls in Garden Town (Near PU)
          </button>

          <span className="text-neutral-300">·</span>

          <button
            type="button"
            onClick={() =>
              handleQuickPreset({
                gender: 'Boys',
                area: 'Muslim Town',
                budgetMax: 15000,
                budgetLabel: 'Under PKR 12,000',
                reqs: { wifi: true, mess: true },
              })
            }
            className="text-neutral-700 hover:text-emerald-800 underline underline-offset-2 font-medium cursor-pointer"
          >
            Budget Boys Hostels in Muslim Town
          </button>
        </div>
      </div>
    </div>
  );
};
