import { useRouter } from "next/router";
import { useState } from "react";

// Dummy data for the stacked line graph
const dummyGraphData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 200 },
  { month: "May", value: 180 },
  { month: "Jun", value: 220 },
];

export default function PoolDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [estimateFees, setEstimateFees] = useState(2.9);
  const [monthlyApr, setMonthlyApr] = useState("");
  const [yearlyApr, setYearlyApr] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");

  const handleCalculateImpermanentLoss = () => {
    // Dummy function for calculation
    console.log("Calculating impermanent loss...");
  };

  const handleCreatePosition = () => {
    // Dummy function for creating position
    console.log("Creating position...");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Pool Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Calculator */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <div className="text-2xl font-bold mb-1">Estimate Fees (24h)</div>
            <div className="text-4xl font-bold text-blue-400">
              ${estimateFees.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <label className="text-sm font-medium">Monthly APR</label>
            <input
              type="text"
              value={monthlyApr}
              onChange={(e) => setMonthlyApr(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-1/2"
              placeholder="Enter Monthly APR"
            />
          </div>
          <div className="flex justify-between mb-6">
            <label className="text-sm font-medium">Yearly APR</label>
            <input
              type="text"
              value={yearlyApr}
              onChange={(e) => setYearlyApr(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-1/2"
              placeholder="Enter Yearly APR"
            />
          </div>
          <button
            onClick={handleCalculateImpermanentLoss}
            className="bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] text-white rounded-full px-4 py-2 w-full"
          >
            Calculate Impermanent Loss
          </button>
        </div>

        {/* Card 2: Deposit and Create Position */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Deposit</h2>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-2">Deposit Amount</label>
            <input
              type="text"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 mb-4"
              placeholder="Enter Deposit Amount"
            />
            <div className="flex justify-between mb-4">
              <label className="text-sm font-medium">USDT</label>
              <input
                type="text"
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-1/2"
                placeholder="Enter USDT Amount"
              />
            </div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-medium">SOL</label>
              <input
                type="text"
                value={solAmount}
                onChange={(e) => setSolAmount(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-1/2"
                placeholder="Enter SOL Amount"
              />
            </div>
            <button
              onClick={handleCreatePosition}
              className="bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] text-white rounded-full px-4 py-2 w-full"
            >
              Create Position
            </button>
          </div>
        </div>
      </div>
      {/* Stacked Line Graph (Placeholder for now) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Volume</h2>
        <div className="w-full h-64 bg-gray-700 rounded">
          {/* Placeholder for the line graph */}
          <div className="flex items-center justify-center h-full text-gray-300">
            Graph Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
