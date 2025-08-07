// AboutSection.tsx - Komponente für den About-Bereich der Homepage
import React from 'react';
import { Typography, Box, Stack, Container, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// CTAButton-Komponente definieren
interface CTAButtonProps {
  children: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, endIcon, onClick }) => (
  <button 
    onClick={onClick}
    className="cta-button"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#00bcd4',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 0 15px rgba(0, 188, 212, 0.5)',
      transition: 'all 0.3s ease'
    }}
  >
    {children}
    {endIcon}
  </button>
);

const AboutSection: React.FC = () => {
  return (
    <Container id="about" maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                color: 'text.primary',
                fontFamily: '"Orbitron", monospace',
                lineHeight: 1.2,
                textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
              }}
              className="neon-text"
            >
              Die Zukunft der Technologie gestalten
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                color: 'text.secondary',
                lineHeight: 1.6,
                mb: 2
              }}
            >
              Bei IVO-TECH sind wir leidenschaftlich dabei, Unternehmen durch innovative 
              Technologielösungen zu transformieren. Mit über einem Jahrzehnt Erfahrung arbeitet 
              unser Team aus Experten-Entwicklern und Strategen eng mit Kunden zusammen, um 
              modernste Lösungen zu liefern, die Wachstum und Erfolg vorantreiben.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              Wir glauben an die Macht der Technologie, komplexe Probleme zu lösen und neue 
              Möglichkeiten zu schaffen. Unser Ansatz kombiniert technische Exzellenz mit 
              strategischem Denken, um sicherzustellen, dass jedes Projekt messbare Ergebnisse liefert.
            </Typography>

            <Stack direction="row" spacing={6} sx={{ my: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }} className="neon-pulse">
                  10+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jahre Erfahrung
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }} className="neon-pulse">
                  200+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zufriedene Kunden
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }} className="neon-pulse">
                  500+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Abgeschlossene Projekte
                </Typography>
              </Box>
            </Stack>

            <CTAButton
              endIcon={<ArrowForwardIcon />}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Mehr über uns erfahren
            </CTAButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              minHeight: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Hauptbild mit Neon-Effekt */}
            <Box
              component="img"
              src="/images/tech-team.webp"
              alt="IVO-TECH Team"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                zIndex: 2,
                position: 'relative'
              }}
            />
            
            {/* Animierter Hintergrund-Kreis */}
            <Box
              sx={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,255,255,0) 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                animation: 'pulse 4s infinite ease-in-out',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  animation: 'rotate 20s linear infinite'
                },
                '@keyframes pulse': {
                  '0%': { opacity: 0.5, transform: 'translate(-50%, -50%) scale(0.8)' },
                  '50%': { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1.2)' },
                  '100%': { opacity: 0.5, transform: 'translate(-50%, -50%) scale(0.8)' }
                },
                '@keyframes rotate': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}
            />
            
            {/* Schwebende Tech-Icons */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(26, 26, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                animation: 'float 6s infinite ease-in-out',
                animationDelay: '0s',
                zIndex: 3
              }}
            >
              <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>React</Typography>
            </Box>
            
            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '10%',
                width: '70px',
                height: '70px',
                backgroundColor: 'rgba(26, 26, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                border: '1px solid rgba(255, 0, 255, 0.3)',
                animation: 'float 7s infinite ease-in-out',
                animationDelay: '1s',
                zIndex: 3
              }}
            >
              <Typography sx={{ color: 'secondary.main', fontWeight: 'bold' }}>Node.js</Typography>
            </Box>
            
            <Box
              sx={{
                position: 'absolute',
                top: '30%',
                left: '5%',
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(26, 26, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                animation: 'float 5s infinite ease-in-out',
                animationDelay: '2s',
                zIndex: 3
              }}
            >
              <Typography sx={{ color: '#ffd700', fontWeight: 'bold' }}>AI</Typography>
            </Box>
            
            {/* Globale Animation für schwebende Elemente */}
            <Box
              sx={{
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-15px)' },
                  '100%': { transform: 'translateY(0px)' }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;