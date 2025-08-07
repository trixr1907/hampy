// OptimizedTechStackSection.tsx - Moderne Tech-Stack Sektion mit interaktiven Elementen
import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Container, Grid, Tooltip, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Erweiterte Animationen
const techOrbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(120px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(120px) rotate(-360deg);
  }
`;

const skillPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
  }
`;

const categoryGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.4);
  }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: `
    radial-gradient(circle at 30% 30%, rgba(0, 128, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    linear-gradient(225deg, transparent 0%, rgba(255, 0, 255, 0.05) 50%, transparent 100%)
  `,
  overflow: 'hidden'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.info.main}, ${theme.palette.success.main})`,
  backgroundSize: '300% 300%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'holographicShift 8s ease-in-out infinite',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  marginBottom: theme.spacing(8)
}));

const CategoryContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: 'rgba(26, 26, 42, 0.8)',
  backdropFilter: 'blur(25px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  animation: `${categoryGlow} 6s ease-in-out infinite`,
  '&:hover': {
    transform: 'translateY(-8px)',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 255, 0.3)'
  }
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  fontFamily: '"Orbitron", monospace',
  textAlign: 'center',
  textShadow: '0 0 15px currentColor'
}));

const TechGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const TechItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  animation: `${skillPulse} 4s ease-in-out infinite`,
  '&:hover': {
    transform: 'translateY(-8px) scale(1.05)',
    border: '1px solid rgba(0, 255, 255, 0.6)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.4)'
  }
}));

const TechIcon = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff'
}));

const TechName = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  textAlign: 'center',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5)
}));

const SkillLevel = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '2px',
  overflow: 'hidden',
  marginTop: theme.spacing(1)
}));

const SkillProgress = styled(Box)<{ level: number; color: string }>(({ level, color }) => ({
  width: `${level}%`,
  height: '100%',
  backgroundColor: color,
  borderRadius: '2px',
  boxShadow: `0 0 10px ${color}`,
  transition: 'width 1s ease-out'
}));

const ExperienceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  fontSize: '0.75rem',
  fontWeight: 500,
  marginTop: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)'
  }
}));

const CentralOrbit = styled(Box)(() => ({
  position: 'relative',
  width: '300px',
  height: '300px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const OrbitingTech = styled(Box)<{ delay: number; color: string }>(({ delay, color }) => ({
  position: 'absolute',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color}30, transparent)`,
  border: `2px solid ${color}60`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${techOrbit} 20s linear infinite`,
  animationDelay: `${delay}s`,
  boxShadow: `0 0 15px ${color}40`,
  '& span': {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: color
  }
}));

// Tech Stack Data
const techCategories = [
  {
    name: 'Frontend',
    color: '#00ffff',
    technologies: [
      { name: 'React', level: 95, experience: '5+ Jahre', icon: '⚛️' },
      { name: 'TypeScript', level: 90, experience: '4+ Jahre', icon: '📘' },
      { name: 'Next.js', level: 85, experience: '3+ Jahre', icon: '▲' },
      { name: 'Material-UI', level: 90, experience: '4+ Jahre', icon: '🎨' },
      { name: 'Tailwind', level: 80, experience: '2+ Jahre', icon: '🌊' },
      { name: 'Framer Motion', level: 75, experience: '2+ Jahre', icon: '🎭' }
    ]
  },
  {
    name: 'Backend',
    color: '#ff00ff',
    technologies: [
      { name: 'Node.js', level: 85, experience: '4+ Jahre', icon: '🟢' },
      { name: 'Express', level: 80, experience: '3+ Jahre', icon: '🚀' },
      { name: 'Python', level: 75, experience: '3+ Jahre', icon: '🐍' },
      { name: 'MongoDB', level: 80, experience: '3+ Jahre', icon: '🍃' },
      { name: 'PostgreSQL', level: 70, experience: '2+ Jahre', icon: '🐘' },
      { name: 'REST APIs', level: 90, experience: '4+ Jahre', icon: '🔗' }
    ]
  },
  {
    name: 'Tools & KI',
    color: '#22c55e',
    technologies: [
      { name: 'Git', level: 95, experience: '5+ Jahre', icon: '📚' },
      { name: 'Docker', level: 70, experience: '2+ Jahre', icon: '🐳' },
      { name: 'OpenAI API', level: 85, experience: '2+ Jahre', icon: '🤖' },
      { name: 'AWS', level: 65, experience: '1+ Jahre', icon: '☁️' },
      { name: 'Vercel', level: 90, experience: '3+ Jahre', icon: '▲' },
      { name: 'Jest', level: 75, experience: '2+ Jahre', icon: '🃏' }
    ]
  }
];

const OptimizedTechStackSection: React.FC = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [animateSkills, setAnimateSkills] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryIndex = parseInt(entry.target.getAttribute('data-category') || '0');
            setVisibleCategories(prev => [...prev, categoryIndex]);
            setTimeout(() => setAnimateSkills(true), 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    const categories = sectionRef.current?.querySelectorAll('.tech-category');
    categories?.forEach((category) => observer.observe(category));

    return () => observer.disconnect();
  }, []);

  return (
    <SectionContainer id="tech-stack" ref={sectionRef}>
      <Container maxWidth="lg">
        <SectionTitle className="neon-text">
          Technologie-Expertise
        </SectionTitle>
        <SectionSubtitle>
          Modernste Technologien und bewährte Tools für außergewöhnliche Entwicklungsergebnisse
        </SectionSubtitle>

        {/* Orbiting Technologies Visualization */}
        <Box sx={{ mb: 8, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <CentralOrbit>
            <Box
              sx={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent)',
                border: '2px solid rgba(0, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                animation: `${skillPulse} 3s ease-in-out infinite`
              }}
            >
              <Typography sx={{ fontWeight: 900, color: 'primary.main', fontSize: '1.25rem' }}>
                TECH
              </Typography>
            </Box>
            
            <OrbitingTech delay={0} color="#00ffff">
              <span>React</span>
            </OrbitingTech>
            <OrbitingTech delay={3} color="#ff00ff">
              <span>Node</span>
            </OrbitingTech>
            <OrbitingTech delay={6} color="#22c55e">
              <span>AI</span>
            </OrbitingTech>
            <OrbitingTech delay={9} color="#0080ff">
              <span>TS</span>
            </OrbitingTech>
          </CentralOrbit>
        </Box>
        
        {techCategories.map((category, categoryIndex) => (
          <CategoryContainer
            key={category.name}
            className="tech-category"
            data-category={categoryIndex}
            sx={{
              opacity: visibleCategories.includes(categoryIndex) ? 1 : 0,
              transform: visibleCategories.includes(categoryIndex) ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transitionDelay: `${categoryIndex * 0.2}s`,
              border: `1px solid ${category.color}40`,
              '&:hover': {
                border: `1px solid ${category.color}80`
              }
            }}
          >
            <CategoryTitle sx={{ color: category.color, textShadow: `0 0 15px ${category.color}60` }}>
              {category.name}
            </CategoryTitle>
            
            <TechGrid container spacing={3}>
              {category.technologies.map((tech, techIndex) => (
                <Grid item xs={6} sm={4} md={2} key={tech.name}>
                  <Tooltip 
                    title={`${tech.name} - ${tech.experience} Erfahrung`} 
                    arrow 
                    placement="top"
                  >
                    <TechItem
                      sx={{
                        animationDelay: `${techIndex * 0.1}s`,
                        border: `1px solid ${category.color}30`,
                        '&:hover': {
                          border: `1px solid ${category.color}80`,
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${category.color}60`
                        }
                      }}
                    >
                      <TechIcon
                        sx={{
                          background: `radial-gradient(circle, ${category.color}20, transparent)`,
                          border: `2px solid ${category.color}40`
                        }}
                      >
                        {tech.icon}
                      </TechIcon>
                      <TechName>{tech.name}</TechName>
                      <SkillLevel>
                        <SkillProgress 
                          level={animateSkills ? tech.level : 0} 
                          color={category.color}
                        />
                      </SkillLevel>
                      <ExperienceChip 
                        label={tech.experience} 
                        size="small"
                        sx={{
                          backgroundColor: `${category.color}15`,
                          color: category.color,
                          border: `1px solid ${category.color}30`
                        }}
                      />
                    </TechItem>
                  </Tooltip>
                </Grid>
              ))}
            </TechGrid>
          </CategoryContainer>
        ))}
        
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'primary.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 15px currentColor'
            }}
            className="neon-pulse"
          >
            Kontinuierliche Innovation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              color: 'text.secondary',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}
          >
            Ich bleibe stets am Puls der Zeit und erweitere kontinuierlich meine 
            Fähigkeiten, um innovative und zukunftssichere Lösungen zu entwickeln. 
            Neue Technologien sind für mich Werkzeuge zur Verwirklichung außergewöhnlicher Ideen.
          </Typography>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default OptimizedTechStackSection;