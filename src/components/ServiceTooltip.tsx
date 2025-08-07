// ServiceTooltip.tsx - Komponente für die Anzeige von Dienstleistungsdetails als Tooltip
import React from 'react';
import { Tooltip, TooltipProps, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'rgba(26, 26, 42, 0.95)',
    color: 'white',
    fontSize: '0.875rem',
    borderRadius: '12px',
    padding: '16px',
    maxWidth: '320px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.2)',
    fontWeight: 500,
    lineHeight: 1.4,
    border: '1px solid rgba(0, 255, 255, 0.3)'
  },
  '& .MuiTooltip-arrow': {
    color: 'rgba(26, 26, 42, 0.95)'
  }
}));

// Service-Typ-Definition
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

// ServiceTooltip-Props-Definition
export interface ServiceTooltipProps {
  service: Service;
}

const ServiceTooltip: React.FC<ServiceTooltipProps> = ({ service }) => {
  // Erstelle den Tooltip-Inhalt mit den Service-Details
  const tooltipContent = (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
        {service.title} - Details
      </Typography>
      <List dense sx={{ p: 0 }}>
        {service.details.map((detail, index) => (
          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: '30px', color: 'primary.main' }}>
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={detail} sx={{ m: 0 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <StyledTooltip 
      arrow 
      placement="top"
      enterDelay={300}
      leaveDelay={200}
      title={tooltipContent}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          textAlign: 'center',
          color: 'primary.main',
          cursor: 'pointer',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Details anzeigen
      </Typography>
    </StyledTooltip>
  );
};

export default ServiceTooltip;