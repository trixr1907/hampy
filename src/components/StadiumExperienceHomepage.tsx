import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import StadiumHeroSection from './StadiumHeroSection';
import StadiumTourSection from './StadiumTourSection';
import StadiumInfoSection from './StadiumInfoSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import Enhanced3DBackground from './Enhanced3DBackground';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';

const StadiumExperienceHomepage: React.FC = () => {
  return (
    <Box>
      <Enhanced3DBackground />
      <ScrollProgress />
      <Navigation />
      <StadiumHeroSection />
      <StadiumTourSection />
      <StadiumInfoSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </Box>
  );
};

export default StadiumExperienceHomepage;