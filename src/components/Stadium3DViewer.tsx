import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SportsIcon from '@mui/icons-material/Sports';

const stadiumRotate = keyframes`
  0% { transform: rotateY(0deg) rotateX(5deg); }
  100% { transform: rotateY(360deg) rotateX(5deg); }
`;

const floodlightPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6);
    opacity: 0.9;
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.8);
    opacity: 1;
  }
`;

const crowdWave = keyframes`
  0%, 100% { transform: scaleY(1); }
  25% { transform: scaleY(1.1); }
  50% { transform: scaleY(1.05); }
  75% { transform: scaleY(1.15); }
`;

const StadiumContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '80vh',
  minHeight: '600px',
  perspective: '2000px',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  borderRadius: '20px',
  border: '2px solid rgba(59, 130, 246, 0.3)',
  boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
});

const Stadium3DModel = styled(Box)<{ 
  rotation: number; 
  zoom: number; 
  viewAngle: number;
  isNightMode: boolean;
}>(({ rotation, zoom, viewAngle, isNightMode }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '800px',
  height: '500px',
  transformStyle: 'preserve-3d',
  transform: `
    translate(-50%, -50%) 
    rotateX(${viewAngle}deg) 
    rotateY(${rotation}deg) 
    scale(${zoom})
  `,
  transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  filter: isNightMode ? 'brightness(0.7) contrast(1.2)' : 'brightness(1) contrast(1)'
}));

const StadiumBase = styled(Box)<{ isNightMode: boolean }>(({ isNightMode }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: isNightMode 
    ? `
      radial-gradient(ellipse at center, 
        rgba(34, 197, 94, 0.8) 0%, 
        rgba(22, 163, 74, 0.6) 30%, 
        rgba(21, 128, 61, 0.4) 60%, 
        rgba(20, 83, 45, 0.2) 100%
      )
    `
    : `
      radial-gradient(ellipse at center, 
        rgba(34, 197, 94, 1) 0%, 
        rgba(22, 163, 74, 0.9) 30%, 
        rgba(21, 128, 61, 0.7) 60%, 
        rgba(20, 83, 45, 0.5) 100%
      )
    `,
  borderRadius: '50%',
  border: '4px solid rgba(255, 255, 255, 0.3)',
  boxShadow: isNightMode 
    ? '0 0 60px rgba(34, 197, 94, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.3)'
    : '0 0 40px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    background: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18px,
        rgba(255, 255, 255, 0.1) 20px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 25px,
        rgba(255, 255, 255, 0.05) 27px
      )
    `,
    borderRadius: '50%'
  }
}));

const StadiumSeating = styled(Box)<{ section: number; isNightMode: boolean }>(({ section, isNightMode }) => ({
  position: 'absolute',
  width: '120%',
  height: '120%',
  top: '-10%',
  left: '-10%',
  borderRadius: '50%',
  background: `
    conic-gradient(
      from ${section * 90}deg,
      ${isNightMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 1)'} 0deg,
      ${isNightMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)'} 90deg,
      ${isNightMode ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 1)'} 180deg,
      ${isNightMode ? 'rgba(251, 191, 36, 0.8)' : 'rgba(251, 191, 36, 1)'} 270deg,
      ${isNightMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 1)'} 360deg
    )
  `,
  border: '3px solid rgba(255, 255, 255, 0.2)',
  boxShadow: isNightMode 
    ? 'inset 0 0 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)'
    : 'inset 0 0 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)',
  animation: `${crowdWave} 3s ease-in-out infinite`,
  animationDelay: `${section * 0.5}s`,
  transform: 'translateZ(-50px)'
}));

const Floodlight = styled(Box)<{ 
  position: { top?: string; bottom?: string; left?: string; right?: string };
  isActive: boolean;
}>(({ position, isActive }) => ({
  position: 'absolute',
  top: position.top,
  bottom: position.bottom,
  left: position.left,
  right: position.right,
  width: '20px',
  height: '40px',
  background: 'linear-gradient(180deg, #e5e7eb 0%, #9ca3af 100%)',
  borderRadius: '10px 10px 5px 5px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  transform: 'translateZ(100px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '50%',
    width: '30px',
    height: '30px',
    background: isActive 
      ? 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)'
      : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
    animation: isActive ? `${floodlightPulse} 2s ease-in-out infinite` : 'none'
  }
}));

const ControlPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(15, 23, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
  padding: theme.spacing(2),
  zIndex: 10
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  color: theme.palette.primary.main,
  margin: theme.spacing(0.5),
  border: '1px solid rgba(59, 130, 246, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease'
}));

