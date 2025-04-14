"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // Adjust path as needed

function ExploreProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/proposals`, {});
        setProjects(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, [searchQuery, selectedSector]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect dependency on searchQuery
  };

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Calculate days remaining for each project
  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Sort projects based on selected sort option
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "funding") {
      return b.amountRaised / b.amountToRaise - a.amountRaised / a.amountToRaise;
    } else if (sortBy === "daysLeft") {
      return calculateDaysRemaining(a.endDate) - calculateDaysRemaining(b.endDate);
    }
    return 0;
  });

  const handleInvestmentChange = (id, value) => {
    setInvestmentAmount({
      ...investmentAmount,
      [id]: value,
    });
  };

  const handleInvest = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const confirmInvestment = async () => {
    const amount = Number.parseFloat(investmentAmount[selectedProject.id] || 0);

    if (amount > 0) {
      try {
        // Send investment to backend
        await axios.post(`${API_BASE_URL}/api/investments`, {
          projectId: selectedProject.id,
          amount: amount,
        });

        // Update local state optimistically
        const updatedProjects = projects.map((p) => {
          if (p.id === selectedProject.id) {
            return {
              ...p,
              amountRaised: Math.min(p.amountRaised + amount, p.amountToRaise),
            };
          }
          return p;
        });

        setProjects(updatedProjects);
        setShowModal(false);

        // Clear the investment amount for this project
        const newInvestmentAmount = { ...investmentAmount };
        delete newInvestmentAmount[selectedProject.id];
        setInvestmentAmount(newInvestmentAmount);
      } catch (err) {
        console.error("Error making investment:", err);
        alert("Failed to make investment. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading projects: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Projects</h1>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project name, description, or keywords..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
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
            </div>

            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                Sector
              </label>
              <select
                id="sector"
                value={selectedSector}
                onChange={handleSectorChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest</option>
                <option value="funding">Most Funded</option>
                <option value="daysLeft">Ending Soon</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedProjects.map((project, index) => {
          const key = project.id || `project-${index}`;
          const daysLeft = calculateDaysRemaining(project.endDate);
          const fundingPercentage = Math.round(
            (project.raisedAmount / project.amountToRaise) * 100
          );

          return (
            <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{project.projectName}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {project.sector}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{project.reason}</p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Goal: {project.amountToRaise} ETH</span>
                  <span>{fundingPercentage}% Funded</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  ></div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Equity Offered:{" "}
                      <span className="font-medium text-gray-700">{project.equityPercentage}%</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Days Left:{" "}
                      <span className="font-medium text-gray-700">
                        {daysLeft > 0 ? daysLeft : "Ended"}
                      </span>
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <p className="text-sm text-gray-500">
                      Raised:{" "}
                      <span className="font-medium text-gray-700">{project.raisedAmount} ETH</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="number"
                    value={investmentAmount[project.id] || ""}
                    onChange={(e) => handleInvestmentChange(project.id, e.target.value)}
                    placeholder="ETH Amount"
                    step="0.01"
                    min="0.01"
                    max={project.amountToRaise - project.raisedAmount}
                    className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => handleInvest(project)}
                    disabled={
                      !investmentAmount[project.id] ||
                      Number.parseFloat(investmentAmount[project.id]) <= 0 ||
                      daysLeft <= 0
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {daysLeft <= 0 ? "Funding Ended" : "Invest Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Investment Confirmation Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Investment</h3>
            <p className="text-gray-600 mb-4">
              You are about to invest{" "}
              <span className="font-bold text-green-600">
                {investmentAmount[selectedProject.id] || 0} ETH
              </span>{" "}
              in <span className="font-bold">{selectedProject.projectName}</span>.
            </p>
            <p className="text-gray-600 mb-6">
              This will give you approximately{" "}
              <span className="font-bold text-green-600">
                {(
                  (Number.parseFloat(investmentAmount[selectedProject.id] || 0) /
                    selectedProject.amountToRaise) *
                  selectedProject.equityPercentage
                ).toFixed(2)}
                %
              </span>{" "}
              equity in the project.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmInvestment}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && sortedProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            No projects found matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default ExploreProjects;
