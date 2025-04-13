"use client"

import { useState } from "react"

function SearchProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Mock data for available projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "EcoTech Solutions",
      description: "Developing sustainable technology solutions for reducing carbon footprint in urban areas.",
      amountToRaise: 15,
      amountRaised: 9,
      equityOffered: 8,
      sector: "Technology",
      daysLeft: 3,
    },
    {
      id: 2,
      name: "MediConnect",
      description: "A healthcare platform connecting patients with specialists for remote consultations and care.",
      amountToRaise: 12,
      amountRaised: 4.8,
      equityOffered: 10,
      sector: "Healthcare",
      daysLeft: 4,
    },
    {
      id: 3,
      name: "FinLedger",
      description: "Blockchain-based financial management system for small businesses and startups.",
      amountToRaise: 20,
      amountRaised: 14,
      equityOffered: 12,
      sector: "Finance",
      daysLeft: 2,
    },
    {
      id: 4,
      name: "EduChain",
      description: "Decentralized education platform offering verified credentials and skill certifications.",
      amountToRaise: 8,
      amountRaised: 3.2,
      equityOffered: 7,
      sector: "Education",
      daysLeft: 5,
    },
  ])

  const [investmentAmount, setInvestmentAmount] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    // Search logic would go here in a real application
    console.log("Searching for:", searchQuery)
  }

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Filter projects based on search query and selected sector
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSector = selectedSector === "" || project.sector.toLowerCase() === selectedSector.toLowerCase()

    return matchesSearch && matchesSector
  })

  // Sort projects based on selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id // Using id as a proxy for creation date
    } else if (sortBy === "funding") {
      return b.amountRaised / b.amountToRaise - a.amountRaised / a.amountToRaise
    } else if (sortBy === "daysLeft") {
      return a.daysLeft - b.daysLeft
    }
    return 0
  })

  const handleInvestmentChange = (id, value) => {
    setInvestmentAmount({
      ...investmentAmount,
      [id]: value,
    })
  }

  const handleInvest = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const confirmInvestment = () => {
    const amount = Number.parseFloat(investmentAmount[selectedProject.id] || 0)

    if (amount > 0) {
      // Update the project with new investment
      const updatedProjects = projects.map((p) => {
        if (p.id === selectedProject.id) {
          return {
            ...p,
            amountRaised: Math.min(p.amountRaised + amount, p.amountToRaise),
          }
        }
        return p
      })

      setProjects(updatedProjects)
      setShowModal(false)

      // Clear the investment amount for this project
      const newInvestmentAmount = { ...investmentAmount }
      delete newInvestmentAmount[selectedProject.id]
      setInvestmentAmount(newInvestmentAmount)
    }
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
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="entertainment">Entertainment</option>
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
        {sortedProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {project.sector}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Goal: {project.amountToRaise} ETH</span>
                <span>{Math.round((project.amountRaised / project.amountToRaise) * 100)}% Funded</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min((project.amountRaised / project.amountToRaise) * 100, 100)}%` }}
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Equity Offered: <span className="font-medium text-gray-700">{project.equityOffered}%</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Days Left: <span className="font-medium text-gray-700">{project.daysLeft}</span>
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-500">
                    Raised: <span className="font-medium text-gray-700">{project.amountRaised} ETH</span>
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
                  max={project.amountToRaise - project.amountRaised}
                  className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => handleInvest(project)}
                  disabled={!investmentAmount[project.id] || Number.parseFloat(investmentAmount[project.id]) <= 0}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Confirmation Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Investment</h3>
            <p className="text-gray-600 mb-4">
              You are about to invest{" "}
              <span className="font-bold text-green-600">{investmentAmount[selectedProject.id] || 0} ETH</span> in{" "}
              <span className="font-bold">{selectedProject.name}</span>.
            </p>
            <p className="text-gray-600 mb-6">
              This will give you approximately{" "}
              <span className="font-bold text-green-600">
                {(
                  (Number.parseFloat(investmentAmount[selectedProject.id] || 0) / selectedProject.amountToRaise) *
                  selectedProject.equityOffered
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

      {sortedProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            No projects found matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchProjects
