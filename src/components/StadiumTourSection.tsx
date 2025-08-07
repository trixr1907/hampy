import React, { useState } from 'react';
import { Box, Typography, Container, Stack, Card, CardContent, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SportsIcon from '@mui/icons-material/Sports';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SecurityIcon from '@mui/icons-material/Security';
import AccessibleIcon from '@mui/icons-material/Accessible';
import Stadium3DViewer from './Stadium3DViewer';
import ParallaxSection from './ParallaxSection';

const tourFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
`;

const SectionContainer = styled(Box)({
  padding: '6rem 0',
  background: `
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
  `,
  position: 'relative',
  overflow: 'hidden'
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
}));

const TourGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  }
});

const TourCard = styled(Card)<{ active: boolean }>(({ theme, active }) => ({
  background: active 
    ? 'rgba(59, 130, 246, 0.1)' 
    : 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(20px)',
  border: active 
    ? '2px solid rgba(59, 130, 246, 0.6)' 
    : '1px solid rgba(59, 130, 246, 0.3)',
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  animation: active ? `${tourFloat} 3s ease-in-out infinite` : 'none',
  boxShadow: active 
    ? '0 0 40px rgba(59, 130, 246, 0.4)' 
    : '0 0 20px rgba(59, 130, 246, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)',
    border: '2px solid rgba(59, 130, 246, 0.8)'
  }
}));

const IconWrapper = styled(Box)<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color}20, transparent)`,
  border: `2px solid ${color}60`,
  marginBottom: '1rem',
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  '& svg': {
    fontSize: '2.5rem',
    color: color,
    filter: `drop-shadow(0 0 10px ${color})`
  }
}));

const StadiumImageCard = styled(Box)({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  marginTop: '2rem',
  boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
});

const StadiumImage = styled('img')({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  filter: 'brightness(1.1) contrast(1.1)'
});

const ImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const tourAreas = [
  {
    id: 'pitch',
    title: 'Spielfeld & Rasen',
    description: 'Erkunden Sie den perfekt gepflegten Naturrasen und die Spielfeldmarkierungen',
    icon: <SportsIcon />,
    color: '#22c55e',
    image: 'https://images.unsplash.com/photo-1551478533-6f4698c97f28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxzdGFkaXVtJTIwcGl0Y2glMjBmb290YmFsbCUyMHNlYXRzJTIwZmxvb2RsaWdodHN8ZW58MHwwfHxncmVlbnwxNzU0NTUwMDI4fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'seating',
    title: 'Zuschauerränge',
    description: 'Entdecken Sie die verschiedenen Sitzplatzkategorien und VIP-Bereiche',
    icon: <PeopleIcon />,
    color: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1582319193378-c63336350969?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxzdGFkaXVtJTIwcGl0Y2glMjBmb290YmFsbCUyMHNlYXRzJTIwZmxvb2RsaWdodHN8ZW58MHwwfHxncmVlbnwxNzU0NTUwMDI4fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'facilities',
    title: 'Gastronomie',
    description: 'Besuchen Sie die Restaurants, Bars und Imbissstände im Stadion',
    icon: <RestaurantIcon />,
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1589473912363-c1c51a6f6fcd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8c3RhZGl1bSUyMHBpdGNoJTIwZm9vdGJhbGwlMjBzZWF0cyUyMGZsb29kbGlnaHRzfGVufDB8MHx8Z3JlZW58MTc1NDU1MDAyOHww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'parking',
    title: 'Parkplätze',
    description: 'Informationen zu Parkplätzen und Anfahrtsmöglichkeiten',
    icon: <LocalParkingIcon />,
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1578494642672-a8839ee667bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8c3RhZGl1bSUyMGZvb3RiYWxsJTIwYXJjaGl0ZWN0dXJlJTIwbW9kZXJufGVufDB8MHx8Ymx1ZXwxNzU0NTUwMDI4fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'security',
    title: 'Sicherheit',
    description: 'Sicherheitsmaßnahmen und Notausgänge im Stadion',
    icon: <SecurityIcon />,
    color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzdGFkaXVtJTIwbmlnaHQlMjBmbG9vZGxpZ2h0cyUyMGlsbHVtaW5hdGVkJTIwZm9vdGJhbGx8ZW58MHwwfHxibHVlfDE3NTQ1NTAwMjh8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'accessibility',
    title: 'Barrierefreiheit',
    description: 'Barrierefreie Zugänge und spezielle Einrichtungen',
    icon: <AccessibleIcon />,
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1588588080392-1aaf4434c7ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8c3RhZGl1bSUyMG5pZ2h0JTIwZmxvb2RsaWdodHMlMjBpbGx1bWluYXRlZCUyMGZvb3RiYWxsfGVufDB8MHx8Ymx1ZXwxNzU0NTUwMDI4fDA&ixlib=rb-4.1.0&q=85'
  }
];

const StadiumTourSection: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string>('pitch');

  const handleAreaClick = (areaId: string) => {
    setActiveArea(areaId);
  };

  const activeAreaData = tourAreas.find(area => area.id === activeArea);

  return (
    <SectionContainer id="stadium-tour">
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle>
            Virtuelle Stadion-Tour
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 6 }}>
            Entdecken Sie jeden Winkel des Carl-Benz-Stadions in einer interaktiven 3D-Umgebung
          </SectionSubtitle>
        </ParallaxSection>

        {/* 3D Stadium Viewer */}
        <Box sx={{ mb: 6 }}>
          <Stadium3DViewer />
        </Box>

        {/* Tour Areas Grid */}
        <TourGrid>
          {tourAreas.map((area) => (
            <TourCard
              key={area.id}
              active={activeArea === area.id}
              onClick={() => handleAreaClick(area.id)}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Stack alignItems="center">
                  <IconWrapper color={area.color}>
                    {area.icon}
                  </IconWrapper>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: activeArea === area.id ? 'primary.main' : 'text.primary',
                      fontFamily: '"Orbitron", monospace'
                    }}
                  >
                    {area.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {area.description}
                  </Typography>
                </Stack>
              </CardContent>
            </TourCard>
          ))}
        </TourGrid>

        {/* Active Area Detail */}
        {activeAreaData && (
          <StadiumImageCard>
            <StadiumImage
              src={activeAreaData.image}
              alt={`${activeAreaData.title} - Stadium view`}
              style={{ width: '100%', height: '300px' }}
            />
            <ImageOverlay>
              <Box sx={{ textAlign: 'center', color: 'white' }}>
                <IconWrapper color={activeAreaData.color} sx={{ mx: 'auto', mb: 2 }}>
                  {activeAreaData.icon}
                </IconWrapper>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontFamily: '"Orbitron", monospace',
                    textShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {activeAreaData.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {activeAreaData.description}
                </Typography>
              </Box>
            </ImageOverlay>
          </StadiumImageCard>
        )}
      </Container>
    </SectionContainer>
  );
};

export default StadiumTourSection;