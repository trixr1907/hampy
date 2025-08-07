// OptimizedImage.tsx - Komponente für optimierte Bilddarstellung mit Lazy Loading
import React, { useState } from 'react';
import { Box, Skeleton, SxProps, Theme } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sx?: SxProps<Theme>;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  sx = {},
  priority = false,
  loading = 'lazy',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...sx
      }}
      className={`optimized-image ${className}`}
    >
      {!isLoaded && !error && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 255, 255, 0.1)'
          }}
        />
      )}
      
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block'
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: 'text.secondary',
            fontSize: '0.75rem',
            borderRadius: '8px'
          }}
        >
          Bild konnte nicht geladen werden
        </Box>
      )}
    </Box>
  );
};

export default OptimizedImage;
