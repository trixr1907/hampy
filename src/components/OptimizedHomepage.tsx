// OptimizedHomepage.tsx - Optimierte und wunderschöne Homepage mit modernsten Design-Trends 2025
import React, { Suspense, lazy } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from './Navigation';
import OptimizedHeroSection from './OptimizedHeroSection';
import LoadingSpinner from './LoadingSpinner';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';

// Lazy loading für bessere Performance
const LazyServicesSection = lazy(() => import('./OptimizedServicesSection'));
const LazyAboutSection = lazy(() => import('./OptimizedAboutSection'));
const LazyTechStackSection = lazy(() => import('./OptimizedTechStackSection'));
const LazyContactSection = lazy(() => import('./OptimizedContactSection'));
const LazyFooter = lazy(() => import('./OptimizedFooter'));

// Styled Container für die gesamte Homepage
const HomepageContainer = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 128, 255, 0.1) 0%, transparent 70%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
  `,
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(0, 255, 255, 0.02) 100px,
        transparent 102px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.02) 100px,
        transparent 102px
      )
    `,
    zIndex: -1,
    animation: 'backgroundPulse 8s ease-in-out infinite alternate'
  }
}));

// Lazy Loading Wrapper mit Fallback
const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={
    <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
      <LoadingSpinner />
    </Container>
  }>
    {children}
  </Suspense>
);

const OptimizedHomepage: React.FC = () => {
  return (
    <HomepageContainer className="performance-optimized">
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section - Sofort geladen für bessere UX */}
      <OptimizedHeroSection />
      
      {/* Lazy geladene Sektionen für bessere Performance */}
      <LazySection>
        <LazyServicesSection />
      </LazySection>
      
      <LazySection>
        <LazyAboutSection />
      </LazySection>
      
      <LazySection>
        <LazyTechStackSection />
      </LazySection>
      
      <LazySection>
        <LazyContactSection />
      </LazySection>
      
      <LazySection>
        <LazyFooter />
      </LazySection>
      
      <BackToTop />
    </HomepageContainer>
  );
};

export default OptimizedHomepage;