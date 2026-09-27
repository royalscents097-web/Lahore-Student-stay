import React from 'react';
import { Search, GitCompare, PhoneCall, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Simple & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            How Lahore Student Stay Works
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            A real-data accommodation directory designed specifically for students and parents searching for reliable hostels in Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                1. Search & Filter by Campus
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Filter by Boys or Girls, exact Lahore area, monthly rent budget, and mandatory facilities like Mess, Attached Bathroom, UPS, or AC.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-500 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-700" />
              <span>Multi-attribute instant filtering</span>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                2. Check Factual Details & Audit Date
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Check our "Last checked" date, room capacities, security deposit requirements, and proximity distances to your university campus.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Zero fabricated reviews or fake badges</span>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                3. Contact Warden & Visit in Person
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Reach out directly via genuine verified WhatsApp or phone calls. Open Google Maps coordinates to inspect the room in person before paying.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-500 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct owner & warden contact numbers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
