// import React, { useState, useEffect } from "react";

// const InvestmentSlider = () => {
//   const [activeTab, setActiveTab] = useState("active");
//   const [investmentData, setInvestmentData] = useState([]);

//   useEffect(() => {
//     // Placeholder for backend fetch
//     const fetchInvestments = async () => {
//       // Simulate API call
//       const data =
//         activeTab === "active"
//           ? [{ name: "Startup A", amount: "$10,000", equity: "15%" }]
//           : [{ name: "Startup B", amount: "$5,000", equity: "10%" }];

//       setInvestmentData(data);
//     };

//     fetchInvestments();
//   }, [activeTab]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md ">
//       <div className="flex space-x-4 mb-4">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "active" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("active")}
//         >
//           Active Proposals
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "expired" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("expired")}
//         >
//           Expired Proposals
//         </button>
//       </div>

//       <div className="space-y-4">
//         {investmentData.length > 0 ? (
//           investmentData.map((investment, index) => (
//             <div key={index} className="p-4 border rounded-lg shadow-sm">
//               <h3 className="font-semibold text-lg">{investment.name}</h3>
//               <p className="text-gray-600">Amount: {investment.amount}</p>
//               <p className="text-gray-600">Equity: {investment.equity}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No investments available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvestmentSlider;

//
//
//
// // #2
// import { useState } from "react";

// const InvestmentSlider = ({ projectName, raisedAmount, amount, investors }) => {
//   const [showInvestors, setShowInvestors] = useState(false);
//   const investmentPercentage = ((raisedAmount / amount) * 100).toFixed(2);

//   return (
//     <div className="bg-white shadow-lg border-l-4 border-blue-400 rounded-lg p-5 w-[374px] relative">
//       <div className="flex justify-between items-center">
//         <div className="text-lg font-bold text-gray-800">{projectName}</div>
//         <div className="text-center cursor-pointer" onClick={() => setShowInvestors(true)}>
//           <p className="text-lg font-bold text-blue-600">{investmentPercentage}%</p>
//           <p className="text-sm text-gray-600">
//             {raisedAmount}/{amount}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-center gap-3 mt-4">
//         <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Other details</button>
//         <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Other details</button>
//         <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Other details</button>
//       </div>

//       <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600">
//         Invest on this proposal
//       </button>

//       {showInvestors && (
//         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-80">
//             <h3 className="text-lg font-bold mb-3">Investors</h3>
//             <ul className="list-disc pl-5">
//               {investors.map((investor, index) => (
//                 <li key={index} className="text-gray-700">
//                   {investor.name}: ${investor.amount}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={() => setShowInvestors(false)}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvestmentSlider;

//
//
//
// #3
import React, { useState } from "react";

const InvestmentSlider = ({ projects }) => {
  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Opportunities</h2>
      <div className="flex overflow-x-auto space-x-4 p-2">
        {projects.map((project, index) => (
          <InvestmentCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

const InvestmentCard = ({ project }) => {
  const [showInvestors, setShowInvestors] = useState(false);

  const toggleInvestors = () => {
    setShowInvestors(!showInvestors);
  };

  const investmentPercentage = ((project.raisedAmount / project.amount) * 100).toFixed(2);

  return (
    <div className="w-[374px] bg-white shadow-lg rounded-lg p-4 border-l-[9px] border-blue-400 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold italic text-gray-900">{project.name}</span>
          <span className="text-4xl font-bold text-gray-900">{project.sector}</span>
        </div>
        <div className="relative w-[150px] h-[150px] flex items-center justify-center text-xl font-bold text-blue-900 border-4 border-blue-400 rounded-full">
          {investmentPercentage}%
        </div>
      </div>

      {/* Investment Details */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
        <span>Investment: {project.raisedAmount}/{project.amount}</span>
        <span>Min Investment: {project.minInvestment}</span>
        <span>Equity: {project.equity}%</span>
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4 h-3 w-full bg-gray-300 rounded-lg">
        <div
          className="h-full bg-blue-400 rounded-lg"
          style={{ width: `${investmentPercentage}%` }}
        ></div>
      </div>

      {/* Toggle Button */}
      <button
        className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
        onClick={toggleInvestors}
      >
        {showInvestors ? "Hide Investors" : `Invested: ${investmentPercentage}%`}
      </button>

      {/* Investors List */}
      {showInvestors && (
        <div className="w-full bg-white shadow-lg p-4 rounded-lg mt-4">
          <h3 className="font-bold text-lg">Investors</h3>
          <ul className="mt-2">
            {project.investors.map((investor, index) => (
              <li key={index} className="text-gray-800 border-b py-1 last:border-none">
                {investor.name} - Invested: {investor.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvestmentSlider;
