import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3
  }
}));

const StatCard = styled(Box)(() => ({
  textAlign: 'center',
  position: 'relative',
  zIndex: 1
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(45deg, #ffffff, rgba(255, 255, 255, 0.8))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const StatLabel = styled(Typography)(() => ({
  fontSize: '1.125rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.9)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}));

const stats = [
  { number: 500, label: 'Abgeschlossene Projekte', suffix: '+' },
  { number: 98, label: 'Kundenzufriedenheit', suffix: '%' },
  { number: 50, label: 'Teammitglieder', suffix: '+' },
  { number: 10, label: 'Jahre Erfahrung', suffix: '+' }
];

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }

          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = Math.floor(current);
            return newNumbers;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  return (
    <SectionContainer ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 8 }}
          justifyContent="space-around"
          alignItems="center"
        >
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>
                {animatedNumbers[index]}{stat.suffix}
              </StatNumber>
              <StatLabel>
                {stat.label}
              </StatLabel>
            </StatCard>
          ))}
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default StatsSection;