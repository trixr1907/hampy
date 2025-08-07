import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ContactModal from './ContactModal';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(10, 10, 10, 0.9)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), 0 1px 0 rgba(0, 255, 255, 0.5)',
  color: theme.palette.text.primary,
  borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out'
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '1rem',
  padding: '8px 16px',
  fontFamily: '"Orbitron", monospace',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    color: theme.palette.primary.main,
    textShadow: '0 0 8px currentColor'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 8px currentColor',
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.6), inset 0 0 15px rgba(0, 255, 255, 0.1)'
  },
  transition: 'all 0.3s ease-in-out'
}));

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Projekte', id: 'services' },
    { label: 'Über mich', id: 'about' },
    { label: 'Technologien', id: 'technology' },
    { label: 'Kontakt', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const drawer = (
    <Stack sx={{ width: 250, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          IVO-TECH
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => scrollToSection(item.id)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ mt: 2 }}>
          <CTAButton fullWidth onClick={() => setContactModalOpen(true)}>
            Kontakt
          </CTAButton>
        </ListItem>
      </List>
    </Stack>
  );

  return (
    <>
      <StyledAppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.85)',
          backdropFilter: scrolled ? 'blur(25px)' : 'blur(20px)',
          borderBottom: '1px solid rgba(0, 255, 255, 0.5)',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            onClick={scrollToTop}
            sx={{
              fontWeight: 900,
              color: theme.palette.primary.main,
              fontFamily: '"Orbitron", monospace',
              cursor: 'pointer',
              textShadow: '0 0 10px currentColor, 0 0 15px currentColor',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              animation: 'neonPulse 2s infinite alternate',
              '&:hover': {
                textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
              },
              '@keyframes neonPulse': {
                '0%': {
                  textShadow: '0 0 10px currentColor, 0 0 20px currentColor'
                },
                '100%': {
                  textShadow: '0 0 15px currentColor, 0 0 25px currentColor, 0 0 35px currentColor'
                }
              }
            }}
            className="neon-pulse"
          >
            IVO-TECH
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              {navItems.map((item) => (
                <NavButton key={item.id} onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </NavButton>
              ))}
              <CTAButton sx={{ ml: 2 }} onClick={() => setContactModalOpen(true)}>
                Kontakt
              </CTAButton>
            </Stack>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer>

      <ContactModal 
        open={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;