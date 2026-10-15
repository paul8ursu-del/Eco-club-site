import React from 'react';
import { Shield } from 'lucide-react';
import { EcoClubLogo } from './EcoClubLogo';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & mission */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3 bg-white/95 rounded-xl px-4 py-2 w-fit">
              <EcoClubLogo size="sm" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">
                Windsor High School and Sixth Form
              </span>
              <span className="text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider block">
                Official Eco Club
              </span>
            </div>
            <p className="text-xs md:text-sm text-stone-400 leading-relaxed max-w-lg">
              Dedicated to reducing school canteen food waste, switching to eco-friendly recycled packaging, planting school eco gardens, and recruiting new student &amp; teacher members.
            </p>
            <div className="text-xs text-emerald-400 font-mono pt-1">
              Meeting Details: Room d4 · Thursday Lunchtime
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-left md:text-right flex flex-col md:items-end">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Contact &amp; Committee
            </span>
            <div className="text-xs text-stone-400">
              Email: <a href="mailto:windsorecoclub@gmail.com" className="text-emerald-400 hover:underline">windsorecoclub@gmail.com</a>
            </div>
            <div className="text-xs text-stone-500">
              Windsor High School, Richmond Street, Halesowen
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* Quiet copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Windsor High School and Sixth Form Eco Club. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Room d4 · Thursday Lunchtime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
