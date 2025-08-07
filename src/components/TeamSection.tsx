// TeamSection.tsx
// Diese Komponente zeigt den Team-Bereich der Homepage mit Titel und Beschreibung an
// Integriert mit Decap CMS für einfache Inhaltsverwaltung
import React, { useState, useEffect } from 'react';
import { Typography, styled, Grid, Card, CardContent, Avatar } from '@mui/material';
import { loadTeamMembers, TeamMember } from '../utils/contentLoader';

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

// Styled components for team cards
const TeamCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)'
  }
}));

const TeamMemberAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: '0 auto 16px',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
}));

const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await loadTeamMembers();
        // Sort by order field
        const sortedMembers = [...members].sort((a, b) => a.order - b.order);
        setTeamMembers(sortedMembers);
      } catch (error) {
        console.error('Error loading team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

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

      {loading ? (
        <Typography>Loading team members...</Typography>
      ) : (
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamCard elevation={3}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <TeamMemberAvatar 
                    src={member.photo} 
                    alt={member.name}
                  />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TeamSection;