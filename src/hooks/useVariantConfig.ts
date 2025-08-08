// useVariantConfig.ts - Hook für intelligente Varianten-Konfiguration
import { useMemo } from 'react';
import { ComponentVariant, ComponentTheme, VariantConfig, ThemeConfig } from '../types/ComponentTypes';

/**
 * Varianten-Konfigurationen für verschiedene Komponenten-Typen
 */
const VARIANT_CONFIGS: Record<ComponentVariant, VariantConfig> = {
  standard: {
    animations: {
      enabled: true,
      type: 'minimal',
      intensity: 'low',
      duration: 300,
      delay: 0
    },
    styling: {
      glassmorphism: false,
      neonEffects: false,
      shadows: true,
      gradients: false,
      borders: true
    },
    performance: {
      lazyLoad: true,
      optimizeImages: true,
      prefetch: false,
      memoization: true,
      virtualization: false
    }
  },

  enhanced3d: {
    animations: {
      enabled: true,
      type: '3d',
      intensity: 'high',
      duration: 600,
      delay: 100
    },
    styling: {
      glassmorphism: true,
      neonEffects: true,
      shadows: true,
      gradients: true,
      borders: true
    },
    performance: {
      lazyLoad: true,
      optimizeImages: true,
      prefetch: true,
      memoization: true,
      virtualization: false
    },
    effects3D: {
      enabled: true,
      perspective: 1000,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden'
    }
  },

  optimized: {
    animations: {
      enabled: true,
      type: '2d',
      intensity: 'low',
      duration: 200,
      delay: 0
    },
    styling: {
      glassmorphism: true,
      neonEffects: false,
      shadows: false,
      gradients: true,
      borders: false
    },
    performance: {
      lazyLoad: true,
      optimizeImages: true,
      prefetch: true,
      memoization: true,
      virtualization: true
    }
  },

  stadium: {
    animations: {
      enabled: true,
      type: '3d',
      intensity: 'medium',
      duration: 400,
      delay: 50
    },
    styling: {
      glassmorphism: false,
      neonEffects: false,
      shadows: true,
      gradients: true,
      borders: true
    },
    performance: {
      lazyLoad: false,
      optimizeImages: false,
      prefetch: false,
      memoization: false,
      virtualization: false
    },
    effects3D: {
      enabled: true,
      perspective: 800,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'visible'
    }
  }
};

/**
 * Theme-Konfigurationen
 */
const THEME_CONFIGS: Record<ComponentTheme, ThemeConfig> = {
  neon: {
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: '#0a0a0a',
      surface: 'rgba(26, 26, 42, 0.8)',
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
        disabled: '#666666'
      }
    },
    typography: {
      fontFamily: {
        primary: '"Space Grotesk", sans-serif',
        heading: '"Orbitron", monospace',
        mono: '"JetBrains Mono", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      glow: '0 0 20px rgba(0, 255, 255, 0.4)',
      neon: '0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)'
    }
  },

  futuristic: {
    colors: {
      primary: '#0080ff',
      secondary: '#8000ff',
      accent: '#00ff80',
      background: '#000014',
      surface: 'rgba(20, 20, 40, 0.9)',
      text: {
        primary: '#e0e0ff',
        secondary: '#a0a0d0',
        disabled: '#606090'
      }
    },
    typography: {
      fontFamily: {
        primary: '"Inter", sans-serif',
        heading: '"Exo 2", sans-serif',
        mono: '"Source Code Pro", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 128, 255, 0.2)',
      md: '0 4px 8px rgba(0, 128, 255, 0.3)',
      lg: '0 12px 24px rgba(0, 128, 255, 0.4)',
      glow: '0 0 15px rgba(0, 128, 255, 0.5)',
      neon: '0 0 25px rgba(0, 128, 255, 0.7)'
    }
  },

  minimal: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#059669',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        disabled: '#cbd5e1'
      }
    },
    typography: {
      fontFamily: {
        primary: 'system-ui, sans-serif',
        heading: 'system-ui, sans-serif',
        mono: 'ui-monospace, monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.07)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      glow: '0 0 0 1px rgba(37, 99, 235, 0.1)',
      neon: '0 0 0 2px rgba(37, 99, 235, 0.2)'
    }
  },

  sport: {
    colors: {
      primary: '#16a34a',
      secondary: '#dc2626',
      accent: '#f59e0b',
      background: '#0f172a',
      surface: 'rgba(30, 58, 138, 0.1)',
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        disabled: '#64748b'
      }
    },
    typography: {
      fontFamily: {
        primary: '"Roboto", sans-serif',
        heading: '"Oswald", sans-serif',
        mono: '"Roboto Mono", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
      md: '0 4px 6px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
      glow: '0 0 20px rgba(22, 163, 74, 0.3)',
      neon: '0 0 30px rgba(22, 163, 74, 0.5)'
    }
  }
};

