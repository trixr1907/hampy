import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Erweiterte Animationen für dynamischen Hintergrund
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-40px) rotate(120deg); }
  66% { transform: translateY(20px) rotate(240deg); }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
    filter: hue-rotate(0deg);
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.2);
    filter: hue-rotate(180deg);
  }
`;

const drift = keyframes`
  0% { transform: translateX(-100px); }
  100% { transform: translateX(calc(100vw + 100px)); }
`;

const orbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(200px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(200px) rotate(-360deg);
  }
`;

const colorShift = keyframes`
  0% { 
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    filter: hue-rotate(0deg);
  }
  25% { 
    background: radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%);
    filter: hue-rotate(90deg);
  }
  50% { 
    background: radial-gradient(circle, rgba(0, 128, 255, 0.1) 0%, transparent 70%);
    filter: hue-rotate(180deg);
  }
  75% { 
    background: radial-gradient(circle, rgba(255, 255, 0, 0.1) 0%, transparent 70%);
    filter: hue-rotate(270deg);
  }
  100% { 
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    filter: hue-rotate(360deg);
  }
`;

const waveMotion = keyframes`
  0%, 100% { 
    transform: translateY(0px) scaleY(1);
  }
  50% { 
    transform: translateY(-20px) scaleY(1.1);
  }
`;

const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -2,
  pointerEvents: 'none'
});

