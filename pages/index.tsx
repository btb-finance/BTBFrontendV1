import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RadiumComponent from "@/components/main/home/RadiumComponent";
import OrcaComponent from "@/components/main/home/OrcaComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-management/store";
import { fetchWhirlpoolData } from "@/state-management/slices/orca/whirlpoolSlice";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"radium" | "orca">("radium");
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWhirlpoolData());
  }, [dispatch]);

  const handleSimulateClick = (poolId: string) => {
    router.push(`/pool/${poolId}`);
  };

  const handleTabChange = (tab: "radium" | "orca") => {
    setActiveTab(tab);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Pool Data</h1>
      <div className="overflow-x-auto w-full">
        <div className="mb-6 flex justify-between w-full">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-6 py-2 rounded-md border border-gray-700 transition-colors ${
                activeTab === "radium"
                  ? "bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("radium")}
            >
              Radium
            </button>
            <button
              className={`px-6 py-2 rounded-md border border-gray-700 transition-colors ${
                activeTab === "orca"
                  ? "bg-gradient-to-r from-[#5493ff] via-[#af3fff] to-[#ff82fa] text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("orca")}
            >
              Orca
            </button>
          </div>
        </div>
        {activeTab === "radium" && (
          <RadiumComponent onClick={handleSimulateClick} />
        )}
        {activeTab === "orca" && (
          <OrcaComponent onClick={handleSimulateClick} />
        )}
      </div>
    </main>
  );
}
