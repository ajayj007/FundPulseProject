import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { createProject } from "../../services/blockchain";
import { useGlobalState, setGlobalState } from "../../store";

const CreateProject = () => {
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

  const [createModal] = useGlobalState("createModal");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amountToRaise || !formData.reason) return;

    await createProject(formData);
    toast.success("Project created successfully!");
    onClose();
  };

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    setFormData({
      name: "",
      amountToRaise: "",
      reason: "",
      equityPercentage: "",
      location: "",
      sector: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-transform  duration-300  ${createModal}`}>
      <div className="bg-white shadow-xl rounded-xl w-11/12 md:w-2/5 max-h-[90vh] overflow-auto p-6 border mt-25  border-gray-300">
        {/* Close Button */}
        <button onClick={onClose} className="border-0 bg-transparent float-right text-gray-700">
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Submit Your Startup Proposal</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Amount to Raise ($)", name: "amountToRaise", type: "number" },
            { label: "Reason for Fundraising", name: "reason", type: "textarea" },
            { label: "Equity Percentage (%)", name: "equityPercentage", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
                  required
                  placeholder={label}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
                  required
                  placeholder={label}
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
