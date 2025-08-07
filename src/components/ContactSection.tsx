// ContactSection.tsx - Komponente für den Kontaktbereich der Homepage
import React, { useState } from 'react';
import { Typography, Box, Container, Grid, TextField, Button, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(26, 26, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
    border: '1px solid rgba(0, 255, 255, 0.3)'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.2)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)'
  }
}));

const ContactInfoCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0, 255, 255, 0.2)'
  }
}));

const ContactIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 188, 212, 0.1)',
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
}));

// Typen für Formularfelder und Fehler
interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Fehler zurücksetzen, wenn Benutzer das Feld bearbeitet
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validieren
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
      isValid = false;
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    // Telefonnummer validieren (optional)
    if (formData.phone && !/^[+\d\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein';
      isValid = false;
    }

    // Nachricht validieren
    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Bitte geben Sie eine ausführlichere Nachricht ein';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Hier würde normalerweise ein API-Aufruf stehen
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simuliere API-Aufruf
      
      setSnackbar({
        open: true,
        message: 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.',
        severity: 'success'
      });
      
      // Formular zurücksetzen
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box id="contact" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionTitle className="neon-text">
          Kontaktieren Sie uns
        </SectionTitle>
        <SectionSubtitle>
          Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Unser Team steht Ihnen gerne zur Verfügung.
        </SectionSubtitle>
        
        <Grid container spacing={6}>
          {/* Kontaktformular */}
          <Grid item xs={12} md={7}>
            <StyledPaper>
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Senden Sie uns eine Nachricht
                </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Vollständiger Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="E-Mail-Adresse"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Firmenname"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Telefonnummer"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Projektdetails"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    placeholder="Erzählen Sie uns von Ihren Projektanforderungen..."
                    required
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                  </SubmitButton>
                </Grid>
              </Grid>
              </Box>
            </StyledPaper>
          </Grid>
          
          {/* Kontaktinformationen */}
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
                  Kontaktinformationen
                </Typography>
                
                <ContactInfoCard>
                  <ContactIconWrapper>
                    <LocationOnIcon fontSize="medium" />
                  </ContactIconWrapper>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technologiepark 8, 10115 Berlin, Deutschland
                    </Typography>
                  </Box>
                </ContactInfoCard>
                
                <ContactInfoCard>
                  <ContactIconWrapper>
                    <EmailIcon fontSize="medium" />
                  </ContactIconWrapper>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      E-Mail
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@ivo-tech.de
                    </Typography>
                  </Box>
                </ContactInfoCard>
                
                <ContactInfoCard>
                  <ContactIconWrapper>
                    <PhoneIcon fontSize="medium" />
                  </ContactIconWrapper>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Telefon
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +49 (0) 30 123 456 789
                    </Typography>
                  </Box>
                </ContactInfoCard>
              </Box>
              
              <Box sx={{ mt: 4, p: 3, borderRadius: '8px', backgroundColor: 'rgba(0, 188, 212, 0.1)', border: '1px dashed rgba(0, 255, 255, 0.3)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                  Geschäftszeiten
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Montag - Freitag: 9:00 - 18:00 Uhr
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wochenende: Geschlossen
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Erfolgsmeldung oder Fehlermeldung */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;