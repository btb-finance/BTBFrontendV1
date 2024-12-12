import OrcaTable from "./OrcaTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { setPage, setTokenSearch, fetchWhirlpoolData } from "@/lib/store/slices/orca/whirlpoolSlice";
import { PAGE_SIZE } from "@/lib/utils/home/orca_constants";
import { useEffect, useMemo, useState, useCallback } from "react";
import { TokenDataType, OrcaWhirlpoolType } from "@/lib/types/home/orca";
import useDebounce from "@/pools/hooks/useDebounce";

interface OrcaComponentProps {
  onClick: (poolId: string) => void;
}

interface TokenVolumeInfo {
  hasVolume: boolean;
  totalVolume: number;
}

const MINIMUM_VOLUME = 10; // $10 minimum volume threshold

const OrcaComponent: React.FC<OrcaComponentProps> = ({ onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    filteredData: whirlpoolData,
    loading,
    currentPage,
    totalPages,
    error
  } = useSelector((state: RootState) => state.whirlpool);

  const { tokens } = useSelector((state: RootState) => state.orca);

  useEffect(() => {
    console.log('Fetching Orca data...');
    dispatch(fetchWhirlpoolData());
  }, [dispatch]);

  useEffect(() => {
    console.log('Whirlpool state:', { whirlpoolData, loading, error });
  }, [whirlpoolData, loading, error]);

  // Memoize the token volume map with total volumes
  const tokenVolumeMap = useMemo(() => {
    const map = new Map<string, TokenVolumeInfo>();
    
    // Initialize all tokens with zero volume
    tokens?.forEach(token => {
      map.set(token.address, { hasVolume: false, totalVolume: 0 });
    });

    // Calculate total volume for each token
    whirlpoolData.forEach((pool: OrcaWhirlpoolType) => {
      if (pool.volume && typeof pool.volume === 'object') {
        const volume = pool.volume?.day || 0;
        
        if (volume > 0) {
          // Update token A
          const tokenAInfo = map.get(pool.tokenA.mint) || { hasVolume: false, totalVolume: 0 };
          map.set(pool.tokenA.mint, {
            hasVolume: true,
            totalVolume: tokenAInfo.totalVolume + volume
          });

          // Update token B
          const tokenBInfo = map.get(pool.tokenB.mint) || { hasVolume: false, totalVolume: 0 };
          map.set(pool.tokenB.mint, {
            hasVolume: true,
            totalVolume: tokenBInfo.totalVolume + volume
          });
        }
      }
    });

    return map;
  }, [whirlpoolData, tokens]);

  const getPaginatedOrcaData = useCallback(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return whirlpoolData.slice(startIndex, endIndex);
  }, [currentPage, whirlpoolData]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  }, [dispatch, totalPages]);

  const [selectedTokens, setSelectedTokens] = useState<TokenDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = useCallback((addresses: string[]) => {
    dispatch(setTokenSearch(addresses));
  }, [dispatch]);

  const handleSelectToken = useCallback((token: TokenDataType) => {
    setSelectedTokens(prev => {
      const newSelectedTokens = [...prev, token];
      const updatedTokensAddress = newSelectedTokens.map(t => t.address);
      handleSearch(updatedTokensAddress);
      return newSelectedTokens;
    });
    setSearchQuery("");
  }, [handleSearch]);

  const handelRemoveToken = useCallback((tokenToRemove: TokenDataType) => {
    setSelectedTokens(prev => {
      const newSelectedTokens = prev.filter(
        (token) => token.address !== tokenToRemove.address
      );
      const updatedTokensAddress = newSelectedTokens.map((t) => t.address);
      handleSearch(updatedTokensAddress);
      return newSelectedTokens;
    });
  }, [handleSearch]);

  const filteredAndSortedTokens = useMemo(() => {
    if (!tokens?.length || !debouncedSearchQuery) return [];
    
    const searchLower = debouncedSearchQuery.toLowerCase();
    
    // Filter tokens based on search query and minimum volume
    const filtered = tokens.filter(token => {
      if (!token?.symbol && !token?.address) return false;
      
      const volumeInfo = tokenVolumeMap.get(token.address);
      const tokenVolume = volumeInfo ? volumeInfo.totalVolume : 0;
      
      const matchesSearch = 
        token.symbol?.toLowerCase().includes(searchLower) ||
        token.address?.toLowerCase().includes(searchLower);
      
      return matchesSearch && tokenVolume >= MINIMUM_VOLUME;
    });

    // Sort by volume
    return filtered.sort((a, b) => {
      const aVolumeInfo = tokenVolumeMap.get(a.address);
      const bVolumeInfo = tokenVolumeMap.get(b.address);
      const aVolume = aVolumeInfo ? aVolumeInfo.totalVolume : 0;
      const bVolume = bVolumeInfo ? bVolumeInfo.totalVolume : 0;

      return bVolume - aVolume;
    });
  }, [tokens, debouncedSearchQuery, tokenVolumeMap]);

  const showDropdown = debouncedSearchQuery.length > 2;

  if (loading) {
    return <div className="text-center p-4">Loading Orca pools...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!whirlpoolData || whirlpoolData.length === 0) {
    return <div className="text-center p-4">No pools available</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-end my-4">
        {currentPage !== 1 && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-l-md"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage !== totalPages && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-r-md"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center border-2 border-gray-500 w-full max-w-md p-2 rounded-md mb-10">
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedTokens.map((token) => (
              <div
                key={token.address}
                className="bg-gray-700 flex items-center px-2 py-1 rounded-md"
              >
                <img
                  src={token.image}
                  alt={token.symbol}
                  className="w-7 h-7 rounded-full"
                />
                <span className="mx-2">{token.symbol}</span>
                <button
                  className="text-gray-400 hover:text-gray-200"
                  onClick={() => handelRemoveToken(token)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedTokens.length < 2 && (
              <input
                className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-white"
                placeholder="Search token"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            )}
          </div>
        </div>

        {showDropdown && filteredAndSortedTokens.length > 0 && (
          <div className="absolute w-full max-w-md mt-1 bg-gray-800 rounded-md shadow-lg z-50">
            <ul className="max-h-80 overflow-y-auto rounded-md">
              {filteredAndSortedTokens.map((token) => {
                const volumeInfo = tokenVolumeMap.get(token.address);
                const volume = volumeInfo ? volumeInfo.totalVolume : 0;
                return (
                  <li
                    key={token.address}
                    className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectToken(token)}
                  >
                    <img
                      src={token.image}
                      alt={token.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-300">
                        ${volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-gray-800 p-4">
        <OrcaTable 
          data={getPaginatedOrcaData()} 
          handleClick={onClick}
        />
      </div>
    </div>
  );
};

export default OrcaComponent;