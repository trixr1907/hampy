// TechStackSection.tsx - Komponente für die Darstellung meiner Technologiekenntnisse im Portfolio
import React from 'react';
import { Typography, Box, Container, Grid, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Tech-Stack-Kategorien und Technologien
const techCategories = [
  {
    name: 'Frontend',
    color: '#00bcd4', // Cyan
    technologies: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Next.js', icon: '/icons/nextjs.svg' },
      { name: 'Material UI', icon: '/icons/material-ui.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'Framer Motion', icon: '/icons/framer.svg' }
    ]
  },
  {
    name: 'Backend',
    color: '#e91e63', // Magenta
    technologies: [
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'Express', icon: '/icons/express.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'FastAPI', icon: '/icons/fastapi.svg' },
      { name: 'REST APIs', icon: '/icons/api.svg' },
      { name: 'JWT Auth', icon: '/icons/jwt.svg' }
    ]
  },
  {
    name: 'Datenbanken',
    color: '#ffc107', // Amber
    technologies: [
      { name: 'MongoDB', icon: '/icons/mongodb.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
      { name: 'Prisma', icon: '/icons/prisma.svg' },
      { name: 'Supabase', icon: '/icons/supabase.svg' },
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'Redis', icon: '/icons/redis.svg' }
    ]
  },
  {
    name: 'Tools & KI',
    color: '#4caf50', // Green
    technologies: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'Vite', icon: '/icons/vite.svg' },
      { name: 'OpenAI API', icon: '/icons/openai.svg' },
      { name: 'Netlify', icon: '/icons/netlify.svg' },
      { name: 'Vercel', icon: '/icons/vercel.svg' },
      { name: 'Jest', icon: '/icons/jest.svg' }
    ]
  }
];

// Styled-Komponenten
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

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontFamily: '"Space Grotesk", sans-serif',
  textAlign: 'center'
}));

const TechCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
  backgroundColor: 'rgba(26, 26, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.5)'
  }
}));

interface IconPlaceholderProps {
  color?: string;
}

const IconPlaceholder = styled(Box)<IconPlaceholderProps>(({ color }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: color || 'rgba(0, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '8px',
  boxShadow: `0 0 15px ${color || 'rgba(0, 255, 255, 0.3)'}`
}));

const TechName = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  textAlign: 'center',
  color: theme.palette.text.primary
}));

const TechStackSection: React.FC = () => {
  return (
    <Box id="tech-stack" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionTitle className="neon-text">
          Meine Tech-Skills
        </SectionTitle>
        <SectionSubtitle>
          Die Technologien, mit denen ich arbeite, um moderne und effiziente Webanwendungen zu entwickeln
        </SectionSubtitle>
        
        <Grid container spacing={6}>
          {techCategories.map((category, index) => (
            <Grid item xs={12} md={6} key={index}>
              <CategoryTitle sx={{ color: category.color, textShadow: `0 0 10px ${category.color}` }}>
                {category.name}
              </CategoryTitle>
              
              <Grid container spacing={2}>
                {category.technologies.map((tech, techIndex) => (
                  <Grid item xs={4} sm={4} key={techIndex}>
                    <Tooltip title={tech.name} arrow placement="top">
                      <TechCard>
                        {tech.icon ? (
                          <Box 
                            component="img" 
                            src={tech.icon} 
                            alt={tech.name}
                            sx={{
                              width: '40px',
                              height: '40px',
                              mb: 1,
                              filter: `drop-shadow(0 0 5px ${category.color})`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                filter: `drop-shadow(0 0 8px ${category.color})`,
                                transform: 'scale(1.1)'
                              }
                            }}
                          />
                        ) : (
                          <IconPlaceholder color={category.color}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                              {tech.name.charAt(0)}
                            </Typography>
                          </IconPlaceholder>
                        )}
                        <TechName>{tech.name}</TechName>
                      </TechCard>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        
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
            Kontinuierliches Lernen
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Ich bleibe stets auf dem neuesten Stand der Technologie-Entwicklung und erweitere 
            kontinuierlich meine Fähigkeiten, um innovative und zukunftssichere Lösungen zu schaffen.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TechStackSection;