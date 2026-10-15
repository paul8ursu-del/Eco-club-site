import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { INITIATIVES } from '../data/clubData';
import { Initiative } from '../types';
import { InitiativeModal } from './InitiativeModal';

interface InitiativesSectionProps {
  onSelectPodForMembership: (podTitle: string) => void;
}

export const InitiativesSection: React.FC<InitiativesSectionProps> = ({
  onSelectPodForMembership
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

  const filtered = INITIATIVES.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'rewilding') return item.category === 'Rewilding';
    if (filter === 'circular') return item.category === 'Circular';
    return true;
  });

  return (
    <section id="initiatives" className="py-20 md:py-28 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
              Action Pods & Working Groups
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
              Measurable ecological work, led by student teams.
            </h2>
            <p className="text-stone-600 mt-3 text-base">
              Every Eco Club initiative is organized around self-governing student pods with scheduled field sessions, dedicated faculty mentorship, and verifiable targets.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons) */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Pods ({INITIATIVES.length})
            </button>
            <button
              onClick={() => setFilter('rewilding')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'rewilding'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rewilding & Habitats
            </button>
            <button
              onClick={() => setFilter('circular')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'circular'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Circular & Zero-Waste
            </button>
          </div>
        </div>

        {/* Bento Grid: 2 Marquee Cards + 2 Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((init) => (
            <article
              key={init.id}
              onClick={() => setSelectedInitiative(init)}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Asset Container with Fallback */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={init.image}
                    alt={init.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-mono px-2.5 py-1 rounded">
                    Pod {init.number}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-emerald-800">{init.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{init.meetingTime}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight mb-3 group-hover:text-emerald-900 transition-colors">
                    {init.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {init.shortDesc}
                  </p>

                  <div className="text-xs font-semibold text-emerald-900/90 pt-3 border-t border-stone-100">
                    {init.impactMetric}
                  </div>
                </div>
              </div>

              {/* Card Footer with explicit affordance */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-emerald-800">
                <span>View pod roadmap & volunteer roles</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <InitiativeModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onVolunteer={(init) => {
          onSelectPodForMembership(init.title);
          const el = document.getElementById('membership');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </section>
  );
};
