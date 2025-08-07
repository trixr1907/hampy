import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff', // Cyan neon
      light: '#66ffff',
      dark: '#00cccc',
      contrastText: '#000000'
    },
    secondary: {
      main: '#ff00ff', // Magenta neon
      light: '#ff66ff',
      dark: '#cc00cc',
      contrastText: '#000000'
    },
    error: {
      main: '#ff0040', // Neon red
      light: '#ff4070',
      dark: '#cc0030'
    },
    warning: {
      main: '#ffff00', // Neon yellow
      light: '#ffff66',
      dark: '#cccc00'
    },
    info: {
      main: '#0080ff', // Electric blue
      light: '#4da6ff',
      dark: '#0066cc'
    },
    success: {
      main: '#00ff80', // Neon green
      light: '#66ffb3',
      dark: '#00cc66'
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ffff'
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  typography: {
    fontFamily: '"Orbitron", "Space Grotesk", "Inter", monospace',
    h1: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 900,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff'
    },
    h2: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '0.01em',
      textShadow: '0 0 8px #00ffff, 0 0 16px #00ffff'
    },
    h3: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.4,
      textShadow: '0 0 6px #00ffff, 0 0 12px #00ffff'
    },
    h4: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      textShadow: '0 0 4px #00ffff, 0 0 8px #00ffff'
    },
    h5: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      textShadow: '0 0 3px #00ffff'
    },
    h6: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      textShadow: '0 0 2px #00ffff'
    },
    body1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#ffffff'
    },
    body2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#cccccc'
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          border: '1px solid #00ffff',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
          '&:hover': {
            border: '1px solid rgba(0, 255, 255, 0.6)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
          }
        }
      }
    }
  }
});

export default theme;