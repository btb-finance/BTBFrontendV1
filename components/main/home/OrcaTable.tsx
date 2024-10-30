import React from "react";
import { useState, useMemo } from "react";
import {
  BarChart2,
  DollarSign,
  Percent,
  Settings,
  Moon,
  Sun,
  HelpCircle,
  Bell,
} from "lucide-react";
import { OrcaWhirlpoolType } from "@/types/home/orca";

interface OrcaTableProps {
  data: OrcaWhirlpoolType[];
  handleClick: (address: string) => void;
}

const OrcaTable: React.FC<OrcaTableProps> = ({ data, handleClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const totalLiquidity = useMemo(
    () => data.reduce((sum, pool) => sum + pool.tvl, 0),
    [data]
  );
  const totalVolume = useMemo(
    () => data.reduce((sum, pool) => sum + pool.volume.day, 0),
    [data]
  );
  const averageAPR = useMemo(
    () => data.reduce((sum, pool) => sum + pool.totalApr.day, 0) / data.length,
    [data]
  );
  return (
    <div 
    className={`${
      isDarkMode ? "bg-gray-900" : "bg-gray-100"
    } min-h-screen p-6`}
    >
       <header className="flex justify-between items-center mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Orca Pool Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-600" />
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <Bell className={isDarkMode ? "text-white" : "text-gray-800"} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <Settings className={isDarkMode ? "text-white" : "text-gray-800"} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <HelpCircle
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Total Liquidity
            </h2>
            <DollarSign
              className={`w-8 h-8 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </div>
          <p
            className={`text-3xl font-bold mt-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            $
            {totalLiquidity.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              24h Volume
            </h2>
            <BarChart2
              className={`w-8 h-8 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
          </div>
          <p
            className={`text-3xl font-bold mt-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            $
            {totalVolume.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Average APR
            </h2>
            <Percent
              className={`w-8 h-8 ${
                isDarkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
          </div>
          <p
            className={`text-3xl font-bold mt-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {averageAPR.toFixed(2)}%
          </p>
        </div>
      </div>
      <div
          className={`bg-${
            isDarkMode ? "gray-800" : "white"
          } p-6 rounded-lg shadow-xl`}
      >
        <table 
           className={`min-w-full divide-y ${
            isDarkMode ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
      <thead className="bg-gray-800 pb-4">
        {[
          "Pool",
          "Yield / TVL (24h)",
          "Volume 24H",
          "TVL",
          "Fees 24H",
          "Rewards 24H",
          "Actions",
        ].map((header) => (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hover:bg-gray-700">
            {header}
          </th>
        ))}
        <tr></tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {data.map((pool) => {
          const volume24h = parseFloat(pool.volume.day.toFixed(0));
          const feeRate = pool.lpFeeRate * 100;
          const formattedFeeRate = feeRate.toFixed(2);
          const tvl = parseFloat(pool.tvl.toFixed(0));
          const fees24h = parseFloat(
            (pool.lpFeeRate * pool.volume.day).toFixed(0)
          );
          const yieldTVL24h = parseFloat(
            (((pool.volume.day * pool.lpFeeRate) / tvl) * 100).toFixed(2)
          );
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
              <td className="px-6 py-4 whitespace-nowrap">
                {yieldTVL24h > 0.01 ? yieldTVL24h : "<0.01"}%
              </td>
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
      </div>
      
    </div>
    
  );
};

export default OrcaTable;
