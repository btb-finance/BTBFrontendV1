import React from 'react';
import Navigation from './components/Navigation';
import './styles/globals.css';

export const metadata = {
  title: 'BTB Finance',
  description: 'BTB Finance Liquidity Management Platform',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
