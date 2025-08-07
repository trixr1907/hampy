import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
}

const ParallaxContainer = styled(Box)<{ transform: string }>(({ transform }) => ({
  transform,
  transition: 'transform 0.1s ease-out'
}));

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5, 
  offset = 0 
}) => {
  const [transform, setTransform] = useState('translateY(0px)');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * -speed;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setTransform(`translateY(${rate + offset}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return (
    <ParallaxContainer ref={elementRef} transform={transform}>
      {children}
    </ParallaxContainer>
  );
};

export default ParallaxSection;