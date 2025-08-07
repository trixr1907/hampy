// ServicesSection.tsx - Komponente für den Dienstleistungsbereich der Homepage
import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ParallaxSection from './ParallaxSection';
import ServiceTooltip from './ServiceTooltip';

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main,
  textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary
}));

const ServiceCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  backgroundColor: 'rgba(26, 26, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.5)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
  '& svg': {
    fontSize: '2.5rem',
    color: theme.palette.primary.main
  }
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  marginBottom: theme.spacing(1),
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  lineHeight: 1.6
}));

const services = [
  {
    id: 'web-dev',
    title: 'Webentwicklung',
    description: 'Moderne, responsive Websites und Web-Anwendungen mit den neuesten Technologien.',
    icon: <CodeIcon fontSize="large" />,
    details: [
      'Frontend-Entwicklung mit React, Angular, Vue',
      'Backend-Entwicklung mit Node.js, Python, Java',
      'Progressive Web Apps (PWA)',
      'E-Commerce-Lösungen'
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Apps',
    description: 'Native und Cross-Platform-Anwendungen für iOS und Android mit nahtloser Benutzererfahrung.',
    icon: <SmartphoneIcon fontSize="large" />,
    details: [
      'Native iOS-Entwicklung (Swift)',
      'Native Android-Entwicklung (Kotlin)',
      'Cross-Platform mit React Native, Flutter',
      'App Store Optimierung'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud-Lösungen',
    description: 'Skalierbare Cloud-Infrastruktur und Dienste für maximale Flexibilität und Leistung.',
    icon: <CloudIcon fontSize="large" />,
    details: [
      'AWS, Azure, Google Cloud',
      'Serverless Architecture',
      'Microservices',
      'Container-Orchestrierung mit Kubernetes'
    ]
  },
  {
    id: 'data',
    title: 'Datenbanken & API',
    description: 'Robuste Datenbankarchitekturen und API-Entwicklung für effiziente Datenverarbeitung.',
    icon: <StorageIcon fontSize="large" />,
    details: [
      'SQL & NoSQL Datenbanken',
      'RESTful API Design',
      'GraphQL',
      'Datenmodellierung und -migration'
    ]
  },
  {
    id: 'security',
    title: 'Cybersicherheit',
    description: 'Umfassende Sicherheitslösungen zum Schutz Ihrer Anwendungen und Daten vor Bedrohungen.',
    icon: <SecurityIcon fontSize="large" />,
    details: [
      'Sicherheitsaudits',
      'Penetrationstests',
      'Sichere Authentifizierung',
      'Datenverschlüsselung'
    ]
  },
  {
    id: 'analytics',
    title: 'KI & Datenanalyse',
    description: 'Fortschrittliche Analysen und KI-Lösungen zur Gewinnung wertvoller Erkenntnisse aus Ihren Daten.',
    icon: <AnalyticsIcon fontSize="large" />,
    details: [
      'Machine Learning',
      'Predictive Analytics',
      'Business Intelligence',
      'Datenvisualisierung'
    ]
  }
];

const ServicesSection: React.FC = () => {
  return (
    <Box id="services" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle className="neon-text">
            Unsere Dienstleistungen
          </SectionTitle>
          <SectionSubtitle>
            Wir bieten umfassende Technologielösungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind
          </SectionSubtitle>
        </ParallaxSection>
        
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceCard>
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack alignItems="center" sx={{ mb: 3 }}>
                    <IconWrapper>
                      {service.icon}
                    </IconWrapper>
                  </Stack>
                  <ServiceTitle gutterBottom align="center">
                    {service.title}
                  </ServiceTitle>
                  <ServiceDescription align="center">
                    {service.description}
                  </ServiceDescription>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <ServiceTooltip service={service} />
                  </Box>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;