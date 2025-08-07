// LazyComponents.tsx - Komponente für das verzögerte Laden von Sektionen zur Performance-Optimierung
import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lade-Indikator für verzögert geladene Komponenten
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px',
      width: '100%'
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);

// Verzögert geladene Komponenten
export const LazyServicesSection = lazy(() => import('../components/Enhanced3DServicesSection'));
export const LazyAboutSection = lazy(() => import('../components/Enhanced3DAboutSection'));
export const LazyStatsSection = lazy(() => import('../components/StatsSection'));
export const LazyTechStackSection = lazy(() => import('../components/TechStackSection'));
export const LazyPricingSection = lazy(() => import('../components/PricingSection'));
export const LazyContactSection = lazy(() => import('../components/ContactSection'));

// HOC für verzögertes Laden von Komponenten
export const withLazyLoading = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

// Vorgefertigte verzögert geladene Komponenten
export const LazyServices = withLazyLoading(LazyServicesSection);
export const LazyAbout = withLazyLoading(LazyAboutSection);
export const LazyStats = withLazyLoading(LazyStatsSection);
export const LazyTechStack = withLazyLoading(LazyTechStackSection);
export const LazyPricing = withLazyLoading(LazyPricingSection);
export const LazyContact = withLazyLoading(LazyContactSection);
