// CreateProjectForm.jsx
import { useState } from "react";

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    equity: "",
    location: "",
    industry: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md space-y-4">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="equity" placeholder="Equity in %" value={formData.equity} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="industry" placeholder="Industry Sector" value={formData.industry} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="reason" placeholder="Reason (100 words)" value={formData.reason} onChange={handleChange} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default CreateProjectForm;

// ProjectCard.jsx
const ProjectCard = ({ project }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md space-y-2">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p>Amount: {project.amount}</p>
      <p>Equity: {project.equity}%</p>
      <p>Location: {project.location}</p>
      <p>Industry: {project.industry}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <p className="text-sm text-gray-600">{project.reason}</p>
    </div>
  );
};

export default ProjectCard;

// ProjectList.jsx
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;

// Profile.jsx
const Profile = ({ user }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md space-y-2">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p>Joined: {user.joinedDate}</p>
    </div>
  );
};

export default Profile;
