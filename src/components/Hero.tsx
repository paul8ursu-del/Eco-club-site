import React from 'react';
import { ArrowRight, Leaf, Sprout, ShieldCheck } from 'lucide-react';
import { heroImg } from '../data/clubData';

interface HeroProps {
  onJoinClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExploreClick }) => {
  return (
    <section id="top" className="relative pt-10 pb-16 md:pt-16 md:pb-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top editorial headline and value proposition */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-3">
            Campus & Community Environmental Collective
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08] mb-6 text-balance">
            Hands-on ecology for our campus and river basin.
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
            We turn environmental anxiety into tangible local restoration. Join 340+ students and community members rewilding native habitats, mending worn gear at repair cafés, and diverting tons of food waste into organic campus soil.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onJoinClick}
              type="button"
              className="px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 whitespace-nowrap"
            >
              Become a Member
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreClick}
              type="button"
              className="px-5 py-3 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300/80 cursor-pointer whitespace-nowrap"
            >
              Explore Initiatives
            </button>
          </div>
        </div>

        {/* Hero Marquee Visual Asset with Scrim and Crisp Detail */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-16/9 md:aspect-21/9 max-h-[520px] bg-stone-100">
          <img
            src={heroImg}
            alt="Eco Club student volunteers working collaboratively in a sunlit university greenhouse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

          {/* Contextual image caption / editorial proof */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col md:flex-row md:items-end justify-between gap-3 text-white pointer-events-auto">
            <div>
              <p className="text-xs font-semibold text-emerald-300 tracking-wide">
                Campus Greenhouse & Heritage Seed Nursery
              </p>
              <p className="text-sm md:text-base font-medium text-stone-100">
                Weekly community morning tending to heirloom seedlings and organic raised beds.
              </p>
            </div>
            <div className="text-xs text-stone-300 whitespace-nowrap">
              Every Tuesday & Saturday · Open to all students
            </div>
          </div>
        </div>

        {/* Full-width Quantitative Proof Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-stone-200">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-stone-900 tabular-nums">
              1,420
            </div>
            <div className="text-xs font-medium text-stone-500 mt-1">
              Native saplings planted along Mill Creek watershed
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-stone-900 tabular-nums">
              4.8 tons
            </div>
            <div className="text-xs font-medium text-stone-500 mt-1">
              Organic kitchen prep waste diverted to campus soil
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-stone-900 tabular-nums">
              620+
            </div>
            <div className="text-xs font-medium text-stone-500 mt-1">
              Bicycles and devices mended at Repair Cafés
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-stone-900 tabular-nums">
              340
            </div>
            <div className="text-xs font-medium text-stone-500 mt-1">
              Active student and faculty volunteers across 5 pods
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
