import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animationen für erweiterte Effekte
const particleFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% { 
    transform: translateY(-20px) translateX(10px) rotate(90deg);
    opacity: 1;
  }
  50% { 
    transform: translateY(-10px) translateX(-15px) rotate(180deg);
    opacity: 0.8;
  }
  75% { 
    transform: translateY(15px) translateX(5px) rotate(270deg);
    opacity: 0.9;
  }
`;

const dataStream = keyframes`
  0% {
    transform: translateX(-100%) scaleX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0%) scaleX(1);
  }
  100% {
    transform: translateX(100%) scaleX(0);
    opacity: 0;
  }
`;

const holographicWave = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg) brightness(1);
  }
  25% { 
    background-position: 25% 25%;
    filter: hue-rotate(90deg) brightness(1.2);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(180deg) brightness(0.8);
  }
  75% { 
    background-position: 75% 75%;
    filter: hue-rotate(270deg) brightness(1.1);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg) brightness(1);
  }
`;

const neuralNetwork = keyframes`
  0% {
    stroke-dashoffset: 1000;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: 500;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
`;

// Styled Components
const BackgroundContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  overflow: 'hidden',
  pointerEvents: 'none'
}));

const HolographicLayer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 10%, rgba(0, 128, 255, 0.1) 0%, transparent 60%),
    radial-gradient(circle at 10% 90%, rgba(255, 215, 0, 0.08) 0%, transparent 40%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)
  `,
  backgroundSize: '400% 400%',
  animation: `${holographicWave} 20s ease-in-out infinite`
}));

const GridLayer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 98px,
      rgba(0, 255, 255, 0.03) 100px,
      transparent 102px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 98px,
      rgba(255, 0, 255, 0.03) 100px,
      transparent 102px
    )
  `,
  opacity: 0.6
}));

const ParticleLayer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

const Particle = styled(Box)<{ delay: number; size: number; color: string }>(({ delay, size, color }) => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  backgroundColor: color,
  borderRadius: '50%',
  boxShadow: `0 0 ${size * 2}px ${color}`,
  animation: `${particleFloat} ${8 + delay}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  opacity: 0.7
}));

const DataStreamLine = styled(Box)<{ delay: number; height: string }>(({ delay, height }) => ({
  position: 'absolute',
  width: '2px',
  height,
  background: 'linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.8), transparent)',
  animation: `${dataStream} 4s linear infinite`,
  animationDelay: `${delay}s`
}));

const NeuralNetworkSVG = styled('svg')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0.2
}));

const Enhanced3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating Orbs Animation
    const orbs: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Create orbs
    for (let i = 0; i < 15; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

        // Draw orb with glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 3);
        gradient.addColorStop(0, `${orb.color}${Math.floor(orb.alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines
        orbs.forEach(otherOrb => {
          const distance = Math.sqrt(
            Math.pow(orb.x - otherOrb.x, 2) + Math.pow(orb.y - otherOrb.y, 2)
          );

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(orb.x, orb.y);
            ctx.lineTo(otherOrb.x, otherOrb.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    size: Math.random() * 4 + 1,
    color: Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 0, 255, 0.6)',
    top: Math.random() * 100,
    left: Math.random() * 100
  }));

  // Generate data streams
  const dataStreams = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    height: `${Math.random() * 200 + 100}px`,
    left: Math.random() * 100,
    top: Math.random() * 100
  }));

  return (
    <BackgroundContainer>
      {/* Base Holographic Layer */}
      <HolographicLayer />
      
      {/* Grid Overlay */}
      <GridLayer />
      
      {/* Canvas for Dynamic Effects */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Floating Particles */}
      <ParticleLayer>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            delay={particle.delay}
            size={particle.size}
            color={particle.color}
            sx={{
              top: `${particle.top}%`,
              left: `${particle.left}%`
            }}
          />
        ))}
      </ParticleLayer>

      {/* Data Streams */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {dataStreams.map(stream => (
          <DataStreamLine
            key={stream.id}
            delay={stream.delay}
            height={stream.height}
            sx={{
              left: `${stream.left}%`,
              top: `${stream.top}%`
            }}
          />
        ))}
      </Box>

      {/* Neural Network SVG */}
      <NeuralNetworkSVG viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 0, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 128, 255, 0.3)" />
          </linearGradient>
        </defs>
        
        {/* Neural Network Connections */}
        <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none">
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            strokeDasharray="10,5"
            style={{
              animation: `${neuralNetwork} 8s ease-in-out infinite`
            }}
          />
          <path
            d="M150,400 Q350,300 550,400 T950,400"
            strokeDasharray="8,3"
            style={{
              animation: `${neuralNetwork} 10s ease-in-out infinite`,
              animationDelay: '2s'
            }}
          />
          <path
            d="M200,600 Q400,500 600,600 T1000,600"
            strokeDasharray="12,4"
            style={{
              animation: `${neuralNetwork} 12s ease-in-out infinite`,
              animationDelay: '4s'
            }}
          />
        </g>
        
        {/* Neural Nodes */}
        <g fill="rgba(0, 255, 255, 0.4)">
          <circle cx="100" cy="200" r="4" />
          <circle cx="500" cy="200" r="4" />
          <circle cx="900" cy="200" r="4" />
          <circle cx="150" cy="400" r="4" />
          <circle cx="550" cy="400" r="4" />
          <circle cx="950" cy="400" r="4" />
          <circle cx="200" cy="600" r="4" />
          <circle cx="600" cy="600" r="4" />
          <circle cx="1000" cy="600" r="4" />
        </g>
      </NeuralNetworkSVG>
    </BackgroundContainer>
  );
};

export default Enhanced3DBackground;