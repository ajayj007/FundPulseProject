// 'use client';

// import { useState } from 'react';

// function Profile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     startupName: 'EcoTech Solutions',
//     amountToRaise: 15,
//     reason:
//       'Developing sustainable technology solutions for reducing carbon footprint in urban areas. We aim to expand our R&D team and scale our operations to meet growing demand.',
//     equityPercentage: 8,
//     sector: 'Technology',
//     startDate: '2023-04-10',
//     endDate: '2023-04-14',
//   });

//   const [formData, setFormData] = useState({ ...profile });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: '',
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate startup name
//     if (!formData.startupName.trim()) {
//       newErrors.startupName = 'Startup name is required';
//     }

//     // Validate amount to raise
//     if (!formData.amountToRaise) {
//       newErrors.amountToRaise = 'Amount is required';
//     } else if (
//       isNaN(formData.amountToRaise) ||
//       Number.parseFloat(formData.amountToRaise) <= 0
//     ) {
//       newErrors.amountToRaise = 'Amount must be a positive number';
//     }

//     // Validate reason
//     if (!formData.reason.trim()) {
//       newErrors.reason = 'Reason is required';
//     }

//     // Validate equity percentage
//     if (!formData.equityPercentage) {
//       newErrors.equityPercentage = 'Equity percentage is required';
//     } else if (
//       isNaN(formData.equityPercentage) ||
//       Number.parseFloat(formData.equityPercentage) <= 0 ||
//       Number.parseFloat(formData.equityPercentage) > 100
//     ) {
//       newErrors.equityPercentage = 'Equity must be between 0 and 100';
//     }

//     // Validate sector
//     if (!formData.sector.trim()) {
//       newErrors.sector = 'Sector is required';
//     }

//     // Validate dates
//     if (!formData.startDate) {
//       newErrors.startDate = 'Start date is required';
//     }

//     if (!formData.endDate) {
//       newErrors.endDate = 'End date is required';
//     } else if (formData.startDate && formData.endDate) {
//       const start = new Date(formData.startDate);
//       const end = new Date(formData.endDate);
//       const diffTime = Math.abs(end - start);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//       if (end <= start) {
//         newErrors.endDate = 'End date must be after start date';
//       } else if (diffDays > 5) {
//         newErrors.endDate = 'End date must be within 5 days of start date';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Update profile
//       setProfile(formData);
//       setIsEditing(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ ...profile });
//     setErrors({});
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Startup Profile</h1>
//         {!isEditing && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         {isEditing ? (
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="col-span-2">
//                 <label
//                   htmlFor="startupName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Startup Name
//                 </label>
//                 <input
//                   type="text"
//                   id="startupName"
//                   name="startupName"
//                   value={formData.startupName}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.startupName ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.startupName && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.startupName}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="amountToRaise"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Amount to Raise (ETH)
//                 </label>
//                 <input
//                   type="number"
//                   id="amountToRaise"
//                   name="amountToRaise"
//                   value={formData.amountToRaise}
//                   onChange={handleChange}
//                   step="0.01"
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.amountToRaise ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.amountToRaise && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.amountToRaise}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="equityPercentage"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Equity Percentage (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="equityPercentage"
//                   name="equityPercentage"
//                   value={formData.equityPercentage}
//                   onChange={handleChange}
//                   step="0.01"
//                   min="0"
//                   max="100"
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.equityPercentage
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.equityPercentage && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.equityPercentage}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="sector"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Sector
//                 </label>
//                 <select
//                   id="sector"
//                   name="sector"
//                   value={formData.sector}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.sector ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select a sector</option>
//                   <option value="Technology">Technology</option>
//                   <option value="Healthcare">Healthcare</option>
//                   <option value="Finance">Finance</option>
//                   <option value="Education">Education</option>
//                   <option value="E-Commerce">E-Commerce</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {errors.sector && (
//                   <p className="mt-1 text-sm text-red-500">{errors.sector}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="startDate"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.startDate ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.startDate && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.startDate}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="endDate"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   End Date (within 5 days of start)
//                 </label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.endDate ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.endDate && (
//                   <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
//                 )}
//               </div>

//               <div className="col-span-2">
//                 <label
//                   htmlFor="reason"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Reason for Fundraising
//                 </label>
//                 <textarea
//                   id="reason"
//                   name="reason"
//                   value={formData.reason}
//                   onChange={handleChange}
//                   rows="4"
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.reason ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 ></textarea>
//                 {errors.reason && (
//                   <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-8 flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-xl font-bold text-gray-800 mb-4">
//                 {profile.startupName}
//               </h2>
//               <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
//                 {profile.sector}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Reason for Fundraising
//               </h3>
//               <p className="text-gray-700">{profile.reason}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-1">
//                   Amount to Raise
//                 </h3>
//                 <p className="text-xl font-bold text-gray-800">
//                   {profile.amountToRaise} ETH
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-1">
//                   Equity Offered
//                 </h3>
//                 <p className="text-xl font-bold text-gray-800">
//                   {profile.equityPercentage}%
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-1">
//                   Start Date
//                 </h3>
//                 <p className="text-gray-700">
//                   {new Date(profile.startDate).toLocaleDateString()}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-1">
//                   End Date
//                 </h3>
//                 <p className="text-gray-700">
//                   {new Date(profile.endDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

'use client';
//
import { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    founderName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1234567890',
    password: '********',
    industryCategories: 'Green Tech',
    fundingGoal: '50000',
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
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.founderName.trim())
      newErrors.founderName = 'Founder name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.industryCategories.trim())
      newErrors.industryCategories = 'Industry category is required';
    if (
      !formData.fundingGoal ||
      isNaN(formData.fundingGoal) ||
      Number(formData.fundingGoal) <= 0
    ) {
      newErrors.fundingGoal = 'Funding goal must be a positive number';
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
            { id: 'founderName', label: 'Founder Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Phone', type: 'text' },
            { id: 'password', label: 'Password', type: 'password' },
            {
              id: 'industryCategories',
              label: 'Industry Categories',
              type: 'text',
            },
            { id: 'fundingGoal', label: 'Funding Goal (USD)', type: 'number' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors[id] && (
                <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
              )}
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
            <p className="text-lg text-gray-800 font-medium">
              {profile.founderName}
            </p>
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
            <p className="text-gray-800">
              {'*'.repeat(profile.password.length)}
            </p>
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
