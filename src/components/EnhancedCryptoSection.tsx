import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  IconButton,
  Paper,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import HexagonIcon from '@mui/icons-material/Hexagon';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ParallaxSection from './ParallaxSection';

// Erweiterte Animationen
const cryptoPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
    transform: scale(1.02);
  }
`;

const dataFlow = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const holographicGlow = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(180deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
`;

const priceFlicker = keyframes`
  0%, 90%, 100% {
    opacity: 1;
    text-shadow: 0 0 10px currentColor;
  }
  95% {
    opacity: 0.7;
    text-shadow: 0 0 5px currentColor;
  }
`;

const chartAnimation = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

// Styled Components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${holographicGlow} 8s ease-in-out infinite`,
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '2px',
    boxShadow: '0 0 10px currentColor'
  }
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '900px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
  lineHeight: 1.6
}));

const CryptoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(26, 26, 42, 0.85)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
    animation: `${dataFlow} 4s linear infinite`
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.05) 0%, transparent 50%)
    `,
    zIndex: 1
  },
  '&:hover': {
    transform: 'translateY(-10px) rotateX(5deg) scale(1.02)',
    boxShadow: '0 0 50px rgba(0, 255, 255, 0.4)',
    border: '1px solid rgba(0, 255, 255, 0.7)',
    animation: `${cryptoPulse} 2s ease-in-out infinite`,
    '&::before': {
      height: '4px',
      boxShadow: '0 0 10px currentColor'
    }
  }
}));

const CryptoIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  border: '2px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)',
  marginBottom: theme.spacing(2),
  position: 'relative',
  zIndex: 2,
  '& svg': {
    fontSize: '2.5rem',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 5px currentColor)'
  },
  '&:hover': {
    transform: 'scale(1.1) rotate(10deg)',
    boxShadow: '0 0 35px rgba(0, 255, 255, 0.5)'
  }
}));

const PriceDisplay = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 700,
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main,
  textShadow: '0 0 15px currentColor',
  animation: `${priceFlicker} 3s ease-in-out infinite`,
  position: 'relative',
  zIndex: 2
}));

const ChangeChip = styled(Chip)<{ isPositive: boolean }>(({ theme, isPositive }) => ({
  backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
  border: `1px solid ${isPositive ? theme.palette.success.main : theme.palette.error.main}60`,
  fontWeight: 600,
  boxShadow: `0 0 10px ${isPositive ? theme.palette.success.main : theme.palette.error.main}40`,
  '& .MuiChip-icon': {
    color: 'inherit'
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 15px ${isPositive ? theme.palette.success.main : theme.palette.error.main}60`
  }
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(26, 26, 42, 0.95) 0%, rgba(16, 21, 62, 0.95) 100%)
  `,
  borderRadius: '25px',
  padding: theme.spacing(5),
  border: '2px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(0, 255, 255, 0.03) 100px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.02) 100px
      )
    `,
    zIndex: 1
  }
}));

const AnalysisCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(26, 26, 42, 0.9)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  borderRadius: '15px',
  padding: theme.spacing(3),
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
    animation: `${dataFlow} 3s linear infinite`
  }
}));

const RefreshButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '2px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    transform: 'rotate(180deg) scale(1.1)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
  },
  transition: 'all 0.4s ease'
}));

// Erweiterte Crypto Data Interface
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: string;
  volume: string;
  icon: React.ReactNode;
  shortTermAnalysis: string;
  mediumTermAnalysis: string;
  riskLevel: 'Niedrig' | 'Mittel' | 'Hoch';
  supportLevel: number;
  resistanceLevel: number;
}

