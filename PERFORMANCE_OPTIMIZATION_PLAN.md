# ⚡ Performance-Optimierungsplan - Hampy

## 🎯 Performance-Ziele

### Aktuelle Metriken (Baseline)
- **Bundle-Größe**: 539KB (main chunk)
- **Build-Zeit**: 3.6s
- **TypeScript-Fehler**: 24 warnings
- **Komponenten**: 47 TSX files
- **Ladezeit**: ~3.2s (geschätzt)

### Ziel-Metriken
- **Bundle-Größe**: <400KB (-26%)
- **Build-Zeit**: <3s (-17%)
- **TypeScript-Fehler**: 0 (-100%)
- **Komponenten**: ~25 (-47%)
- **Ladezeit**: <2s (-38%)

## 📊 Optimierungsstrategien

### 1. Bundle-Größen-Optimierung

#### Code Splitting Strategy
```typescript
// Vite-Konfiguration erweitern
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor Libraries
          'vendor-react': ['react', 'react-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material'],
          'vendor-emotion': ['@emotion/react', '@emotion/styled'],
          
          // Feature-basierte Chunks
          'components-3d': [
            './src/components/Enhanced3DHomepage',
            './src/components/Enhanced3DBackground',
            './src/components/Enhanced3DHeroSection'
          ],
          'components-stadium': [
            './src/components/Stadium3DViewer',
            './src/components/StadiumExperienceHomepage'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 400 // Reduced from 500KB
  }
});
```

#### Dynamic Imports für Varianten
```typescript
// src/components/base/ComponentLoader.tsx
const VariantLoaders = {
  enhanced3d: () => import('../variants/Enhanced3D'),
  optimized: () => import('../variants/Optimized'),
  stadium: () => import('../variants/Stadium'),
  standard: () => import('../variants/Standard')
};

export const useAsyncVariant = (variant: ComponentVariant) => {
  const [VariantComponent, setVariantComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    VariantLoaders[variant]()
      .then(module => {
        setVariantComponent(() => module.default);
        setLoading(false);
      });
  }, [variant]);

  return { VariantComponent, loading };
};
```

### 2. React Performance Optimization

#### React.memo Implementation
```typescript
// src/components/base/HeroSection.tsx
export const HeroSection = React.memo<HeroSectionProps>(({
  variant = 'standard',
  title,
  subtitle,
  ctaText,
  ...props
}) => {
  // Komponenten-Logic
}, (prevProps, nextProps) => {
  // Custom comparison für bessere Performance
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.ctaText === nextProps.ctaText
  );
});
```

#### useMemo & useCallback Hooks
```typescript
// src/hooks/useVariantStyles.ts
export const useVariantStyles = (variant: ComponentVariant, theme: Theme) => {
  return useMemo(() => {
    const config = getVariantConfig(variant);
    
    return {
      container: {
        background: config.styling.glassmorphism 
          ? `rgba(${theme.palette.background.default}, 0.7)` 
          : 'transparent',
        backdropFilter: config.styling.glassmorphism ? 'blur(10px)' : 'none',
        boxShadow: config.styling.shadows 
          ? `0 0 30px ${theme.palette.primary.main}40` 
          : 'none'
      },
      animations: config.animations.enabled ? {
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        animation: 'fadeIn 1s ease-in-out'
      } : {}
    };
  }, [variant, theme]);
};
```

### 3. Image & Asset Optimization

#### WebP Conversion Strategy
```typescript
// src/utils/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true
}) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        onLoad={() => setImageLoaded(true)}
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </picture>
  );
};
```

#### Font Optimization
```css
/* src/index.css - Optimierte Font-Loading */
@font-face {
  font-family: 'Orbitron';
  src: url('./assets/fonts/orbitron-variable.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('./assets/fonts/space-grotesk-variable.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 300 700;
}
```

### 4. Build Performance

#### TypeScript Configuration Optimization
```json
// tsconfig.json - Performance-optimiert
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true,
    "moduleDetection": "force"
  },
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.tsx",
    "**/*.spec.tsx"
  ]
}
```

