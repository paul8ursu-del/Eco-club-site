import React, { useState, useEffect } from 'react';
import { CustomSection, getCustomSections, saveCustomSections } from './HappeningNowGrid';

export const CustomSectionsRenderer: React.FC = () => {
  const [sections, setSections] = useState<CustomSection[]>([]);

  useEffect(() => {
    setSections(getCustomSections());
    const handleStorage = () => setSections(getCustomSections());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sections_updated', handleStorage as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sections_updated', handleStorage as EventListener);
    };
  }, []);

  if (sections.length === 0) return null;

  return (
    <div className="w-full">
      {sections.map((sec) => {
        return (
          <section
            key={sec.id}
            className={`py-16 px-6 border-b border-stone-200 ${sec.bgColor || 'bg-white'}`}
          >
            <div className="max-w-6xl mx-auto">
              {sec.layout === 'centered' && (
                <div className="max-w-2xl mx-auto text-center space-y-4">
                  <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">{sec.title}</h2>
                  <p className="text-stone-600 text-sm md:text-base whitespace-pre-line leading-relaxed">
                    {sec.content}
                  </p>
                  {sec.imageUrl && (
                    <div className="mt-6 aspect-video rounded-xl overflow-hidden border border-stone-200 shadow-xs">
                      <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {sec.layout === 'split' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">{sec.title}</h2>
                    <p className="text-stone-600 text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                  {sec.imageUrl ? (
                    <div className="aspect-video rounded-xl overflow-hidden border border-stone-200 shadow-xs">
                      <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="bg-stone-100 rounded-xl p-8 text-center text-xs text-stone-400">
                      No Image Attached
                    </div>
                  )}
                </div>
              )}

              {sec.layout === 'banner' && (
                <div className="rounded-2xl p-8 md:p-12 text-white bg-emerald-900 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{sec.title}</h2>
                    <p className="text-xs md:text-sm text-emerald-100 whitespace-pre-line leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                  {sec.imageUrl && (
                    <div className="w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-emerald-800">
                      <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};
