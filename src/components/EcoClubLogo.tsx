import React from 'react';
import logoImg from '../assets/images/eco_club_logo.svg';

interface EcoClubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EcoClubLogo: React.FC<EcoClubLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass =
    size === 'sm' ? 'h-9' : size === 'lg' ? 'h-16' : size === 'xl' ? 'h-24' : 'h-12';

  return (
    <img
      src={logoImg}
      alt="Windsor High School &amp; Sixth Form Eco Club Logo"
      className={`${heightClass} w-auto object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};
