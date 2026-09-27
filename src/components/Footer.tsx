import React from 'react';
import { ShieldCheck, Heart, MapPin, ExternalLink, Activity } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: 'All' | 'Boys' | 'Girls') => void;
  onSelectArea: (area: string) => void;
  onOpenAdmin: () => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectArea,
  onOpenAdmin,
  onOpenSubmit,
}) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <span className="text-lg font-bold text-white tracking-tight block">
              Lahore Student Stay
            </span>
            <p className="text-neutral-400 leading-relaxed">
              Find the right student hostel in Lahore. A real-data directory connecting students to verified accommodation across Lahore's university belts.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[11px] font-semibold rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Fake Data Policy</span>
              </span>
            </div>
          </div>

          {/* Categories & Campus Hubs */}
          <div className="space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Accommodations
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('Boys')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Boys Hostels Lahore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Girls')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Girls Hostels Lahore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Johar Town')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hostels near UMT & UCP (Johar Town)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Muslim Town')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hostels near PU New Campus (Muslim Town)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Defence Road')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hostels near UOL & COMSATS (Defence Road)
                </button>
              </li>
            </ul>
          </div>

          {/* Lahore Key Areas */}
          <div className="space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Key Student Areas
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectArea('Garden Town')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Garden Town & Barkat Market
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Faisal Town')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Faisal Town (FAST University)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Gulberg')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gulberg & FCCU Zone
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Raiwind Road')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Raiwind Road & Ali Town
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArea('Anarkali')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Anarkali (KEMU & Old Campus)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Legal */}
          <div className="space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Platform & Verification
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-white transition-colors cursor-pointer text-emerald-400 font-medium"
                >
                  + List Your Lahore Hostel
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Administrative Database Console
                </button>
              </li>
              <li>
                <a
                  href="/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>API Health Check</span>
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Sitemap XML</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-2">
          <p>
            <strong>Disclaimer:</strong> Lahore Student Stay operates as an informational directory. All rents, security deposits, room capacities, and mess rules are verified directly from warden public disclosures and on-site visits. Students and guardians are strongly advised to inspect hostel premises and verify room agreement terms before paying deposits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-neutral-400">
            <span>
              © {new Date().getFullYear()} Lahore Student Stay. Built for Lahore student community.
            </span>
            <span>Real data · No fabricated rankings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
