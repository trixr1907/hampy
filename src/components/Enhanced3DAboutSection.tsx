import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Stack, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined';
import CycloneOutlinedIcon from '@mui/icons-material/CycloneOutlined';

const holographicShimmer = keyframes`
  0% { 
    background-position: -200% 0;
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(180deg);
  }
  100% { 
    background-position: 200% 0;
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

const particleOrbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(100px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(100px) rotate(-360deg);
  }
`;

const dataStream = keyframes`
  0% {
    transform: translateX(-100%) scaleX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0%) scaleX(1);
  }
  100% {
    transform: translateX(100%) scaleX(0);
    opacity: 0;
  }
`;

const Enhanced3DButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 32px',
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '1.125rem',
  fontFamily: '"Orbitron", monospace',
  boxShadow: `
    0 0 20px rgba(0, 255, 255, 0.4),
    inset 0 0 20px rgba(0, 255, 255, 0.1)
  `,
  textShadow: '0 0 10px currentColor',
  transformStyle: 'preserve-3d',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
    transition: 'left 0.5s ease'
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-3px) rotateX(5deg)',
    boxShadow: `
      0 0 30px rgba(0, 255, 255, 0.8),
      inset 0 0 30px rgba(0, 255, 255, 0.2)
    `,
    '&::before': {
      left: '100%'
    }
  },
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const HolographicImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  perspective: '1000px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: `
      radial-gradient(circle, 
        rgba(0, 255, 255, 0.2) 0%, 
        rgba(255, 0, 255, 0.1) 50%, 
        transparent 100%
      )
    `,
    transform: 'translate(-50%, -50%)',
    animation: `${holographicShimmer} 8s ease-in-out infinite`,
    zIndex: 1
  }
}));

const TechImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '20px',
  border: `2px solid ${theme.palette.primary.main}60`,
  boxShadow: `
    0 0 40px rgba(0, 255, 255, 0.4),
    0 16px 64px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1)
  `,
  zIndex: 2,
  position: 'relative',
  transformStyle: 'preserve-3d',
  animation: `${float3D} 10s ease-in-out infinite`,
  filter: 'brightness(1.1) contrast(1.1)',
  '&:hover': {
    transform: 'rotateY(5deg) rotateX(5deg) scale(1.02)',
    boxShadow: `
      0 0 60px rgba(0, 255, 255, 0.6),
      0 24px 96px rgba(0, 0, 0, 0.4),
      inset 0 0 30px rgba(0, 255, 255, 0.2)
    `
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const FloatingTechBadge = styled(Box)<{ 
  delay: number; 
  color: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}>(({ theme: _theme, delay, color, position }) => ({
  position: 'absolute',
  top: position.top,
  bottom: position.bottom,
  left: position.left,
  right: position.right,
  width: '80px',
  height: '80px',
  backgroundColor: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px solid ${color}60`,
  boxShadow: `
    0 0 20px ${color}40,
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 0 20px ${color}20
  `,
  animation: `${float3D} ${6 + delay}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: 3,
  transformStyle: 'preserve-3d',
  '&:hover': {
    transform: 'translateY(-10px) rotateX(10deg) rotateY(10deg) scale(1.1)',
    boxShadow: `
      0 0 30px ${color}60,
      0 12px 48px rgba(0, 0, 0, 0.4),
      inset 0 0 30px ${color}30
    `
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const ParticleOrbit = styled(Box)<{ delay: number; size: number; color: string }>(({ delay, size, color }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: `${size}px`,
  height: `${size}px`,
  animation: `${particleOrbit} ${10 + delay * 2}s linear infinite`,
  animationDelay: `${delay}s`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    boxShadow: `0 0 15px ${color}`,
    transform: 'translate(-50%, -50%)'
  }
}));

const DataStreamLine = styled(Box)<{ delay: number; angle: number }>(({ theme, delay, angle }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '200px',
  height: '2px',
  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
  animation: `${dataStream} 3s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  transformOrigin: 'center'
}));

