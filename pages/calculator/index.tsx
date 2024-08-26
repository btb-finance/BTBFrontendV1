import React, { useState } from "react";

const Calculator = () => {
  const [initialPrice, setInitialPrice] = useState<number>(100);
  const [finalPrice, setFinalPrice] = useState<number>(200);
  const [initialPriceUSDT, setInitialPriceUSDT] = useState<number>(1);
  const [finalPriceUSDT, setFinalPriceUSDT] = useState<number>(1.2);

  const calculateImpermanentLoss = (): number => {
    const initialRatio = initialPrice / initialPriceUSDT;
    const finalRatio = finalPrice / finalPriceUSDT;

    // Impermanent Loss formula
    const impermanentLoss =
      1 -
      (2 * Math.sqrt(initialRatio * finalRatio)) / (initialRatio + finalRatio);

    return impermanentLoss * 100; // Convert to percentage
  };

  const impermanentLoss = calculateImpermanentLoss();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Impermanent Loss Calculator</h1>
      <div className="mb-4">
        <label className="block text-gray-700">
          Initial Price of Coin (P₀):
        </label>
        <input
          type="number"
          value={initialPrice}
          onChange={(e) => setInitialPrice(Number(e.target.value))}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Final Price of Coin (P₁):</label>
        <input
          type="number"
          value={finalPrice}
          onChange={(e) => setFinalPrice(Number(e.target.value))}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Initial Price of USDT (P_USDT₀):
        </label>
        <input
          type="number"
          value={initialPriceUSDT}
          onChange={(e) => setInitialPriceUSDT(Number(e.target.value))}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Final Price of USDT (P_USDT₁):
        </label>
        <input
          type="number"
          value={finalPriceUSDT}
          onChange={(e) => setFinalPriceUSDT(Number(e.target.value))}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="text-lg font-semibold">
        Impermanent Loss: {impermanentLoss.toFixed(2)}%
      </div>
    </div>
  );
};

export default Calculator;
