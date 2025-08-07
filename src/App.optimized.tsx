// App.optimized.tsx - Optimierte Hauptkomponente mit verbesserter Performance und modernem Design
import React, { Suspense } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import OptimizedHomepage from './components/OptimizedHomepage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Emotion Cache für optimierte Performance
const emotionCache = createCache({
  key: 'ivo-tech-optimized',
  prepend: true,
  speedy: true
});

// SEO und Meta-Tags Komponente
const SEOHead: React.FC = () => {
  React.useEffect(() => {
    // Dynamische Meta-Tags setzen
    document.title = 'IVO-TECH - Futuristische Webentwicklung & KI-Integration';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Professionelle Webentwicklung mit modernsten Technologien. React, TypeScript, KI-Integration und futuristische Designs für außergewöhnliche digitale Erlebnisse.'
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 
        'Webentwicklung, React, TypeScript, KI-Integration, Frontend, Backend, Moderne Websites, Futuristisches Design, Performance Optimierung'
      );
    }

    // Open Graph Meta-Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'IVO-TECH - Futuristische Webentwicklung');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        'Innovative Webentwicklung mit modernsten Technologien und atemberaubenden visuellen Effekten.'
      );
    }
  }, []);

  return null;
};

// Hauptkomponente
const OptimizedApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SEOHead />
          <Box 
            sx={{ 
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Suspense fallback={
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '100vh' 
                }}
              >
                <LoadingSpinner />
              </Box>
            }>
              <OptimizedHomepage />
            </Suspense>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default OptimizedApp;