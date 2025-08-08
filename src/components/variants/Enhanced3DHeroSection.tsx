// Enhanced3DHeroSection.tsx - Kompatibilitäts-Wrapper für bestehende Enhanced3D-Komponente
import React from 'react';
import { HeroSection, HeroSectionProps } from '../base/HeroSection';

/**
 * Enhanced3DHeroSection - Wrapper für die neue Unified HeroSection
 * Bietet Rückwärtskompatibilität für bestehenden Code
 */
export const Enhanced3DHeroSection: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => {
  return (
    <HeroSection
      {...props}
      variant="enhanced3d"
      theme="neon"
      animations={true}
      enableParallax={true}
      performance="standard"
    />
  );
};

export default Enhanced3DHeroSection;