"use client"

import { useState } from "react"

function InvestorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Investor",
    email: "john@example.com",
    walletAddress: "0x1234...5678",
    investmentPreferences: {
      sectors: ["Technology", "Healthcare"],
      minEquity: 5,
      maxInvestment: 10,
    },
    notificationSettings: {
      newProjects: true,
      investmentUpdates: true,
      platformNews: false,
    },
  })

  const [formData, setFormData] = useState({ ...profile })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (category, setting) => {
    setFormData({
      ...formData,
      notificationSettings: {
        ...formData.notificationSettings,
        [setting]: !formData.notificationSettings[setting],
      },
    })
  }

  const handleSectorChange = (e) => {
    const { value, checked } = e.target
    let updatedSectors = [...formData.investmentPreferences.sectors]

    if (checked) {
      updatedSectors.push(value)
    } else {
      updatedSectors = updatedSectors.filter((sector) => sector !== value)
    }

    setFormData({
      ...formData,
      investmentPreferences: {
        ...formData.investmentPreferences,
        sectors: updatedSectors,
      },
    })
  }

  const handleRangeChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      investmentPreferences: {
        ...formData.investmentPreferences,
        [name]: Number(value),
      },
    })
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Update profile
      setProfile(formData)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({ ...profile })
    setErrors({})
    setIsEditing(false)
  }

  const sectors = ["Technology", "Healthcare", "Finance", "Education", "E-Commerce", "Entertainment", "Other"]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Investor Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Investment Preferences</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Sectors</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectors.map((sector) => (
                      <div key={sector} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`sector-${sector}`}
                          value={sector}
                          checked={formData.investmentPreferences.sectors.includes(sector)}
                          onChange={handleSectorChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`sector-${sector}`} className="ml-2 text-sm text-gray-700">
                          {sector}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="minEquity" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Equity (%) - {formData.investmentPreferences.minEquity}%
                    </label>
                    <input
                      type="range"
                      id="minEquity"
                      name="minEquity"
                      min="0"
                      max="30"
                      value={formData.investmentPreferences.minEquity}
                      onChange={handleRangeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Investment (ETH) - {formData.investmentPreferences.maxInvestment} ETH
                    </label>
                    <input
                      type="range"
                      id="maxInvestment"
                      name="maxInvestment"
                      min="1"
                      max="50"
                      value={formData.investmentPreferences.maxInvestment}
                      onChange={handleRangeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newProjects"
                      checked={formData.notificationSettings.newProjects}
                      onChange={() => handleCheckboxChange("notificationSettings", "newProjects")}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newProjects" className="ml-2 text-sm text-gray-700">
                      New projects matching my preferences
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="investmentUpdates"
                      checked={formData.notificationSettings.investmentUpdates}
                      onChange={() => handleCheckboxChange("notificationSettings", "investmentUpdates")}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="investmentUpdates" className="ml-2 text-sm text-gray-700">
                      Updates on my investments
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="platformNews"
                      checked={formData.notificationSettings.platformNews}
                      onChange={() => handleCheckboxChange("notificationSettings", "platformNews")}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="platformNews" className="ml-2 text-sm text-gray-700">
                      Platform news and updates
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                  <p className="text-gray-800">{profile.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-gray-800">{profile.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Wallet Address</h3>
                  <p className="text-gray-800">{profile.walletAddress}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Investment Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Sectors</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.investmentPreferences.sectors.map((sector) => (
                      <span
                        key={sector}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Minimum Equity</h3>
                  <p className="text-gray-800">{profile.investmentPreferences.minEquity}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Maximum Investment</h3>
                  <p className="text-gray-800">{profile.investmentPreferences.maxInvestment} ETH</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span
                    className={`mr-2 inline-block w-4 h-4 rounded-full ${profile.notificationSettings.newProjects ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-800">New projects matching my preferences</span>
                </li>
                <li className="flex items-center">
                  <span
                    className={`mr-2 inline-block w-4 h-4 rounded-full ${profile.notificationSettings.investmentUpdates ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-800">Updates on my investments</span>
                </li>
                <li className="flex items-center">
                  <span
                    className={`mr-2 inline-block w-4 h-4 rounded-full ${profile.notificationSettings.platformNews ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-800">Platform news and updates</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestorProfile
