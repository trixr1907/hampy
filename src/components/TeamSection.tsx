        // TeamSection.tsx
// Diese Komponente zeigt den Team-Bereich der Homepage mit Titel und Beschreibung an
import React from 'react';
import { Typography, styled } from '@mui/material';

// Definiere SectionTitle als styled-Komponente, ähnlich wie in anderen Komponenten
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '1.5rem',
  textAlign: 'center',
  position: 'relative',
  '&.neon-text': {
    textShadow: '0 0 10px rgba(66, 220, 219, 0.8), 0 0 20px rgba(66, 220, 219, 0.5)',
    color: theme.palette.primary.main
  }
}));

const TeamSection: React.FC = () => {
  return (
    <div className="team-section">
        <SectionTitle className="neon-text">
          Unser Team kennenlernen
        </SectionTitle>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.25rem',
            color: 'text.secondary',
            textAlign: 'center',
            mb: 8,
            maxWidth: '600px',
            margin: '0 auto 64px auto'
          }}
        >
          Unser vielfältiges Expertenteam bringt jahrelange Erfahrung in Technologie, 
          Design und Innovation zusammen, um außergewöhnliche Ergebnisse zu liefern.
        </Typography>
    </div>
  );
};

export default TeamSection;