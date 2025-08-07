import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(4)
}));

const ErrorIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
  opacity: 0.6
}));

const RetryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <Container maxWidth="sm">
            <ErrorIcon>⚠️</ErrorIcon>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontFamily: '"Space Grotesk", sans-serif'
              }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              We're sorry for the inconvenience. An unexpected error occurred 
              while loading the page. Please try refreshing the page.
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Typography 
                variant="body2" 
                color="error"
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            <RetryButton
              onClick={this.handleRetry}
              startIcon={<RefreshIcon />}
            >
              Refresh Page
            </RetryButton>
          </Container>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;