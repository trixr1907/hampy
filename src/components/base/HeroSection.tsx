// HeroSection.tsx - Unified Hero Section Component
import React, { memo, useState, useCallback } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseComponentProps, ComponentEventHandlers } from '../../types/ComponentTypes';
import { useVariantStyles, usePerformanceConfig } from '../../hooks/useVariantConfig';

/**
 * HeroSection-spezifische Props
 */
export interface HeroSectionProps extends BaseComponentProps, ComponentEventHandlers {
  /** Haupttitel */
  title: string;
  
  /** Untertitel (optional) */
  subtitle?: string;
  
  /** Call-to-Action Text */
  ctaText?: string;
  
  /** Sekundärer CTA Text */
  secondaryCTAText?: string;
  
  /** Hintergrundbild URL */
  backgroundImage?: string;
  
  /** Hintergrundbild Alt-Text */
  backgroundImageAlt?: string;
  
  /** CTA Click Handler */
  onCTAClick?: () => void;
  
  /** Sekundärer CTA Click Handler */
  onSecondaryCTAClick?: () => void;
  
  /** Scroll-to-Target für Auto-Scroll */
  scrollTarget?: string;
  
  /** Hero-Höhe */
  height?: 'viewport' | 'auto' | number;
  
  /** Content-Alignment */
  contentAlignment?: 'left' | 'center' | 'right';
  
  /** Parallax-Effekt aktivieren */
  enableParallax?: boolean;
  
  /** Video-Hintergrund URL */
  backgroundVideo?: string;
  
  /** Loading-State */
  loading?: boolean;
}

/**
 * Styled Components für HeroSection
 */
const HeroContainer = styled(Box, {
  shouldForwardProp: (prop) => !['variantStyles', 'height', 'enableParallax'].includes(prop as string)
})<{
  variantStyles: any;
  height: HeroSectionProps['height'];
  enableParallax: boolean;
}>(({ theme, variantStyles, height, enableParallax }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  
  // Höhe basierend auf Props
  minHeight: height === 'viewport' ? '100vh' : height === 'auto' ? 'auto' : `${height}px`,
  
  // Varianten-spezifische Styles
  ...variantStyles.container,
  
  // Parallax-Effekt
  ...(enableParallax && {
    willChange: 'transform',
    backfaceVisibility: 'hidden'
  }),
  
  // Hover-Effekte
  '&:hover': {
    ...variantStyles.hover
  },
  
  // Responsive Design
  [theme.breakpoints.down('md')]: {
    minHeight: height === 'viewport' ? '80vh' : 'auto',
    padding: theme.spacing(2)
  }
}));

const BackgroundMedia = styled(Box, {
  shouldForwardProp: (prop) => !['hasParallax'].includes(prop as string)
})<{ hasParallax: boolean }>(({ hasParallax }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  objectFit: 'cover',
  
  ...(hasParallax && {
    transform: 'translateZ(0)',
    willChange: 'transform'
  })
}));

const ContentContainer = styled(Container, {
  shouldForwardProp: (prop) => !['contentAlignment', 'variantStyles'].includes(prop as string)
})<{
  contentAlignment: HeroSectionProps['contentAlignment'];
  variantStyles: any;
}>(({ contentAlignment, variantStyles }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: contentAlignment,
  
  // Animation-Styles anwenden
  ...variantStyles.animations
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => !['variantStyles'].includes(prop as string)
})<{ variantStyles: any }>(({ theme, variantStyles }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  
  // Varianten-spezifische Text-Styles
  ...variantStyles.text.primary,
  
  // Responsive Typography
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)'
  }
}));

const HeroSubtitle = styled(Typography, {
  shouldForwardProp: (prop) => !['variantStyles'].includes(prop as string)
})<{ variantStyles: any }>(({ theme, variantStyles }) => ({
  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
  opacity: 0.9,
  
  // Varianten-spezifische Text-Styles
  ...variantStyles.text.secondary,
  
  // Responsive Typography
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    marginBottom: theme.spacing(3)
  }
}));

const CTAContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'inherit',
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const PrimaryCTA = styled(Button, {
  shouldForwardProp: (prop) => !['variantStyles'].includes(prop as string)
})<{ variantStyles: any }>(({ theme, variantStyles }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  fontSize: '1.125rem',
  fontWeight: 700,
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  
  // Varianten-spezifische Styles anwenden
  ...variantStyles.container,
  
  // Hover-Animation
  transition: variantStyles.animations?.transition || 'all 0.3s ease',
  
  '&:hover': {
    ...variantStyles.hover
  }
}));

