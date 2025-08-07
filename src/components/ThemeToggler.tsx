// ThemeToggler.tsx - Komponente zum Umschalten zwischen hellem und dunklem Modus
import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Styled-Komponenten
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  left: theme.spacing(4),
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 0, 255, 0.3)'}`,
  zIndex: 1000,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    transform: 'scale(1.1)',
    boxShadow: `0 0 20px ${theme.palette.mode === 'dark' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`
  },
  [theme.breakpoints.down('md')]: {
    bottom: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

interface ThemeTogglerProps {
  onToggle: () => void;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ onToggle }) => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkMode = theme.palette.mode === 'dark';

  // Stellt sicher, dass die Komponente nur clientseitig gerendert wird
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip 
      title={isDarkMode ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'} 
      placement="right"
      arrow
    >
      <StyledIconButton 
        onClick={onToggle} 
        aria-label={isDarkMode ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ThemeToggler;
