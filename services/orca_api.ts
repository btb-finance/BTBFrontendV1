import { OrcaApiResponseType, OrcaDataType, OrcaWhirlpoolType, TokenDataType } from "@/types/home/orca";

const ORCA_BASE_URL = "https://pools-api.mainnet.orca.so";
const API_ENDPOINT = "https://api.mainnet.orca.so/v1/whirlpool/list";

export const getOrcaWhirlpools = async (): Promise<OrcaWhirlpoolType[]> => {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: OrcaApiResponseType = await response.json();
    return data.whirlpools;
  } catch (error) {
    console.error("Error fetching whirlpools:", error);
    throw error;
  }
};


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

export const getOrcaData = async (limit: number): Promise<OrcaDataType[]> => {
  const url = `${ORCA_BASE_URL}/whirlpools`;
  const response = await getPaginatedData<OrcaDataType>(url, limit);
  return response;
};

export const getOrcaTokens = async (
  limit: number
): Promise<TokenDataType[]> => {
  const url = `${ORCA_BASE_URL}/tokens`;
  const response = await getPaginatedData<TokenDataType>(url, limit);
  return response;
};

export const filterOrcaData = (orcaData: OrcaDataType[]): OrcaDataType[] => {
  return orcaData.filter(
    (data) => data.liquidity !== "0" && data.protocolFeeOwedA !== "0"
  );
};

export const combineOrcaAndTokenData = (
  orcaData: OrcaDataType[],
  tokenData: TokenDataType[]
): (OrcaDataType & { tokenA?: TokenDataType; tokenB?: TokenDataType })[] => {
  const filteredOrcaData = filterOrcaData(orcaData);
  const tokenMap = new Map<string, TokenDataType>();

  tokenData.forEach((token) => tokenMap.set(token.address, token));
  
  return filteredOrcaData.map((orca) => ({
    ...orca,
    tokenA: tokenMap.get(orca.tokenMintA),
    tokenB: tokenMap.get(orca.tokenMintB),
  }));
};
