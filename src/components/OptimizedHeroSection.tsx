// OptimizedHeroSection.tsx - Atemberaubende Hero-Sektion mit modernsten 2025 Design-Trends
import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, Stack, Container, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CodeIcon from '@mui/icons-material/Code';

// Erweiterte Animationen für 2025 Design
const holographicWave = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg) brightness(1);
  }
  25% { 
    background-position: 100% 50%;
    filter: hue-rotate(90deg) brightness(1.1);
  }
  50% { 
    background-position: 100% 100%;
    filter: hue-rotate(180deg) brightness(1.2);
  }
  75% { 
    background-position: 0% 100%;
    filter: hue-rotate(270deg) brightness(1.1);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg) brightness(1);
  }
`;

const morphingGlow = keyframes`
  0%, 100% {
    border-radius: 50% 40% 60% 30%;
    box-shadow: 
      0 0 50px rgba(0, 255, 255, 0.4),
      0 0 100px rgba(0, 255, 255, 0.2),
      0 0 150px rgba(0, 255, 255, 0.1);
  }
  25% {
    border-radius: 30% 60% 40% 50%;
    box-shadow: 
      0 0 60px rgba(255, 0, 255, 0.4),
      0 0 120px rgba(255, 0, 255, 0.2),
      0 0 180px rgba(255, 0, 255, 0.1);
  }
  50% {
    border-radius: 60% 30% 50% 40%;
    box-shadow: 
      0 0 70px rgba(0, 128, 255, 0.4),
      0 0 140px rgba(0, 128, 255, 0.2),
      0 0 210px rgba(0, 128, 255, 0.1);
  }
  75% {
    border-radius: 40% 50% 30% 60%;
    box-shadow: 
      0 0 55px rgba(34, 197, 94, 0.4),
      0 0 110px rgba(34, 197, 94, 0.2),
      0 0 165px rgba(34, 197, 94, 0.1);
  }
`;

const floatingOrbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(150px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(150px) rotate(-360deg);
  }
`;

// Styled Components mit 2025 Design-Trends
const HeroContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: `
    radial-gradient(circle at 30% 20%, rgba(0, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 0, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 20% 70%, rgba(0, 128, 255, 0.15) 0%, transparent 60%),
    radial-gradient(circle at 80% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
  `,
  backgroundSize: '400% 400%',
  animation: `${holographicWave} 20s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        rgba(0, 255, 255, 0.03) 60deg,
        transparent 120deg,
        rgba(255, 0, 255, 0.03) 180deg,
        transparent 240deg,
        rgba(0, 128, 255, 0.03) 300deg,
        transparent 360deg
      )
    `,
    animation: `${holographicWave} 30s linear infinite reverse`,
    zIndex: 1
  }
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 25%,
    ${theme.palette.info.main} 50%,
    ${theme.palette.success.main} 75%,
    ${theme.palette.primary.main} 100%
  )`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: '"Orbitron", monospace',
  animation: `${holographicWave} 15s ease-in-out infinite`,
  position: 'relative',
  zIndex: 2,
  textShadow: '0 0 50px rgba(0, 255, 255, 0.3)',
  '&::before': {
    content: 'attr(data-text)',
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}60, 
      ${theme.palette.secondary.main}60
    )`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    zIndex: -1,
    filter: 'blur(3px)',
    opacity: 0.7
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: '700px',
  lineHeight: 1.7,
  position: 'relative',
  zIndex: 2,
  textShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
  fontWeight: 400,
  letterSpacing: '0.5px'
}));

const EnhancedButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.25rem',
  padding: '18px 36px',
  borderRadius: '16px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `
    0 0 30px rgba(0, 255, 255, 0.4), 
    inset 0 0 30px rgba(0, 255, 255, 0.1),
    0 12px 48px rgba(0, 255, 255, 0.2)
  `,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, 
      transparent, 
      ${theme.palette.primary.main}40, 
      transparent
    )`,
    transition: 'left 0.6s ease',
    zIndex: -1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent)`,
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.4s ease',
    zIndex: -2
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: `
      0 0 50px rgba(0, 255, 255, 0.8), 
      inset 0 0 50px rgba(0, 255, 255, 0.2),
      0 20px 60px rgba(0, 255, 255, 0.3)
    `,
    '&::before': {
      left: '100%'
    },
    '&::after': {
      width: '300px',
      height: '300px'
    }
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1.25rem',
  padding: '18px 36px',
  borderRadius: '16px',
  border: `2px solid ${theme.palette.secondary.main}`,
  fontFamily: '"Orbitron", monospace',
  boxShadow: `0 0 25px rgba(255, 0, 255, 0.3), 0 12px 48px rgba(255, 0, 255, 0.2)`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    boxShadow: `0 0 40px rgba(255, 0, 255, 0.6), 0 20px 60px rgba(255, 0, 255, 0.3)`,
    transform: 'translateY(-4px) scale(1.02)'
  }
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(3),
  background: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(25px)',
  borderRadius: '20px',
  border: '1px solid rgba(0, 255, 255, 0.4)',
  boxShadow: `
    0 0 30px rgba(0, 255, 255, 0.3),
    0 12px 48px rgba(0, 0, 0, 0.4),
    inset 0 0 30px rgba(0, 255, 255, 0.1)
  `,
  animation: `${morphingGlow} 12s ease-in-out infinite`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.05)',
    boxShadow: `
      0 0 50px rgba(0, 255, 255, 0.5),
      0 20px 80px rgba(0, 0, 0, 0.5),
      inset 0 0 50px rgba(0, 255, 255, 0.2)
    `
  }
}));

const OrbitingIcon = styled(Box)(() => ({
  position: 'absolute',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: 'rgba(0, 255, 255, 0.1)',
  border: '2px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
  animation: `${floatingOrbit} 20s linear infinite`,
  '& svg': {
    fontSize: '2rem',
    color: '#00ffff'
  }
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& .stat-number': {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 900,
    color: theme.palette.primary.main,
    fontFamily: '"Orbitron", monospace',
    textShadow: '0 0 20px currentColor',
    animation: `${morphingGlow} 8s ease-in-out infinite`,
    display: 'block',
    marginBottom: theme.spacing(1)
  },
  '& .stat-label': {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    fontWeight: 500
  }
}));

const OptimizedHeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer id="hero" ref={heroRef}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack 
              spacing={4} 
              sx={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <HeroTitle 
                variant="h1" 
                className="holographic-text"
                data-text="Futuristische Webentwicklung der nächsten Generation"
              >
                Futuristische Webentwicklung der nächsten Generation
              </HeroTitle>
              
              <HeroSubtitle>
                Ich erschaffe digitale Erlebnisse mit modernsten Technologien, 
                atemberaubenden visuellen Effekten und KI-Integration. 
                Jedes Projekt ist ein Kunstwerk aus Code und Kreativität.
              </HeroSubtitle>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4 }}>
                <EnhancedButton
                  variant="contained"
                  endIcon={<RocketLaunchIcon />}
                  onClick={() => scrollToSection('contact')}
                  className="performance-optimized"
                >
                  Projekt starten
                </EnhancedButton>
                <SecondaryButton
                  variant="outlined"
                  onClick={() => scrollToSection('services')}
                  className="performance-optimized"
                >
                  Meine Arbeiten
                </SecondaryButton>
              </Stack>

              <StatsContainer>
                <StatItem>
                  <Typography className="stat-number neon-pulse">5+</Typography>
                  <Typography className="stat-label">Jahre Erfahrung</Typography>
                </StatItem>
                <StatItem>
                  <Typography className="stat-number neon-pulse">50+</Typography>
                  <Typography className="stat-label">Projekte</Typography>
                </StatItem>
                <StatItem>
                  <Typography className="stat-number neon-pulse">15+</Typography>
                  <Typography className="stat-label">Technologien</Typography>
                </StatItem>
                <StatItem>
                  <Typography className="stat-number neon-pulse">100%</Typography>
                  <Typography className="stat-label">Zufriedenheit</Typography>
                </StatItem>
              </StatsContainer>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                position: 'relative',
                height: '500px',
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Zentrales Bild */}
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1637249769470-3c4f4506a263?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5JTIwaG9sb2dyYW0lMjBjb21wdXRlciUyMGZ1dHVyaXN0aWN8ZW58MHwwfHxibHVlfDE3NTQ1Nzg4NzR8MA&ixlib=rb-4.1.0&q=85"
                alt="Futuristic workspace with holographic displays, neon lighting, modern technology setup by Jakob Owens on Unsplash"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '350px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  border: '2px solid rgba(0, 255, 255, 0.4)',
                  boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)',
                  animation: `${morphingGlow} 10s ease-in-out infinite`,
                  zIndex: 2
                }}
              />

              {/* Orbitierende Icons */}
              <OrbitingIcon sx={{ top: '10%', left: '10%', animationDelay: '0s' }}>
                <CodeIcon />
              </OrbitingIcon>
              <OrbitingIcon sx={{ top: '20%', right: '15%', animationDelay: '5s' }}>
                <SmartToyOutlinedIcon />
              </OrbitingIcon>
              <OrbitingIcon sx={{ bottom: '25%', left: '5%', animationDelay: '10s' }}>
                <RocketLaunchIcon />
              </OrbitingIcon>

              {/* Floating Cards */}
              <FloatingElement
                sx={{
                  top: '15%',
                  right: '5%',
                  animationDelay: '1s'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                  🚀 Aktuell
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  KI-Integration
                </Typography>
              </FloatingElement>

              <FloatingElement
                sx={{
                  bottom: '20%',
                  right: '10%',
                  animationDelay: '3s'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'secondary.main' }}>
                  💻 Expertise
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  React & TypeScript
                </Typography>
              </FloatingElement>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default OptimizedHeroSection;