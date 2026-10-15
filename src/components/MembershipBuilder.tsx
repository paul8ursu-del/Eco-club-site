import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export const MembershipBuilder: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studyYear, setStudyYear] = useState('Year 9');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const existing = JSON.parse(localStorage.getItem('ecoclub_signups') || '[]');
    const newEntry = { fullName, email, studyYear, timestamp: new Date().toLocaleString() };
    localStorage.setItem('ecoclub_signups', JSON.stringify([newEntry, ...existing]));

    setSubmitted(true);
  };

  return (
    <section id="membership" className="py-16 bg-[#FAFAF7]">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200/90 shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Eco Club Sign Up
            </span>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Sign Up for Thursday Lunchtime in d4
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Sign up instantly and join our weekly meetings in room d4.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Successfully Signed Up!</h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Thank you, <strong>{fullName}</strong> ({studyYear}). Your sign-up has been successfully recorded. See you this Thursday lunchtime in room d4!
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors shadow-xs"
                >
                  Sign Up Another Member
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@windsorhighschool.org.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Role / Year Group
                </label>
                <select
                  value={studyYear}
                  onChange={(e) => setStudyYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-emerald-800 bg-white text-stone-900"
                >
                  <option value="Year 7">Year 7</option>
                  <option value="Year 8">Year 8</option>
                  <option value="Year 9">Year 9</option>
                  <option value="Year 10">Year 10</option>
                  <option value="Year 11">Year 11</option>
                  <option value="Year 12">Year 12</option>
                  <option value="Year 13">Year 13</option>
                  <option value="Teacher Assistant">Teacher Assistant</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>

              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-bold text-stone-900">Meeting Details</div>
                <div>Location: <strong className="text-emerald-900">d4</strong></div>
                <div>Time: <strong className="text-emerald-900">Thursday lunchtime</strong></div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Sign Up for Eco Club
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
