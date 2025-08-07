import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Enhanced3DHomepage from './components/Enhanced3DHomepage';
import Enhanced3DBackground from './components/Enhanced3DBackground';
import theme from './theme';

// Emotion Cache für bessere Performance
const emotionCache = createCache({
  key: 'ivo-tech-enhanced',
  prepend: true
});

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Enhanced3DBackground />
          <Enhanced3DHomepage />
        </ThemeProvider>
      </HelmetProvider>
    </CacheProvider>
  );
};

export default App;