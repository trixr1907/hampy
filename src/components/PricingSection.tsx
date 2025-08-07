// PricingSection.tsx - Komponente für den Preisbereich der Homepage
import React, { useState } from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, CardActions, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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

const PricingCard = styled(Card)<{ featured?: boolean }>(({ featured }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  backgroundColor: featured ? 'rgba(0, 188, 212, 0.1)' : 'rgba(26, 26, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  border: featured ? '2px solid rgba(0, 188, 212, 0.5)' : '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: featured ? '0 0 30px rgba(0, 188, 212, 0.3)' : '0 0 20px rgba(0, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  position: 'relative',
  transform: featured ? 'scale(1.05)' : 'scale(1)',
  zIndex: featured ? 2 : 1,
  '&:hover': {
    transform: featured ? 'scale(1.08)' : 'scale(1.03)',
    boxShadow: featured ? '0 0 40px rgba(0, 188, 212, 0.4)' : '0 0 30px rgba(0, 255, 255, 0.3)'
  }
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center'
}));

const PlanTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  fontFamily: '"Orbitron", monospace',
  marginBottom: theme.spacing(2),
  textAlign: 'center'
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& svg': {
    marginRight: theme.spacing(1),
    fontSize: '1.25rem'
  }
}));

const BillingToggle = styled(FormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiSwitch-root': {
    width: 62,
    height: 34,
    padding: 7
  },
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8
      }
    }
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
}));

const FeaturedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: -30,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: '5px 30px',
  transform: 'rotate(45deg)',
  fontSize: '0.875rem',
  fontWeight: 600,
  boxShadow: '0 0 10px rgba(0, 188, 212, 0.5)',
  zIndex: 10
}));

// Preispläne
const pricingPlans = [
  {
    id: 'basic',
    title: 'Basis',
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    description: 'Ideal für kleine Unternehmen und Startups',
    features: [
      { text: 'Responsive Website', included: true },
      { text: 'Bis zu 5 Unterseiten', included: true },
      { text: 'Kontaktformular', included: true },
      { text: 'SEO-Grundoptimierung', included: true },
      { text: 'Content Management System', included: false },
      { text: 'E-Commerce-Funktionalität', included: false },
      { text: 'Benutzerdefinierte Funktionen', included: false },
      { text: 'Premium Support', included: false }
    ],
    buttonText: 'Auswählen',
    featured: false
  },
  {
    id: 'professional',
    title: 'Professional',
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    description: 'Perfekt für wachsende Unternehmen',
    features: [
      { text: 'Responsive Website', included: true },
      { text: 'Bis zu 15 Unterseiten', included: true },
      { text: 'Kontaktformular', included: true },
      { text: 'SEO-Grundoptimierung', included: true },
      { text: 'Content Management System', included: true },
      { text: 'E-Commerce-Funktionalität', included: true },
      { text: 'Benutzerdefinierte Funktionen', included: false },
      { text: 'Premium Support', included: false }
    ],
    buttonText: 'Empfohlen',
    featured: true
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    description: 'Für große Unternehmen mit komplexen Anforderungen',
    features: [
      { text: 'Responsive Website', included: true },
      { text: 'Unbegrenzte Unterseiten', included: true },
      { text: 'Kontaktformular', included: true },
      { text: 'SEO-Grundoptimierung', included: true },
      { text: 'Content Management System', included: true },
      { text: 'E-Commerce-Funktionalität', included: true },
      { text: 'Benutzerdefinierte Funktionen', included: true },
      { text: 'Premium Support', included: true }
    ],
    buttonText: 'Kontaktieren',
    featured: false
  }
];

const PricingSection: React.FC = () => {
  const [yearlyBilling, setYearlyBilling] = useState(false);
  
  const handleBillingChange = () => {
    setYearlyBilling(!yearlyBilling);
  };
  
  // Preisformatierung für die Anzeige
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Box id="pricing" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionTitle className="neon-text">
          Unsere Preise
        </SectionTitle>
        <SectionSubtitle>
          Transparente Preisgestaltung ohne versteckte Kosten. Wählen Sie den Plan, der am besten zu Ihren Anforderungen passt.
        </SectionSubtitle>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <BillingToggle
            control={
              <Switch
                checked={yearlyBilling}
                onChange={handleBillingChange}
                name="billingToggle"
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 1, color: !yearlyBilling ? 'primary.main' : 'text.secondary' }}>
                  Monatlich
                </Typography>
                <Typography sx={{ ml: 1, color: yearlyBilling ? 'primary.main' : 'text.secondary' }}>
                  Jährlich (10% Rabatt)
                </Typography>
              </Box>
            }
          />
        </Box>
        
        <Grid container spacing={4} sx={{ position: 'relative' }}>
          {pricingPlans.map((plan) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={plan.id}
              sx={{
                display: 'flex',
                mt: plan.featured ? { xs: 4, md: 0 } : 0
              }}
            >
              <PricingCard featured={plan.featured}>
                {plan.featured && <FeaturedBadge>Beliebt</FeaturedBadge>}
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <PlanTitle color={plan.featured ? 'primary.main' : 'text.primary'}>
                    {plan.title}
                  </PlanTitle>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    {plan.description}
                  </Typography>
                  
                  <PriceTag>
                    <Typography variant="h6" component="span" sx={{ mt: 0.5, mr: 0.5, fontSize: '1rem' }}>
                      €
                    </Typography>
                    {formatPrice(yearlyBilling 
                      ? Math.floor(plan.yearlyPrice / 12)
                      : plan.monthlyPrice
                    )}
                  </PriceTag>
                  
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    pro Monat
                    {yearlyBilling && ' (jährliche Zahlung)'}
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {plan.features.map((feature, index) => (
                      <FeatureItem key={index}>
                        {feature.included ? (
                          <CheckIcon sx={{ color: 'success.main' }} />
                        ) : (
                          <CloseIcon sx={{ color: 'text.disabled' }} />
                        )}
                        <Typography 
                          variant="body2" 
                          color={feature.included ? 'text.primary' : 'text.disabled'}
                        >
                          {feature.text}
                        </Typography>
                      </FeatureItem>
                    ))}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button 
                    variant={plan.featured ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      py: 1.5,
                      borderRadius: '8px',
                      boxShadow: plan.featured ? '0 0 20px rgba(0, 188, 212, 0.4)' : 'none'
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardActions>
              </PricingCard>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Alle Pläne beinhalten kostenlose Beratung und Projektplanung. 
            <br />
            Benötigen Sie etwas Individuelles? <strong>Kontaktieren Sie uns</strong> für ein personalisiertes Angebot.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;