import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ParallaxSection from './ParallaxSection';

const holographicFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
  }
  25% { 
    transform: translateY(-15px) rotateX(5deg) rotateY(10deg) rotateZ(2deg); 
  }
  50% { 
    transform: translateY(8px) rotateX(-3deg) rotateY(-5deg) rotateZ(-1deg); 
  }
  75% { 
    transform: translateY(-10px) rotateX(2deg) rotateY(8deg) rotateZ(3deg); 
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(0, 255, 255, 0.3),
      0 0 40px rgba(0, 255, 255, 0.2),
      0 0 60px rgba(0, 255, 255, 0.1),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(0, 255, 255, 0.6),
      0 0 60px rgba(0, 255, 255, 0.4),
      0 0 90px rgba(0, 255, 255, 0.2),
      inset 0 0 30px rgba(0, 255, 255, 0.2);
  }
`;

const dataFlow = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${holographicFloat} 8s ease-in-out infinite`,
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
}));

const ServicesGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '2rem',
  perspective: '1000px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  }
});

const Enhanced3DServiceCard = styled(Card)<{ delay: number }>(({ theme, delay }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  background: `
    linear-gradient(135deg, 
      rgba(26, 26, 42, 0.9) 0%, 
      rgba(26, 26, 42, 0.7) 50%, 
      rgba(26, 26, 42, 0.9) 100%
    )
  `,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.1)
  `,
  transformStyle: 'preserve-3d',
  animation: `${holographicFloat} ${8 + delay}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    animation: `${dataFlow} 3s linear infinite`,
    animationDelay: `${delay * 0.5}s`
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: '-100%',
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
    animation: `${dataFlow} 3s linear infinite`,
    animationDelay: `${delay * 0.5 + 1.5}s`
  },
  '&:hover': {
    transform: 'translateY(-15px) rotateX(10deg) rotateY(5deg) scale(1.02)',
    boxShadow: `
      0 16px 64px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(0, 255, 255, 0.4),
      inset 0 0 30px rgba(0, 255, 255, 0.2)
    `,
    border: '1px solid rgba(0, 255, 255, 0.6)',
    '& .service-icon': {
      transform: 'rotateY(360deg) scale(1.2)',
      boxShadow: `0 0 30px currentColor`
    },
    '& .service-title': {
      textShadow: '0 0 20px currentColor'
    }
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: `
    radial-gradient(circle, 
      rgba(0, 255, 255, 0.2) 0%, 
      rgba(0, 255, 255, 0.1) 50%, 
      transparent 100%
    )
  `,
  marginBottom: theme.spacing(3),
  border: '2px solid rgba(0, 255, 255, 0.4)',
  boxShadow: `
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1)
  `,
  animation: `${neonGlow} 4s ease-in-out infinite`,
  transformStyle: 'preserve-3d',
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 10px currentColor)',
    transition: 'all 0.3s ease'
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.75rem',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main,
  textAlign: 'center',
  transition: 'all 0.3s ease'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem',
  lineHeight: 1.6,
  textAlign: 'center',
  marginBottom: theme.spacing(3)
}));

const FeatureList = styled(Box)(({ theme }) => ({
  '& .feature-item': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 255, 0.1)',
      transform: 'translateX(5px)'
    },
    '&::before': {
      content: '"▶"',
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
      fontSize: '0.8rem',
      filter: 'drop-shadow(0 0 5px currentColor)'
    }
  }
}));

const services = [
  {
    id: 'web-dev',
    title: '3D Web Development',
    description: 'Immersive 3D-Webanwendungen mit WebGL, Three.js und modernsten Rendering-Technologien.',
    icon: <CodeIcon fontSize="large" />,
    features: [
      'WebGL & Three.js Expertise',
      'Real-time 3D Rendering',
      'VR/AR Integration',
      'Progressive Web Apps'
    ],
    color: '#00ffff'
  },
  {
    id: 'mobile-dev',
    title: 'Holographic Mobile Apps',
    description: 'Native und Cross-Platform Apps mit AR/VR-Features und holographischen Benutzeroberflächen.',
    icon: <SmartphoneIcon fontSize="large" />,
    features: [
      'AR/VR Mobile Development',
      'Unity & Unreal Integration',
      'Holographic UI/UX',
      'Real-time Multiplayer'
    ],
    color: '#ff00ff'
  },
  {
    id: 'cloud',
    title: 'Quantum Cloud Solutions',
    description: 'Skalierbare Cloud-Infrastruktur mit KI-Integration und Quantum Computing Capabilities.',
    icon: <CloudIcon fontSize="large" />,
    features: [
      'Quantum Computing Ready',
      'AI/ML Cloud Services',
      'Serverless Architecture',
      'Edge Computing'
    ],
    color: '#0080ff'
  },
  {
    id: 'data',
    title: 'Neural Data Systems',
    description: 'KI-gestützte Datenbanken mit Machine Learning und neuronalen Netzwerk-Architekturen.',
    icon: <StorageIcon fontSize="large" />,
    features: [
      'Neural Network Databases',
      'Real-time ML Processing',
      'Quantum Data Encryption',
      'Predictive Analytics'
    ],
    color: '#00ff80'
  },
  {
    id: 'security',
    title: 'Quantum Cybersecurity',
    description: 'Fortschrittliche Sicherheitslösungen mit Quantum-Verschlüsselung und KI-Threat-Detection.',
    icon: <SecurityIcon fontSize="large" />,
    features: [
      'Quantum Encryption',
      'AI Threat Detection',
      'Biometric Security',
      'Zero-Trust Architecture'
    ],
    color: '#ffff00'
  },
  {
    id: 'analytics',
    title: 'AI-Powered Analytics',
    description: 'Fortschrittliche KI-Analysen mit Deep Learning und Predictive Intelligence.',
    icon: <AnalyticsIcon fontSize="large" />,
    features: [
      'Deep Learning Models',
      'Predictive Intelligence',
      'Real-time Insights',
      'Neural Visualization'
    ],
    color: '#ff0040'
  }
];

const Enhanced3DServicesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
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
    <Box id="services" sx={{ py: 12, position: 'relative' }} ref={sectionRef}>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle>
            Futuristische Dienstleistungen
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 8 }}>
            Wir erschaffen die Zukunft mit 3D-Technologien, KI-Integration und immersiven digitalen Erlebnissen
          </SectionSubtitle>
        </ParallaxSection>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <Enhanced3DServiceCard 
              key={service.id}
              delay={index * 0.2}
              className="service-card"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                '& .service-icon svg': {
                  color: hoveredCard === service.id ? service.color : 'primary.main'
                },
                '& .service-title': {
                  color: hoveredCard === service.id ? service.color : 'primary.main'
                }
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconWrapper className="service-icon">
                  {service.icon}
                </IconWrapper>
                
                <ServiceTitle className="service-title" gutterBottom>
                  {service.title}
                </ServiceTitle>
                
                <ServiceDescription>
                  {service.description}
                </ServiceDescription>
                
                <FeatureList sx={{ mt: 'auto', width: '100%' }}>
                  {service.features.map((feature, featureIndex) => (
                    <Typography 
                      key={featureIndex}
                      variant="body2" 
                      className="feature-item"
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '1rem'
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </FeatureList>
              </CardContent>
            </Enhanced3DServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </Box>
  );
};

export default Enhanced3DServicesSection;