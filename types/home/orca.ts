// types.ts

export interface RewardInfo {
  mint: string;
  vault: string;
  authority: string;
  emissionsPerSecondX64: string;
  growthGlobalX64: string;
}

export interface OrcaData {
  address: string;
  whirlpoolsConfig: string;
  whirlpoolBump: number[];
  tickSpacing: number;
  tickSpacingSeed: number[];
  feeRate: number;
  protocolFeeRate: number;
  liquidity: string;
  sqrtPrice: string;
  tickCurrentIndex: number;
  protocolFeeOwedA: string;
  protocolFeeOwedB: string;
  tokenMintA: string;
  tokenVaultA: string;
  feeGrowthGlobalA: string;
  tokenMintB: string;
  tokenVaultB: string;
  feeGrowthGlobalB: string;
  rewardLastUpdatedTimestamp: string;
  rewardInfos: RewardInfo[];
}

export interface OrcaDataResponse {
  data: OrcaData[];
  meta: {
    cursor: {
      previous: string | null;
      next: string | null;
    };
  };
}

export interface TokenData {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  description: string;
  image: string;
  tags: string[] | null;
  risk: string;
  blocked: boolean;
}

export interface TokenDataResponse {
  data: TokenData[];
  meta: {
    cursor: {
      previous: string | null;
      next: string | null;
    };
  };
}
