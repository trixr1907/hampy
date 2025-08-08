// Homepage.tsx - Hauptkomponente für die persönliche Portfolio-Seite
import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import TechStackSection from './TechStackSection';
// Pricing-Sektion und Testimonials-Sektion wurden entfernt
import ContactSection from './ContactSection';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';

const Homepage: React.FC = () => {
  return (
    <Box>
      <AnimatedBackground />
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <CookieConsent />
    </Box>
  );
};

export default Homepage;