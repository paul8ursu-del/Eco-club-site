import React, { useState, useEffect } from 'react';
import packagingImg from '../assets/images/happening_packaging_1791798591888.jpg';
import foodWasteImg from '../assets/images/happening_food_waste_1791798602476.jpg';
import gardenImg from '../assets/images/happening_garden_1791798613312.jpg';
import recruitingImg from '../assets/images/happening_recruiting_1791798623674.jpg';

export interface HappeningItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  layout: 'split' | 'centered' | 'banner';
  imageUrl?: string;
}

const DEFAULT_HAPPENING: HappeningItem[] = [
  {
    id: '1',
    tag: 'Campaign 01',
    title: 'Switching Canteen to Recycled Packaging',
    description: 'Replacing single-use plastics with compostable bagasse containers and reusable bamboo cutlery trays.',
    image: packagingImg
  },
  {
    id: '2',
    tag: 'Campaign 02',
    title: 'Reducing Food Waste',
    description: 'Daily plate waste weighing and portion optimization audits during Thursday lunchtime in room d4.',
    image: foodWasteImg
  },
  {
    id: '3',
    tag: 'Campaign 03',
    title: 'Adding an Eco Garden',
    description: 'Constructing raised herb and pollinator planters outside the courtyard to supply organic campus herbs.',
    image: gardenImg
  },
  {
    id: '4',
    tag: 'Campaign 04',
    title: 'Recruiting New Members',
    description: 'Welcoming students (Year 7-13), TAs, and teachers to join our weekly Thursday lunchtime meetings.',
    image: recruitingImg
  }
];

const HAPPENING_KEY = 'ecoclub_happening_items';
const SECTIONS_KEY = 'ecoclub_custom_sections';

export const getHappeningItems = (): HappeningItem[] => {
  const saved = localStorage.getItem(HAPPENING_KEY);
  if (!saved) return DEFAULT_HAPPENING;
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_HAPPENING;
  }
};

export const saveHappeningItems = (items: HappeningItem[]) => {
  localStorage.setItem(HAPPENING_KEY, JSON.stringify(items));
};

export const getCustomSections = (): CustomSection[] => {
  const saved = localStorage.getItem(SECTIONS_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const saveCustomSections = (sections: CustomSection[]) => {
  localStorage.setItem(SECTIONS_KEY, JSON.stringify(sections));
};

export const HappeningNowGrid: React.FC = () => {
  const [items, setItems] = useState<HappeningItem[]>(DEFAULT_HAPPENING);

  useEffect(() => {
    setItems(getHappeningItems());
    const handleStorage = () => setItems(getHappeningItems());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('happening_updated', handleStorage as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('happening_updated', handleStorage as EventListener);
    };
  }, []);

  return (
    <section className="py-16 bg-emerald-950 text-white border-y border-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Happening Now · d4 Thursday Lunchtime
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-16/9 w-full bg-emerald-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
