import { FetchRadiumResult } from "@/types/home/radium";

export const fetchRadiumData = async (
  page: number,
  pageSize: number,
  poolSortField: string,
  sortType: string,
  poolType: string
): Promise<FetchRadiumResult | null> => {
  try {
    const response = await fetch(
      `https://api-v3.raydium.io/pools/info/list?poolType=${poolType}&poolSortField=${poolSortField}&sortType=${sortType}&pageSize=${pageSize}&page=${page}`
    );
    const result: FetchRadiumResult = await response.json();
    return result.success ? result : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
