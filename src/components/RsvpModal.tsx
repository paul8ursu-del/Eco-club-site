import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Download, Ticket } from 'lucide-react';
import { ClubEvent } from '../types';

interface RsvpModalProps {
  event: ClubEvent | null;
  onClose: () => void;
  onConfirmed: (eventId: string) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ event, onClose, onConfirmed }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const generatedId = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setConfirmed(true);
    onConfirmed(event.id);
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Eco Club//Event Pass//EN
BEGIN:VEVENT
SUMMARY:${event.title} - Eco Club
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-rsvp-pass.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold text-emerald-800">
              RSVP Confirmation
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              {confirmed ? 'Action Pass Issued' : 'Reserve Volunteer Spot'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!confirmed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 text-xs space-y-2">
                <div className="font-bold text-stone-900 text-sm">{event.title}</div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{event.dateStr} · {event.timeStr}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{event.location}</span>
                </div>
                <div className="text-stone-500 pt-1">
                  Provided on-site: {event.gearProvided}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Dietary / Accessibility Needs (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gluten-free snack, glove size M"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Confirm My Spot
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-700" />
                <span>You are registered! See you in the field.</span>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-stone-900 text-white rounded-xl p-5 border border-stone-800 font-mono relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] tracking-widest text-emerald-400 uppercase block">
                      Eco Club Action Pass
                    </span>
                    <span className="text-xs font-bold text-white">{event.category} Event</span>
                  </div>
                  <Ticket className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="text-sm font-bold text-white mb-2">{event.title}</div>
                <div className="text-xs text-stone-300 space-y-1">
                  <div>{event.dateStr} · {event.timeStr}</div>
                  <div>{event.location}</div>
                  <div className="text-stone-400 pt-1">Volunteer: {fullName}</div>
                  <div className="text-emerald-400 text-xs font-bold pt-1">Pass ID: {ticketId}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadIcs}
                  type="button"
                  className="flex-1 py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Add to Calendar (.ics)
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="py-2 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
