import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { MainNav } from '@/components/layout/main-nav';
import { Footer } from '@/components/layout/footer';
import { ParticleSystem } from '@/components/background/particle-system';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://btb.finance'),
  title: {
    default: 'btb.finance - Automated Liquidity Management on Solana',
    template: '%s | btb.finance'
  },
  description: 'Automated liquidity management platform for Solana DEXs. Optimize your yields on Orca, Raydium, and more with intelligent rebalancing.',
  keywords: [
    'Solana DeFi',
    'Automated Liquidity Management',
    'Orca DEX',
    'Raydium DEX',
    'Yield Optimization',
    'Liquidity Provider',
    'DeFi Automation',
    'Crypto Investment',
    'SOL Yield Farming',
    'DEX Aggregator'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://btb.finance" />
      </head>
      <body className={`${inter.className} relative`}>
        <Providers>
          <ParticleSystem />
          <div className="flex min-h-screen flex-col relative z-10"> {/* Added relative and z-10 */}
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}