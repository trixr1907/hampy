// OptimizedAboutSection.tsx - Moderne About-Sektion mit Parallax-Effekten und Animationen
import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Stack, Container, Grid, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';

// Erweiterte Animationen
const imageFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateY(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotateY(5deg); 
  }
`;

const statsCounter = keyframes`
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
`;

const techBadgeFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  33% { 
    transform: translateY(-10px) rotate(2deg); 
  }
  66% { 
    transform: translateY(5px) rotate(-1deg); 
  }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: `
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, transparent 0%, rgba(0, 128, 255, 0.05) 50%, transparent 100%)
  `,
  overflow: 'hidden'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  marginBottom: theme.spacing(3),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
  position: 'relative'
}));

const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
  marginBottom: theme.spacing(3),
  textAlign: 'justify'
}));

const StatsContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  background: 'rgba(26, 26, 42, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  animation: `${statsCounter} 0.8s ease-out`,
  '&:hover': {
    transform: 'translateY(-8px) scale(1.05)',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.3)'
  }
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 900,
  color: theme.palette.primary.main,
  fontFamily: '"Orbitron", monospace',
  textShadow: '0 0 20px currentColor',
  marginBottom: theme.spacing(1),
  display: 'block'
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  fontWeight: 500
}));

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: `${imageFloat} 8s ease-in-out infinite`
}));

const MainImage = styled(Box)(() => ({
  width: '100%',
  maxWidth: '400px',
  height: '300px',
  borderRadius: '24px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1)
  `,
  border: '2px solid rgba(0, 255, 255, 0.3)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.1)'
  }
}));

const TechBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(1.5, 2),
  backgroundColor: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '12px',
  border: '1px solid rgba(0, 255, 255, 0.4)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  animation: `${techBadgeFloat} 6s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.05)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.4)'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.125rem',
  padding: '16px 32px',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: '"Orbitron", monospace',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.7), inset 0 0 20px rgba(0, 255, 255, 0.1)'
  }
}));

const OptimizedAboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setAnimatedStats(true), 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionContainer id="about" ref={sectionRef}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <SectionTitle className="neon-text">
                Über mich
              </SectionTitle>
              
              <ContentText>
                Als leidenschaftlicher Webentwickler mit über 5 Jahren Erfahrung 
                erschaffe ich digitale Welten, die nicht nur funktional, sondern 
                auch visuell atemberaubend sind. Meine Reise begann mit der 
                Faszination für Code und entwickelte sich zu einer Expertise in 
                modernsten Technologien.
              </ContentText>

              <ContentText>
                Ich spezialisiere mich auf die Entwicklung von React-Anwendungen 
                mit TypeScript, die Integration von KI-Technologien und die 
                Erschaffung von Benutzeroberflächen, die Emotionen wecken. 
                Jedes Projekt ist für mich eine Gelegenheit, die Grenzen des 
                Möglichen zu erweitern.
              </ContentText>

              <StatsContainer 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3}
                sx={{
                  opacity: animatedStats ? 1 : 0,
                  transform: animatedStats ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease-out'
                }}
              >
                <StatItem>
                  <TrendingUpIcon sx={{ fontSize: '2rem', color: 'primary.main', mb: 1 }} />
                  <StatNumber className="neon-pulse">5+</StatNumber>
                  <StatLabel>Jahre Erfahrung</StatLabel>
                </StatItem>
                <StatItem>
                  <EmojiEventsIcon sx={{ fontSize: '2rem', color: 'secondary.main', mb: 1 }} />
                  <StatNumber className="neon-pulse" sx={{ color: 'secondary.main' }}>50+</StatNumber>
                  <StatLabel>Projekte</StatLabel>
                </StatItem>
                <StatItem>
                  <GroupIcon sx={{ fontSize: '2rem', color: 'success.main', mb: 1 }} />
                  <StatNumber className="neon-pulse" sx={{ color: 'success.main' }}>100%</StatNumber>
                  <StatLabel>Zufriedenheit</StatLabel>
                </StatItem>
              </StatsContainer>

              <CTAButton
                endIcon={<ArrowForwardIcon />}
                onClick={scrollToContact}
                sx={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transitionDelay: '0.8s'
                }}
              >
                Lass uns zusammenarbeiten
              </CTAButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ImageContainer
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transitionDelay: '0.3s'
              }}
            >
              <MainImage>
                <img
                  src="https://images.unsplash.com/photo-1732209556836-511e26d982da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxkZXZlbG9wZXIlMjBwcm9ncmFtbWVyJTIwY29tcHV0ZXIlMjBvZmZpY2V8ZW58MHwxfHx8MTc1NDU3ODg3NHww&ixlib=rb-4.1.0&q=85"
                  alt="Professional developer working on computer, modern office setting by Mushvig Niftaliyev on Unsplash"
                  style={{ width: '100%', height: '100%' }}
                />
              </MainImage>
              
              {/* Floating Tech Badges */}
              <TechBadge
                sx={{
                  top: '10%',
                  right: '10%',
                  animationDelay: '0s'
                }}
              >
                <Typography sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.875rem' }}>
                  React Expert
                </Typography>
              </TechBadge>
              
              <TechBadge
                sx={{
                  bottom: '20%',
                  left: '5%',
                  animationDelay: '2s'
                }}
              >
                <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.875rem' }}>
                  TypeScript Pro
                </Typography>
              </TechBadge>
              
              <TechBadge
                sx={{
                  top: '40%',
                  left: '15%',
                  animationDelay: '4s'
                }}
              >
                <Typography sx={{ color: 'info.main', fontWeight: 600, fontSize: '0.875rem' }}>
                  KI Integration
                </Typography>
              </TechBadge>
              
              <TechBadge
                sx={{
                  bottom: '35%',
                  right: '15%',
                  animationDelay: '6s'
                }}
              >
                <Typography sx={{ color: 'success.main', fontWeight: 600, fontSize: '0.875rem' }}>
                  Performance
                </Typography>
              </TechBadge>
            </ImageContainer>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default OptimizedAboutSection;