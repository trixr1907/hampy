// ServicesSection.tsx - Komponente für den Fähigkeiten-Bereich der persönlichen Portfolio-Seite
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
    id: 'frontend',
    title: 'Frontend-Entwicklung',
    description: 'Entwicklung moderner, responsiver und benutzerfreundlicher Weboberflächen mit aktuellen Technologien.',
    icon: <CodeIcon fontSize="large" />,
    details: [
      'React & React Hooks',
      'TypeScript',
      'Material-UI & Styled Components',
      'Responsive Design & Animationen'
    ]
  },
  {
    id: 'backend',
    title: 'Backend-Entwicklung',
    description: 'Erstellung robuster Server-Anwendungen und APIs für zuverlässige Datenverarbeitung.',
    icon: <StorageIcon fontSize="large" />,
    details: [
      'Node.js & Express',
      'RESTful APIs',
      'MongoDB & PostgreSQL',
      'Authentifizierung & Sicherheit'
    ]
  },
  {
    id: 'ai',
    title: 'KI-Integration',
    description: 'Integration von KI-Technologien in Webanwendungen für intelligente Funktionen und Automatisierung.',
    icon: <AnalyticsIcon fontSize="large" />,
    details: [
      'OpenAI API & LLM-Integration',
      'Chatbots & Assistenten',
      'Datenanalyse & Visualisierung',
      'Automatisierte Prozesse'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud-Entwicklung',
    description: 'Deployment und Verwaltung von Anwendungen in der Cloud für optimale Skalierbarkeit.',
    icon: <CloudIcon fontSize="large" />,
    details: [
      'AWS & Netlify',
      'Serverless Functions',
      'CI/CD-Pipelines',
      'Monitoring & Logging'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Web',
    description: 'Entwicklung von mobil-optimierten Webanwendungen und Progressive Web Apps.',
    icon: <SmartphoneIcon fontSize="large" />,
    details: [
      'Progressive Web Apps (PWA)',
      'Responsive Mobile Design',
      'Touch-Optimierte Interfaces',
      'Offline-Funktionalität'
    ]
  },
  {
    id: 'security',
    title: 'Web-Sicherheit',
    description: 'Implementation von Sicherheitsmaßnahmen zum Schutz von Webanwendungen und Benutzerdaten.',
    icon: <SecurityIcon fontSize="large" />,
    details: [
      'Sichere Authentifizierung',
      'HTTPS & SSL',
      'OWASP Best Practices',
      'Datenschutz (DSGVO)'
    ]
  }
];

const ServicesSection: React.FC = () => {
  return (
    <Box id="services" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle className="neon-text">
            Meine Fähigkeiten
          </SectionTitle>
          <SectionSubtitle>
            Spezialisiert auf moderne Webentwicklung mit Fokus auf Benutzerfreundlichkeit und innovative Technologien
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