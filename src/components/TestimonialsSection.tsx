// TestimonialsSection.tsx - Komponente für den Testimonials-Bereich der Homepage
import React, { useState } from 'react';
import { Typography, Container, Grid, Box, Card, CardContent, Avatar, Rating, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Testimonial-Daten
const testimonials = [
  {
    id: 1,
    name: 'Michael Schmidt',
    position: 'CTO, TechVision GmbH',
    avatar: '/avatars/michael.jpg',
    rating: 5,
    text: 'IVO-TECH hat unsere veraltete Webanwendung komplett modernisiert und in eine leistungsstarke, skalierbare Plattform verwandelt. Die Reaktionszeiten haben sich um 70% verbessert und unsere Nutzer sind begeistert. Ein hervorragendes Team mit tiefem technischen Know-how.'
  },
  {
    id: 2,
    name: 'Laura Müller',
    position: 'Geschäftsführerin, Digital Solutions',
    avatar: '/avatars/laura.jpg',
    rating: 5,
    text: 'Die Zusammenarbeit mit IVO-TECH war von Anfang an professionell und zielorientiert. Sie haben nicht nur unsere technischen Anforderungen verstanden, sondern auch wertvolle Vorschläge zur Verbesserung unserer Geschäftsprozesse eingebracht. Das Ergebnis übertraf unsere Erwartungen.'
  },
  {
    id: 3,
    name: 'Thomas Weber',
    position: 'Produktmanager, InnoSoft AG',
    avatar: '/avatars/thomas.jpg',
    rating: 4,
    text: 'Wir haben IVO-TECH für die Entwicklung unserer mobilen App beauftragt und waren mit dem Ergebnis sehr zufrieden. Das Team war flexibel, reaktionsschnell und hat alle Fristen eingehalten. Die App funktioniert einwandfrei und erhält positive Bewertungen im App Store.'
  },
  {
    id: 4,
    name: 'Sabine Krause',
    position: 'Marketing Direktorin, BrandBoost',
    avatar: '/avatars/sabine.jpg',
    rating: 5,
    text: 'Die von IVO-TECH entwickelte E-Commerce-Plattform hat unseren Online-Umsatz um 45% gesteigert. Die Integration mit unseren bestehenden Systemen verlief reibungslos und das Support-Team ist immer zur Stelle, wenn wir Hilfe benötigen. Eine klare Empfehlung!'
  },
  {
    id: 5,
    name: 'Andreas Becker',
    position: 'Gründer, StartUp Innovate',
    avatar: '/avatars/andreas.jpg',
    rating: 5,
    text: 'Als Startup mit begrenztem Budget waren wir besorgt über die Kosten einer maßgeschneiderten Softwarelösung. IVO-TECH hat uns jedoch eine skalierbare Lösung angeboten, die mit unserem Wachstum mitwächst. Ihr agiler Ansatz und ihre transparente Kommunikation haben uns überzeugt.'
  },
  {
    id: 6,
    name: 'Julia Hoffmann',
    position: 'IT-Leiterin, MedTech Solutions',
    avatar: '/avatars/julia.jpg',
    rating: 4,
    text: 'Die Cloud-Migration unserer sensiblen medizinischen Daten war ein komplexes Projekt, das IVO-TECH mit höchster Professionalität und Sorgfalt durchgeführt hat. Alle Sicherheits- und Compliance-Anforderungen wurden erfüllt, und wir konnten unsere Betriebskosten erheblich senken.'
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

const TestimonialCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  backgroundColor: 'rgba(26, 26, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  overflow: 'visible',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.5)'
  }
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: '-20px',
  left: '20px',
  fontSize: '40px',
  color: theme.palette.primary.main,
  transform: 'rotate(180deg)',
  opacity: 0.8
}));

const CustomerAvatar = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 10px ${theme.palette.primary.main}`
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 188, 212, 0.1)',
  border: '1px solid rgba(0, 188, 212, 0.3)',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    boxShadow: '0 0 15px rgba(0, 188, 212, 0.5)'
  }
}));

const TestimonialsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pageCount - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : 0));
  };
  
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <Box id="testimonials" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionTitle className="neon-text">
          Was unsere Kunden sagen
        </SectionTitle>
        <SectionSubtitle>
          Vertrauen Sie nicht nur unserem Wort. Hier ist, was unsere Kunden über die Zusammenarbeit mit uns sagen.
        </SectionSubtitle>
        
        <Grid container spacing={4}>
          {currentTestimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <TestimonialCard>
                <QuoteIcon />
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', flexGrow: 1 }}>
                    {testimonial.text}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CustomerAvatar src={testimonial.avatar} alt={testimonial.name}>
                      {testimonial.name.charAt(0)}
                    </CustomerAvatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {testimonial.position}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
        
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <NavigationButton onClick={handlePrevPage} aria-label="Vorherige Seite">
              <ArrowBackIosNewIcon fontSize="small" />
            </NavigationButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {[...Array(pageCount)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentPage ? 'primary.main' : 'rgba(0, 188, 212, 0.3)',
                    boxShadow: index === currentPage ? '0 0 10px rgba(0, 188, 212, 0.8)' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </Box>
            <NavigationButton onClick={handleNextPage} aria-label="Nächste Seite">
              <ArrowForwardIosIcon fontSize="small" />
            </NavigationButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;