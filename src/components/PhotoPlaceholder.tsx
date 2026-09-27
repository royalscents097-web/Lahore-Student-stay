import React from 'react';
import { CameraOff, Building2 } from 'lucide-react';

interface PhotoPlaceholderProps {
  hostelName: string;
  gender: 'Boys' | 'Girls';
  area: string;
  category?: string;
  aspect?: 'card' | 'gallery' | 'thumb';
}

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  hostelName,
  gender,
  area,
  category,
  aspect = 'card',
}) => {
  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-neutral-100 via-neutral-200/80 to-neutral-300 flex flex-col items-center justify-center p-4 text-center select-none border border-neutral-200 overflow-hidden ${
        aspect === 'gallery' ? 'aspect-[16/9]' : aspect === 'thumb' ? 'aspect-square' : 'aspect-[16/10]'
      }`}
    >
      {/* Subtle architectural background texture pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, #f5f5f5 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[85%]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm border border-neutral-200 flex items-center justify-center text-neutral-400 mb-2.5">
          <CameraOff className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400" />
        </div>

        <span className="text-xs sm:text-sm font-bold text-neutral-800 tracking-tight">
          Photo not available
        </span>

        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1 max-w-full">
          {category ? `${category} photo not verified` : 'Pending physical photo audit'}
        </p>

        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-200/90 text-neutral-700">
          <Building2 className="w-3 h-3 text-neutral-500" />
          <span className="truncate max-w-[160px]">{area} · {gender}</span>
        </div>
      </div>
    </div>
  );
};
