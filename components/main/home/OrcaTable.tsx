import React from "react";
import { OrcaData, TokenData } from "@/types/home/orca";

interface OrcaTableProps {
  data: (OrcaData & { tokenA?: TokenData; tokenB?: TokenData })[];
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
            Volume 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Fees 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            APR 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            APY 24H
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {data.map((pool) => {
          const liquidity = parseFloat(pool.liquidity) || 0;
          const volume24h = parseFloat(pool.volume24h) || 0;
          const fees24h = parseFloat(pool.protocolFeeOwedA) || 0;

          // Correct fee rate handling - assume it's a percentage directly
          const feeRate = parseFloat(pool.feeRate) / 10000 || 0; 
          const formattedFeeRate = feeRate.toFixed(2);

          // Avoid division by zero
          const apr24h = liquidity > 0 ? ((feeRate * volume24h) / liquidity).toFixed(2) : "0.00";
          const apy24h = liquidity > 0 ? ((1 + parseFloat(apr24h) / 100) ** 365 - 1).toFixed(2) : "0.00";

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
                        {formattedFeeRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${liquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${volume24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${fees24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{apr24h}%</td>
              <td className="px-6 py-4 whitespace-nowrap">{apy24h}%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] rounded-full text-white font-semibold hover:opacity-90 transition-opacity duration-200"
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