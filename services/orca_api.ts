import {
  OrcaData,
  TokenData,
} from "@/types/home/orca";

const ORCA_BASE_URL = "https://pools-api.mainnet.orca.so";

const getPaginatedData = async <T>(
  url: string,
  limit: number,
  after: string | null = null
): Promise<T[]> => {
  let results: T[] = [];
  let hasMore = true;
  let nextCursor: string | null = after;

  while (hasMore) {
    const response = await fetch(
      `${url}?limit=${limit}${nextCursor ? `&after=${nextCursor}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const responseData = data as {
      data: T[];
      meta: { cursor: { next: string | null } };
    };

    results = results.concat(responseData.data);
    nextCursor = responseData.meta.cursor.next;
    hasMore = nextCursor !== null;
  }

  return results;
};

export const getOrcaData = async (limit: number): Promise<OrcaData[]> => {
  const url = `${ORCA_BASE_URL}/whirlpools`;
  const response = await getPaginatedData<OrcaData>(url, limit);
  return response;
};

export const getOrcaTokens = async (limit: number): Promise<TokenData[]> => {
  const url = `${ORCA_BASE_URL}/tokens`;
  const response = await getPaginatedData<TokenData>(url, limit);
  return response;
};

export const filterOrcaData = (orcaData: OrcaData[]): OrcaData[] => {
  return orcaData.filter(
    (data) => data.liquidity !== "0" && data.protocolFeeOwedA !== "0"
  );
};

export const combineOrcaAndTokenData = (
  orcaData: OrcaData[],
  tokenData: TokenData[]
): (OrcaData & { tokenA?: TokenData; tokenB?: TokenData })[] => {
  const filteredOrcaData = filterOrcaData(orcaData);
  const tokenMap = new Map<string, TokenData>();

  tokenData.forEach((token) => tokenMap.set(token.address, token));

  return filteredOrcaData.map((orca) => ({
    ...orca,
    tokenA: tokenMap.get(orca.tokenMintA),
    tokenB: tokenMap.get(orca.tokenMintB),
  }));
};