import React, { useState } from 'react';
import { VOLUNTEER_ROLES } from '../data/clubData';
import { CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { VolunteerRole } from '../types';

interface GetInvolvedSectionProps {
  onSelectPodForMembership: (podName: string) => void;
}

export const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ onSelectPodForMembership }) => {
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('General Membership');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Volunteer role modal/application state
  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantApplied, setApplicantApplied] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setApplicantApplied(true);
  };

  return (
    <section id="get-involved" className="py-20 md:py-28 bg-[#FAFAF7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Get Involved & Take Action
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            How to become a member, volunteer, and reduce canteen food waste.
          </h2>
          <p className="text-stone-600 mt-3 text-base">
            Join us every Thursday lunchtime in room d4 to help reduce canteen food waste, transition to eco-friendly packaging, and recruit new members.
          </p>
        </div>

        {/* 1. Membership Guide Subsection */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200/90 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Weekly Club Meetings
              </span>
              <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
                Join Us in Room d4 on Thursday Lunchtime
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Eco Club is open to all students (Year 7 through 13), teacher assistants, and teachers. We meet weekly to organize canteen food waste audits, test eco-friendly packaging, and welcome new members.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70">
                  <div className="text-emerald-800 font-bold font-mono text-sm mb-1">01. Meet</div>
                  <div className="text-xs text-stone-600">Gather in room d4 every Thursday lunchtime.</div>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70">
                  <div className="text-emerald-800 font-bold font-mono text-sm mb-1">02. Reduce</div>
                  <div className="text-xs text-stone-600">Plan canteen food waste reduction & packaging campaigns.</div>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70">
                  <div className="text-emerald-800 font-bold font-mono text-sm mb-1">03. Recruit</div>
                  <div className="text-xs text-stone-600">Help sign up new members across the school.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900 text-white rounded-xl p-6 md:p-8 space-y-4">
              <h4 className="font-bold text-base text-white">Ready to join?</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Sign up directly using our member registration form below.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('membership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Go to Club Sign Up
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Volunteer Opportunities Subsection */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Action Roles
              </span>
              <h3 className="text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Volunteer Opportunities
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Get involved with our canteen food waste and eco-packaging projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOLUNTEER_ROLES.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-stone-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-emerald-800">{role.pod}</span>
                    <span className="text-stone-500 font-mono">{role.spotsAvailable} spots open</span>
                  </div>

                  <h4 className="text-lg font-bold text-stone-900 mb-2">{role.title}</h4>
                  <div className="text-xs font-medium text-stone-700 bg-stone-50 p-2 rounded-md mb-3">
                    Cadence: {role.commitment}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {role.skillsNeeded.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRole(role)}
                  type="button"
                  className="w-full py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-emerald-800 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Apply for Role
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Contact Form Subsection */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-stone-200/90 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Direct Inquiries
            </span>
            <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
              Contact the Eco Club Committee
            </h3>
            <p className="text-xs md:text-sm text-stone-600 mt-2">
              Have questions about our canteen food waste reduction or eco-packaging campaigns? Send us a message!
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">Message Sent Successfully!</h4>
              <p className="text-xs text-emerald-900">
                Thank you, {contactName}. A member of our committee has received your inquiry at {contactEmail}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                  setContactName('');
                  setContactEmail('');
                  setContactMessage('');
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samira Khan"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={contactCategory}
                  onChange={(e) => setContactCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                >
                  <option value="General Membership">General Membership Inquiry</option>
                  <option value="Canteen Food Waste">Canteen Food Waste Reduction</option>
                  <option value="Eco-Friendly Packaging">Eco-Friendly Packaging Campaign</option>
                  <option value="Member Recruitment">Member Recruitment Drive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you get involved in our Thursday lunchtime meetings in d4?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry to Committee
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Volunteer Role Application Modal */}
      {selectedRole && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
          onClick={() => setSelectedRole(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 border border-stone-200 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-emerald-800">{selectedRole.pod}</span>
                <h4 className="text-lg font-bold text-stone-900">{selectedRole.title}</h4>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedRole.description}
            </p>

            {applicantApplied ? (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <div className="font-bold text-emerald-950 text-sm">Application Received!</div>
                <p className="text-xs text-emerald-900">
                  Thanks {applicantName}! We will see you this Thursday lunchtime in room d4.
                </p>
                <button
                  onClick={() => {
                    setSelectedRole(null);
                    setApplicantApplied(false);
                    setApplicantName('');
                    setApplicantEmail('');
                  }}
                  className="mt-2 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    School Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@school.edu"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg cursor-pointer shadow-xs"
                  >
                    Apply for Role
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
