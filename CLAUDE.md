# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the IVO-TECH homepage - a modern, futuristic React 19 application built with TypeScript and Material-UI v7. The project features a dark, neon-themed design with 3D effects, animations, and glassmorphism styling. The site showcases technology services with an emphasis on performance optimization and accessibility.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (ESLint with TypeScript rules)
npm run lint

# Type check without emitting files
npm run type-check
```

## Architecture Overview

### Core Structure
- **App.tsx**: Root component with multiple providers (Theme, Notification, Error Boundary, Performance Optimizer)
- **Enhanced3DHomepage.tsx**: Main homepage component that orchestrates all sections
- **theme.ts**: Material-UI theme with neon color palette and futuristic typography using Orbitron and Space Grotesk fonts

### Key Architectural Patterns

#### Provider Pattern
The app uses multiple context providers wrapped in a specific hierarchy:
```
ErrorBoundary > CacheProvider > HelmetProvider > ThemeProvider > NotificationProvider > ServiceWorkerRegistration > PerformanceOptimizer
```

#### Lazy Loading
Components use React.lazy() for code splitting:
- `LazyComponents.tsx` exports lazy-loaded sections (Services, About, TechStack, Contact)
- `LazyLoadWrapper.tsx` provides intersection observer-based loading

#### Performance Optimization
- Emotion cache with custom key for CSS-in-JS optimization
- Service Worker registration for offline support
- Performance optimizer with preconnect URLs and font preloading
- Optimized images with WebP support

### Component Categories

#### Enhanced 3D Components
- `Enhanced3DHomepage`, `Enhanced3DHeroSection`, `Enhanced3DBackground`, etc.
- These components feature advanced animations and 3D transformations

#### Utility Components
- **SEO.tsx**: Handles meta tags and structured data
- **PerformanceOptimizer.tsx**: Manages preconnects, font preloading, and script deferring
- **AccessibilityUtils.tsx**: Provides accessibility enhancements
- **NotificationContext.tsx**: Global notification system

#### Content Management
- `src/content/`: Static content files in Markdown format
- `contentLoader.ts`: Utility for loading content files

### Styling System

#### Theme Configuration
- Dark mode with neon cyan/magenta color scheme
- Custom Material-UI component overrides for buttons, cards, and text fields
- Glassmorphism effects with backdrop blur and transparency
- Orbitron font for headings with text shadows and neon glow effects

#### Component Styling
- Uses Material-UI's sx prop and styled components
- Extensive use of CSS-in-JS with Emotion
- Responsive design with clamp() functions for typography
- Custom animations and transitions

### Development Guidelines

#### Component Conventions
- TypeScript strict mode enabled
- React.FC type for components
- Props interfaces defined when needed
- Error boundaries wrap major component trees

#### Performance Considerations
- Lazy loading for non-critical sections
- Image optimization utilities
- Service worker for caching
- Font optimization with display=swap

#### Styling Patterns
- Dark theme as default
- Neon glow effects using text-shadow and box-shadow
- Glassmorphism cards with backdrop-filter
- Hover animations with transform and scale effects

## Deployment Configuration

The project includes configurations for multiple deployment platforms:
- **GitHub Pages**: Automated via GitHub Actions
- **Vercel**: Zero-config deployment with vercel.json
- **Netlify**: SPA routing configured via netlify.toml

## Content Structure

Static content is managed through:
- `src/content/services/`: Service descriptions in Markdown
- `src/content/team/`: Team member profiles
- `src/content/settings/general.json`: Site configuration