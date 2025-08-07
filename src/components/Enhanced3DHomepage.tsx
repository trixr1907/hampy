// Enhanced3DHomepage.tsx - Hauptkomponente, die alle Sektionen der Homepage zusammenfasst
import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import Enhanced3DHeroSection from './Enhanced3DHeroSection';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';
import ThemeToggler from './ThemeToggler';
import { useThemeMode } from '../theme/ThemeProvider';
import { LazyServices, LazyAbout, LazyTechStack, LazyContact } from '../utils/LazyComponents';
import LazyLoadWrapper from '../utils/LazyLoadWrapper';
import EnhancedCryptoSection from './EnhancedCryptoSection';
import InteractiveGallery from './InteractiveGallery';
import EnhancedAnimatedBackground from './EnhancedAnimatedBackground';
import SEO from '../utils/SEO';

const Enhanced3DHomepage: React.FC = () => {
  const { toggleMode } = useThemeMode();

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      <EnhancedAnimatedBackground />
      <SEO 
        title="Futuristische Webentwicklung"
        description="Professionelle Webentwicklung mit modernsten Technologien. Wir erstellen responsive, schnelle und benutzerfreundliche Websites mit 3D-Effekten und futuristischem Design."
        keywords="Webentwicklung, 3D-Effekte, React, TypeScript, Responsive Design, Futuristisches Design, Neon-Effekte, Professionelle Website"
        ogImage="/images/og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Ivo",
          "url": "https://www.ivo-tech.com",
          "image": "https://www.ivo-tech.com/images/logo.png",
          "email": "info@ivo-tech.com",
          "description": "Technikbegeisterter Hobby-Entwickler mit Fokus auf Webdesign, Webapps, Software-Entwicklung und Automatisierung",
          "sameAs": [
            "https://www.facebook.com/yves.schenker",
            "https://x.com/ivo_ma68",
            "https://www.instagram.com/yvesm/",
            "https://www.linkedin.com/in/yves-ivo",
            "https://github.com/trixr1907",
            "https://www.reddit.com/user/trixr1907"
          ]
        }}
      />
      <ScrollProgress />
      <Navigation />
      <Enhanced3DHeroSection />
      
      <LazyLoadWrapper>
        <LazyServices />
      </LazyLoadWrapper>
      
      <LazyLoadWrapper>
        <LazyAbout />
      </LazyLoadWrapper>
      
      <LazyLoadWrapper>
        <LazyTechStack />
      </LazyLoadWrapper>
      
      <LazyLoadWrapper>
        <EnhancedCryptoSection />
      </LazyLoadWrapper>
      
      <LazyLoadWrapper>
        <InteractiveGallery />
      </LazyLoadWrapper>
      
      <LazyLoadWrapper>
        <LazyContact />
      </LazyLoadWrapper>
      
      <Footer />
      <BackToTop />
      <CookieConsent />
      <ThemeToggler onToggle={toggleMode} />
    </Box>
  );
};

export default Enhanced3DHomepage;