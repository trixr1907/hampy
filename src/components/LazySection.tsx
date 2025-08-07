import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Box, Skeleton } from '@mui/material';

interface LazySectionProps {
  children: ReactNode;
  height?: number;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  height = 400, 
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasLoaded]);

  if (!isVisible) {
    return (
      <Box ref={elementRef} sx={{ height: `${height}px` }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          sx={{ borderRadius: '12px' }}
        />
      </Box>
    );
  }

  return (
    <Box ref={elementRef}>
      {children}
    </Box>
  );
};

export default LazySection;