import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  DollarSign,
  Percent,
  RefreshCw,
  Settings,
  Moon,
  Sun,
  HelpCircle,
  Bell,
} from "lucide-react";
import { PoolTypeKey, poolTypes } from "@/utils/home/radium_constants";

interface TokenData {
  symbol: string;
  logoURI: string;
}

interface DayData {
  volume: number;
  volumeFee: number;
  apr: number;
}

interface RadiumPool {
  id: string;
  mintA: TokenData;
  mintB: TokenData;
  tvl: number;
  feeRate: number;
  day: DayData;
}

interface RadiumDashboardProps {
  data: RadiumPool[];
  handleClick: (id: string) => void;
  handlePoolType: (type: PoolTypeKey) => void;
  handleSort: (type: string) => void;
  handleSortType: (type: string) => void;
  poolType: string;
  poolSortField: string;
  sortType: string;
}

const RadiumDashboard: React.FC<RadiumDashboardProps> = ({
  data,
  handleClick,
  handlePoolType,
  handleSort,
  handleSortType,
  poolType,
  poolSortField,
  sortType,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RadiumPool | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });
  const [prevData, setPrevData] = useState<Record<string, RadiumPool>>({});
  const [changes, setChanges] = useState<
    Record<string, Partial<Record<keyof RadiumPool, number>>>
  >({});
  const [animatedRows, setAnimatedRows] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLowLiquidity, setShowLowLiquidity] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const newChanges: Record<
      string,
      Partial<Record<keyof RadiumPool, number>>
    > = {};
    const newPrevData: Record<string, RadiumPool> = {};

    data.forEach((pool) => {
      const prev = prevData[pool.id];
      newPrevData[pool.id] = pool;

      if (prev) {
        newChanges[pool.id] = {
          tvl: calculatePercentageChange(prev.tvl, pool.tvl),
          "day.volume": calculatePercentageChange(
            prev.day.volume,
            pool.day.volume
          ),
          "day.volumeFee": calculatePercentageChange(
            prev.day.volumeFee,
            pool.day.volumeFee
          ),
          "day.apr": calculatePercentageChange(prev.day.apr, pool.day.apr),
        };
      }
    });

    setPrevData(newPrevData);
    setChanges(newChanges);

    const changedRows = Object.keys(newChanges);
    setAnimatedRows(changedRows);
    setTimeout(() => setAnimatedRows([]), 1000);
  }, [data]);

  const calculatePercentageChange = (oldValue: number, newValue: number) => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  };

  const filteredAndSortedData = useMemo(() => {
    return data
      .sort((a, b) => {
        if (sortConfig.key !== null) {
          const aValue = a[sortConfig.key] as number;
          const bValue = b[sortConfig.key] as number;
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
  }, [data, sortConfig, showLowLiquidity]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const requestSort = (key: keyof RadiumPool) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const getSortIndicator = (key: keyof RadiumPool) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUpIcon className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDownIcon className="inline w-4 h-4 ml-1" />
    );
  };

  const renderChangeIndicator = (change: number | undefined) => {
    if (change === undefined) return null;
    const isPositive = change >= 0;
    return (
      <div
        className={`text-sm ${
          isPositive ? "text-green-400" : "text-red-400"
        } flex items-center`}
      >
        {isPositive ? (
          <TrendingUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDownIcon className="w-4 h-4 mr-1" />
        )}
        {Math.abs(change).toFixed(2)}%
      </div>
    );
  };

  const totalLiquidity = useMemo(
    () => data.reduce((sum, pool) => sum + pool.tvl, 0),
    [data]
  );
  const totalVolume = useMemo(
    () => data.reduce((sum, pool) => sum + pool.day.volume, 0),
    [data]
  );
  const averageAPR = useMemo(
    () => data.reduce((sum, pool) => sum + pool.day.apr, 0) / data.length,
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
          Radium Pool Dashboard
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
        <div className="flex justify-between items-center mb-4">
          <div className="relative mb-8">
            <select
              value={poolType}
              onChange={(e) => handlePoolType(e.target.value as PoolTypeKey)}
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
              } px-4 pr-8 py-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {Object.keys(poolTypes).map((key) => (
                <option key={key} value={key}>
                  {poolTypes[key as PoolTypeKey]}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showLowLiquidity}
                onChange={() => setShowLowLiquidity(!showLowLiquidity)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span
                className={`ml-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Show low liquidity pools
              </span>
            </label>
            <button
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <RefreshCw
                className={isDarkMode ? "text-white" : "text-gray-800"}
              />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table
            className={`min-w-full divide-y ${
              isDarkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                {[
                  "Pool",
                  "Liquidity",
                  "Volume 24H",
                  "Fees 24H",
                  "APR 24H",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className={`px-6 py-3 text-left text-xs font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:text-white`}
                    onClick={() =>
                      requestSort(
                        header
                          .toLowerCase()
                          .replace(" ", "") as keyof RadiumPool
                      )
                    }
                  >
                    {header}{" "}
                    {getSortIndicator(
                      header.toLowerCase().replace(" ", "") as keyof RadiumPool
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y ${
                isDarkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              {paginatedData.map((pool) => (
                <tr
                  key={pool.id}
                  className={`transition-all duration-300 ease-in-out ${
                    animatedRows.includes(pool.id)
                      ? "bg-blue-900 bg-opacity-30"
                      : ""
                  } ${
                    hoveredRow === pool.id
                      ? isDarkMode
                        ? "bg-gray-700"
                        : "bg-gray-100"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(pool.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex relative">
                        <img
                          src={pool.mintA.logoURI}
                          alt={pool.mintA.symbol}
                          className="w-8 h-8 rounded-full border-2 border-gray-500 transition-all duration-200 hover:scale-110 hover:z-10"
                        />
                        <img
                          src={pool.mintB.logoURI}
                          alt={pool.mintB.symbol}
                          className="w-8 h-8 rounded-full border-2 border-gray-500 relative -left-4 transition-all duration-200 hover:scale-110 hover:z-20"
                        />
                      </div>
                      <div className="ml-2">
                        <div
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {pool.mintA.symbol}-{pool.mintB.symbol}
                        </div>
                        <div className="text-sm font-medium mt-1 flex items-center">
                          <span className="bg-[rgba(171,196,255,0.12)] text-[#abc4ff] rounded-full px-2 py-1 transition-all duration-200 hover:bg-[rgba(171,196,255,0.2)]">
                            {`${(pool.feeRate * 100).toFixed(2)}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $
                      {pool.tvl.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    {renderChangeIndicator(changes[pool.id]?.tvl)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $
                      {pool.day.volume.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    {renderChangeIndicator(changes[pool.id]?.["day.volume"])}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $
                      {pool.day.volumeFee.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    {renderChangeIndicator(changes[pool.id]?.["day.volumeFee"])}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {pool.day.apr.toFixed(2)}%
                    </div>
                    {renderChangeIndicator(changes[pool.id]?.["day.apr"])}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleClick(pool.id)}
                      className="px-4 py-2 bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Simulate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}{" "}
            of {filteredAndSortedData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md disabled:opacity-50`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md disabled:opacity-50`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiumDashboard;