/**
 * Hook für Varianten-Konfiguration
 */
export const useVariantConfig = (
  variant: ComponentVariant = 'standard',
  theme: ComponentTheme = 'neon'
): { variantConfig: VariantConfig; themeConfig: ThemeConfig } => {
  return useMemo(() => ({
    variantConfig: VARIANT_CONFIGS[variant],
    themeConfig: THEME_CONFIGS[theme]
  }), [variant, theme]);
};

/**
 * Hook für Styling-Generierung basierend auf Variante und Theme
 */
export const useVariantStyles = (
  variant: ComponentVariant = 'standard',
  theme: ComponentTheme = 'neon'
) => {
  const { variantConfig, themeConfig } = useVariantConfig(variant, theme);

  return useMemo(() => {
    const { styling, animations, effects3D } = variantConfig;
    const { colors, shadows, borderRadius } = themeConfig;

    return {
      // Container-Styles
      container: {
        background: styling.glassmorphism 
          ? colors.surface
          : colors.background,
        backdropFilter: styling.glassmorphism ? 'blur(20px)' : 'none',
        boxShadow: styling.shadows 
          ? styling.neonEffects ? shadows.neon : shadows.md
          : 'none',
        borderRadius: borderRadius.lg,
        border: styling.borders 
          ? `1px solid ${colors.primary}40` 
          : 'none',
        ...(effects3D?.enabled && {
          perspective: effects3D.perspective,
          transformStyle: effects3D.transformStyle,
          backfaceVisibility: effects3D.backfaceVisibility
        })
      },

      // Text-Styles
      text: {
        primary: {
          color: colors.text.primary,
          textShadow: styling.neonEffects 
            ? `0 0 10px ${colors.primary}` 
            : 'none'
        },
        secondary: {
          color: colors.text.secondary
        }
      },

      // Animation-Styles
      animations: animations.enabled ? {
        transition: `all ${animations.duration}ms ease-in-out`,
        animationDelay: `${animations.delay}ms`,
        ...(animations.type === '3d' && effects3D?.enabled && {
          transform: 'translateZ(0)', // Hardware-Acceleration
          willChange: 'transform'
        })
      } : {},

      // Hover-Effekte
      hover: {
        transform: animations.enabled 
          ? animations.intensity === 'high' 
            ? 'translateY(-8px) scale(1.02)' 
            : 'translateY(-4px)'
          : 'none',
        boxShadow: styling.shadows 
          ? styling.neonEffects 
            ? shadows.neon 
            : shadows.lg
          : 'none'
      }
    };
  }, [variantConfig, themeConfig]);
};

/**
 * Hook für Performance-optimierte Komponenten-Konfiguration
 */
export const usePerformanceConfig = (variant: ComponentVariant = 'standard') => {
  const { variantConfig } = useVariantConfig(variant);
  
  return useMemo(() => ({
    shouldLazyLoad: variantConfig.performance.lazyLoad,
    shouldMemoize: variantConfig.performance.memoization,
    shouldVirtualize: variantConfig.performance.virtualization,
    shouldOptimizeImages: variantConfig.performance.optimizeImages,
    shouldPrefetch: variantConfig.performance.prefetch
  }), [variantConfig]);
};