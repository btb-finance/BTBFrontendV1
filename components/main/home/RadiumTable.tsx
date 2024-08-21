import React from "react";
import { RadiumPool } from "@/types/home/radium";

interface RadiumTableProps {
  data: RadiumPool[];
  handleClick: (id: string) => void;
}

const RadiumTable: React.FC<RadiumTableProps> = ({
  data,
  handleClick,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Pool
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Liquidity
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Volume 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Fees 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            APR 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {data.map((pool) => (
          <tr key={pool.id}>
            <td className="px-6 py-4 whitespace-nowrap items-center relative flex">
              <img
                src={pool.mintA.logoURI}
                alt={pool.mintA.symbol}
                className="w-8 h-8 rounded-full border-4 border-gray-500"
              />
              <img
                src={pool.mintB.logoURI}
                alt={pool.mintB.symbol}
                className="w-8 h-8 rounded-full border-4 border-gray-500 relative right-2"
              />
              <div>
                <div>
                  {pool.mintA.symbol}-{pool.mintB.symbol}
                </div>
                <div className="text-sm font-medium mt-1 flex items-center justify-start">
                  <span className="bg-[rgba(171,196,255,0.12)] text-[#abc4ff] rounded-full px-2 py-1">
                    ${pool.feeRate.toFixed(4)}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.tvl.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.day.volume.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${pool.day.volumeFee.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {pool.day.apr.toFixed(2)}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="px-4 py-2 bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] rounded-full text-white font-semibold"
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
