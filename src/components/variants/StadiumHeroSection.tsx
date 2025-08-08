// StadiumHeroSection.tsx - Kompatibilitäts-Wrapper für bestehende Stadium-Komponente
import React from 'react';
import { HeroSection, HeroSectionProps } from '../base/HeroSection';

/**
 * StadiumHeroSection - Wrapper für die neue Unified HeroSection
 * Bietet Rückwärtskompatibilität für bestehenden Code
 */
export const StadiumHeroSection: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => {
  return (
    <HeroSection
      {...props}
      variant="stadium"
      theme="sport"
      animations={true}
      enableParallax={false}
      performance="standard"
    />
  );
};

export default StadiumHeroSection;