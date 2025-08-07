import React, { useState } from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, CardMedia, Dialog, DialogContent, IconButton, Chip, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CloudIcon from '@mui/icons-material/Cloud';
import ParallaxSection from './ParallaxSection';

// Animationen
const float3D = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
  }
  33% { 
    transform: translateY(-10px) rotateX(5deg) rotateY(2deg); 
  }
  66% { 
    transform: translateY(5px) rotateX(-3deg) rotateY(-1deg); 
  }
`;

const holographicShimmer = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(180deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
  }
`;

// Styled Components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${holographicShimmer} 8s ease-in-out infinite`,
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(26, 26, 42, 0.8)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 0 25px rgba(0, 255, 255, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transformStyle: 'preserve-3d',
  animation: `${float3D} 8s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
    backgroundSize: '400% 400%',
    animation: `${holographicShimmer} 6s ease-in-out infinite`
  },
  '&:hover': {
    transform: 'translateY(-15px) rotateX(10deg) rotateY(5deg) scale(1.02)',
    boxShadow: '0 0 50px rgba(0, 255, 255, 0.5)',
    border: '1px solid rgba(0, 255, 255, 0.8)',
    animation: `${neonGlow} 2s ease-in-out infinite`
  }
}));

const ProjectImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover::after': {
    opacity: 1
  }
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  fontSize: '0.75rem',
  height: '24px',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease'
}));

const LightboxDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(10, 10, 18, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '20px',
    maxWidth: '90vw',
    maxHeight: '90vh'
  }
}));

// Project Data Interface
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'cloud';
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'concept';
}

const InteractiveGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Mock Project Data
  const projects: Project[] = [
    {
      id: '1',
      title: 'KI-gestützte Webapplikation',
      description: 'Moderne Webanwendung mit integrierter künstlicher Intelligenz für automatisierte Datenanalyse.',
      longDescription: 'Eine vollständig responsive Webanwendung, die Machine Learning-Algorithmen nutzt, um komplexe Datenanalysen durchzuführen. Die Anwendung bietet Echtzeit-Visualisierungen und intelligente Empfehlungen basierend auf Benutzerdaten.',
      image: 'https://images.unsplash.com/photo-1586448910234-297fae7189e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MHwwfHx8MTc1NDU3NTgzNHww&ixlib=rb-4.1.0&q=85',
      technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'FastAPI'],
      category: 'ai',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed'
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Vollständige E-Commerce-Lösung mit modernem Design und optimaler Performance.',
      longDescription: 'Eine skalierbare E-Commerce-Plattform mit fortschrittlichen Features wie Echtzeit-Inventarverwaltung, integriertem Zahlungssystem und personalisierten Produktempfehlungen.',
      image: 'https://images.unsplash.com/photo-1508416163602-e4eb39645e86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5JTIwY2lyY3VpdHMlMjBkaWdpdGFsJTIwZnV0dXJpc3RpY3xlbnwwfDB8fGJsdWV8MTc1NDU3NTgzNHww&ixlib=rb-4.1.0&q=85',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Mobile Fitness App',
      description: 'Cross-platform mobile App für Fitness-Tracking mit sozialen Features.',
      longDescription: 'Eine innovative Fitness-App, die Benutzer dabei unterstützt, ihre Gesundheitsziele zu erreichen. Mit Features wie Workout-Tracking, Ernährungsplanung und Community-Funktionen.',
      image: 'https://images.unsplash.com/photo-1615992174118-9b8e9be025e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MHwwfHx8MTc1NDU3NTgzNHww&ixlib=rb-4.1.0&q=85',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      category: 'mobile',
      demoUrl: '#',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Cloud-basierte Datenanalyse',
      description: 'Skalierbare Cloud-Lösung für Big Data Analytics und Visualisierung.',
      longDescription: 'Eine umfassende Cloud-Plattform für die Verarbeitung und Analyse großer Datenmengen. Bietet Echtzeit-Dashboards und automatisierte Reporting-Funktionen.',
      image: 'https://images.unsplash.com/photo-1579803270477-eed1a57ddefc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdHMlMjBkaWdpdGFsJTIwZnV0dXJpc3RpY3xlbnwwfDB8fGJsdWV8MTc1NDU3NTgzNHww&ixlib=rb-4.1.0&q=85',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Python', 'PostgreSQL'],
      category: 'cloud',
      githubUrl: '#',
      status: 'concept'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <WebIcon />;
      case 'mobile': return <SmartphoneIcon />;
      case 'ai': return <CodeIcon />;
      case 'cloud': return <CloudIcon />;
      default: return <WebIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#f59e0b';
      case 'concept': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Abgeschlossen';
      case 'in-progress': return 'In Entwicklung';
      case 'concept': return 'Konzept';
      default: return 'Unbekannt';
    }
  };

  return (
    <Box id="gallery" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle className="neon-text">
            Projekt-Galerie
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 6 }}>
            Entdecken Sie meine neuesten Projekte und Innovationen in der Webentwicklung
          </SectionSubtitle>
        </ParallaxSection>

        {/* Filter Buttons */}
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          sx={{ mb: 6 }}
          flexWrap="wrap"
          useFlexGap
        >
          {[
            { key: 'all', label: 'Alle Projekte', icon: <WebIcon /> },
            { key: 'web', label: 'Web Apps', icon: <WebIcon /> },
            { key: 'mobile', label: 'Mobile Apps', icon: <SmartphoneIcon /> },
            { key: 'ai', label: 'KI-Projekte', icon: <CodeIcon /> },
            { key: 'cloud', label: 'Cloud-Lösungen', icon: <CloudIcon /> }
          ].map((filterOption) => (
            <ActionButton
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              startIcon={filterOption.icon}
              variant={filter === filterOption.key ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: filter === filterOption.key 
                  ? 'rgba(0, 255, 255, 0.2)' 
                  : 'rgba(0, 255, 255, 0.05)',
                borderColor: 'rgba(0, 255, 255, 0.3)'
              }}
            >
              {filterOption.label}
            </ActionButton>
          ))}
        </Stack>

        {/* Projects Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 4
        }}>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              sx={{ 
                animationDelay: `${index * 0.2}s`
              }}
            >
              <ProjectImage
                image={project.image}
                title={project.title}
              />
              
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      fontFamily: '"Space Grotesk", sans-serif'
                    }}>
                      {project.title}
                    </Typography>
                    {getCategoryIcon(project.category)}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {project.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <TechChip key={tech} label={tech} size="small" />
                    ))}
                    {project.technologies.length > 3 && (
                      <TechChip 
                        label={`+${project.technologies.length - 3}`} 
                        size="small" 
                      />
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip 
                      label={getStatusText(project.status)}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(project.status)}20`,
                        color: getStatusColor(project.status),
                        border: `1px solid ${getStatusColor(project.status)}40`,
                        fontSize: '0.75rem'
                      }}
                    />
                    
                    <Stack direction="row" spacing={1}>
                      {project.demoUrl && (
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: 'primary.main',
                            '&:hover': { 
                              backgroundColor: 'rgba(0, 255, 255, 0.1)',
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demoUrl, '_blank');
                          }}
                        >
                          <LaunchIcon fontSize="small" />
                        </IconButton>
                      )}
                      {project.githubUrl && (
                        <IconButton 
                          size="small"
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { 
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank');
                          }}
                        >
                          <GitHubIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </ProjectCard>
          ))}
        </Box>

        {/* Lightbox Dialog */}
        <LightboxDialog
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedProject && (
            <DialogContent sx={{ p: 0, position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedProject(null)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                component="img"
                src={selectedProject.image}
                alt={selectedProject.title}
                sx={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '20px 20px 0 0'
                }}
              />

              <Box sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      fontFamily: '"Orbitron", monospace'
                    }}>
                      {selectedProject.title}
                    </Typography>
                    <Chip 
                      label={getStatusText(selectedProject.status)}
                      sx={{
                        backgroundColor: `${getStatusColor(selectedProject.status)}20`,
                        color: getStatusColor(selectedProject.status),
                        border: `1px solid ${getStatusColor(selectedProject.status)}40`
                      }}
                    />
                  </Stack>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {selectedProject.longDescription}
                  </Typography>

                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                      Verwendete Technologien:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {selectedProject.technologies.map((tech) => (
                        <TechChip key={tech} label={tech} />
                      ))}
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    {selectedProject.demoUrl && (
                      <ActionButton
                        startIcon={<LaunchIcon />}
                        onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                      >
                        Live Demo
                      </ActionButton>
                    )}
                    {selectedProject.githubUrl && (
                      <ActionButton
                        startIcon={<GitHubIcon />}
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      >
                        GitHub
                      </ActionButton>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </DialogContent>
          )}
        </LightboxDialog>
      </Container>
    </Box>
  );
};

export default InteractiveGallery;