#### Vite Development Optimierung
```typescript
// vite.config.ts - Dev Performance
export default defineConfig({
  server: {
    hmr: {
      overlay: false // Reduced overlay for faster dev
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material'
    ],
    exclude: [
      // Large, rarely changing dependencies
      '@emotion/react',
      '@emotion/styled'
    ]
  }
});
```

## 🔄 Implementierungs-Roadmap

### Phase 1: Sofortige Optimierungen (Woche 1)
1. **Bundle Splitting konfigurieren**
   - Manual chunks für Vendor libraries
   - Feature-basierte Code-Splitting
   - Chunk size warnings reduzieren

2. **React.memo implementieren**
   - Basis-Komponenten optimieren
   - Props-Comparison Functions
   - Re-render Elimination

### Phase 2: Asset-Optimierung (Woche 2)
1. **Image Optimization**
   - WebP Conversion für alle Images
   - Lazy Loading verbessern
   - Responsive Images implementieren

2. **Font Optimization**
   - Variable Fonts einführen
   - Font-display: swap
   - Preload critical fonts

### Phase 3: Build-Optimierung (Woche 3)
1. **TypeScript Performance**
   - Incremental compilation
   - skipLibCheck aktivieren
   - Build-Info caching

2. **Development Experience**
   - HMR optimization
   - Faster dev startup
   - Optimized dependencies

### Phase 4: Monitoring & Validation (Woche 4)
1. **Performance Monitoring**
   - Lighthouse CI integration
   - Bundle analyzer automation
   - Performance budgets

2. **Validation Testing**
   - Load testing
   - Performance regression tests
   - User experience metrics

## 📈 Performance Monitoring

### Automatisierte Metriken
```typescript
// scripts/performance-check.ts
export const performanceChecks = {
  bundleSize: {
    main: { max: 400 * 1024 }, // 400KB
    vendor: { max: 200 * 1024 }, // 200KB
    chunks: { max: 100 * 1024 } // 100KB per chunk
  },
  
  buildTime: {
    dev: { max: 5000 }, // 5s
    production: { max: 30000 } // 30s
  },
  
  runtime: {
    firstContentfulPaint: { max: 1500 }, // 1.5s
    largestContentfulPaint: { max: 2500 }, // 2.5s
    cumulativeLayoutShift: { max: 0.1 }
  }
};
```

### GitHub Actions Integration
```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [push, pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Bundle analysis
        run: npm run analyze
        
      - name: Performance audit
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

## 🎯 Erfolgs-KPIs

### Technische Metriken
- **Bundle Reduction**: Ziel -26% (539KB → 400KB)
- **Build Time**: Ziel -17% (3.6s → 3s)
- **Component Count**: Ziel -47% (47 → 25)
- **TypeScript Errors**: Ziel -100% (24 → 0)

### User Experience Metriken
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3s

### Development Experience
- **Dev Server Startup**: <2s
- **Hot Module Reload**: <500ms
- **Type Checking**: <5s
- **Test Execution**: <10s

## 🚨 Performance Budget

### Hard Limits
```json
{
  "performance": {
    "budgets": [
      {
        "type": "bundle",
        "name": "main",
        "maximumSizeError": "400kb"
      },
      {
        "type": "initial",
        "maximumSizeError": "600kb"
      },
      {
        "type": "anyComponentStyle",
        "maximumSizeError": "50kb"
      }
    ]
  }
}
```

### Monitoring Alerts
- Bundle size increase >10%
- Build time increase >20%
- Performance score drop <85
- Error rate increase >1%

## 📝 Nächste Schritte

1. **Baseline Measurements**: Aktuelle Performance dokumentieren
2. **Vite Config Update**: Bundle splitting konfigurieren
3. **React.memo Implementation**: Erste Komponenten optimieren
4. **Monitoring Setup**: Performance-Tracking implementieren
5. **Iterative Verbesserung**: Wöchentliche Performance-Reviews