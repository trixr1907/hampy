// ThemeProvider.tsx - Provider für das Theme mit Unterstützung für hellen und dunklen Modus
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Farbpaletten für hellen und dunklen Modus
const lightPalette = {
  primary: {
    main: '#00BFFF',
    light: '#33CCFF',
    dark: '#0099CC',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#FF00FF',
    light: '#FF33FF',
    dark: '#CC00CC',
    contrastText: '#FFFFFF'
  },
  background: {
    default: '#F5F5F7',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#1A1A2E',
    secondary: '#4A4A6A'
  }
};

const darkPalette = {
  primary: {
    main: '#00BFFF',
    light: '#33CCFF',
    dark: '#0099CC',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#FF00FF',
    light: '#FF33FF',
    dark: '#CC00CC',
    contrastText: '#FFFFFF'
  },
  background: {
    default: '#0A0A18',
    paper: '#1A1A2E'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0C0'
  }
};

// Theme-Kontext
interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {}
});

// Hook für den Zugriff auf den Theme-Kontext
export const useThemeMode = () => useContext(ThemeContext);

// Theme-Provider-Komponente
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Prüfen, ob der Benutzer bereits eine Präferenz gespeichert hat
  const getInitialMode = (): PaletteMode => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        return savedMode;
      }
      
      // Prüfen der Systemeinstellung
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDarkMode ? 'dark' : 'light';
    }
    return 'dark'; // Standardwert
  };

  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  // Theme-Modus umschalten
  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  // Theme erstellen
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPalette)
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 700
        },
        h2: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 700
        },
        h3: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 600
        },
        h4: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 600
        },
        h5: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 500
        },
        h6: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 500
        },
        button: {
          fontFamily: '"Orbitron", monospace',
          fontWeight: 500
        }
      },
      shape: {
        borderRadius: 8
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: mode === 'dark' ? '#1A1A2E' : '#F5F5F7'
              },
              '&::-webkit-scrollbar-thumb': {
                background: mode === 'dark' ? '#4A4A6A' : '#B0B0C0',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: mode === 'dark' ? '#6A6A8A' : '#909090'
              }
            }
          }
        }
      }
    });
  }, [mode]);

  // Theme-Kontext-Wert
  const contextValue = useMemo(() => {
    return { mode, toggleMode };
  }, [mode]);

  // HTML-Attribut für das Theme setzen
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
