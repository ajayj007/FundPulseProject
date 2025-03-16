import React, { useState } from "react";

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amountToRaise: "",
    reason: "",
    equityPercentage: "",
    location: "",
    sector: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Proposal:", formData);
    alert("Proposal Submitted Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Startup Proposal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Startup Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Amount to Raise */}
        <div>
          <label className="block font-medium">Amount to Raise ($)</label>
          <input
            type="number"
            name="amountToRaise"
            value={formData.amountToRaise}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block font-medium">Reason for Fundraising</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Equity Percentage */}
        <div>
          <label className="block font-medium">Equity Percentage (%)</label>
          <input
            type="number"
            name="equityPercentage"
            value={formData.equityPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Sector */}
        <div>
          <label className="block font-medium">Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
};

export default ProposalForm;
