import { setGlobalState, useGlobalState } from "../../store";

const Hero = () => {
  const [stats] = useGlobalState("stats");

  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
        <span className="capitalize">Empowering Dreams, Funding Futures Together with</span>
        <br />
        <span className="uppercase text-green-600">BlockchainBoost</span>
      </h1>

      <div className="flex justify-center items-center space-x-4">
        <button
          className="px-6 py-3 bg-green-600 text-white font-medium uppercase rounded-full shadow-md hover:bg-green-700 transition-all"
          onClick={() => setGlobalState("createModal", "scale-100")}
        >
          Add Project
        </button>

        <button
          className="px-6 py-3 border border-green-600 text-green-600 font-medium uppercase rounded-full shadow-md hover:bg-green-700 hover:text-white transition-all"
        >
          Back Projects
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 gap-4">
        {[
          { label: "Projects", value: stats?.totalProjects || 0 },
          { label: "Backings", value: stats?.totalBacking || 0 },
          { label: "Donated", value: `${stats?.totalDonations || 0} ETH` },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col justify-center items-center h-20 w-32 border shadow-md rounded-lg p-4">
            <span className="text-lg font-bold text-green-900">{value}</span>
            <span className="text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
