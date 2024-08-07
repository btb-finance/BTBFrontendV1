// src/app/components/PoolCard.tsx
// Component to display information about a specific pool in a card format.

import React from 'react';

interface Pool {
  name: string;
  apr: number;
  apy: number;
  liquidity: number;
}

interface PoolCardProps {
  pool: Pool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => (
  <div className="pool-card">
    <h3>{pool.name}</h3>
    <p>APR: {pool.apr}%</p>
    <p>APY: {pool.apy}%</p>
    <p>Total Liquidity: ${pool.liquidity}</p>
  </div>
);

export default PoolCard;
