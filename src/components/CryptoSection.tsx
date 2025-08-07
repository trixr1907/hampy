import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Grid, Chip, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import ParallaxSection from './ParallaxSection';

// Animationen
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

// Styled Components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontFamily: '"Orbitron", monospace',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${holographicGlow} 8s ease-in-out infinite`,
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
}));

const CryptoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(26, 26, 42, 0.8)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '16px',
  boxShadow: '0 0 25px rgba(0, 255, 255, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    animation: `${dataFlow} 3s linear infinite`
  },
  '&:hover': {
    transform: 'translateY(-8px) rotateX(5deg)',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.4)',
    border: '1px solid rgba(0, 255, 255, 0.6)',
    animation: `${cryptoPulse} 2s ease-in-out infinite`
  }
}));

const CryptoIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2rem',
    color: theme.palette.primary.main
  }
}));

const PriceDisplay = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  fontFamily: '"Orbitron", monospace',
  color: theme.palette.primary.main,
  textShadow: '0 0 10px currentColor'
}));

const ChangeChip = styled(Chip)<{ isPositive: boolean }>(({ theme, isPositive }) => ({
  backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
  border: `1px solid ${isPositive ? theme.palette.success.main : theme.palette.error.main}40`,
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: 'inherit'
  }
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  background: `
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(26, 26, 42, 0.9) 0%, rgba(16, 21, 62, 0.9) 100%)
  `,
  borderRadius: '20px',
  padding: theme.spacing(4),
  border: '1px solid rgba(0, 255, 255, 0.2)',
  boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
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
      )
    `,
    zIndex: 1
  }
}));

const RefreshButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    transform: 'rotate(180deg)',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)'
  },
  transition: 'all 0.3s ease'
}));

// Mock Crypto Data
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume: string;
  icon: React.ReactNode;
}

const CryptoSection: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.75,
      change24h: 2.45,
      marketCap: '€847.2B',
      volume: '€28.4B',
      icon: <CurrencyBitcoinIcon />
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2650.30,
      change24h: -1.23,
      marketCap: '€318.7B',
      volume: '€15.8B',
      icon: <ShowChartIcon />
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.485,
      change24h: 5.67,
      marketCap: '€17.1B',
      volume: '€1.2B',
      icon: <AccountBalanceWalletIcon />
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 98.45,
      change24h: 3.21,
      marketCap: '€44.8B',
      volume: '€2.9B',
      icon: <TrendingUpIcon />
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simuliere Live-Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% Änderung
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
        }))
      );
      setLastUpdate(new Date());
    }, 10000); // Update alle 10 Sekunden

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCryptoData(prevData => 
      prevData.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.05), // ±2.5% Änderung
        change24h: (Math.random() - 0.5) * 10 // -5% bis +5%
      }))
    );
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  return (
    <Box id="crypto" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <ParallaxSection speed={0.2}>
          <SectionTitle className="neon-text">
            Krypto Live-Dashboard
          </SectionTitle>
          <SectionSubtitle sx={{ mb: 6 }}>
            Verfolgen Sie die aktuellsten Kryptowährungsdaten in Echtzeit mit unserem futuristischen Dashboard
          </SectionSubtitle>
        </ParallaxSection>

        <DashboardContainer>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 10px currentColor'
            }}>
              Live Marktdaten
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" color="text.secondary">
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

          <Grid container spacing={3} sx={{ position: 'relative', zIndex: 2 }}>
            {cryptoData.map((crypto) => (
              <Grid item xs={12} sm={6} md={3} key={crypto.id}>
                <CryptoCard>
                  <CardContent sx={{ p: 3 }}>
                    <Stack alignItems="center" spacing={2}>
                      <CryptoIcon>
                        {crypto.icon}
                      </CryptoIcon>
                      
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: 'text.primary',
                          fontFamily: '"Space Grotesk", sans-serif'
                        }}>
                          {crypto.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {crypto.symbol}
                        </Typography>
                      </Box>

                      <PriceDisplay>
                        €{crypto.price.toLocaleString('de-DE', { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })}
                      </PriceDisplay>

                      <ChangeChip
                        isPositive={crypto.change24h >= 0}
                        icon={crypto.change24h >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        label={`${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%`}
                        size="small"
                      />

                      <Stack spacing={1} sx={{ width: '100%', mt: 2 }}>
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
                      </Stack>
                    </Stack>
                  </CardContent>
                </CryptoCard>
              </Grid>
            ))}
          </Grid>

          {/* Zusätzliche Marktstatistiken */}
          <Box sx={{ mt: 4, position: 'relative', zIndex: 2 }}>
            <Typography variant="h6" sx={{ 
              mb: 3, 
              textAlign: 'center',
              color: 'primary.main',
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 10px currentColor'
            }}>
              Marktübersicht
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    fontFamily: '"Orbitron", monospace'
                  }}>
                    €1.7T
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gesamte Marktkapitalisierung
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 0, 255, 0.05)',
                  border: '1px solid rgba(255, 0, 255, 0.2)'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    fontFamily: '"Orbitron", monospace'
                  }}>
                    48.2%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bitcoin Dominanz
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 128, 255, 0.05)',
                  border: '1px solid rgba(0, 128, 255, 0.2)'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: 'info.main',
                    fontFamily: '"Orbitron", monospace'
                  }}>
                    €89.4B
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    24h Handelsvolumen
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DashboardContainer>
      </Container>
    </Box>
  );
};

export default CryptoSection;