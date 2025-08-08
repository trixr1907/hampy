# 🛠️ Implementation Guide - Hampy Refactoring

## Schnellstart (Sofort umsetzbar)

### Schritt 1: Basis-Types erstellen
```bash
# Neue Verzeichnisse erstellen
mkdir -p src/types src/hooks src/components/base
```

```typescript
// src/types/ComponentTypes.ts
export type ComponentVariant = 'standard' | 'enhanced3d' | 'optimized' | 'stadium';
export type ComponentTheme = 'neon' | 'futuristic' | 'minimal' | 'sport';

export interface BaseComponentProps {
  variant?: ComponentVariant;
  theme?: ComponentTheme;
  performance?: 'high' | 'standard';
  animations?: boolean;
  className?: string;
}

export interface VariantConfig {
  animations: {
    enabled: boolean;
    type: '2d' | '3d' | 'minimal';
    intensity: 'low' | 'medium' | 'high';
  };
  styling: {
    glassmorphism: boolean;
    neonEffects: boolean;
    shadows: boolean;
  };
  performance: {
    lazyLoad: boolean;
    optimizeImages: boolean;
    prefetch: boolean;
  };
}
```

### Schritt 2: Variant Hook erstellen
```typescript
// src/hooks/useVariantConfig.ts
import { ComponentVariant, VariantConfig } from '../types/ComponentTypes';

export const useVariantConfig = (variant: ComponentVariant): VariantConfig => {
  const configs: Record<ComponentVariant, VariantConfig> = {
    standard: {
      animations: { enabled: false, type: 'minimal', intensity: 'low' },
      styling: { glassmorphism: false, neonEffects: false, shadows: true },
      performance: { lazyLoad: true, optimizeImages: true, prefetch: false }
    },
    enhanced3d: {
      animations: { enabled: true, type: '3d', intensity: 'high' },
      styling: { glassmorphism: true, neonEffects: true, shadows: true },
      performance: { lazyLoad: true, optimizeImages: true, prefetch: true }
    },
    optimized: {
      animations: { enabled: true, type: '2d', intensity: 'low' },
      styling: { glassmorphism: true, neonEffects: false, shadows: false },
      performance: { lazyLoad: true, optimizeImages: true, prefetch: true }
    },
    stadium: {
      animations: { enabled: true, type: '3d', intensity: 'medium' },
      styling: { glassmorphism: false, neonEffects: false, shadows: true },
      performance: { lazyLoad: false, optimizeImages: false, prefetch: false }
    }
  };
  
  return configs[variant];
};
```

### Schritt 3: Erste Komponente migrieren (HeroSection)

```typescript
// src/components/base/HeroSection.tsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { BaseComponentProps } from '../../types/ComponentTypes';
import { useVariantConfig } from '../../hooks/useVariantConfig';

export interface HeroSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCTAClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'standard',
  title,
  subtitle,
  ctaText = 'Mehr erfahren',
  onCTAClick,
  className,
  ...props
}) => {
  const config = useVariantConfig(variant);
  
  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    background: config.styling.glassmorphism 
      ? 'rgba(0, 0, 0, 0.7)' 
      : 'transparent',
    backdropFilter: config.styling.glassmorphism ? 'blur(10px)' : 'none',
    ...(config.animations.enabled && {
      animation: `fadeIn 1s ease-in-out`
    })
  };

  const titleStyles = {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 900,
    marginBottom: 2,
    textShadow: config.styling.neonEffects 
      ? '0 0 20px rgba(0, 255, 255, 0.6)'
      : 'none',
    ...(config.animations.enabled && config.animations.type === '3d' && {
      transform: 'perspective(1000px) rotateX(10deg)',
      transformStyle: 'preserve-3d'
    })
  };

  return (
    <Box sx={containerStyles} className={className}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={titleStyles}>
          {title}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              ...(config.animations.enabled && {
                animation: `slideInUp 1s ease-in-out 0.3s both`
              })
            }}
          >
            {subtitle}
          </Typography>
        )}
        
        {ctaText && (
          <Button
            variant="contained"
            size="large"
            onClick={onCTAClick}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.125rem',
              boxShadow: config.styling.shadows ? '0 0 30px rgba(0, 255, 255, 0.4)' : 'none',
              ...(config.animations.enabled && {
                animation: `slideInUp 1s ease-in-out 0.6s both`,
                '&:hover': {
                  transform: config.animations.intensity === 'high' 
                    ? 'translateY(-3px) scale(1.05)' 
                    : 'translateY(-2px)'
                }
              })
            }}
          >
            {ctaText}
          </Button>
        )}
      </Container>
    </Box>
  );
};
```

