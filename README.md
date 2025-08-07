# IVO-TECH Homepage

A modern, responsive homepage built with React 19, TypeScript, and Material-UI v7. Features cutting-edge design with animations, glassmorphism effects, and smooth scrolling.

## 🚀 Features

- **Modern Design**: 2025-inspired design with glassmorphism and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Built with accessibility best practices
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Material-UI v7** - Modern component library
- **Emotion** - CSS-in-JS styling
- **Vite** - Fast build tool and development server

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. The workflow is defined in `.github/workflows/deploy.yml`
2. On every push to the `main` branch, the site is automatically built and deployed
3. No manual intervention required

### Manual GitHub Pages Setup

1. Go to your repository Settings
2. Navigate to Pages in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The deployment will automatically run on the next push to main

### Vercel Deployment

This project is also configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

The `vercel.json` file includes optimized settings for performance and security.

### Netlify Deployment

For Netlify deployment:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

The `netlify.toml` file includes optimized settings for SPA routing.

## 🎨 Design Features

- **Animated Background**: Floating shapes and particles
- **Parallax Effects**: Smooth parallax scrolling
- **Glassmorphism Cards**: Modern glass-like UI elements
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Interactive Forms**: Contact form with validation
- **Micro-animations**: Hover effects and transitions

## 📱 Sections

- **Hero Section**: Eye-catching introduction with CTAs
- **Services**: Technology services showcase
- **About**: Company information and statistics
- **Technology Stack**: Interactive tech stack display
- **Contact**: Functional contact form
- **Footer**: Links and social media

## 🔧 Configuration

The project includes:
- TypeScript configuration
- Vite build configuration
- ESLint setup
- Vercel deployment configuration

## 📄 License

This project is licensed under the MIT License.