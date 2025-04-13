'use client';

import { useState } from 'react';
import { Link } from 'react-router';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

function TrackInvestment() {
  // Mock data for past investments
  const [pastInvestments, setPastInvestments] = useState([
    {
      id: 1,
      name: 'EcoTech Solutions',
      description:
        'Developing sustainable technology solutions for reducing carbon footprint in urban areas.',
      sector: 'Technology',
      totalInvested: 5.5,
      equityOwned: 4.2,
      currentValue: 6.8,
      rounds: [
        {
          id: 1,
          name: 'Seed Round',
          date: '2023-01-15',
          amount: 2.0,
          equity: 1.8,
          status: 'Completed',
        },
        {
          id: 2,
          name: 'Series A',
          date: '2023-06-22',
          amount: 3.5,
          equity: 2.4,
          status: 'Active',
        },
      ],
      expanded: false,
    },
    {
      id: 2,
      name: 'MediConnect',
      description:
        'A healthcare platform connecting patients with specialists for remote consultations and care.',
      sector: 'Healthcare',
      totalInvested: 4.2,
      equityOwned: 3.5,
      currentValue: 4.8,
      rounds: [
        {
          id: 1,
          name: 'Pre-Seed',
          date: '2022-11-05',
          amount: 1.2,
          equity: 1.2,
          status: 'Completed',
        },
        {
          id: 2,
          name: 'Seed Round',
          date: '2023-04-18',
          amount: 3.0,
          equity: 2.3,
          status: 'Active',
        },
      ],
      expanded: false,
    },
  ]);

  // Toggle expanded state for a project
  const toggleExpand = (projectId) => {
    setPastInvestments(
      pastInvestments.map((project) =>
        project.id === projectId
          ? { ...project, expanded: !project.expanded }
          : project,
      ),
    );
  };

  // Prepare data for pie chart
  const getEquityDistributionData = (project) => {
    const data = [
      { name: 'Your Equity', value: project.equityOwned },
      { name: 'Other Investors', value: 100 - project.equityOwned },
    ];
    return data;
  };

  // Colors for pie chart
  const COLORS = ['#4ade80', '#e5e7eb'];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Track Investments
      </h1>

      {pastInvestments.length > 0 ? (
        <div className="space-y-6">
          {pastInvestments.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {project.name}
                    </h2>
                    <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {project.sector}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="mt-2 md:mt-0 text-green-600 hover:text-green-700 font-medium flex items-center"
                  >
                    {project.expanded ? 'Hide Details' : 'Show Details'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`ml-1 h-5 w-5 transform transition-transform ${
                        project.expanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Total Invested
                    </h3>
                    <p className="text-xl font-bold text-gray-800">
                      {project.totalInvested} ETH
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Equity Owned
                    </h3>
                    <p className="text-xl font-bold text-green-600">
                      {project.equityOwned}%
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Current Value
                    </h3>
                    <p className="text-xl font-bold text-gray-800">
                      {project.currentValue} ETH
                    </p>
                  </div>
                </div>

                {/* Expanded details section */}
                {project.expanded && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Investment Rounds */}
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          Investment Rounds
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Round
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Amount
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Equity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {project.rounds.map((round) => (
                                <tr key={round.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                      {round.name}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                      {new Date(
                                        round.date,
                                      ).toLocaleDateString()}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {round.amount} ETH
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {round.equity}%
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        round.status === 'Active'
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      {round.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Equity Distribution Chart */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          Equity Distribution
                        </h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getEquityDistributionData(project)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {getEquityDistributionData(project).map(
                                  (entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ),
                                )}
                              </Pie>
                              <Tooltip
                                formatter={(value) => [`${value}%`, 'Equity']}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Investments Found
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't made any investments yet. Start exploring projects to
            invest in.
          </p>
          <Link
            to="/investor/search"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
          >
            Explore Projects
          </Link>
        </div>
      )}
    </div>
  );
}

export default TrackInvestment;
