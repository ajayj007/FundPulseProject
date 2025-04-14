"use client";
//
import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    founderName: "Jane Doe",
    email: "jane@example.com",
    phone: "+1234567890",
    password: "********",
    industryCategories: "Green Tech",
    fundingGoal: "50000",
  });

  const [formData, setFormData] = useState({ ...profile });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.founderName.trim()) newErrors.founderName = "Founder name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.industryCategories.trim())
      newErrors.industryCategories = "Industry category is required";
    if (!formData.fundingGoal || isNaN(formData.fundingGoal) || Number(formData.fundingGoal) <= 0) {
      newErrors.fundingGoal = "Funding goal must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Startup Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "founderName", label: "Founder Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "text" },
            { id: "password", label: "Password", type: "password" },
            {
              id: "industryCategories",
              label: "Industry Categories",
              type: "text",
            },
            { id: "fundingGoal", label: "Funding Goal (USD)", type: "number" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors[id]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
              />
              {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
            </div>
          ))}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">Founder Name</h3>
            <p className="text-lg text-gray-800 font-medium">{profile.founderName}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Email</h3>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Phone</h3>
            <p className="text-gray-800">{profile.phone}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Password</h3>
            <p className="text-gray-800">{"*".repeat(profile.password.length)}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Industry Categories</h3>
            <p className="text-gray-800">{profile.industryCategories}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Funding Goal</h3>
            <p className="text-gray-800">${profile.fundingGoal}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
