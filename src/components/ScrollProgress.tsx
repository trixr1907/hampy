import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  zIndex: 1000,
  backdropFilter: 'blur(10px)'
}));

const ProgressBar = styled(Box)<{ progress: number }>(({ theme, progress }) => ({
  height: '100%',
  width: `${progress}%`,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  transition: 'width 0.1s ease-out',
  boxShadow: `0 0 10px ${theme.palette.primary.main}50`
}));

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProgressContainer>
      <ProgressBar progress={scrollProgress} />
    </ProgressContainer>
  );
};

export default ScrollProgress;