const FloatingShape = styled(Box)<{ 
  delay: number; 
  duration: number; 
  size: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}>(({ theme, delay, duration, size, timeOfDay }) => {
  const getColorByTime = () => {
    switch (timeOfDay) {
      case 'morning':
        return `linear-gradient(135deg, ${theme.palette.warning.main}20, ${theme.palette.info.main}15)`;
      case 'afternoon':
        return `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`;
      case 'evening':
        return `linear-gradient(135deg, ${theme.palette.secondary.main}25, ${theme.palette.error.main}15)`;
      case 'night':
        return `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.info.main}10)`;
      default:
        return `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.dark}10)`;
    }
  };

  return {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: getColorByTime(),
    animation: `${float} ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
    transition: 'all 2s ease-in-out'
  };
});

const PulsingOrb = styled(Box)<{ 
  delay: number; 
  top: string; 
  left: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}>(({ theme, delay, top, left, timeOfDay }) => {
  const getOrbColor = () => {
    switch (timeOfDay) {
      case 'morning':
        return `radial-gradient(circle, ${theme.palette.warning.main}20, transparent 70%)`;
      case 'afternoon':
        return `radial-gradient(circle, ${theme.palette.primary.main}20, transparent 70%)`;
      case 'evening':
        return `radial-gradient(circle, ${theme.palette.secondary.main}25, transparent 70%)`;
      case 'night':
        return `radial-gradient(circle, ${theme.palette.info.main}15, transparent 70%)`;
      default:
        return `radial-gradient(circle, ${theme.palette.primary.main}15, transparent 70%)`;
    }
  };

  return {
    position: 'absolute',
    top,
    left,
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: getOrbColor(),
    animation: `${pulse} 6s ease-in-out infinite, ${colorShift} 20s linear infinite`,
    animationDelay: `${delay}s`,
    transition: 'all 3s ease-in-out'
  };
});

const DriftingParticle = styled(Box)<{ 
  delay: number; 
  top: string; 
  duration: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}>(({ theme, delay, top, duration, timeOfDay }) => {
  const getParticleColor = () => {
    switch (timeOfDay) {
      case 'morning':
        return theme.palette.warning.main;
      case 'afternoon':
        return theme.palette.primary.main;
      case 'evening':
        return theme.palette.secondary.main;
      case 'night':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    position: 'absolute',
    top,
    left: '-100px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: getParticleColor(),
    opacity: 0.8,
    animation: `${drift} ${duration}s linear infinite`,
    animationDelay: `${delay}s`,
    boxShadow: `0 0 10px ${getParticleColor()}`,
    transition: 'all 2s ease-in-out'
  };
});

const OrbitingElement = styled(Box)<{ 
  delay: number;
  radius: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}>(({ theme, delay, radius, timeOfDay }) => {
  const getElementColor = () => {
    switch (timeOfDay) {
      case 'morning':
        return theme.palette.warning.main;
      case 'afternoon':
        return theme.palette.primary.main;
      case 'evening':
        return theme.palette.secondary.main;
      case 'night':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: getElementColor(),
    animation: `${orbit} ${20 + delay * 2}s linear infinite`,
    animationDelay: `${delay}s`,
    transformOrigin: `${radius}px 0`,
    opacity: 0.6,
    boxShadow: `0 0 15px ${getElementColor()}`,
    transition: 'all 2s ease-in-out'
  };
});

const WaveLayer = styled(Box)<{
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}>(({ theme, timeOfDay }) => {
  const getWaveGradient = () => {
    switch (timeOfDay) {
      case 'morning':
        return `linear-gradient(45deg, ${theme.palette.warning.main}05, ${theme.palette.info.main}03)`;
      case 'afternoon':
        return `linear-gradient(45deg, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}03)`;
      case 'evening':
        return `linear-gradient(45deg, ${theme.palette.secondary.main}08, ${theme.palette.error.main}04)`;
      case 'night':
        return `linear-gradient(45deg, ${theme.palette.info.main}04, ${theme.palette.primary.main}02)`;
      default:
        return `linear-gradient(45deg, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}03)`;
    }
  };

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: getWaveGradient(),
    animation: `${waveMotion} 8s ease-in-out infinite`,
    transition: 'all 3s ease-in-out'
  };
});

const EnhancedAnimatedBackground: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');

  // Dynamische Tageszeit basierend auf aktueller Zeit
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon');
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('evening');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update jede Minute

    return () => clearInterval(interval);
  }, []);

  // Zyklischer Wechsel alle 30 Sekunden für Demo-Zwecke
  useEffect(() => {
    const timeStates: ('morning' | 'afternoon' | 'evening' | 'night')[] = ['morning', 'afternoon', 'evening', 'night'];
    let currentIndex = 0;

    const cycleInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % timeStates.length;
      setTimeOfDay(timeStates[currentIndex]);
    }, 30000); // Wechsel alle 30 Sekunden

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <BackgroundContainer>
      {/* Wellenförmige Hintergrundschicht */}
      <WaveLayer timeOfDay={timeOfDay} />
      
      {/* Schwebende Formen */}
      <FloatingShape delay={0} duration={8} size={100} timeOfDay={timeOfDay} sx={{ top: '15%', left: '10%' }} />
      <FloatingShape delay={2} duration={10} size={80} timeOfDay={timeOfDay} sx={{ top: '70%', left: '85%' }} />
      <FloatingShape delay={4} duration={9} size={120} timeOfDay={timeOfDay} sx={{ top: '85%', left: '15%' }} />
      <FloatingShape delay={1} duration={11} size={60} timeOfDay={timeOfDay} sx={{ top: '25%', left: '75%' }} />
      <FloatingShape delay={3} duration={7} size={140} timeOfDay={timeOfDay} sx={{ top: '45%', left: '5%' }} />
      <FloatingShape delay={5} duration={12} size={90} timeOfDay={timeOfDay} sx={{ top: '60%', left: '60%' }} />

      {/* Pulsierende Orbs */}
      <PulsingOrb delay={0} top="20%" left="65%" timeOfDay={timeOfDay} />
      <PulsingOrb delay={3} top="75%" left="8%" timeOfDay={timeOfDay} />
      <PulsingOrb delay={6} top="40%" left="88%" timeOfDay={timeOfDay} />
      <PulsingOrb delay={9} top="10%" left="30%" timeOfDay={timeOfDay} />

      {/* Driftende Partikel */}
      {Array.from({ length: 25 }, (_, i) => (
        <DriftingParticle
          key={i}
          delay={i * 1.5}
          top={`${Math.random() * 100}%`}
          duration={25 + Math.random() * 15}
          timeOfDay={timeOfDay}
        />
      ))}

      {/* Kreisende Elemente */}
      {Array.from({ length: 8 }, (_, i) => (
        <OrbitingElement
          key={i}
          delay={i * 2}
          radius={150 + i * 30}
          timeOfDay={timeOfDay}
        />
      ))}

      {/* Zusätzliche atmosphärische Effekte */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(0, 128, 255, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 80% 90%, rgba(255, 255, 0, 0.04) 0%, transparent 30%)
          `,
          animation: `${colorShift} 25s linear infinite`,
          transition: 'all 3s ease-in-out'
        }}
      />

      {/* Subtile Gitter-Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
          animation: `${waveMotion} 15s ease-in-out infinite`
        }}
      />
    </BackgroundContainer>
  );
};

export default EnhancedAnimatedBackground;