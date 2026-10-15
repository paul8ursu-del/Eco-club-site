import React from 'react';
import { X, Calendar, MapPin, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Initiative } from '../types';

interface InitiativeModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onVolunteer: (initiative: Initiative) => void;
}

export const InitiativeModal: React.FC<InitiativeModalProps> = ({
  initiative,
  onClose,
  onVolunteer
}) => {
  if (!initiative) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
          <img
            src={initiative.image}
            alt={initiative.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white drop-shadow-sm">
            <span className="text-xs font-semibold text-emerald-300">
              Pod {initiative.number} · {initiative.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold">{initiative.title}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-sm font-semibold text-emerald-800">
            {initiative.impactMetric}
          </div>

          <p className="text-stone-700 leading-relaxed text-sm md:text-base">
            {initiative.fullDesc}
          </p>

          {/* Logistics & Pod Meeting Schedule */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/80 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-stone-500 uppercase">
              Pod Schedule & Logistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-stone-900">Meeting Cadence</span>
                  <span>{initiative.meetingTime}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-stone-900">Meeting Point</span>
                  <span>{initiative.meetingPlace}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center gap-2 text-xs text-stone-600">
              <User className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>
                Led by <strong className="text-stone-900">{initiative.leadName}</strong> ({initiative.leadRole})
              </span>
            </div>
          </div>

          {/* Hands-on Tasks */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-3">
              What Volunteers Do in this Pod
            </h4>
            <ul className="space-y-2">
              {initiative.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Back to Initiatives
            </button>
            <button
              onClick={() => {
                onVolunteer(initiative);
                onClose();
              }}
              type="button"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              Volunteer for this Pod
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
