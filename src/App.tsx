// App.tsx - Hauptkomponente der Anwendung mit Theme-Provider, Error-Boundary und Homepage
import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import Enhanced3DHomepage from './components/Enhanced3DHomepage';
import { NotificationProvider } from './context/NotificationContext';
import ThemeProvider from './theme/ThemeProvider';
import PerformanceOptimizer from './utils/PerformanceOptimizer';
import ServiceWorkerRegistration from './utils/ServiceWorkerRegistration';
import CookieConsent from './components/CookieConsent';

// Emotion Cache für bessere Performance
const emotionCache = createCache({
  key: 'ivo-tech',
  prepend: true
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <HelmetProvider>
          <ThemeProvider>
            <NotificationProvider>
              <ServiceWorkerRegistration>
                <PerformanceOptimizer
                  preconnectUrls={[
                    'https://fonts.googleapis.com',
                    'https://fonts.gstatic.com',
                    'https://cdn.jsdelivr.net'
                  ]}
                  preloadFonts={[
                    { href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap', type: 'text/css' },
                    { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', type: 'text/css' }
                  ]}
                  deferScripts={true}
                >
                  <Enhanced3DHomepage />
                  <CookieConsent />
                </PerformanceOptimizer>
              </ServiceWorkerRegistration>
            </NotificationProvider>
          </ThemeProvider>
        </HelmetProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default App;