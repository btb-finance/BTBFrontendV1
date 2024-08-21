import React from "react";
import { OrcaData, TokenData } from "@/types/home/orca";

interface OrcaTableProps {
  data: (OrcaData & { tokenA?: TokenData; tokenB?: TokenData })[]; // Updated type to include tokenA and tokenB
  handleClick: (address: string) => void;
}

const OrcaTable: React.FC<OrcaTableProps> = ({ data, handleClick }) => {
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
        {data.map((pool) => {
          // Safely parse and format values
          const liquidity = parseFloat(pool.liquidity);
          const feeRate = pool.feeRate;
          const fees24h = parseFloat(pool.protocolFeeOwedA) || 0;

          // Assuming APR is somehow derived from feeRate and other available data
          const apr24h = (feeRate / 100).toFixed(2); // Placeholder for APR calculation

          return (
            <tr key={pool.address}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <div className="flex items-center space-x-2">
                  {pool.tokenA && (
                    <img
                      src={pool.tokenA.image}
                      alt={pool.tokenA.symbol}
                      className="w-8 h-8 rounded-full border-4 border-gray-500"
                    />
                  )}
                  {pool.tokenB && (
                    <img
                      src={pool.tokenB.image}
                      alt={pool.tokenB.symbol}
                      className="w-8 h-8 rounded-full border-4 border-gray-500 relative right-4"
                    />
                  )}
                  <div>
                    <div>
                      {pool.tokenA?.symbol} - {pool.tokenB?.symbol}
                    </div>
                    <div className="text-sm font-medium mt-1">
                      <span className="bg-[rgba(171,196,255,0.12)] text-[#abc4ff] rounded-full px-2 py-1">
                        {feeRate}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${liquidity.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${fees24h.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{apr24h}%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] rounded-full text-white font-semibold"
                  onClick={() => handleClick(pool.address)}
                >
                  Simulate
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrcaTable;
