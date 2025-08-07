// OptimizedFooter.tsx - Moderne Footer-Sektion mit verbessertem Design
import React from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, Link, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmailIcon from '@mui/icons-material/Email';

// Erweiterte Animationen
const footerGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
  }
`;

const socialFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-5px); 
  }
`;

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%),
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
  `,
  borderTop: '1px solid rgba(0, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent)',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(0, 255, 255, 0.02) 102px,
        transparent 104px
      )
    `,
    zIndex: 1
  }
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
  position: 'relative',
  zIndex: 2
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'block',
  marginBottom: theme.spacing(1.5),
  fontSize: '1rem',
  position: 'relative',
  zIndex: 2,
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(8px)',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.text.secondary,
  border: '1px solid rgba(0, 255, 255, 0.2)',
  margin: theme.spacing(0.5),
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  animation: `${socialFloat} 3s ease-in-out infinite`,
  position: 'relative',
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    color: theme.palette.primary.main,
    transform: 'translateY(-5px) scale(1.1)',
    boxShadow: '0 8px 25px rgba(0, 255, 255, 0.4)',
    border: '1px solid rgba(0, 255, 255, 0.5)'
  },
  '&:nth-of-type(even)': {
    animationDelay: '1s'
  },
  '&:nth-of-type(3n)': {
    animationDelay: '2s'
  }
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(4),
  bottom: theme.spacing(4),
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  border: '2px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  animation: `${footerGlow} 4s ease-in-out infinite`,
  zIndex: 1000,
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    transform: 'translateY(-8px) scale(1.1)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 12px 25px rgba(0, 255, 255, 0.3)',
    border: '2px solid rgba(0, 255, 255, 0.6)'
  },
  [theme.breakpoints.down('md')]: {
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    padding: theme.spacing(1)
  }
}));

const FooterDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.2)',
  margin: theme.spacing(4, 0),
  position: 'relative',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  }
}));

const CompanyLogo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Orbitron", monospace',
  fontWeight: 900,
  color: theme.palette.primary.main,
  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
  fontSize: '2rem',
  marginBottom: theme.spacing(2),
  animation: `${footerGlow} 3s ease-in-out infinite`,
  position: 'relative',
  zIndex: 2
}));

const OptimizedFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://www.facebook.com/yves.schenker', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://x.com/ivo_ma68', label: 'Twitter' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/yves-ivo', label: 'LinkedIn' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/yvesm/', label: 'Instagram' },
    { icon: <GitHubIcon />, url: 'https://github.com/trixr1907', label: 'GitHub' }
  ];

  return (
    <>
      <FooterContainer>
        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4}>
            {/* Unternehmensinformationen */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <CompanyLogo className="neon-pulse">
                  IVO-TECH
                </CompanyLogo>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3, 
                    maxWidth: '300px',
                    lineHeight: 1.7,
                    fontSize: '1.125rem'
                  }}
                >
                  Innovative Webentwicklung mit modernsten Technologien. 
                  Wir erschaffen digitale Erlebnisse, die begeistern und inspirieren.
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <EmailIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    info@ivo-tech.com
                  </Typography>
                </Stack>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {socialLinks.map((social, index) => (
                  <SocialButton 
                    key={index}
                    aria-label={social.label}
                    onClick={() => window.open(social.url, '_blank')}
                    sx={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {social.icon}
                  </SocialButton>
                ))}
              </Stack>
            </Grid>
            
            {/* Navigation */}
            <Grid item xs={12} sm={6} md={2}>
              <FooterTitle>Navigation</FooterTitle>
              <FooterLink href="#hero" underline="none">Startseite</FooterLink>
              <FooterLink href="#services" underline="none">Services</FooterLink>
              <FooterLink href="#about" underline="none">Über mich</FooterLink>
              <FooterLink href="#tech-stack" underline="none">Technologien</FooterLink>
              <FooterLink href="#contact" underline="none">Kontakt</FooterLink>
            </Grid>
            
            {/* Services */}
            <Grid item xs={12} sm={6} md={3}>
              <FooterTitle>Expertise</FooterTitle>
              <FooterLink href="#services" underline="none">Frontend Development</FooterLink>
              <FooterLink href="#services" underline="none">Backend Architecture</FooterLink>
              <FooterLink href="#services" underline="none">KI-Integration</FooterLink>
              <FooterLink href="#services" underline="none">Cloud Solutions</FooterLink>
              <FooterLink href="#services" underline="none">Performance Optimization</FooterLink>
            </Grid>
            
            {/* Technologien */}
            <Grid item xs={12} md={3}>
              <FooterTitle>Technologien</FooterTitle>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                React, TypeScript, Node.js, Python, MongoDB, PostgreSQL, 
                AWS, Docker, OpenAI API, und viele weitere moderne Technologien.
              </Typography>
              <Box sx={{ 
                p: 2, 
                borderRadius: '12px', 
                background: 'rgba(0, 255, 255, 0.05)', 
                border: '1px solid rgba(0, 255, 255, 0.2)',
                mt: 2
              }}>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
                  🚀 Immer auf dem neuesten Stand
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Kontinuierliche Weiterbildung in den neuesten Technologien und Trends.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <FooterDivider />
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'center', md: 'flex-start' }, 
            gap: 2,
            position: 'relative',
            zIndex: 2
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
              &copy; {currentYear} IVO-TECH. Alle Rechte vorbehalten. Made with ❤️ and ☕
            </Typography>
            
            <Stack direction="row" spacing={4}>
              <FooterLink href="#" underline="none" sx={{ mb: 0, fontSize: '0.875rem' }}>
                Datenschutz
              </FooterLink>
              <FooterLink href="#" underline="none" sx={{ mb: 0, fontSize: '0.875rem' }}>
                Impressum
              </FooterLink>
              <FooterLink href="#" underline="none" sx={{ mb: 0, fontSize: '0.875rem' }}>
                AGB
              </FooterLink>
            </Stack>
          </Box>
        </Container>
      </FooterContainer>
      
      <ScrollTopButton onClick={scrollToTop} aria-label="Nach oben scrollen">
        <KeyboardArrowUpIcon fontSize="large" />
      </ScrollTopButton>
    </>
  );
};

export default OptimizedFooter;