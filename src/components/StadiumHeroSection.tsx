import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import Stadium3DViewer from './Stadium3DViewer';
import ParallaxSection from './ParallaxSection';

const heroGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(59, 130, 246, 0.3),
      0 0 60px rgba(59, 130, 246, 0.2),
      0 0 90px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(59, 130, 246, 0.5),
      0 0 80px rgba(59, 130, 246, 0.3),
      0 0 120px rgba(59, 130, 246, 0.2);
  }
`;

const textShimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const HeroContainer = styled(Box)({
  minHeight: '100vh',
  background: `
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
  `,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0'
});

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(3rem, 8vw, 6rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  fontFamily: '"Orbitron", monospace',
  background: `
    linear-gradient(
      90deg,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.success.main} 25%,
      ${theme.palette.info.main} 50%,
      ${theme.palette.success.main} 75%,
      ${theme.palette.primary.main} 100%
    )
  `,
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${textShimmer} 3s ease-in-out infinite`,
  textAlign: 'center',
  textShadow: '0 0 40px rgba(59, 130, 246, 0.5)'
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: '800px',
  lineHeight: 1.6,
  textAlign: 'center',
  textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.25rem',
  padding: '16px 32px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 10px currentColor',
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
  animation: `${heroGlow} 3s ease-in-out infinite`,
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 10px 40px rgba(59, 130, 246, 0.3)'
  },
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const StadiumImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))',
    zIndex: 1,
    pointerEvents: 'none'
  }
});

const StadiumImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  filter: 'brightness(1.1) contrast(1.1) saturate(1.2)'
});

const FloatingStats = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(15, 23, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '12px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
  padding: theme.spacing(2),
  zIndex: 2,
  animation: `${heroGlow} 4s ease-in-out infinite`
}));

const StadiumHeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTour = () => {
    const tourSection = document.getElementById('stadium-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.3}>
          <Stack 
            spacing={6} 
            alignItems="center"
            sx={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <HeroTitle>
                Carl-Benz-Stadion
              </HeroTitle>
              
              <HeroSubtitle>
                Erleben Sie das Heimstadion des SV Waldhof Mannheim in einer 
                immersiven 3D-Umgebung mit realistischen Details und interaktiven Features
              </HeroSubtitle>

              <ExploreButton
                startIcon={<ExploreIcon />}
                size="large"
                onClick={scrollToTour}
              >
                Stadion erkunden
              </ExploreButton>
            </Box>

            <Box sx={{ position: 'relative', width: '100%' }}>
              <StadiumImageContainer>
                <StadiumImage
                  src="https://images.unsplash.com/photo-1508507596652-540da01c3453?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxzdGFkaXVtJTIwZm9vdGJhbGwlMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm58ZW58MHwwfHxibHVlfDE3NTQ1NTAwMjh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Carl-Benz-Stadion exterior - Alex Mertz on Unsplash"
                  style={{ width: '100%', height: 'auto' }}
                />
                
                {/* Floating Statistics */}
                <FloatingStats sx={{ top: '20px', left: '20px' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'primary.main', 
                      fontFamily: '"Orbitron", monospace',
                      mb: 1
                    }}
                  >
                    27,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sitzplätze
                  </Typography>
                </FloatingStats>

                <FloatingStats sx={{ top: '20px', right: '20px' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'success.main', 
                      fontFamily: '"Orbitron", monospace',
                      mb: 1
                    }}
                  >
                    1994
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Eröffnet
                  </Typography>
                </FloatingStats>

                <FloatingStats sx={{ bottom: '20px', left: '20px' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'info.main', 
                      fontFamily: '"Orbitron", monospace',
                      mb: 1
                    }}
                  >
                    105m × 68m
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Spielfeld
                  </Typography>
                </FloatingStats>

                <FloatingStats sx={{ bottom: '20px', right: '20px' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'warning.main', 
                      fontFamily: '"Orbitron", monospace',
                      mb: 1
                    }}
                  >
                    4 Türme
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flutlichtanlage
                  </Typography>
                </FloatingStats>
              </StadiumImageContainer>
            </Box>
          </Stack>
        </ParallaxSection>
      </Container>
    </HeroContainer>
  );
};

export default StadiumHeroSection;