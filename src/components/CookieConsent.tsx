// CookieConsent.tsx - Cookie-Einwilligungskomponente mit Speicherfunktion und Styling
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Slide,
  Link,
  Stack,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CookieIcon from '@mui/icons-material/Cookie';
import { styled } from '@mui/material/styles';

const COOKIE_CONSENT_KEY = 'ivo-tech-cookie-consent';

const ConsentContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  padding: theme.spacing(3),
  backgroundColor: 'rgba(10, 10, 30, 0.95)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 -5px 20px rgba(0, 0, 255, 0.2)',
  [theme.breakpoints.up('md')]: {
    left: '50%',
    right: 'auto',
    bottom: theme.spacing(3),
    maxWidth: '500px',
    transform: 'translateX(-50%)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 255, 255, 0.3)'
  }
}));

const AcceptButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  textTransform: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
  }
}));

const DeclineButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textTransform: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  }
}));

const CookieConsent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Überprüfen, ob der Benutzer bereits zugestimmt hat
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Kurze Verzögerung, um die Benutzerfreundlichkeit zu verbessern
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Speichern der Zustimmung im localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setOpen(false);
    
    // Hier könnten zusätzliche Tracking-Cookies aktiviert werden
    console.log('Cookies akzeptiert');
  };

  const handleDecline = () => {
    // Speichern der Ablehnung im localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setOpen(false);
    
    // Hier könnten zusätzliche Tracking-Cookies deaktiviert werden
    console.log('Cookies abgelehnt');
  };

  const handleClose = () => {
    // Nur die Benachrichtigung schließen, ohne eine Entscheidung zu speichern
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <ConsentContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1} alignItems="center">
            <CookieIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Cookie-Einstellungen
            </Typography>
          </Stack>
          <IconButton size="small" onClick={handleClose} aria-label="Schließen">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
        
        <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer 
          <Link href="/datenschutz" color="primary" sx={{ ml: 0.5 }}>
            Datenschutzrichtlinie
          </Link> zu.
        </Typography>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(0, 255, 255, 0.2)' }} />
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <DeclineButton onClick={handleDecline}>
            Ablehnen
          </DeclineButton>
          <AcceptButton onClick={handleAccept}>
            Alle akzeptieren
          </AcceptButton>
        </Stack>
      </ConsentContainer>
    </Slide>
  );
};

export default CookieConsent;