import React from 'react';
import { EcoClubLogo } from './EcoClubLogo';

interface NavbarProps {
  onJoinClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Authentic Eco Club & Windsor High School Logo */}
        <a
          href="#top"
          className="flex items-center gap-3.5 group hover:opacity-95 transition-opacity"
        >
          <EcoClubLogo size="md" />
          <div className="hidden sm:block border-l border-stone-300 pl-3.5 py-0.5 text-left">
            <div className="text-[13px] font-bold tracking-tight text-stone-900 leading-tight">
              Windsor High School
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 tracking-wider uppercase font-mono">
              &amp; Sixth Form
            </div>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#membership"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Sign Up
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onJoinClick}
            type="button"
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Join Eco Club
          </button>
        </div>
      </div>
    </header>
  );
};
