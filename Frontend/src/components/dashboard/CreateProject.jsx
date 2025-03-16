import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { createProject } from "../../services/blockchain";
import { useGlobalState, setGlobalState } from "../../store";

const CreateProject = () => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    const [createModal] = useGlobalState("createModal");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState("");
    const [imageURL, setImageURL] = useState("");

    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr);
        return dateObj / 1000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !cost || !date || !imageURL) return;

        const params = {
            title,
            description,
            cost,
            expiresAt: toTimestamp(date),
            imageURL,
        };

        await createProject(params);
        toast.success("Project created successfully, will reflect in 30sec.");
        onClose();
    };

    const onClose = () => {
        setGlobalState("createModal", "scale-0");
        reset();
    };

    const reset = () => {
        setTitle("");
        setCost("");
        setDescription("");
        setImageURL("");
        setDate("");
    };

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
        >
            <div className="bg-white shadow-xl shadow-black rounded-xl w-7/12 md:w-2/6 h-3/6 p-6 overflow-y-auto max-h-screen border border-gray-300">
                <button
                    onClick={onClose}
                    type="button"
                    className="border-0 bg-transparent focus:outline-none float-right"
                >
                    <FaTimes className="text-gray-700" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Submit Your Startup Proposal
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Startup Name", name: "name", type: "text" },
                        { label: "Amount to Raise ($)", name: "amountToRaise", type: "number" },
                        { label: "Reason for Fundraising", name: "reason", type: "textarea" },
                        { label: "Equity Percentage (%)", name: "equityPercentage", type: "number" },
                        { label: "Location", name: "location", type: "text" },
                        { label: "Sector", name: "sector", type: "text" },
                        { label: "Start Date", name: "startDate", type: "date" },
                        { label: "End Date", name: "endDate", type: "date" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block font-medium text-gray-700">{label}</label>
                            {type === "textarea" ? (
                                <textarea
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-400 rounded focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
                                    required
                                    placeholder={label}
                                />
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-400 rounded focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
                                    required
                                    placeholder={label}
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Submit Proposal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
