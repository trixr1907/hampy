import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import TechStackSection from './TechStackSection';
// Testimonials-Sektion wurde entfernt
import PricingSection from './PricingSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';
import TestimonialsRemover from './TestimonialsRemover';

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
      <TestimonialsRemover />
      <PricingSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <CookieConsent />
    </Box>
  );
};

export default Homepage;