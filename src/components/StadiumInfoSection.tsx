import React from 'react';
import { Box, Typography, Container, Stack, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SportsIcon from '@mui/icons-material/Sports';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ParallaxSection from './ParallaxSection';

const infoGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
  }
`;

const countUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const SectionContainer = styled(Box)({
  padding: '6rem 0',
  background: `
    linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)
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
  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(34, 197, 94, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
}));

const InfoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  }
});

const InfoCard = styled(Card)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  borderRadius: '16px',
  boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)',
  animation: `${infoGlow} 4s ease-in-out infinite`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 50px rgba(34, 197, 94, 0.4)',
    border: '1px solid rgba(34, 197, 94, 0.6)'
  },
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: `radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent)`,
  border: '2px solid rgba(34, 197, 94, 0.6)',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2.5rem',
    color: theme.palette.success.main,
    filter: 'drop-shadow(0 0 10px currentColor)'
  }
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 900,
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.success.main,
  textShadow: '0 0 20px currentColor',
  marginBottom: theme.spacing(1),
  animation: `${countUp} 1s ease-out`
}));

const HistoryTimeline = styled(Box)({
  marginTop: '4rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.2))',
    transform: 'translateX(-50%)',
    '@media (max-width: 768px)': {
      left: '20px'
    }
  }
});

const TimelineItem = styled(Box)<{ align: 'left' | 'right' }>(({ align }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '3rem',
  flexDirection: align === 'left' ? 'row' : 'row-reverse',
  '@media (max-width: 768px)': {
    flexDirection: 'row',
    paddingLeft: '3rem'
  }
}));

const TimelineCard = styled(Card)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  borderRadius: '12px',
  padding: theme.spacing(3),
  maxWidth: '400px',
  boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)',
  '&:hover': {
    boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
    transform: 'scale(1.02)'
  },
  transition: 'all 0.3s ease'
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: theme.palette.success.main,
  border: '4px solid rgba(15, 23, 42, 1)',
  boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
  margin: '0 2rem',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    position: 'absolute',
    left: '11px',
    margin: 0
  }
}));

const stadiumInfo = [
  {
    icon: <CalendarTodayIcon />,
    title: 'Eröffnung',
    value: '1994',
    description: 'Offiziell eröffnet am 15. Juli 1994'
  },
  {
    icon: <PeopleIcon />,
    title: 'Kapazität',
    value: '27,000',
    description: 'Sitzplätze für Zuschauer'
  },
  {
    icon: <SportsIcon />,
    title: 'Spielfeld',
    value: '105×68m',
    description: 'FIFA-Standard Naturrasen'
  },
  {
    icon: <ArchitectureIcon />,
    title: 'Architektur',
    value: 'Modern',
    description: 'Zeitgemäße Stadionarchitektur'
  }
];

const timelineEvents = [
  {
    year: '1994',
    title: 'Stadion-Eröffnung',
    description: 'Das Carl-Benz-Stadion wird offiziell eröffnet und wird zur neuen Heimat des SV Waldhof Mannheim.',
    align: 'left' as const
  },
  {
    year: '2008',
    title: 'Modernisierung',
    description: 'Umfassende Renovierung der Tribünen und Installation einer neuen Flutlichtanlage.',
    align: 'right' as const
  },
  {
    year: '2015',
    title: 'Kapazitätserweiterung',
    description: 'Erweiterung der Zuschauerkapazität auf 27.000 Plätze durch Anbau neuer Tribünenbereiche.',
    align: 'left' as const
  },
  {
    year: '2020',
    title: 'Digitale Ausstattung',
    description: 'Installation moderner LED-Videowände und Verbesserung der digitalen Infrastruktur.',
    align: 'right' as const
  }
];

const StadiumInfoSection: React.FC = () => {
  return (
    <SectionContainer id="stadium-info">
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle>
            Stadion-Informationen
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 6 }}>
            Erfahren Sie mehr über die Geschichte, Architektur und technischen Details des Carl-Benz-Stadions
          </SectionSubtitle>
        </ParallaxSection>

        {/* Stadium Statistics */}
        <InfoGrid>
          {stadiumInfo.map((info, index) => (
            <InfoCard key={index}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Stack alignItems="center">
                  <IconWrapper>
                    {info.icon}
                  </IconWrapper>
                  
                  <StatNumber>
                    {info.value}
                  </StatNumber>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: 'text.primary',
                      fontFamily: '"Orbitron", monospace'
                    }}
                  >
                    {info.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {info.description}
                  </Typography>
                </Stack>
              </CardContent>
            </InfoCard>
          ))}
        </InfoGrid>

        {/* Stadium History Timeline */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              textAlign: 'center',
              mb: 6,
              color: 'success.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 20px currentColor'
            }}
          >
            Stadion-Geschichte
          </Typography>

          <HistoryTimeline>
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} align={event.align}>
                <TimelineCard>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: 'success.main',
                      fontFamily: '"Orbitron", monospace',
                      mb: 1
                    }}
                  >
                    {event.year}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {event.description}
                  </Typography>
                </TimelineCard>
                <TimelineDot />
                <Box sx={{ flex: 1 }} />
              </TimelineItem>
            ))}
          </HistoryTimeline>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default StadiumInfoSection;