const ViewModeButton = styled(IconButton)<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)',
  color: active ? theme.palette.primary.light : theme.palette.primary.main,
  margin: theme.spacing(0.5),
  border: `1px solid ${active ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.3)'}`,
  boxShadow: active ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease'
}));

const InfoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',
  background: 'rgba(15, 23, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '12px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
  padding: theme.spacing(3),
  maxWidth: '300px',
  zIndex: 10
}));

interface Stadium3DViewerProps {
  className?: string;
}

const Stadium3DViewer: React.FC<Stadium3DViewerProps> = ({ className }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewAngle, setViewAngle] = useState(15);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<'aerial' | 'ground'>('aerial');
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isAutoRotate) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoRotate]);

  const handleRotateLeft = () => {
    setIsAutoRotate(false);
    setRotation(prev => prev - 15);
  };

  const handleRotateRight = () => {
    setIsAutoRotate(false);
    setRotation(prev => prev + 15);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleViewModeChange = (mode: 'aerial' | 'ground') => {
    setViewMode(mode);
    if (mode === 'aerial') {
      setViewAngle(15);
      setZoom(1);
    } else {
      setViewAngle(5);
      setZoom(1.5);
    }
  };

  return (
    <StadiumContainer className={className}>
      <Stadium3DModel 
        rotation={rotation} 
        zoom={zoom} 
        viewAngle={viewAngle}
        isNightMode={isNightMode}
      >
        <StadiumBase isNightMode={isNightMode} />
        
        {/* Stadium Seating Sections */}
        {[0, 1, 2, 3].map(section => (
          <StadiumSeating 
            key={section} 
            section={section} 
            isNightMode={isNightMode}
          />
        ))}

        {/* Floodlights */}
        <Floodlight 
          position={{ top: '10%', left: '10%' }} 
          isActive={isNightMode} 
        />
        <Floodlight 
          position={{ top: '10%', right: '10%' }} 
          isActive={isNightMode} 
        />
        <Floodlight 
          position={{ bottom: '10%', left: '10%' }} 
          isActive={isNightMode} 
        />
        <Floodlight 
          position={{ bottom: '10%', right: '10%' }} 
          isActive={isNightMode} 
        />
      </Stadium3DModel>

      <InfoOverlay>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: '"Orbitron", monospace',
            mb: 2,
            textShadow: '0 0 10px currentColor'
          }}
        >
          Carl-Benz-Stadion
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Kapazität: 27,000 Zuschauer
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Eröffnet: 1994
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Heimat: SV Waldhof Mannheim
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modus: {isNightMode ? 'Nachtbeleuchtung' : 'Tageslicht'}
        </Typography>
      </InfoOverlay>

      <ControlPanel>
        <Stack direction="row" spacing={1} alignItems="center">
          <ViewModeButton
            active={viewMode === 'aerial'}
            onClick={() => handleViewModeChange('aerial')}
            title="Luftaufnahme"
          >
            <FlightTakeoffIcon />
          </ViewModeButton>
          
          <ViewModeButton
            active={viewMode === 'ground'}
            onClick={() => handleViewModeChange('ground')}
            title="Bodenperspektive"
          >
            <SportsIcon />
          </ViewModeButton>

          <ControlButton onClick={handleRotateLeft} title="Links drehen">
            <RotateLeftIcon />
          </ControlButton>

          <ControlButton onClick={handleRotateRight} title="Rechts drehen">
            <RotateRightIcon />
          </ControlButton>

          <ControlButton onClick={handleZoomIn} title="Vergrößern">
            <ZoomInIcon />
          </ControlButton>

          <ControlButton onClick={handleZoomOut} title="Verkleinern">
            <ZoomOutIcon />
          </ControlButton>

          <ControlButton 
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title={isAutoRotate ? 'Auto-Rotation stoppen' : 'Auto-Rotation starten'}
            sx={{ 
              backgroundColor: isAutoRotate ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.1)',
              color: isAutoRotate ? 'success.main' : 'primary.main'
            }}
          >
            <CameraAltIcon />
          </ControlButton>

          <ControlButton 
            onClick={() => setIsNightMode(!isNightMode)}
            title={isNightMode ? 'Tagesmodus' : 'Nachtmodus'}
            sx={{ 
              backgroundColor: isNightMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(59, 130, 246, 0.1)',
              color: isNightMode ? 'warning.main' : 'primary.main'
            }}
          >
            💡
          </ControlButton>
        </Stack>
      </ControlPanel>
    </StadiumContainer>
  );
};

export default Stadium3DViewer;