import { useEffect, useState } from "react";
import OrcaTable from "@/components/main/home/OrcaTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/store";
import { setPage } from "@/state-management/slices/orca/orcaSlice";
import { PAGE_SIZE } from "@/utils/home/orca_constants";

interface OrcaComponentProps {
  onClick: (poolId: string) => void;
}

const OrcaComponent: React.FC<OrcaComponentProps> = ({ onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: whirlpoolData,
    loading,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.whirlpool);

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
