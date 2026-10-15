/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EcoClubLogo } from './components/EcoClubLogo';
import { HappeningNowGrid } from './components/HappeningNowGrid';
import { CustomSectionsRenderer } from './components/CustomSectionsRenderer';
import { MembershipBuilder } from './components/MembershipBuilder';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';

export default function App() {
  const [view, setView] = useState<'home' | 'admin'>('home');

  const scrollToMembership = () => {
    setView('home');
    setTimeout(() => {
      const element = document.getElementById('membership');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  if (view === 'admin') {
    return <AdminPage onBackToHome={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-stone-900">
      <Navbar onJoinClick={scrollToMembership} />
      <HappeningNowGrid />
      
      <main className="flex-1 flex flex-col justify-center py-12 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-6">
          <div className="flex justify-center mb-3">
            <EcoClubLogo size="xl" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase block">
            Windsor High School &amp; Sixth Form · Eco Club · d4 Thursday Lunchtime
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Reducing canteen food waste &amp; eco-friendly packaging.
          </h1>
          <p className="text-stone-600 text-sm md:text-base">
            Join us every Thursday lunchtime in room d4. Sign up below to join our school eco club.
          </p>
        </div>

        <MembershipBuilder />
      </main>

      <CustomSectionsRenderer />

      <Footer onOpenAdmin={() => setView('admin')} />
    </div>
  );
}
