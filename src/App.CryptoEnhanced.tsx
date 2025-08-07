// App.CryptoEnhanced.tsx - Deployment-ready App mit erweitertem Crypto Dashboard
import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import Enhanced3DHomepage from './components/Enhanced3DHomepage';
import theme from './theme';

// Emotion Cache für optimale Performance
const emotionCache = createCache({
  key: 'crypto-enhanced',
  prepend: true
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Enhanced3DHomepage />
          </ThemeProvider>
        </HelmetProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default App;