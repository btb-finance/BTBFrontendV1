export interface Mint {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: string[];
  extensions: object;
}

export interface RewardInfo {
  mint: Mint;
  perSecond: string;
  startTime: string;
  endTime: string;
}

export interface RadiumPool {
  type: string;
  programId: string;
  id: string;
  mintA: Mint;
  mintB: Mint;
  rewardDefaultPoolInfos: string;
  rewardDefaultInfos: RewardInfo[];
  price: number;
  mintAmountA: number;
  mintAmountB: number;
  feeRate: number;
  openTime: string;
  tvl: number;
  day: {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: number[];
  };
  week: object;
  month: object;
  pooltype: string[];
  farmUpcomingCount: number;
  farmOngoingCount: number;
  farmFinishedCount: number;
  config: object;
}

export interface FetchRadiumResult {
  success: boolean;
  data: {
    count: number;
    data: RadiumPool[];
    hasNextPage: boolean;
  };
}
