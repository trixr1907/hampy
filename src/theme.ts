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
      dark: '#cc0030',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ffff00', // Neon yellow
      light: '#ffff66',
      dark: '#cccc00',
      contrastText: '#000000'
    },
    info: {
      main: '#0080ff', // Electric blue
      light: '#4da6ff',
      dark: '#0066cc',
      contrastText: '#ffffff'
    },
    success: {
      main: '#22c55e', // Stadium green
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#666666'
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(26, 26, 42, 0.8)'
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
    },
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    divider: 'rgba(0, 255, 255, 0.12)'
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 900,
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      textShadow: '0 0 20px rgba(0, 255, 255, 0.6)'
    },
    h2: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      lineHeight: 1.2,
      letterSpacing: '0.01em',
      textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
    },
    h3: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      lineHeight: 1.3,
      textShadow: '0 0 10px rgba(0, 255, 255, 0.4)'
    },
    h4: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      lineHeight: 1.4,
      textShadow: '0 0 8px rgba(0, 255, 255, 0.3)'
    },
    h5: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      lineHeight: 1.4,
      textShadow: '0 0 6px rgba(0, 255, 255, 0.2)'
    },
    h6: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      lineHeight: 1.4,
      textShadow: '0 0 4px rgba(0, 255, 255, 0.2)'
    },
    body1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: '#ffffff'
    },
    body2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#b3b3b3'
    },
    button: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px'
    }
  },
  shape: {
    borderRadius: 12
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s ease',
            zIndex: 1
          },
          '&:hover::before': {
            left: '100%'
          }
        },
        contained: {
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
          border: '1px solid rgba(0, 255, 255, 0.5)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.7), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            transform: 'translateY(-2px)'
          }
        },
        outlined: {
          border: '2px solid',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 0 25px rgba(0, 255, 255, 0.6)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            border: '1px solid rgba(0, 255, 255, 0.5)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
            transform: 'translateY(-4px)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(0, 255, 255, 0.3)',
              borderWidth: '1px'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 255, 0.6)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffff',
              borderWidth: '2px',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)'
            }
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.neon-text': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
          '&.neon-pulse': {
            animation: 'neonPulse 2s ease-in-out infinite alternate'
          }
        }
      }
    }
  }
});

export default theme;