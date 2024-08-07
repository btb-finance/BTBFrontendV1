// src/app/components/Layout.tsx
// Main layout component that includes headers, footers, and navigational elements.

import React, { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Navigation />
    <main>{children}</main>
  </div>
);

export default Layout;
