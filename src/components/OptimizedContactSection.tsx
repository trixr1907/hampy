// OptimizedContactSection.tsx - Moderne Kontakt-Sektion mit verbesserter UX
import React, { useState, useRef, useEffect } from 'react';
import { 
  Typography, Box, Container, Grid, TextField, Button, Paper, 
  Snackbar, Alert, CircularProgress, Stack, IconButton 
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Erweiterte Animationen
const formFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`;

const socialPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
  }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: `
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, transparent 0%, rgba(0, 128, 255, 0.05) 50%, transparent 100%)
  `,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        rgba(0, 255, 255, 0.02) 60deg,
        transparent 120deg
      )
    `,
    zIndex: 1
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
  position: 'relative',
  zIndex: 2
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  position: 'relative',
  zIndex: 2
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(25px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(0, 255, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.05)
  `,
  animation: `${formFloat} 8s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(0, 255, 255, 0.4)',
    boxShadow: `
      0 25px 80px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(0, 255, 255, 0.2),
      inset 0 0 30px rgba(255, 255, 255, 0.1)
    `
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.3)',
      borderWidth: '1px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.6)',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    fontSize: '1rem'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '1.125rem',
  textTransform: 'none',
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
  color: '#ffffff',
  border: 'none',
  boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.info.light})`,
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-3px) scale(1.02)'
  },
  '&.Mui-disabled': {
    background: 'rgba(0, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)'
  }
}));

const ContactInfoCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: 'rgba(26, 26, 42, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.4)',
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.3)'
  }
}));

const ContactIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent)',
  border: '2px solid rgba(0, 255, 255, 0.3)',
  marginRight: theme.spacing(3),
  color: theme.palette.primary.main,
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  animation: `${socialPulse} 4s ease-in-out infinite`
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.text.secondary,
  margin: theme.spacing(0.5),
  border: '1px solid rgba(0, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    color: theme.palette.primary.main,
    transform: 'translateY(-3px) scale(1.1)',
    boxShadow: '0 8px 25px rgba(0, 255, 255, 0.4)',
    border: '1px solid rgba(0, 255, 255, 0.5)'
  }
}));

// Form interfaces
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

const OptimizedContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    if (formData.phone && !/^[+\d\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein';
      isValid = false;
    }

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
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Vielen Dank für Ihre Nachricht! Ich werde mich schnellstmöglich bei Ihnen melden.',
        severity: 'success'
      });
      
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

  const socialLinks = [
    { icon: <EmailIcon />, url: 'mailto:info@ivo-tech.com', label: 'E-Mail' },
    { icon: <WhatsAppIcon />, url: 'https://wa.me/send?text=Hallo%20Ivo,%20ich%20habe%20deine%20Website%20besucht%20und%20m%C3%B6chte%20gerne%20Kontakt%20aufnehmen.', label: 'WhatsApp' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/yves-ivo', label: 'LinkedIn' },
    { icon: <GitHubIcon />, url: 'https://github.com/trixr1907', label: 'GitHub' },
    { icon: <TwitterIcon />, url: 'https://x.com/ivo_ma68', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/yvesm/', label: 'Instagram' }
  ];

  return (
    <SectionContainer id="contact" ref={sectionRef}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle 
          className="neon-text"
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          Kontakt
        </SectionTitle>
        <SectionSubtitle
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: '0.2s'
          }}
        >
          Bereit für Ihr nächstes Projekt? Lassen Sie uns gemeinsam etwas Außergewöhnliches erschaffen!
        </SectionSubtitle>
        
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <FormContainer
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transitionDelay: '0.4s'
              }}
            >
              <Box component="form" onSubmit={handleSubmit}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 700, 
                    color: 'primary.main',
                    fontFamily: '"Orbitron", monospace',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                  }}
                >
                  Projekt besprechen
                </Typography>
              
                <Grid container spacing={3}>
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
                      label="Unternehmen (optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Telefonnummer (optional)"
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
                      label="Projektbeschreibung"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      placeholder="Erzählen Sie mir von Ihrer Vision, Ihren Zielen und wie ich Ihnen helfen kann..."
                      required
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                    </SubmitButton>
                  </Grid>
                </Grid>
              </Box>
            </FormContainer>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                height: '100%',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transitionDelay: '0.6s'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 700, 
                  color: 'primary.main',
                  fontFamily: '"Orbitron", monospace',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }}
              >
                Direkter Kontakt
              </Typography>
              
              <ContactInfoCard>
                <ContactIconWrapper>
                  <EmailIcon fontSize="large" />
                </ContactIconWrapper>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    E-Mail
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                    info@ivo-tech.com
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
                    Antwort innerhalb von 24 Stunden
                  </Typography>
                </Box>
              </ContactInfoCard>
              
              <ContactInfoCard>
                <ContactIconWrapper>
                  <WhatsAppIcon fontSize="large" />
                </ContactIconWrapper>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                    WhatsApp Chat
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    sx={{ 
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                    onClick={() => window.open('https://wa.me/send?text=Hallo%20Ivo,%20ich%20habe%20deine%20Website%20besucht%20und%20m%C3%B6chte%20gerne%20Kontakt%20aufnehmen.')}
                  >
                    Chat starten
                  </Button>
                </Box>
              </ContactInfoCard>
              
              <Box sx={{ mt: 6, p: 3, borderRadius: '16px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2, textAlign: 'center' }}>
                  Folgen Sie mir
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                  {socialLinks.map((social, index) => (
                    <SocialButton
                      key={index}
                      onClick={() => window.open(social.url, '_blank')}
                      aria-label={social.label}
                      sx={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {social.icon}
                    </SocialButton>
                  ))}
                </Stack>
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
    </SectionContainer>
  );
};

export default OptimizedContactSection;