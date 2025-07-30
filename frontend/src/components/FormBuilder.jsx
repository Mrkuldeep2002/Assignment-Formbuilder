import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import ToolboxItem from "./ToolboxItem";
import DroppableZone from "./DroppableZone";
import FormPreview from "./FormPreview";
import axios from "axios";
import toast from "react-hot-toast";

const toolboxItems = [
  { id: "text", label: "Text Field", type: "text" },
  { id: "textarea", label: "Textarea", type: "textarea" },
  { id: "select", label: "Dropdown", type: "select", options: ["Option 1"] },
  { id: "radio", label: "Radio Group", type: "radio", options: ["Yes", "No"] },
  { id: "checkbox", label: "Checkbox Group", type: "checkbox", options: ["Option 1"] },
  { id: "email", label: "Email Field", type: "email" },
  { id: "date", label: "Date Picker", type: "date" },
  { id: "number", label: "Number Field", type: "number" },
];

const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formElements, setFormElements] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (formId) {
      axios
        .get(`/api/forms/${formId}`)
        .then((res) => {
          setFormTitle(res.data.title);
          setFormElements(res.data.elements);
        })
        .catch((err) => {
          console.error("Error fetching form:", err);
          alert("Failed to load form for editing.");
        });
    }
  }, [formId]);

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;

    if (source.droppableId === "toolbox" && destination.droppableId === "dropzone") {
      const item = toolboxItems.find((t) => t.id === draggableId);
      setFormElements((prev) => [
        ...prev,
        {
          ...item,
          uuid: uuid(),
          label: `${item.label} label`,
          options: item.options ? [...item.options] : [],
        },
      ]);
    }

    if (source.droppableId === "dropzone" && destination.droppableId === "dropzone") {
      const updated = Array.from(formElements);
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
      setFormElements(updated);
    }
  };

  const saveForm = async () => {
    try {
      const payload = {
        title: formTitle,
        elements: formElements,
      };

      let res;
      if (formId) {
        res = await axios.put(`http://localhost:5000/api/forms/${formId}`, payload);
        toast.success("Form updated successfully!");
        navigate(`/admin`);
      } else {
        res = await axios.post("http://localhost:5000/api/forms", payload);
        toast.success("New form saved successfully!");
        navigate(`/admin`);
      }

      console.log("Save Result", res.data);
    } catch (error) {
      console.error("Error saving form", error);
      alert("Failed to save form!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 ">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            value={formTitle}
            required
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter Form Title"
            className="w-full sm:w-1/2 text-2xl sm:text-3xl font-bold text-gray-800 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode((prev) => !prev)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={previewMode ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.91 1.91A7 7 0 1117 12H20"}
                />
              </svg>
              {previewMode ? "Edit Mode" : "Preview Form"}
            </button>
            <button
              onClick={saveForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Form
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="toolbox">
              {(provided) => (
                <div
                  className="w-full lg:w-64 bg-white rounded-xl shadow-md p-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Toolbox</h2>
                  {toolboxItems.map((item, index) => (
                    <ToolboxItem key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-auto">
              {previewMode ? (
                <FormPreview formElements={formElements} />
              ) : (
                <DroppableZone formElements={formElements} setFormElements={setFormElements} />
              )}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;