const EnhancedCryptoSection: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.75,
      change24h: 2.45,
      change7d: 8.32,
      marketCap: '€847.2B',
      volume: '€28.4B',
      icon: <CurrencyBitcoinIcon />,
      shortTermAnalysis: 'Bullish - Durchbruch über 43.000€ Widerstand zeigt starke Kaufdynamik',
      mediumTermAnalysis: 'Sehr positiv - Institutionelle Adoption und ETF-Zuflüsse unterstützen Aufwärtstrend bis 50.000€',
      riskLevel: 'Mittel',
      supportLevel: 41000,
      resistanceLevel: 45000
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2650.30,
      change24h: -1.23,
      change7d: 5.67,
      marketCap: '€318.7B',
      volume: '€15.8B',
      icon: <DiamondIcon />,
      shortTermAnalysis: 'Konsolidierung - Seitwärtsbewegung zwischen 2.600€ und 2.700€ erwartet',
      mediumTermAnalysis: 'Positiv - Ethereum 2.0 Upgrades und DeFi-Wachstum treiben langfristig auf 3.200€',
      riskLevel: 'Mittel',
      supportLevel: 2500,
      resistanceLevel: 2800
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.485,
      change24h: 5.67,
      change7d: 12.45,
      marketCap: '€17.1B',
      volume: '€1.2B',
      icon: <HexagonIcon />,
      shortTermAnalysis: 'Stark bullish - Durchbruch über 0.48€ öffnet Weg zu 0.55€',
      mediumTermAnalysis: 'Optimistisch - Smart Contract Entwicklung und Partnerschaften zielen auf 0.70€',
      riskLevel: 'Hoch',
      supportLevel: 0.45,
      resistanceLevel: 0.52
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 98.45,
      change24h: 3.21,
      change7d: 15.89,
      marketCap: '€44.8B',
      volume: '€2.9B',
      icon: <FlashOnIcon />,
      shortTermAnalysis: 'Momentum aufbauend - Ausbruch über 100€ bestätigt Aufwärtstrend',
      mediumTermAnalysis: 'Sehr bullish - NFT und DeFi Ökosystem Expansion zielt auf 130€',
      riskLevel: 'Hoch',
      supportLevel: 95,
      resistanceLevel: 105
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      price: 0.89,
      change24h: 4.32,
      change7d: 18.76,
      marketCap: '€8.5B',
      volume: '€890M',
      icon: <HexagonIcon />,
      shortTermAnalysis: 'Bullish Momentum - Durchbruch über 0.85€ zeigt starke Käuferinteresse',
      mediumTermAnalysis: 'Positiv - Layer-2 Adoption und Ethereum-Integration treiben auf 1.20€',
      riskLevel: 'Hoch',
      supportLevel: 0.82,
      resistanceLevel: 0.95
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      price: 14.67,
      change24h: 2.89,
      change7d: 9.34,
      marketCap: '€8.7B',
      volume: '€650M',
      icon: <LinkOutlinedIcon />,
      shortTermAnalysis: 'Stabil bullish - Unterstützung bei 14€ hält, Ziel 16€',
      mediumTermAnalysis: 'Langfristig positiv - Oracle-Netzwerk Expansion zielt auf 20€',
      riskLevel: 'Mittel',
      supportLevel: 13.5,
      resistanceLevel: 16.0
    },
    {
      id: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      price: 36.78,
      change24h: 6.45,
      change7d: 22.11,
      marketCap: '€14.2B',
      volume: '€1.1B',
      icon: <ShowChartIcon />,
      shortTermAnalysis: 'Starker Aufwärtstrend - Momentum über 35€ zielt auf 42€',
      mediumTermAnalysis: 'Sehr optimistisch - Subnet-Entwicklung und Partnerschaften treiben auf 55€',
      riskLevel: 'Hoch',
      supportLevel: 34,
      resistanceLevel: 40
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      price: 7.23,
      change24h: 1.87,
      change7d: 7.65,
      marketCap: '€9.8B',
      volume: '€420M',
      icon: <AccountBalanceWalletIcon />,
      shortTermAnalysis: 'Seitwärtstrend - Konsolidierung zwischen 7€ und 7.50€',
      mediumTermAnalysis: 'Moderat positiv - Parachain-Auktionen und Interoperabilität zielen auf 10€',
      riskLevel: 'Mittel',
      supportLevel: 6.8,
      resistanceLevel: 7.8
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simuliere Live-Updates mit realistischeren Schwankungen
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(crypto => {
          const volatility = crypto.riskLevel === 'Hoch' ? 0.03 : crypto.riskLevel === 'Mittel' ? 0.02 : 0.01;
          const priceChange = (Math.random() - 0.5) * volatility;
          const newPrice = crypto.price * (1 + priceChange);
          
          return {
            ...crypto,
            price: newPrice,
            change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
          };
        })
      );
      setLastUpdate(new Date());
    }, 8000); // Update alle 8 Sekunden

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCryptoData(prevData => 
      prevData.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.05),
        change24h: (Math.random() - 0.5) * 10
      }))
    );
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Niedrig': return '#22c55e';
      case 'Mittel': return '#f59e0b';
      case 'Hoch': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box id="crypto" sx={{ py: 12, position: 'relative' }}>
      {/* Hintergrundbild */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1486927181919-3ac1fc3a8082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxjaGFydCUyMGdyYXBoJTIwdHJhZGluZyUyMGZpbmFuY2lhbCUyMGRhdGF8ZW58MHwwfHxibHVlfDE3NTQ1NzcwODh8MA&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.1,
          zIndex: -1
        }}
      />
      
      <Container maxWidth="xl">
        <ParallaxSection speed={0.3}>
          <SectionTitle className="neon-text">
            🚀 Erweiterte Krypto-Analyse
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 8 }}>
            Professionelle Marktanalyse mit kurz- und mittelfristigen Prognosen für die wichtigsten Kryptowährungen. 
            Realtime-Daten mit technischer Analyse und Risikobewertung.
          </SectionSubtitle>
        </ParallaxSection>

        <DashboardContainer>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5, position: 'relative', zIndex: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AnalyticsIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                fontFamily: '"Orbitron", monospace',
                textShadow: '0 0 15px currentColor'
              }}>
                Live Markt-Dashboard
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Letztes Update: {lastUpdate.toLocaleTimeString('de-DE')}
              </Typography>
              <RefreshButton 
                onClick={handleRefresh} 
                disabled={isLoading}
                sx={{ 
                  animation: isLoading ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              >
                <RefreshIcon />
              </RefreshButton>
            </Stack>
          </Stack>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 2 }}>
            {cryptoData.map((crypto) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={crypto.id}>
                <CryptoCard>
                  <CardContent sx={{ p: 4 }}>
                    <Stack alignItems="center" spacing={3}>
                      <CryptoIcon>
                        {crypto.icon}
                      </CryptoIcon>
                      
                      <Box textAlign="center">
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          color: 'text.primary',
                          fontFamily: '"Space Grotesk", sans-serif',
                          mb: 0.5
                        }}>
                          {crypto.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {crypto.symbol}
                        </Typography>
                      </Box>

                      <PriceDisplay>
                        €{crypto.price.toLocaleString('de-DE', { 
                          minimumFractionDigits: crypto.price < 1 ? 3 : 2, 
                          maximumFractionDigits: crypto.price < 1 ? 3 : 2 
                        })}
                      </PriceDisplay>

                      <Stack direction="row" spacing={1}>
                        <ChangeChip
                          isPositive={crypto.change24h >= 0}
                          icon={crypto.change24h >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          label={`24h: ${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%`}
                          size="small"
                        />
                        <ChangeChip
                          isPositive={crypto.change7d >= 0}
                          icon={crypto.change7d >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          label={`7d: ${crypto.change7d >= 0 ? '+' : ''}${crypto.change7d.toFixed(2)}%`}
                          size="small"
                        />
                      </Stack>

                      <Divider sx={{ width: '100%', borderColor: 'rgba(0, 255, 255, 0.2)' }} />

                      <Stack spacing={2} sx={{ width: '100%' }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">
                            Marktkapitalisierung:
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {crypto.marketCap}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">
                            24h Volumen:
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {crypto.volume}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            Risiko:
                          </Typography>
                          <Chip 
                            label={crypto.riskLevel}
                            size="small"
                            sx={{ 
                              backgroundColor: `${getRiskColor(crypto.riskLevel)}20`,
                              color: getRiskColor(crypto.riskLevel),
                              border: `1px solid ${getRiskColor(crypto.riskLevel)}60`,
                              fontSize: '0.7rem'
                            }}
                          />
                        </Stack>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Support/Widerstand:
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'success.main' }}>
                              Support: €{crypto.supportLevel.toLocaleString('de-DE')}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'error.main' }}>
                              Widerstand: €{crypto.resistanceLevel.toLocaleString('de-DE')}
                            </Typography>
                          </Stack>
                          <LinearProgress 
                            variant="determinate" 
                            value={((crypto.price - crypto.supportLevel) / (crypto.resistanceLevel - crypto.supportLevel)) * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: crypto.change24h >= 0 ? 'success.main' : 'error.main',
                                boxShadow: `0 0 10px ${crypto.change24h >= 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
                              }
                            }}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CryptoCard>
              </Grid>
            ))}
          </Grid>

          {/* Erweiterte Marktstatistiken */}
          <Box sx={{ mt: 6, position: 'relative', zIndex: 2 }}>
            <Typography variant="h4" sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: 'primary.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 15px currentColor',
              fontWeight: 700
            }}>
              📊 Marktübersicht & Statistiken
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <AnalysisCard elevation={0}>
                  <Stack alignItems="center" spacing={2}>
                    <TimelineIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 900, 
                      color: 'primary.main',
                      fontFamily: '"Orbitron", monospace',
                      textShadow: '0 0 10px currentColor'
                    }}>
                      €2.1T
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Gesamte Marktkapitalisierung
                    </Typography>
                    <Chip label="+5.2%" size="small" sx={{ color: 'success.main', backgroundColor: 'rgba(34, 197, 94, 0.2)' }} />
                  </Stack>
                </AnalysisCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <AnalysisCard elevation={0}>
                  <Stack alignItems="center" spacing={2}>
                    <CurrencyBitcoinIcon sx={{ fontSize: '3rem', color: 'secondary.main' }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 900, 
                      color: 'secondary.main',
                      fontFamily: '"Orbitron", monospace',
                      textShadow: '0 0 10px currentColor'
                    }}>
                      51.3%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Bitcoin Dominanz
                    </Typography>
                    <Chip label="+1.8%" size="small" sx={{ color: 'success.main', backgroundColor: 'rgba(34, 197, 94, 0.2)' }} />
                  </Stack>
                </AnalysisCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <AnalysisCard elevation={0}>
                  <Stack alignItems="center" spacing={2}>
                    <ShowChartIcon sx={{ fontSize: '3rem', color: 'info.main' }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 900, 
                      color: 'info.main',
                      fontFamily: '"Orbitron", monospace',
                      textShadow: '0 0 10px currentColor'
                    }}>
                      €127B
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      24h Handelsvolumen
                    </Typography>
                    <Chip label="+12.4%" size="small" sx={{ color: 'success.main', backgroundColor: 'rgba(34, 197, 94, 0.2)' }} />
                  </Stack>
                </AnalysisCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <AnalysisCard elevation={0}>
                  <Stack alignItems="center" spacing={2}>
                    <AnalyticsIcon sx={{ fontSize: '3rem', color: 'warning.main' }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 900, 
                      color: 'warning.main',
                      fontFamily: '"Orbitron", monospace',
                      textShadow: '0 0 10px currentColor'
                    }}>
                      73
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Fear & Greed Index
                    </Typography>
                    <Chip label="Gier" size="small" sx={{ color: 'warning.main', backgroundColor: 'rgba(245, 158, 11, 0.2)' }} />
                  </Stack>
                </AnalysisCard>
              </Grid>
            </Grid>
          </Box>

          {/* Marktanalyse Sektion */}
          <Box sx={{ mt: 6, position: 'relative', zIndex: 2 }}>
            <Typography variant="h4" sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: 'primary.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 15px currentColor',
              fontWeight: 700
            }}>
              🔮 Detaillierte Marktanalyse
            </Typography>
            
            <Grid container spacing={4}>
              {cryptoData.slice(0, 4).map((crypto) => (
                <Grid item xs={12} md={6} key={`analysis-${crypto.id}`}>
                  <AnalysisCard elevation={0}>
                    <Stack spacing={3}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(0, 255, 255, 0.3)'
                        }}>
                          {crypto.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {crypto.name} ({crypto.symbol})
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            €{crypto.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Divider sx={{ borderColor: 'rgba(0, 255, 255, 0.2)' }} />
                      
                      <Box>
                        <Typography variant="subtitle2" sx={{ 
                          color: 'success.main', 
                          fontWeight: 600, 
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          📈 Kurzfristige Analyse (1-4 Wochen):
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {crypto.shortTermAnalysis}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" sx={{ 
                          color: 'info.main', 
                          fontWeight: 600, 
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          🎯 Mittelfristige Prognose (3-6 Monate):
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {crypto.mediumTermAnalysis}
                        </Typography>
                      </Box>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Tooltip title="Risikobewertung basierend auf Volatilität und Marktkapitalisierung">
                          <Chip 
                            label={`Risiko: ${crypto.riskLevel}`}
                            size="small"
                            sx={{ 
                              backgroundColor: `${getRiskColor(crypto.riskLevel)}20`,
                              color: getRiskColor(crypto.riskLevel),
                              border: `1px solid ${getRiskColor(crypto.riskLevel)}60`
                            }}
                          />
                        </Tooltip>
                        <Typography variant="caption" color="text.secondary">
                          Letzte Analyse: {new Date().toLocaleDateString('de-DE')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </AnalysisCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DashboardContainer>
      </Container>
    </Box>
  );
};

export default EnhancedCryptoSection;