/**
 * HeroSection - Unified Hero Component
 */
export const HeroSection: React.FC<HeroSectionProps> = memo(({
  variant = 'standard',
  theme = 'neon',
  title,
  subtitle,
  ctaText,
  secondaryCTAText,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideo,
  onCTAClick,
  onSecondaryCTAClick,
  scrollTarget,
  height = 'viewport',
  contentAlignment = 'center',
  enableParallax = false,
  loading = false,
  animations = true,
  performance = 'standard',
  className,
  style,
  testId,
  'aria-label': ariaLabel,
  ...eventHandlers
}) => {
  // Hooks für Styling und Performance
  const variantStyles = useVariantStyles(variant, theme);
  const performanceConfig = usePerformanceConfig(variant);
  
  // Local State für Interaktionen
  const [, setIsHovered] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  // Event Handlers
  const handleCTAClick = useCallback(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    onCTAClick?.();
  }, [scrollTarget, onCTAClick]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    eventHandlers.onHover?.(true);
  }, [eventHandlers]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    eventHandlers.onHover?.(false);
  }, [eventHandlers]);
  
  // Parallax-Effekt (falls aktiviert)
  React.useEffect(() => {
    if (!enableParallax || !animations) return;
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax, animations]);
  
  // Loading State
  if (loading) {
    return (
      <HeroContainer
        variantStyles={variantStyles}
        height="viewport"
        enableParallax={false}
        className={className}
        style={style}
      >
        <Typography variant="h4">Wird geladen...</Typography>
      </HeroContainer>
    );
  }
  
  return (
    <HeroContainer
      variantStyles={variantStyles}
      height={height}
      enableParallax={enableParallax}
      className={className}
      style={style}
      data-testid={testId}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={eventHandlers.onClick}
      {...eventHandlers}
    >
      {/* Hintergrund-Media */}
      {(backgroundImage || backgroundVideo) && (
        <BackgroundMedia
          hasParallax={enableParallax}
          style={{
            transform: enableParallax ? `translateY(${parallaxOffset}px)` : undefined
          }}
        >
          {backgroundVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : backgroundImage ? (
            <img
              src={backgroundImage}
              alt={backgroundImageAlt || 'Hero background'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading={performanceConfig.shouldLazyLoad ? 'lazy' : 'eager'}
            />
          ) : null}
        </BackgroundMedia>
      )}
      
      {/* Content */}
      <ContentContainer
        maxWidth="lg"
        contentAlignment={contentAlignment}
        variantStyles={variantStyles}
      >
        <HeroTitle
          variant="h1"
          variantStyles={variantStyles}
          style={{
            animationDelay: animations ? '0.2s' : undefined
          }}
        >
          {title}
        </HeroTitle>
        
        {subtitle && (
          <HeroSubtitle
            variant="h4"
            variantStyles={variantStyles}
            style={{
              animationDelay: animations ? '0.4s' : undefined
            }}
          >
            {subtitle}
          </HeroSubtitle>
        )}
        
        {(ctaText || secondaryCTAText) && (
          <CTAContainer
            style={{
              animationDelay: animations ? '0.6s' : undefined
            }}
          >
            {ctaText && (
              <PrimaryCTA
                variant="contained"
                size="large"
                variantStyles={variantStyles}
                onClick={handleCTAClick}
              >
                {ctaText}
              </PrimaryCTA>
            )}
            
            {secondaryCTAText && (
              <Button
                variant="outlined"
                size="large"
                onClick={onSecondaryCTAClick}
                sx={{
                  ...variantStyles.animations,
                  '&:hover': variantStyles.hover
                }}
              >
                {secondaryCTAText}
              </Button>
            )}
          </CTAContainer>
        )}
      </ContentContainer>
    </HeroContainer>
  );
}, (prevProps, nextProps) => {
  // Performance-optimierte Prop-Comparison
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.theme === nextProps.theme &&
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.ctaText === nextProps.ctaText &&
    prevProps.backgroundImage === nextProps.backgroundImage &&
    prevProps.loading === nextProps.loading
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;