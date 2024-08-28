import { FetchRadiumResult } from "@/types/home/radium";

export const fetchRadiumData = async (
  page: number,
  pageSize: number,
  sortField: string = "default  ",
  sortType: string = "desc"
): Promise<FetchRadiumResult | null> => {
  try {
    const response = await fetch(
      `https://api-v3.raydium.io/pools/info/list?poolType=all&poolSortField=${sortField}&sortType=${sortType}&pageSize=${pageSize}&page=${page}`
    );
    const result: FetchRadiumResult = await response.json();
    return result.success ? result : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
