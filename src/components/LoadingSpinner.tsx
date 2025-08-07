import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  animation: `${fadeIn} 0.5s ease-in-out`
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2)
}));

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <LoadingContainer>
      <StyledCircularProgress size={60} thickness={4} />
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          fontWeight: 500,
          fontFamily: '"Inter", sans-serif'
        }}
      >
        {message}
      </Typography>
    </LoadingContainer>
  );
};

export default LoadingSpinner;