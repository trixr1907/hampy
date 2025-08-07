// Footer.tsx - Komponente für den Fußbereich der Homepage
import React from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Styled-Komponenten
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(10, 10, 18, 0.95)',
  borderTop: '1px solid rgba(0, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent)',
    zIndex: 1
  }
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(5px)',
    textShadow: '0 0 8px rgba(0, 255, 255, 0.5)'
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.text.secondary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    color: theme.palette.primary.main,
    transform: 'translateY(-3px)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
  }
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(4),
  bottom: theme.spacing(4),
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    transform: 'translateY(-5px)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
  },
  [theme.breakpoints.down('md')]: {
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}));

const FooterDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  margin: theme.spacing(4, 0)
}));

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Unternehmensinformationen */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 700,
                  color: 'primary.main',
                  textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                  mb: 2
                }}
              >
                IVO-TECH
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '300px' }}>
                Wir entwickeln innovative Technologielösungen, die Unternehmen dabei helfen, in der digitalen Welt erfolgreich zu sein.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={1}>
              <SocialButton aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="LinkedIn">
                <LinkedInIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="GitHub">
                <GitHubIcon fontSize="small" />
              </SocialButton>
            </Stack>
          </Grid>
          
          {/* Schnelllinks */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterTitle>Navigation</FooterTitle>
            <FooterLink href="#" underline="none">Startseite</FooterLink>
            <FooterLink href="#services" underline="none">Dienstleistungen</FooterLink>
            <FooterLink href="#about" underline="none">Über uns</FooterLink>
            <FooterLink href="#tech-stack" underline="none">Technologien</FooterLink>
            <FooterLink href="#pricing" underline="none">Preise</FooterLink>
            <FooterLink href="#contact" underline="none">Kontakt</FooterLink>
          </Grid>
          
          {/* Dienstleistungen */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle>Dienstleistungen</FooterTitle>
            <FooterLink href="#services" underline="none">Webentwicklung</FooterLink>
            <FooterLink href="#services" underline="none">Mobile Apps</FooterLink>
            <FooterLink href="#services" underline="none">Cloud-Lösungen</FooterLink>
            <FooterLink href="#services" underline="none">Datenbanken & API</FooterLink>
            <FooterLink href="#services" underline="none">Cybersicherheit</FooterLink>
            <FooterLink href="#services" underline="none">KI & Datenanalyse</FooterLink>
          </Grid>
          
          {/* Kontakt */}
          <Grid item xs={12} md={3}>
            <FooterTitle>Kontakt</FooterTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Technologiepark 8
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              10115 Berlin, Deutschland
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              info@ivo-tech.de
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              +49 (0) 30 123 456 789
            </Typography>
          </Grid>
        </Grid>
        
        <FooterDivider />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} IVO-TECH. Alle Rechte vorbehalten.
          </Typography>
          
          <Stack direction="row" spacing={4}>
            <FooterLink href="#" underline="none" sx={{ mb: 0 }}>
              Datenschutz
            </FooterLink>
            <FooterLink href="#" underline="none" sx={{ mb: 0 }}>
              AGB
            </FooterLink>
            <FooterLink href="#" underline="none" sx={{ mb: 0 }}>
              Cookies
            </FooterLink>
          </Stack>
        </Box>
      </Container>
      
      <ScrollTopButton onClick={scrollToTop} aria-label="Nach oben scrollen">
        <KeyboardArrowUpIcon />
      </ScrollTopButton>
    </FooterContainer>
  );
};

export default Footer;