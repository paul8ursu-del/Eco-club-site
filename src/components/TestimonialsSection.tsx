import React from 'react';
import { TESTIMONIALS, CLUB_FAQ } from '../data/clubData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="impact" className="py-20 md:py-28 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Attributable Field Reports / Testimonials */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Documented Field Impact
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Real outcomes from student-driven stewardship.
          </h2>
          <p className="text-stone-600 mt-3 text-base">
            Every initiative is anchored by student leaders combining academic discipline with physical fieldwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200/90 flex flex-col justify-between"
            >
              <blockquote className="text-stone-700 text-sm leading-relaxed mb-6">
                “{t.quote}”
              </blockquote>
              <div className="pt-4 border-t border-stone-100">
                <div className="font-bold text-stone-900 text-sm">{t.author}</div>
                <div className="text-xs text-stone-500">{t.role}</div>
                <div className="text-xs font-semibold text-emerald-800 mt-1">{t.pod}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Club FAQ Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-stone-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-stone-600 mt-1">
              Everything you need to know about joining and volunteering with Eco Club.
            </p>
          </div>

          <div className="space-y-4">
            {CLUB_FAQ.map((faq, idx) => (
              <div
                key={idx}
                className="bg-stone-50/70 rounded-xl p-6 border border-stone-200/70"
              >
                <h4 className="font-bold text-stone-900 text-sm mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
