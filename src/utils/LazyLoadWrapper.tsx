// LazyLoadWrapper.tsx - Komponente für das verzögerte Laden von Inhalten zur Performance-Optimierung
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { Box, Skeleton, SxProps, Theme } from '@mui/material';

interface LazyLoadWrapperProps {
  children: ReactNode;
  height?: string | number;
  width?: string | number;
  threshold?: number;
  skeletonVariant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  skeletonAnimation?: 'pulse' | 'wave' | false;
  sx?: SxProps<Theme>;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  height = '100%',
  width = '100%',
  threshold = 0.1,
  skeletonVariant = 'rectangular',
  skeletonAnimation = 'pulse',
  sx = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  useEffect(() => {
    if (isVisible) {
      // Simulieren einer Ladezeit für einen sanften Übergang
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <Box ref={ref} sx={{ height, width, ...sx }}>
      {isVisible ? (
        <Box
          sx={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            height: '100%',
            width: '100%'
          }}
        >
          {children}
        </Box>
      ) : (
        <Skeleton
          variant={skeletonVariant}
          animation={skeletonAnimation}
          sx={{ height: '100%', width: '100%', borderRadius: '8px' }}
        />
      )}
    </Box>
  );
};

export default LazyLoadWrapper;
