// src/app/components/Navigation.tsx
// Navigation component that contains the navigation menu for the application.

import React from 'react';
import Link from 'next/link';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/invest">Invest</Link></li>
      <li><Link href="/withdraw">Withdraw</Link></li>
    </ul>
  </nav>
);

export default Navigation;
