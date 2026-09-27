import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { AreaItem } from '../types';

interface PopularAreasProps {
  areas: AreaItem[];
  selectedArea: string;
  onSelectArea: (areaName: string) => void;
}

export const PopularAreas: React.FC<PopularAreasProps> = ({
  areas,
  selectedArea,
  onSelectArea,
}) => {
  const topAreas = [
    { name: 'Johar Town', note: 'Near UMT & UCP campus hub' },
    { name: 'Muslim Town', note: 'Near PU New Campus & Wahdat Road' },
    { name: 'Garden Town', note: 'Barkat Market student commercial center' },
    { name: 'Gulberg', note: 'Near FCCU & Jail Road colleges' },
    { name: 'Raiwind Road', note: 'Orange Line corridor & UOL / Superior' },
    { name: 'Defence Road', note: 'Directly opposite UOL & COMSATS' },
    { name: 'Faisal Town', note: 'Adjacent to FAST-NUCES campus' },
    { name: 'DHA', note: 'Near LUMS & Cantt institutions' },
  ];

  return (
    <section className="py-12 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Campus Neighborhoods
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Popular Student Accommodation Hubs
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Browse student hostels organized by Lahore's primary university corridors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {topAreas.map((item) => {
            const isSelected = selectedArea === item.name;
            const areaData = areas.find((a) => a.name.toLowerCase() === item.name.toLowerCase());
            const count = areaData?.hostel_count;

            return (
              <button
                key={item.name}
                onClick={() => onSelectArea(isSelected ? 'All' : item.name)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
                    : 'bg-white border-neutral-200 hover:border-emerald-600 hover:shadow-sm text-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin
                    className={`w-4 h-4 ${
                      isSelected ? 'text-emerald-400' : 'text-emerald-800 group-hover:scale-110 transition-transform'
                    }`}
                  />
                  {count !== undefined && count > 0 && (
                    <span
                      className={`text-xs font-semibold tabular-nums px-2 py-0.5 rounded ${
                        isSelected ? 'bg-neutral-800 text-emerald-300' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {count} {count === 1 ? 'hostel' : 'hostels'}
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm sm:text-base leading-snug">{item.name}</div>
                <div
                  className={`text-[11px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {item.note}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
