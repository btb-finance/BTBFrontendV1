import { FetchRadiumResult } from "@/types/home/radium";

const PAGE_SIZE = 10;

export const fetchRadiumData = async (
  page: number,
  pageSize: number
): Promise<FetchRadiumResult | null> => {
  try {
    const response = await fetch(
      `https://api-v3.raydium.io/pools/info/list?poolType=all&poolSortField=default&sortType=desc&pageSize=${pageSize}&page=${page}`
    );
    const result: FetchRadiumResult = await response.json();
    return result.success ? result : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
