"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import axios from "axios";
import { API_BASE_URL } from "../config";

function CurrentProposal() {
  const [hasActiveProposal, setHasActiveProposal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [investors, setInvestors] = useState([]);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the startup ID from your auth context or local storage
        const startupId = localStorage.getItem("startupId");

        // Fetch proposal data
        const proposalResponse = await axios.get(
          `${API_BASE_URL}/api/active-proposals/${startupId}`,
          {}
        );

        if (proposalResponse.data) {
          setProposal(proposalResponse.data);
          console.log(proposalResponse.data);
          setHasActiveProposal(true);
          setDaysRemaining(calculateDaysRemaining(proposalResponse.data.endDate));

          // Fetch investors for this proposal
          const investorsResponse = await axios.get(`${API_BASE_URL}/investor/all`, {
            params: { proposalId: proposalResponse.data.id },
          });
          setInvestors(investorsResponse.data);
        } else {
          // setHasActiveProposal(false);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Prepare data for pie chart
  const pieData = investors.map((investor) => ({
    name: investor.name,
    value: investor.equity,
  }));

  // Add remaining equity if not fully funded
  const totalEquityDistributed = investors.reduce((sum, investor) => sum + investor.equity, 0);

  if (proposal && totalEquityDistributed < proposal.equityOffered) {
    pieData.push({
      name: "Remaining",
      value: proposal.equityOffered - totalEquityDistributed,
    });
  }

  // Rest of your component remains the same...
  // Just make sure to use `proposal` and `investors` state variables
  // instead of the hardcoded data

  // Colors for pie chart
  const COLORS = ["#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#d1fae5"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Current Proposal</h1>

      {hasActiveProposal ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Proposal Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{proposal.projectName}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {proposal.sector}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{proposal.reason}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Funding Goal</h3>
                  <p className="text-xl font-bold text-gray-800">{proposal.amountToRaise} ETH</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Amount Raised</h3>
                  <p className="text-xl font-bold text-green-600">{proposal.raisedAmount} ETH</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Equity Offered</h3>
                  <p className="text-xl font-bold text-gray-800">{proposal.equityPercentage}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Days Remaining</h3>
                  <p className="text-xl font-bold text-gray-800">{daysRemaining}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Funding Progress</h3>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{proposal.raisedAmount} ETH</span>
                  <span>{Math.round((proposal.raisedAmount / proposal.amountToRaise) * 100)}%</span>
                  <span>{proposal.amountToRaise} ETH</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        (proposal.raisedAmount / proposal.amountToRaise) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
                  <p className="text-gray-800">
                    {new Date(proposal.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">End Date</h3>
                  <p className="text-gray-800">{new Date(proposal.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equity Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Equity Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Equity"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Investors List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Investors</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Investor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount Invested
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Equity Stake
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {investors.map((investor) => (
                      <tr key={investor.id || investor.investorId || investor._id}>
                        {" "}
                        {/* Fallback options */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{investor.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{investor.amount} ETH</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{investor.equity}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(investor.investmentDate || investor.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Proposal</h2>
          <p className="text-gray-600 mb-6">
            You don't have any active proposals at the moment. Create a new project to start raising
            funds.
          </p>
          <Link
            to="/startup/add-project"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
          >
            Create New Project
          </Link>
        </div>
      )}
    </div>
  );
}

export default CurrentProposal;
