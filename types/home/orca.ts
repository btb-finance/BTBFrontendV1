export interface OrcaRewardInfoType {
  mint: string;
  vault: string;
  authority: string;
  emissionsPerSecondX64: string;
  growthGlobalX64: string;
}

export interface OrcaDataType {
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
  rewardInfos: OrcaRewardInfoType[];
}
export interface OrcaDataResponseType {
  data: OrcaDataType[];
  meta: {
    cursor: {
      previous: string | null;
      next: string | null;
    };
  };
}
export interface TokenDataType {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  description: string;
  image: string;
  tags: string[] | null;
  risk: string;
  blocked: boolean;
  mint: string;
  logoURI: string;
  coingeckoId: string;
  whitelisted: boolean;
  poolToken: boolean;
  token2022: boolean;
  price?: null | string
}

export interface TokenDataResponseType {
  data: TokenDataType[];
  meta: {
    cursor: {
      previous: string | null;
      next: string | null;
    };
  };
}
export interface OrcaVolumeType {
  day: number;
  week: number;
  month: number;
}
export interface OrcaPriceRangeType {
  day: {
    min: number;
    max: number;
  };
  week: {
    min: number;
    max: number;
  };
  month: {
    min: number;
    max: number;
  };
}
export interface OrcaWhirlpoolType {
  address: string;
  tokenA: TokenDataType;
  tokenB: TokenDataType;
  whitelisted: boolean;
  token2022: boolean;
  tickSpacing: number;
  price: number;
  lpFeeRate: number;
  protocolFeeRate: number;
  whirlpoolsConfig: string;
  modifiedTimeMs: number;
  tvl: number;
  volume: OrcaVolumeType;
  volumeDenominatedA: OrcaVolumeType;
  volumeDenominatedB: OrcaVolumeType;
  priceRange: OrcaPriceRangeType;
  feeApr: OrcaVolumeType;
  reward0Apr: OrcaVolumeType;
  reward1Apr: OrcaVolumeType;
  reward2Apr: OrcaVolumeType;
  totalApr: OrcaVolumeType;
}

export interface OrcaApiResponseType {
  whirlpools: OrcaWhirlpoolType[];
}

