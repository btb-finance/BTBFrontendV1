import React, { useState } from "react";
import { RadiumPool } from "@/types/home/radium";

interface RadiumTableProps {
  data: RadiumPool[];
  handleClick: (id: string) => void;
}

const RadiumTable: React.FC<RadiumTableProps> = ({ data, handleClick }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof RadiumPool | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key] as number;
        const bValue = b[sortConfig.key] as number;

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof RadiumPool) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof RadiumPool) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort('mintA')}
          >
            Pool {getSortIndicator('mintA')}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort('tvl')}
          >
            Liquidity {getSortIndicator('tvl')}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort('day.volume')}
          >
            Volume 24H {getSortIndicator('day.volume')}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort('day.volumeFee')}
          >
            Fees 24H {getSortIndicator('day.volumeFee')}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort('day.apr')}
          >
            APR 24H {getSortIndicator('day.apr')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {sortedData.map((pool) => (
          <tr key={pool.id}>
            <td className="px-6 py-4 whitespace-nowrap flex items-center">
              <div className="flex relative">
                <img
                  src={pool.mintA.logoURI}
                  alt={pool.mintA.symbol}
                  className="w-8 h-8 rounded-full border-4 border-gray-500"
                />
                <img
                  src={pool.mintB.logoURI}
                  alt={pool.mintB.symbol}
                  className="w-8 h-8 rounded-full border-4 border-gray-500 relative -left-4"
                />
              </div>
              <div className="ml-4">
                <div>
                  {pool.mintA.symbol}-{pool.mintB.symbol}
                </div>
                <div className="text-sm font-medium mt-1 flex items-center">
                  <span className="bg-[rgba(171,196,255,0.12)] text-[#abc4ff] rounded-full px-2 py-1">
                    {`${(pool.feeRate * 100).toFixed(2)}%`}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.tvl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.day.volume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.day.volumeFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {pool.day.apr.toFixed(2)}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="px-4 py-2 bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] rounded-full text-white font-semibold hover:opacity-90 transition-opacity duration-200"
                onClick={() => handleClick(pool.id)}
              >
                Simulate
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RadiumTable;
