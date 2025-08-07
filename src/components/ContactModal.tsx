// ContactModal.tsx - Modal-Komponente für Kontaktformular mit Validierung und Formularlogik
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
      isValid = false;
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Erfolgreiche Übermittlung
      setSubmitStatus({
        success: true,
        message: 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.'
      });
      
      // Formular zurücksetzen
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      // Fehler bei der Übermittlung
      setSubmitStatus({
        success: false,
        message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({});
      setSubmitStatus(null);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          background: 'linear-gradient(to bottom right, rgba(10, 10, 30, 0.95), rgba(10, 10, 30, 0.98))',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ 
          fontFamily: '"Orbitron", monospace',
          color: 'primary.main',
          fontWeight: 700,
          textShadow: '0 0 8px currentColor'
        }}>
          Kontaktieren Sie uns
        </Typography>
        <IconButton onClick={handleClose} disabled={isSubmitting}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        {submitStatus && (
          <Alert 
            severity={submitStatus.success ? 'success' : 'error'}
            sx={{ mb: 3 }}
          >
            {submitStatus.message}
          </Alert>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isSubmitting}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-Mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSubmitting}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Telefon (optional)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              disabled={isSubmitting}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nachricht"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              disabled={isSubmitting}
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, borderTop: '1px solid rgba(0, 255, 255, 0.2)' }}>
        <Button 
          onClick={handleClose} 
          disabled={isSubmitting}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Abbrechen
        </Button>
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? null : <SendIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              background: 'linear-gradient(45deg, #00adb5, #00fff5)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00c2cc, #00fff5)',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
              }
            }}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ContactModal;