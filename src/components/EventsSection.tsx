import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Check } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/clubData';
import { ClubEvent } from '../types';
import { RsvpModal } from './RsvpModal';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<ClubEvent[]>(UPCOMING_EVENTS);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<ClubEvent | null>(null);
  const [userRsvpdIds, setUserRsvpdIds] = useState<string[]>([]);

  const filteredEvents = events.filter((evt) => {
    if (categoryFilter === 'all') return true;
    return evt.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const handleConfirmedRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? { ...evt, rsvpCount: Math.min(evt.capacity, evt.rsvpCount + 1) }
          : evt
      )
    );
    setUserRsvpdIds((prev) => [...prev, eventId]);
  };

  return (
    <section id="events" className="py-20 md:py-28 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
              Action Days & Work Parties
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
              Roll up your sleeves with us this month.
            </h2>
            <p className="text-stone-600 mt-3 text-base">
              All tools, work gloves, and local guidance are provided free of charge. No ongoing commitment required—show up for a single morning or lead a project.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start md:self-end">
            {['all', 'Fieldwork', 'Workshop', 'Advocacy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  categoryFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'All Gatherings' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const isFull = evt.rsvpCount >= evt.capacity;
            const hasRsvpd = userRsvpdIds.includes(evt.id);

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200/90 hover:border-stone-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-emerald-800">{evt.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-mono">{evt.timeStr}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums text-stone-700">
                      {evt.capacity - evt.rsvpCount} spots remaining
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2 tracking-tight">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                    <div className="flex items-center gap-2 font-medium text-stone-800">
                      <Calendar className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span>{evt.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200/70 mb-6">
                    <strong className="text-stone-700">What we provide:</strong> {evt.gearProvided}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono tabular-nums">
                    <Users className="w-4 h-4 text-stone-400" />
                    <span>{evt.rsvpCount} / {evt.capacity} signed up</span>
                  </div>

                  {hasRsvpd ? (
                    <span className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg inline-flex items-center gap-1.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> RSVP Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveRsvpEvent(evt)}
                      disabled={isFull}
                      type="button"
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs ${
                        isFull
                          ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                      }`}
                    >
                      {isFull ? 'Waitlist Full' : 'RSVP Free Spot'}
                      {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RsvpModal
        event={activeRsvpEvent}
        onClose={() => setActiveRsvpEvent(null)}
        onConfirmed={handleConfirmedRsvp}
      />
    </section>
  );
};
