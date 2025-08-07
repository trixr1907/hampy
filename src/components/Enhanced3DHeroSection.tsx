// Enhanced3DHeroSection.tsx - Eine futuristische Hero-Sektion mit 3D-Effekten und animierten Elementen
// Diese Komponente stellt einen interaktiven Hero-Bereich mit 3D-Effekten, Animationen und Glasmorphismus-Elementen dar
import React, { useRef } from 'react';
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined';
import ParallaxSection from './ParallaxSection';
import GlassmorphismCard from './GlassmorphismCard';

const holographicShift = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(180deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
`;

const float3D = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
  }
  33% { 
    transform: translateY(-20px) rotateX(10deg) rotateZ(5deg); 
  }
  66% { 
    transform: translateY(10px) rotateX(-5deg) rotateZ(-3deg); 
  }
`;

const neonPulse3D = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor,
      0 0 35px currentColor;
    transform: scale(1);
  }
  50% {
    text-shadow: 
      0 0 2px currentColor,
      0 0 5px currentColor,
      0 0 8px currentColor,
      0 0 12px currentColor,
      0 0 25px currentColor;
    transform: scale(1.02);
  }
`;

const glitchEffect = keyframes`
  0%, 90%, 100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  10% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(90deg);
  }
  20% {
    transform: translate(2px, -2px);
    filter: hue-rotate(180deg);
  }
  30% {
    transform: translate(-2px, -2px);
    filter: hue-rotate(270deg);
  }
  40% {
    transform: translate(2px, 2px);
    filter: hue-rotate(360deg);
  }
`;

const HeroContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 128, 255, 0.15) 0%, transparent 70%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
  `,
  backgroundSize: '400% 400%',
  animation: `${holographicShift} 20s ease-in-out infinite`,
  position: 'relative',
  overflow: 'hidden',
  perspective: '1000px',
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
        rgba(0, 255, 255, 0.05) 100px,
        transparent 102px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.05) 100px,
        transparent 102px
      )
    `,
    animation: `${neonPulse3D} 6s ease-in-out infinite`,
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300%',
    height: '300%',
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
    animation: `${holographicShift} 30s linear infinite`,
    zIndex: 1
  }
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: '"Orbitron", monospace',
  animation: `${holographicShift} 15s ease-in-out infinite, ${glitchEffect} 8s infinite`,
  position: 'relative',
  zIndex: 2,
  '&::before': {
    content: 'attr(data-text)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}80, ${theme.palette.secondary.main}80)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    zIndex: -1,
    filter: 'blur(2px)',
    opacity: 0.7
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: '700px',
  lineHeight: 1.6,
  position: 'relative',
  zIndex: 2,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
}));

const Enhanced3DButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.25rem',
  padding: '18px 36px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 10px currentColor',
  boxShadow: `
    0 0 20px rgba(0, 255, 255, 0.4), 
    inset 0 0 20px rgba(0, 255, 255, 0.1),
    0 8px 32px rgba(0, 255, 255, 0.3)
  `,
  position: 'relative',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
    transition: 'left 0.5s ease',
    zIndex: -1
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-4px) rotateX(5deg)',
    boxShadow: `
      0 0 30px rgba(0, 255, 255, 0.8), 
      inset 0 0 30px rgba(0, 255, 255, 0.2),
      0 12px 48px rgba(0, 255, 255, 0.4)
    `,
    '&::before': {
      left: '100%'
    }
  },
  transition: 'all 0.3s ease-in-out'
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1.25rem',
  padding: '18px 36px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.secondary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 8px currentColor',
  boxShadow: `0 0 15px rgba(255, 0, 255, 0.3), 0 8px 32px rgba(255, 0, 255, 0.2)`,
  transformStyle: 'preserve-3d',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    boxShadow: `0 0 25px rgba(255, 0, 255, 0.6), 0 12px 48px rgba(255, 0, 255, 0.3)`,
    transform: 'translateY(-3px) rotateX(3deg)'
  },
  transition: 'all 0.3s ease-in-out'
}));

const Floating3DCard = styled(GlassmorphismCard)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(3),
  animation: `${float3D} 8s ease-in-out infinite`,
  border: `1px solid rgba(0, 255, 255, 0.4)`,
  boxShadow: `
    0 0 20px rgba(0, 255, 255, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1)
  `,
  backdropFilter: 'blur(20px)',
  background: 'rgba(26, 26, 42, 0.8)',
  transformStyle: 'preserve-3d',
  '&:hover': {
    transform: 'translateY(-12px) rotateX(10deg) rotateY(5deg) scale(1.05)',
    boxShadow: `
      0 0 40px rgba(0, 255, 255, 0.5),
      0 16px 64px rgba(0, 0, 0, 0.4),
      inset 0 0 30px rgba(0, 255, 255, 0.2)
    `
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const ParticleIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${theme.palette.primary.main}40, transparent)`,
  border: `1px solid ${theme.palette.primary.main}60`,
  boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
  animation: `${float3D} 6s ease-in-out infinite`,
  '& svg': {
    fontSize: '2rem',
    color: theme.palette.primary.main
  }
}));

