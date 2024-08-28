import { useEffect, useState } from "react";
import RadiumTable from "@/components/main/home/RadiumTable";
import { RadiumPool } from "@/types/home/radium";
import { fetchRadiumData } from "@/services/radium_api";

const PAGE_SIZE = 10;

interface RadiumComponentProps {
  onClick: (poolId: string) => void;
}

const RadiumComponent: React.FC<RadiumComponentProps> = ({ onClick }) => {
  const [data, setData] = useState<RadiumPool[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchRadiumData(currentPage, PAGE_SIZE, "liquidity");
        if (result) {
          setData(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching Radium data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
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
              Page {currentPage}
            </span>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-r-md"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
          <RadiumTable data={data} handleClick={onClick} />
        </>
      )}
    </div>
  );
};

export default RadiumComponent;
