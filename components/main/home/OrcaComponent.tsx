import OrcaTable from "@/components/main/home/OrcaTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/store";
import { setPage, setTokenSearch } from "@/state-management/slices/orca/whirlpoolSlice";
import { PAGE_SIZE } from "@/utils/home/orca_constants";
import { useEffect, useMemo, useState } from "react";
import { TokenDataType } from "@/types/home/orca";
import useDebounce from "@/hooks/useDebounce";
import { getOrcaTokensPrice } from "@/services/orca_api";

interface OrcaComponentProps {
  onClick: (poolId: string) => void;
}

const OrcaComponent: React.FC<OrcaComponentProps> = ({ onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    filteredData: whirlpoolData,
    loading,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.whirlpool);

  const { tokens } = useSelector((state: RootState) => state.orca);

  const getPaginatedOrcaData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return whirlpoolData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

   const handleSearch = (address: string[]) => {
      dispatch(setTokenSearch(address));
   };

  const [selectedTokens, setSelectedTokens] = useState<TokenDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const openDropdown = useMemo(
    () => debouncedSearchQuery.length > 2,
    [debouncedSearchQuery]
  );

  const handleSelectToken = (token: TokenDataType) => {
    const newSelectedTokens = [...selectedTokens, token];
    setSelectedTokens(newSelectedTokens);
    setSearchQuery("");
    const updatedTokensAddress = newSelectedTokens.map(t => t.address);
    handleSearch(updatedTokensAddress);
  };

  const handelRemoveToken = (tokenToRemove: TokenDataType) => {
     const newSelectedTokens = selectedTokens.filter(
       (token) => token.address !== tokenToRemove.address
     );
    setSelectedTokens(newSelectedTokens);
    const updatedTokensAddress = newSelectedTokens.map((t) => t.address);
    handleSearch(updatedTokensAddress);
  };

  const filteredAndSortedTokens = useMemo(() => {
    return tokens
      ?.filter(
        (token) =>
          token?.symbol
            ?.toLowerCase()
            ?.includes(debouncedSearchQuery?.toLowerCase()) ||
          token?.address
            ?.toLowerCase()
            ?.includes(debouncedSearchQuery?.toLowerCase())
      )
      ?.sort((a, b) => {
        const priceA = parseFloat(a.price || "0");
        const priceB = parseFloat(b.price || "0");
        return priceB - priceA; // Sort in descending order
      });
  }, [tokens, debouncedSearchQuery]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
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
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-r-md"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex items-center border-2 border-gray-500 w-1/4 p-2 rounded-md mb-10 relative">
            {selectedTokens.map((token) => (
              <div
                key={token.address}
                className="bg-gray-700 flex w-28 py-1 me-3 items-center px-2 rounded-sm relative"
              >
                <img
                  src={token.image}
                  alt={token.symbol}
                  className="w-7 h-7 rounded-[50%]"
                />
                <p className="ml-2">{token.symbol}</p>
                <button
                  className="ml-2 text-gray-400 text-xl absolute top-[.7px] right-2"
                  onClick={() => handelRemoveToken(token)}
                >
                  &times;
                </button>
              </div>
            ))}
            {selectedTokens.length < 2 && (
              <input
                className="border-0 bg-transparent outline-0 text-white"
                placeholder="Search token"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            )}
            {openDropdown && (
              <ul className="absolute w-full top-12 left-0 h-80 overflow-y-auto z-10 rounded-md">
                {filteredAndSortedTokens?.map((token) => (
                    <li
                      key={token.address}
                      className="bg-gray-700 flex p-3 hover:bg-slate-600 items-center"
                      onClick={() => handleSelectToken(token)}
                    >
                      <img
                        src={token.image}
                        className="w-7 h-7 rounded-[50%]"
                      />
                      <p className="ml-2 flex flex-col">
                        <span>{token.symbol}</span>
                        <span className="text-[10px]">{token.name}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl bg-gray-800 p-4">
            <OrcaTable data={getPaginatedOrcaData()} handleClick={onClick} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrcaComponent;
