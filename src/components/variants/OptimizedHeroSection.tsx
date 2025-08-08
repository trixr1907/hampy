// OptimizedHeroSection.tsx - Kompatibilitäts-Wrapper für bestehende Optimized-Komponente
import React from 'react';
import { HeroSection, HeroSectionProps } from '../base/HeroSection';

/**
 * OptimizedHeroSection - Wrapper für die neue Unified HeroSection
 * Bietet Rückwärtskompatibilität für bestehenden Code
 */
export const OptimizedHeroSection: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => {
  return (
    <HeroSection
      {...props}
      variant="optimized"
      theme="neon"
      animations={true}
      enableParallax={false}
      performance="high"
    />
  );
};

export default OptimizedHeroSection;