### Schritt 4: Bestehende Komponenten ersetzen

```typescript
// src/components/Enhanced3DHeroSection.tsx (Migration)
import React from 'react';
import { HeroSection, HeroSectionProps } from './base/HeroSection';

// Wrapper für bestehende Enhanced3D-Komponente
export const Enhanced3DHeroSection: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => {
  return <HeroSection {...props} variant="enhanced3d" />;
};

export default Enhanced3DHeroSection;
```

## Migrations-Workflow

### Woche 1: Infrastruktur
1. ✅ Types definieren
2. ✅ Hooks erstellen  
3. ✅ HeroSection migrieren
4. ✅ Tests anpassen

### Woche 2: Core Components
1. AboutSection migrieren
2. ServicesSection migrieren
3. ContactSection konsolidieren
4. Performance-Tests

### Woche 3: Advanced Components
1. Homepage-Varianten zusammenführen
2. Stadium-Komponenten integrieren
3. Lazy Loading optimieren
4. Bundle-Analyse

### Woche 4: Finalisierung
1. Alte Komponenten entfernen
2. Documentation update
3. Performance-Validation
4. Team-Review

## Testing Strategy

### Unit Tests
```typescript
// src/components/base/__tests__/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('renders with standard variant', () => {
    render(
      <HeroSection 
        variant="standard"
        title="Test Title"
        subtitle="Test Subtitle"
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies enhanced3d styles', () => {
    const { container } = render(
      <HeroSection 
        variant="enhanced3d"
        title="Test"
      />
    );
    
    const title = container.querySelector('h1');
    expect(title).toHaveStyle('text-shadow: 0 0 20px rgba(0, 255, 255, 0.6)');
  });
});
```

### Performance Tests
```typescript
// src/__tests__/performance.test.ts  
import { getBundleSize, measureRenderTime } from './utils';

describe('Performance Metrics', () => {
  it('bundle size should be under 400KB', async () => {
    const size = await getBundleSize();
    expect(size).toBeLessThan(400 * 1024); // 400KB
  });

  it('component render time should be under 16ms', () => {
    const renderTime = measureRenderTime(() => 
      render(<HeroSection variant="enhanced3d" title="Test" />)
    );
    expect(renderTime).toBeLessThan(16); // 60fps target
  });
});
```

## Rollback Strategy

### Falls Probleme auftreten:
1. **Feature Flag**: Alte Komponenten über ENV-Variable aktivieren
2. **Git Branches**: Separate Branch für Migration
3. **A/B Testing**: Graduelle Umstellung mit User-Gruppen
4. **Monitoring**: Performance-Alerts bei Regression

### Rollback Commands
```bash
# Schneller Rollback
git checkout main
npm run build
npm run deploy

# Partial Rollback (einzelne Komponente)
git checkout main -- src/components/HeroSection.tsx
```

## Erfolgs-Metriken

### Before/After Vergleich
| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| Komponenten-Anzahl | 47 | ~25 | -47% |
| Bundle-Größe | 539KB | <400KB | -26% |
| TypeScript-Fehler | 27 | 0 | -100% |
| Ladezeit | 3.2s | <2s | -38% |

### Monitoring Dashboard
- Performance-Score (Lighthouse)
- Bundle-Analyse (Webpack)
- Error-Tracking (Sentry)
- User Experience Metriken

## Nächste Schritte

1. **Implementierung starten**: Types und Hooks erstellen
2. **Pilot-Komponente**: HeroSection migrieren
3. **Team-Review**: Architektur validieren
4. **Iterative Erweiterung**: Weitere Komponenten hinzufügen
5. **Performance-Überwachung**: Kontinuierliches Monitoring