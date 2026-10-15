import React from 'react';
import { motion } from 'motion/react';

interface HappeningNowItem {
  title: string;
  description: string;
  tag: string;
}

const HAPPENING_ITEMS: HappeningNowItem[] = [
  {
    tag: 'Campaign 01',
    title: 'Switching Canteen to Recycled Packaging',
    description: 'Replacing single-use plastics with compostable bagasse containers and reusable bamboo cutlery trays.'
  },
  {
    tag: 'Campaign 02',
    title: 'Reducing Food Waste',
    description: 'Daily plate waste weighing and portion optimization audits during Thursday lunchtime in room d4.'
  },
  {
    tag: 'Campaign 03',
    title: 'Adding an Eco Garden',
    description: 'Constructing raised herb and pollinator planters outside the courtyard to supply organic campus herbs.'
  },
  {
    tag: 'Campaign 04',
    title: 'Recruiting New Members',
    description: 'Welcoming students (Year 7-13), TAs, and teachers to join our weekly Thursday lunchtime meetings.'
  }
];

export const HappeningNowTicker: React.FC = () => {
  return (
    <section className="py-8 bg-emerald-950 text-white overflow-hidden border-y border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            Happening Now · d4 Thursday Lunchtime
          </span>
        </div>
        <span className="text-xs text-emerald-400/80 font-mono">Swipe or scroll →</span>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 pb-2 no-scrollbar scroll-smooth">
        {HAPPENING_ITEMS.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] sm:min-w-[360px] bg-emerald-900/60 border border-emerald-800/80 rounded-xl p-5 flex flex-col justify-between shrink-0 shadow-xs"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 block mb-1">
                {item.tag}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-emerald-200/90 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