// Die Hauptkomponente für den Hero-Bereich
const Enhanced3DHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HeroContainer id="hero" ref={containerRef}>
      <Container maxWidth="lg">
        <ParallaxSection
          speed={0.8}
          offset={20}
        >
          <Stack 
            spacing={6} 
            sx={{ 
              position: 'relative', 
              zIndex: 2, 
              py: 12,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 6, md: 4 }
            }}
          >
            <Box sx={{ maxWidth: { xs: '100%', md: '55%' } }}>
              <HeroTitle className="neon-text" variant="h1">
                Futuristische Webentwicklung mit 3D-Effekten
              </HeroTitle>
              <HeroSubtitle>
                Moderne Websites mit beeindruckenden visuellen Effekten, 
                responsivem Design und optimaler Performance.
              </HeroSubtitle>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 5 }}>
                <Enhanced3DButton 
                  variant="contained" 
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  href="#contact"
                >
                  Kontakt aufnehmen
                </Enhanced3DButton>
                <SecondaryButton 
                  variant="outlined" 
                  color="secondary"
                  href="#services"
                >
                  Dienstleistungen
                </SecondaryButton>
              </Stack>
            </Box>
            
            <Box 
              sx={{ 
                maxWidth: { xs: '100%', md: '40%' },
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                gap: 4,
                position: 'relative',
                perspective: '1000px',
                height: '400px',
                width: '100%'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotateY(15deg) rotateX(5deg)',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,0,0,0) 70%)',
                  filter: 'blur(20px)',
                  animation: `${holographicShift} 15s linear infinite`
                }}
              />
            </Box>
          </Stack>
        </ParallaxSection>

        {/* Enhanced Floating Cards - Neu angeordnet für besseres Layout */}
        <Floating3DCard
          sx={{
            top: '20%',
            right: '8%',
            display: { xs: 'none', md: 'block' },
            animationDelay: '0s',
            transform: 'rotate(2deg)',
            zIndex: 1,
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.5)'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ParticleIcon>
              <GrainOutlinedIcon />
            </ParticleIcon>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                🚀 Webdesign
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Erste Erfahrungen
              </Typography>
            </Box>
          </Stack>
        </Floating3DCard>

        <Floating3DCard
          sx={{
            bottom: '25%',
            right: '15%',
            display: { xs: 'none', md: 'block' },
            animationDelay: '2s',
            transform: 'rotate(-3deg)',
            zIndex: 1,
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 0, 255, 0.5)'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ParticleIcon>
              <LensBlurOutlinedIcon />
            </ParticleIcon>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                ⭐ Heimautomatisierung
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HomeAssistant Grundlagen
              </Typography>
            </Box>
          </Stack>
        </Floating3DCard>

        <Floating3DCard
          sx={{
            top: '50%',
            right: '12%',
            display: { xs: 'none', md: 'block' },
            animationDelay: '4s',
            transform: 'rotate(1deg) scale(1.05)',
            zIndex: 2,
            boxShadow: '0 0 40px rgba(0, 200, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 200, 255, 0.6)'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ParticleIcon>
              <GrainOutlinedIcon />
            </ParticleIcon>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                🎯 Programmierung
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Python & Grundlagen
              </Typography>
            </Box>
          </Stack>
        </Floating3DCard>
      </Container>
    </HeroContainer>
  );
};

export default Enhanced3DHeroSection;