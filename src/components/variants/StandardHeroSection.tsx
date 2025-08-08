// StandardHeroSection.tsx - Kompatibilitäts-Wrapper für bestehende Standard-Komponente
import React from 'react';
import { HeroSection, HeroSectionProps } from '../base/HeroSection';

/**
 * Standard HeroSection - Wrapper für die neue Unified HeroSection
 * Bietet Rückwärtskompatibilität für bestehenden Code
 */
export const StandardHeroSection: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => {
  return (
    <HeroSection
      {...props}
      variant="standard"
      theme="neon"
      animations={true}
      enableParallax={false}
      performance="standard"
    />
  );
};

// Alias für bestehenden HeroSection Import
export { StandardHeroSection as HeroSection };

export default StandardHeroSection;