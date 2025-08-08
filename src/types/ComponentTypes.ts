// ComponentTypes.ts - Unified Component System Type Definitions
import React from 'react';

// Basis-Varianten für Komponenten
export type ComponentVariant = 'standard' | 'enhanced3d' | 'optimized' | 'stadium';

// Theme-Varianten
export type ComponentTheme = 'neon' | 'futuristic' | 'minimal' | 'sport';

// Performance-Modi
export type PerformanceMode = 'high' | 'standard' | 'eco';

// Animation-Typen
export type AnimationType = '2d' | '3d' | 'minimal' | 'none';

// Animation-Intensität
export type AnimationIntensity = 'low' | 'medium' | 'high';

/**
 * Basis-Props für alle Komponenten im Unified Component System
 */
export interface BaseComponentProps {
  /** Komponenten-Variante bestimmt Styling und Verhalten */
  variant?: ComponentVariant;
  
  /** Theme-Variante für Farbschema und Design */
  theme?: ComponentTheme;
  
  /** Performance-Modus für Optimierungen */
  performance?: PerformanceMode;
  
  /** Animation aktivieren/deaktivieren */
  animations?: boolean;
  
  /** Benutzerdefinierte CSS-Klasse */
  className?: string;
  
  /** Inline-Styles */
  style?: React.CSSProperties;
  
  /** Test-ID für Testing */
  testId?: string;
  
  /** Accessibility-Label */
  'aria-label'?: string;
  
  /** Kinder-Komponenten */
  children?: React.ReactNode;
}

/**
 * Varianten-Konfiguration für Komponenten
 */
export interface VariantConfig {
  /** Animation-Konfiguration */
  animations: {
    enabled: boolean;
    type: AnimationType;
    intensity: AnimationIntensity;
    duration?: number;
    delay?: number;
  };
  
  /** Styling-Konfiguration */
  styling: {
    glassmorphism: boolean;
    neonEffects: boolean;
    shadows: boolean;
    gradients: boolean;
    borders: boolean;
  };
  
  /** Performance-Konfiguration */
  performance: {
    lazyLoad: boolean;
    optimizeImages: boolean;
    prefetch: boolean;
    memoization: boolean;
    virtualization: boolean;
  };
  
  /** 3D-Effekte Konfiguration */
  effects3D?: {
    enabled: boolean;
    perspective: number;
    transformStyle: 'flat' | 'preserve-3d';
    backfaceVisibility: 'visible' | 'hidden';
  };
}

/**
 * Theme-Konfiguration
 */
export interface ThemeConfig {
  /** Primäre Farbpalette */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  
  /** Typography-Konfiguration */
  typography: {
    fontFamily: {
      primary: string;
      heading: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };
  
  /** Spacing-System */
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  /** Border-Radius */
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  
  /** Shadow-System */
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
    neon: string;
  };
}

/**
 * Komponenten-Zustand für erweiterte Funktionen
 */
export interface ComponentState {
  /** Loading-Zustand */
  loading?: boolean;
  
  /** Error-Zustand */
  error?: string | null;
  
  /** Disabled-Zustand */
  disabled?: boolean;
  
  /** Hover-Zustand */
  hovered?: boolean;
  
  /** Focus-Zustand */
  focused?: boolean;
  
  /** Active-Zustand */
  active?: boolean;
}

/**
 * Event-Handler Typen
 */
export interface ComponentEventHandlers {
  /** Klick-Handler */
  onClick?: (event: React.MouseEvent) => void;
  
  /** Hover-Handler */
  onHover?: (hovered: boolean) => void;
  
  /** Focus-Handler */
  onFocus?: (event: React.FocusEvent) => void;
  
  /** Blur-Handler */
  onBlur?: (event: React.FocusEvent) => void;
  
  /** Keyboard-Handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

/**
 * Responsive-Breakpoints
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive-Werte
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Utility-Typ für Komponenten-Props mit Varianten-Support
 */
export type VariantAwareProps<T> = T & BaseComponentProps & {
  /** Responsive Eigenschaften */
  responsive?: boolean;
  
  /** Breakpoint-spezifische Varianten */
  variantBreakpoints?: Partial<Record<Breakpoint, ComponentVariant>>;
};