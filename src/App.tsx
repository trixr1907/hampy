import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import Homepage from './components/Homepage';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationProvider from './components/NotificationProvider';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationProvider>
            <Homepage />
          </NotificationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default App;