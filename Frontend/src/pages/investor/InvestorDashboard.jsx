'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../../components/StatsCard';

function InvestorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for stats
  const stats = {
    totalInvested: 45.8,
    activeInvestments: 6,
    returns: 12.5,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Investor Dashboard
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          Discover promising startups and track your investments in one place.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, sector, or keyword..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/investor/search"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
          >
            Search Projects
          </Link>
          <Link
            to="/investor/track"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition duration-300"
          >
            Track Investment
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Investment Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Invested"
            value={`${stats.totalInvested} ETH`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Active Investments"
            value={stats.activeInvestments}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
          <StatsCard
            title="Returns"
            value={`${stats.returns} ETH`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
          />
        </div>
      </div>

      {/* Recent Investments Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Investments
          </h2>
          <Link
            to="/investor/track"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Investment Cards */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Project Name {item}
                </h3>
                <p className="text-gray-600 mb-4">
                  Short description of the project goes here. This is a brief
                  overview.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Invested: 3.5 ETH
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    2.5% Equity
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/investor/track?project=${item}`}
                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvestorDashboard;
