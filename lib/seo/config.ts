import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://btb.finance'),
  title: {
    default: 'btb.finance - Automated Liquidity Management & LP Optimization on Solana',
    template: '%s | btb.finance'
  },
  description: 'Professional automated liquidity management platform for Solana DEXs. Alternative to vfat, Krystal, and other LP management tools. Optimize your yields on Orca, Raydium, and more with intelligent rebalancing.',
  keywords: [
    'Solana DeFi',
    'Automated Liquidity Management',
    'LP Management Tool',
    'vfat alternative',
    'Krystal alternative',
    'Orca DEX',
    'Raydium DEX',
    'Yield Optimization',
    'Liquidity Provider',
    'DeFi Automation',
    'Crypto Investment',
    'SOL Yield Farming',
    'DEX Aggregator',
    'Auto LP Management',
    'Solana LP Tool',
    'DeFi Portfolio Manager',
    'Automated Yield Farming',
    'LP Position Management',
    'Cross-DEX Optimization',
    'Impermanent Loss Protection'
  ],
  authors: [{ name: 'btb.finance' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://btb.finance',
    title: 'btb.finance - Professional LP Management & Yield Optimization on Solana',
    description: 'Professional automated liquidity management platform for Solana DEXs. Alternative to vfat, Krystal, and other LP tools. Optimize yields across Orca, Raydium, and more.',
    siteName: 'btb.finance',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'btb.finance - Professional LP Management'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'btb.finance - Professional LP Management & Yield Optimization on Solana',
    description: 'Professional automated liquidity management platform for Solana DEXs. Alternative to vfat, Krystal, and other LP tools. Optimize yields across Orca, Raydium, and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};