const Enhanced3DAboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <Container id="about" maxWidth="lg" sx={{ py: 12 }} ref={sectionRef}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
        <Box sx={{ flex: 1, maxWidth: '600px' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              fontFamily: '"Orbitron", monospace',
              lineHeight: 1.2,
              mb: 3,
              background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #0080ff 100%)',
              backgroundSize: '400% 400%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${holographicShimmer} 10s ease-in-out infinite`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            Die Zukunft der Technologie gestalten
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.375rem',
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 3,
              textShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s'
            }}
          >
            Bei IVO-TECH erschaffen wir immersive digitale Welten mit modernster 3D-Technologie, 
            KI-Integration und holographischen Benutzeroberflächen. Unser Team aus Visionären 
            und Technologie-Experten verwandelt Ihre kühnsten Ideen in spektakuläre Realität.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 4,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s'
            }}
          >
            Wir glauben an die Macht der Technologie, nicht nur Probleme zu lösen, sondern 
            völlig neue Dimensionen der Interaktion und des Erlebens zu schaffen.
          </Typography>

          <Stack 
            direction="row" 
            spacing={6} 
            sx={{ 
              my: 4,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'primary.main',
                  fontFamily: '"Orbitron", monospace',
                  textShadow: '0 0 20px currentColor',
                  mb: 1
                }}
              >
                15+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jahre Innovation
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'primary.main',
                  fontFamily: '"Orbitron", monospace',
                  textShadow: '0 0 20px currentColor',
                  mb: 1
                }}
              >
                300+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3D Projekte
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'primary.main',
                  fontFamily: '"Orbitron", monospace',
                  textShadow: '0 0 20px currentColor',
                  mb: 1
                }}
              >
                99%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Performance Score
              </Typography>
            </Box>
          </Stack>

          <Enhanced3DButton
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s'
            }}
          >
            Mehr über uns erfahren
            <ArrowForwardIcon />
          </Enhanced3DButton>
        </Box>

        <Box sx={{ flex: 1, position: 'relative' }}>
          <HolographicImageContainer
            sx={{
              transform: `
                rotateX(${mousePosition.y * 5 - 2.5}deg) 
                rotateY(${mousePosition.x * 5 - 2.5}deg)
              `,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <TechImage
              src="https://images.unsplash.com/photo-1652512456007-e16ac46f1879?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwdGVjaG5vbG9neSUyMGhvbG9ncmFtJTIwb2ZmaWNlJTIwY29tcHV0ZXJzfGVufDB8MHx8Ymx1ZXwxNzU0NTQ5MjIzfDA&ixlib=rb-4.1.0&q=85"
              alt="IVO-TECH Team - Siednji Leon on Unsplash"
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
            
            {/* Floating Tech Badges */}
            <FloatingTechBadge
              delay={0}
              color="#00ffff"
              position={{ top: '10%', right: '5%' }}
            >
              <GrainOutlinedIcon sx={{ color: '#00ffff', fontSize: '2rem', mb: 0.5 }} />
              <Typography sx={{ color: '#00ffff', fontWeight: 'bold', fontSize: '0.75rem' }}>
                WebGL
              </Typography>
            </FloatingTechBadge>
            
            <FloatingTechBadge
              delay={1}
              color="#ff00ff"
              position={{ bottom: '15%', left: '10%' }}
            >
              <LensBlurOutlinedIcon sx={{ color: '#ff00ff', fontSize: '2rem', mb: 0.5 }} />
              <Typography sx={{ color: '#ff00ff', fontWeight: 'bold', fontSize: '0.75rem' }}>
                Three.js
              </Typography>
            </FloatingTechBadge>
            
            <FloatingTechBadge
              delay={2}
              color="#0080ff"
              position={{ top: '30%', left: '5%' }}
            >
              <CycloneOutlinedIcon sx={{ color: '#0080ff', fontSize: '2rem', mb: 0.5 }} />
              <Typography sx={{ color: '#0080ff', fontWeight: 'bold', fontSize: '0.75rem' }}>
                AI/ML
              </Typography>
            </FloatingTechBadge>

            {/* Particle Orbits */}
            <ParticleOrbit delay={0} size={200} color="#00ffff" />
            <ParticleOrbit delay={2} size={300} color="#ff00ff" />
            <ParticleOrbit delay={4} size={250} color="#0080ff" />

            {/* Data Stream Lines */}
            <DataStreamLine delay={0} angle={0} />
            <DataStreamLine delay={1} angle={45} />
            <DataStreamLine delay={2} angle={90} />
            <DataStreamLine delay={3} angle={135} />
          </HolographicImageContainer>
        </Box>
      </Stack>
    </Container>
  );
};

export default Enhanced3DAboutSection;