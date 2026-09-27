import React, { useState } from 'react';
import { ShieldCheck, Menu, X, PlusCircle, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentCategory: 'All' | 'Boys' | 'Girls';
  onSelectCategory: (cat: 'All' | 'Boys' | 'Girls') => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSubmit,
  onOpenAdmin,
  compareCount,
  onOpenCompare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-emerald-800 transition-colors">
                Lahore Student Stay
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <button
              onClick={() => onSelectCategory('All')}
              className={`hover:text-neutral-900 transition-colors cursor-pointer ${
                currentCategory === 'All' ? 'text-neutral-900 font-semibold border-b-2 border-emerald-700 pb-1' : ''
              }`}
            >
              All Hostels
            </button>
            <button
              onClick={() => onSelectCategory('Boys')}
              className={`hover:text-neutral-900 transition-colors cursor-pointer ${
                currentCategory === 'Boys' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-1' : ''
              }`}
            >
              Boys Hostels
            </button>
            <button
              onClick={() => onSelectCategory('Girls')}
              className={`hover:text-neutral-900 transition-colors cursor-pointer ${
                currentCategory === 'Girls' ? 'text-rose-800 font-semibold border-b-2 border-rose-700 pb-1' : ''
              }`}
            >
              Girls Hostels
            </button>
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
              >
                <span>Compare</span>
                <span className="px-1.5 py-0.2 text-xs bg-emerald-100 text-emerald-800 rounded font-semibold tabular-nums">
                  {compareCount}
                </span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSubmit}
              className="px-3.5 py-2 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-neutral-700" />
              <span>List Your Hostel</span>
            </button>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="px-2.5 py-1 text-xs bg-emerald-100 text-emerald-800 rounded font-semibold cursor-pointer"
              >
                Compare ({compareCount})
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-3 gap-2 pb-2 border-b border-neutral-100 text-center">
            <button
              onClick={() => {
                onSelectCategory('All');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-medium rounded-md ${
                currentCategory === 'All' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                onSelectCategory('Boys');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-medium rounded-md ${
                currentCategory === 'Boys' ? 'bg-emerald-800 text-white' : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              Boys Hostels
            </button>
            <button
              onClick={() => {
                onSelectCategory('Girls');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-medium rounded-md ${
                currentCategory === 'Girls' ? 'bg-rose-800 text-white' : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              Girls Hostels
            </button>
          </div>

          <button
            onClick={() => {
              onOpenSubmit();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>List Your Hostel (Pending Review)</span>
          </button>

          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-md flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-neutral-700" />
            <span>Admin Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
