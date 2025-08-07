// OptimizedServicesSection.tsx - Moderne Services-Sektion mit Glassmorphism und 3D-Effekten
import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

// Erweiterte Animationen
const cardFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
  }
  50% { 
    transform: translateY(-15px) rotateX(5deg) rotateY(2deg); 
  }
`;

const iconPulse = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.7);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: `
    radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, transparent 0%, rgba(0, 128, 255, 0.05) 50%, transparent 100%)
  `,
  '&::before': {
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  backgroundSize: '300% 300%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${gradientShift} 8s ease-in-out infinite`,
  textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
  position: 'relative',
  zIndex: 2
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  position: 'relative',
  zIndex: 2
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(25px)',
  borderRadius: '24px',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(0, 255, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.05)
  `,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${cardFloat} 8s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)`,
    transition: 'left 0.6s ease',
    zIndex: 1
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    border: '1px solid rgba(0, 255, 255, 0.6)',
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(0, 255, 255, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.1)
    `,
    '&::before': {
      left: '100%'
    }
  },
  '&:nth-of-type(even)': {
    animationDelay: '2s'
  },
  '&:nth-of-type(3n)': {
    animationDelay: '4s'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent)`,
  border: `2px solid ${theme.palette.primary.main}40`,
  marginBottom: theme.spacing(3),
  position: 'relative',
  zIndex: 2,
  animation: `${iconPulse} 4s ease-in-out infinite`,
  '& svg': {
    fontSize: '2.5rem',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 10px currentColor)'
  }
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.75rem',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
  position: 'relative',
  zIndex: 2
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem',
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
  position: 'relative',
  zIndex: 2
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  fontSize: '0.875rem',
  fontWeight: 500,
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
    transform: 'scale(1.05)'
  }
}));

// Services Data
const services = [
  {
    id: 'frontend',
    title: 'Frontend Excellence',
    description: 'Moderne, responsive Benutzeroberflächen mit den neuesten Technologien und atemberaubenden visuellen Effekten.',
    icon: <CodeIcon />,
    technologies: ['React', 'TypeScript', 'Next.js', 'Material-UI', 'Framer Motion'],
    color: '#00ffff'
  },
  {
    id: 'backend',
    title: 'Backend Architecture',
    description: 'Skalierbare Server-Architekturen und APIs für robuste und performante Anwendungen.',
    icon: <StorageIcon />,
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    color: '#ff00ff'
  },
  {
    id: 'ai',
    title: 'KI-Integration',
    description: 'Intelligente Funktionen durch modernste KI-Technologien und maschinelles Lernen.',
    icon: <SmartToyOutlinedIcon />,
    technologies: ['OpenAI API', 'Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    color: '#0080ff'
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Moderne Cloud-Infrastrukturen für optimale Skalierbarkeit und Verfügbarkeit.',
    icon: <CloudIcon />,
    technologies: ['AWS', 'Vercel', 'Netlify', 'Docker', 'CI/CD'],
    color: '#22c55e'
  },
  {
    id: 'security',
    title: 'Security First',
    description: 'Umfassende Sicherheitsmaßnahmen zum Schutz von Daten und Anwendungen.',
    icon: <SecurityIcon />,
    technologies: ['OAuth', 'JWT', 'HTTPS', 'Data Encryption', 'GDPR Compliance'],
    color: '#ff0040'
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Optimierung für maximale Geschwindigkeit und beste Benutzererfahrung.',
    icon: <SpeedIcon />,
    technologies: ['Code Splitting', 'Lazy Loading', 'Caching', 'CDN', 'SEO'],
    color: '#ffff00'
  }
];

const OptimizedServicesSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, cardIndex]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <SectionContainer id="services" ref={sectionRef}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle className="neon-text animate-in">
          Meine Expertise
        </SectionTitle>
        <SectionSubtitle className="fade-in-scale">
          Modernste Technologien und innovative Lösungen für außergewöhnliche digitale Erlebnisse
        </SectionSubtitle>
        
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <ServiceCard 
                className="service-card performance-optimized"
                data-index={index}
                sx={{
                  opacity: visibleCards.includes(index) ? 1 : 0,
                  transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(50px)',
                  transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transitionDelay: `${index * 0.1}s`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Stack alignItems="center" sx={{ mb: 3 }}>
                    <IconWrapper sx={{ 
                      background: `radial-gradient(circle, ${service.color}20, transparent)`,
                      border: `2px solid ${service.color}40`,
                      '& svg': { color: service.color }
                    }}>
                      {service.icon}
                    </IconWrapper>
                  </Stack>
                  
                  <ServiceTitle 
                    align="center" 
                    sx={{ color: service.color, textShadow: `0 0 10px ${service.color}30` }}
                  >
                    {service.title}
                  </ServiceTitle>
                  
                  <ServiceDescription align="center" sx={{ mb: 4 }}>
                    {service.description}
                  </ServiceDescription>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 2, 
                        textAlign: 'center',
                        color: 'text.primary',
                        fontWeight: 600
                      }}
                    >
                      Technologien:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {service.technologies.map((tech) => (
                        <TechChip 
                          key={tech} 
                          label={tech} 
                          size="small"
                          sx={{
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                            border: `1px solid ${service.color}30`,
                            '&:hover': {
                              backgroundColor: `${service.color}25`,
                              boxShadow: `0 0 15px ${service.color}40`
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default OptimizedServicesSection;