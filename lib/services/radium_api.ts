import { FetchRadiumResult } from "@/types/home/radium";

const RAYDIUM_API_BASE = "https://api.raydium.io/v2/clmm/pools";

export const fetchRadiumData = async (
  page: number,
  pageSize: number,
  poolSortField: string,
  sortType: string,
  poolType: string
): Promise<FetchRadiumResult> => {
  try {
    console.log('Fetching from:', RAYDIUM_API_BASE);
    const response = await fetch(RAYDIUM_API_BASE);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Sample pool:', result[0]);
    
    if (!Array.isArray(result)) {
      console.error('Invalid response structure:', result);
      throw new Error('Invalid API response format');
    }

    console.log('Number of pools before filtering:', result.length);
    const poolsArray = result.filter(pool => {
      const isValid = pool && 
        typeof pool === 'object' &&
        pool.ammConfig &&
        pool.mintA &&
        pool.mintB;

      if (!isValid) {
        console.log('Invalid pool:', {
          hasPool: !!pool,
          isObject: typeof pool === 'object',
          hasAmmConfig: !!pool?.ammConfig,
          hasMintA: !!pool?.mintA,
          hasMintB: !!pool?.mintB
        });
      }
      return isValid;
    });

    console.log('Number of pools after filtering:', poolsArray.length);
    if (poolsArray.length > 0) {
      console.log('Sample filtered pool:', poolsArray[0]);
    }

    const transformedData = {
      success: true,
      data: {
        data: poolsArray.map(pool => ({
          id: pool.id || pool.ammConfig.id,
          mintA: {
            symbol: pool.mintA.symbol || pool.mintA.mint.substring(0, 8)
          },
          mintB: {
            symbol: pool.mintB.symbol || pool.mintB.mint.substring(0, 8)
          },
          day: {
            volume: parseFloat(pool.volume24h || '0'),
            volumeFee: parseFloat(pool.fee || '0') * parseFloat(pool.volume24h || '0'),
            apr: parseFloat(pool.apr || '0'),
            feeApr: parseFloat(pool.feeApr || '0')
          },
          tvl: parseFloat(pool.liquidity || '0')
        })),
        total: poolsArray.length
      }
    };

    console.log('First transformed pool:', transformedData.data.data[0]);
    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
