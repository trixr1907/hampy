// PerformanceOptimizer.tsx - Komponente für Performance-Optimierungen der Website
import React, { useEffect, ReactNode } from 'react';

interface PerformanceOptimizerProps {
  children: ReactNode;
  preconnectUrls?: string[];
  prefetchUrls?: string[];
  preloadFonts?: Array<{ href: string; type: string }>;
  deferScripts?: boolean;
}

/**
 * PerformanceOptimizer - Komponente zur Verbesserung der Website-Performance
 * Implementiert verschiedene Optimierungstechniken wie Preconnect, Prefetch, Preload und Script-Optimierung
 */
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  preconnectUrls = [],
  prefetchUrls = [],
  preloadFonts = [],
  deferScripts = true
}) => {
  // Implementierung von Resource Hints (preconnect, prefetch, preload)
  useEffect(() => {
    // Preconnect - Stellt frühzeitig Verbindungen zu wichtigen Domains her
    preconnectUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch - Lädt Ressourcen im Voraus, die später benötigt werden könnten
    prefetchUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Preload - Lädt kritische Ressourcen mit hoher Priorität
    preloadFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.href;
      link.as = 'font';
      link.type = font.type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Script-Optimierung - Setzt defer-Attribut für nicht-kritische Skripte
    if (deferScripts) {
      const scripts = document.querySelectorAll('script:not([async]):not([defer])');
      scripts.forEach(script => {
        if (!script.hasAttribute('type') || script.getAttribute('type') === 'text/javascript') {
          script.setAttribute('defer', '');
        }
      });
    }

    // Cleanup-Funktion
    return () => {
      // Entfernt die dynamisch hinzugefügten Link-Elemente beim Unmount
      const links = document.querySelectorAll('link[rel="preconnect"], link[rel="prefetch"], link[rel="preload"]');
      links.forEach(link => {
        if (
          preconnectUrls.includes(link.getAttribute('href') || '') ||
          prefetchUrls.includes(link.getAttribute('href') || '') ||
          preloadFonts.some(font => font.href === link.getAttribute('href'))
        ) {
          document.head.removeChild(link);
        }
      });
    };
  }, [preconnectUrls, prefetchUrls, preloadFonts, deferScripts]);

  return <>{children}</>;
};

export default PerformanceOptimizer;
