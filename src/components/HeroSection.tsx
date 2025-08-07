import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ParallaxSection from './ParallaxSection';
import GlassmorphismCard from './GlassmorphismCard';

const gridPulse = keyframes`
  0% { opacity: 0.3; }
  100% { opacity: 0.7; }
`;

const rotate = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 128, 255, 0.1) 0%, transparent 70%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
  `,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(0, 255, 255, 0.03) 100px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.03) 100px
      )
    `,
    animation: `${gridPulse} 4s ease-in-out infinite alternate`,
    zIndex: -1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background: `
      conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(0, 255, 255, 0.1) 60deg,
        transparent 120deg,
        rgba(255, 0, 255, 0.1) 180deg,
        transparent 240deg,
        rgba(0, 255, 255, 0.1) 300deg,
        transparent 360deg
      )
    `,
    transform: 'translate(-50%, -50%)',
    animation: `${rotate} 20s linear infinite`,
    zIndex: -1
  }
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: '600px',
  lineHeight: 1.6
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.125rem',
  padding: '16px 32px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 10px currentColor',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.2)'
  },
  transition: 'all 0.3s ease-in-out'
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1.125rem',
  padding: '16px 32px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.secondary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 8px currentColor',
  boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    boxShadow: '0 0 25px rgba(255, 0, 255, 0.6)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease-in-out'
}));

const FloatingCard = styled(GlassmorphismCard)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(3),
  animation: `${fadeInUp} 1s ease-out`,
  border: `1px solid rgba(0, 255, 255, 0.3)`,
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.05)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
  }
}));

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <HeroContainer>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <ParallaxSection speed={0.3}>
          <Stack 
            spacing={4} 
            sx={{ 
              maxWidth: '800px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 1s ease-out'
            }}
          >
            <HeroTitle className="neon-flicker">
              Webentwicklung & KI-Integration
            </HeroTitle>
            
            <HeroSubtitle>
              Ich entwickle moderne Webanwendungen mit Fokus auf Benutzerfreundlichkeit, Performance und innovative Technologien. 
              Meine Expertise liegt in der Integration von KI-Lösungen und der Entwicklung maßgeschneiderter digitaler Erlebnisse.
            </HeroSubtitle>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4 }}>
              <CTAButton
                endIcon={<ArrowForwardIcon />}
                size="large"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Kontakt aufnehmen
              </CTAButton>
              <SecondaryButton 
                size="large"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Meine Projekte
              </SecondaryButton>
            </Stack>

            <Stack direction="row" spacing={6} sx={{ mt: 6 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }} className="neon-pulse">
                  5+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jahre Erfahrung
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }} className="neon-pulse">
                  30+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Abgeschlossene Projekte
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }} className="neon-pulse">
                  10+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Technologien
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </ParallaxSection>

        {/* Floating Cards */}
        <FloatingCard
          sx={{
            top: '20%',
            right: '10%',
            display: { xs: 'none', lg: 'block' }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            🚀 Aktuelles Projekt
          </Typography>
          <Typography variant="body2" color="text.secondary">
            KI-gestützte Webapplikation
          </Typography>
        </FloatingCard>

        <FloatingCard
          sx={{
            bottom: '25%',
            right: '5%',
            display: { xs: 'none', lg: 'block' }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            💻 Spezialisierung
          </Typography>
          <Typography variant="body2" color="text.secondary">
            React, TypeScript, AI
          </Typography>
        </FloatingCard>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;