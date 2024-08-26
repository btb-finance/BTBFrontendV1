import { useEffect, useState } from "react";
import OrcaTable from "@/components/main/home/OrcaTable";
import {
  combineOrcaAndTokenData,
  getOrcaData,
  getOrcaTokens,
} from "@/services/orca_api";
import { OrcaData, TokenData } from "@/types/home/orca";

const PAGE_SIZE = 10;
const LIMIT = 1000;

interface OrcaComponentProps {
  onClick: (poolId: string) => void;
}

const OrcaComponent: React.FC<OrcaComponentProps> = ({ onClick }) => {
  const [combinedData, setCombinedData] = useState<
    (OrcaData & { tokenA?: TokenData; tokenB?: TokenData })[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [orcaDataResult, orcaTokensResult] = await Promise.all([
          getOrcaData(LIMIT), 
          getOrcaTokens(LIMIT),
        ]);

        const combined = combineOrcaAndTokenData(
          orcaDataResult,
          orcaTokensResult
        );
        setCombinedData(combined);

        setTotalPages(Math.ceil(combined.length / PAGE_SIZE));
      } catch (error) {
        console.error("Error fetching Orca data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPaginatedOrcaData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return combinedData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
          <OrcaTable data={getPaginatedOrcaData()} handleClick={onClick} />
        </>
      )}
    </div>
  );
};

export default OrcaComponent;