import React from "react";
import {
  OrcaWhirlpoolType,
} from "@/types/home/orca";

interface OrcaTableProps {
  data: OrcaWhirlpoolType[];
  handleClick: (address: string) => void;
}

const OrcaTable: React.FC<OrcaTableProps> = ({ data, handleClick }) => {
  console.log(data, "data");
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Pool
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Yield / TVL (24h)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Volume (24h)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            TVL
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Fees (24h)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Rewards (24h)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {data.map((pool) => {
          const volume24h = parseFloat(pool.volume.day.toFixed(0));
          const feeRate = pool.price / 1000 || 0;
          const formattedFeeRate = feeRate.toFixed(2);
          const tvl = parseFloat(pool.tvl.toFixed(0));
          const fees24h = parseFloat(
            (pool.lpFeeRate * pool.volume.day).toFixed(0)
          );
          const yieldTVL24h = parseFloat((((pool.volume.day * pool.lpFeeRate) / tvl) * 100).toFixed(2));
          const rewards24h = pool.reward0Apr.day;

          return (
            <tr key={pool.address}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <div className="flex items-center space-x-2">
                  {pool.tokenA && (
                    <img
                      src={pool.tokenA.logoURI}
                      alt={pool.tokenA.symbol}
                      className="w-8 h-8 rounded-full border-4 border-gray-500"
                    />
                  )}
                  {pool.tokenB && (
                    <img
                      src={pool.tokenB.logoURI}
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
              <td className="px-6 py-4 whitespace-nowrap">{yieldTVL24h > 0.01 ? yieldTVL24h : "<0.01"}%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${volume24h.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${tvl.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${fees24h.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${rewards24h.toLocaleString()}
              </td>
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
