import React from 'react';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface GlassmorphismCardProps extends CardProps {
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
}

const StyledGlassCard = styled(Card)<{
  blur: number;
  opacity: number;
  borderOpacity: number;
}>(({ theme, blur, opacity, borderOpacity }) => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: `blur(${blur}px)`,
  border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    background: `rgba(255, 255, 255, ${Math.min(opacity + 0.1, 1)})`
  }
}));

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  blur = 10,
  opacity = 0.1,
  borderOpacity = 0.2,
  ...props
}) => {
  return (
    <StyledGlassCard
      blur={blur}
      opacity={opacity}
      borderOpacity={borderOpacity}
      {...props}
    >
      {children}
    </StyledGlassCard>
  );
};

export default GlassmorphismCard;