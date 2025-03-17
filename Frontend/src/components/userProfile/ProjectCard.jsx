import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4 rounded-2xl shadow-md bg-white border flex flex-col justify-between">
      <CardContent>
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.location} - {project.industrySector}</p>
        <p className="text-sm mt-2">💰 Amount: <b>${project.amount}</b></p>
        <p className="text-sm">📈 Equity: <b>{project.equity}%</b></p>
        <p className="text-xs text-gray-400 mt-1">📅 {project.startDate} → {project.endDate}</p>
      </CardContent>
      <div className="flex justify-between mt-3">
        <Button onClick={() => navigate(`/projects/${project.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">View</Button>
        <Button onClick={() => onDelete(project.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</Button>
      </div>
    </Card>
  );
};

export default ProjectCard;
