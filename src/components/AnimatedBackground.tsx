import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(15px) rotate(240deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const drift = keyframes`
  0% { transform: translateX(-100px); }
  100% { transform: translateX(calc(100vw + 100px)); }
`;

const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  pointerEvents: 'none'
});

const FloatingShape = styled(Box)<{ delay: number; duration: number; size: number }>(
  ({ theme, delay, duration, size }) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.dark}10)`,
    animation: `${float} ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    backdropFilter: 'blur(1px)'
  })
);

const PulsingOrb = styled(Box)<{ delay: number; top: string; left: string }>(
  ({ theme, delay, top, left }) => ({
    position: 'absolute',
    top,
    left,
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}15, transparent 70%)`,
    animation: `${pulse} 4s ease-in-out infinite`,
    animationDelay: `${delay}s`
  })
);

const DriftingParticle = styled(Box)<{ delay: number; top: string; duration: number }>(
  ({ theme, delay, top, duration }) => ({
    position: 'absolute',
    top,
    left: '-100px',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
    animation: `${drift} ${duration}s linear infinite`,
    animationDelay: `${delay}s`
  })
);

const AnimatedBackground: React.FC = () => {
  return (
    <BackgroundContainer>
      {/* Floating Shapes */}
      <FloatingShape delay={0} duration={6} size={80} sx={{ top: '10%', left: '10%' }} />
      <FloatingShape delay={2} duration={8} size={60} sx={{ top: '60%', left: '80%' }} />
      <FloatingShape delay={4} duration={7} size={100} sx={{ top: '80%', left: '20%' }} />
      <FloatingShape delay={1} duration={9} size={40} sx={{ top: '30%', left: '70%' }} />
      <FloatingShape delay={3} duration={5} size={120} sx={{ top: '50%', left: '5%' }} />

      {/* Pulsing Orbs */}
      <PulsingOrb delay={0} top="20%" left="60%" />
      <PulsingOrb delay={2} top="70%" left="10%" />
      <PulsingOrb delay={4} top="40%" left="85%" />

      {/* Drifting Particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <DriftingParticle
          key={i}
          delay={i * 2}
          top={`${Math.random() * 100}%`}
          duration={20 + Math.random() * 10}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;