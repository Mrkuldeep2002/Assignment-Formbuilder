// components/DroppableZone.jsx
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const DroppableZone = ({ formElements, setFormElements }) => {
  const updateLabel = (uuid, newLabel) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid ? { ...el, label: newLabel } : el
      )
    );
  };

  const updateOption = (uuid, index, newValue) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? {
              ...el,
              options: el.options.map((opt, i) =>
                i === index ? newValue : opt
              ),
            }
          : el
      )
    );
  };

  const addOption = (uuid) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? { ...el, options: [...el.options, `Option ${el.options.length + 1}`] }
          : el
      )
    );
  };

  const removeOption = (uuid, index) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? {
              ...el,
              options: el.options.filter((_, i) => i !== index),
            }
          : el
      )
    );
  };

  // New function to remove a field
  const removeElement = (uuid) => {
    setFormElements((prev) => prev.filter((el) => el.uuid !== uuid));
  };

  return (
    <Droppable droppableId="dropzone">
      {(provided) => (
        <div
          className="flex-1 bg-white shadow p-4 rounded min-h-[500px]"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-bold mb-3">📄 Form Canvas</h2>
          {formElements.length === 0 && (
            <p className="text-gray-400">Drag form fields here</p>
          )}

          {formElements.map((item, index) => (
            <Draggable draggableId={item.uuid} index={index} key={item.uuid}>
              {(provided) => (
                <div
                  className="mb-3 border border-gray-300 p-3 rounded bg-gray-50 relative"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {/* Delete button */}
                  <button
                    onClick={() => removeElement(item.uuid)}
                    className="absolute top-2 right-2 text-red-600 font-bold"
                  >
                    ✕
                  </button>

                  <input
                    value={item.label}
                    onChange={(e) => updateLabel(item.uuid, e.target.value)}
                    className="block text-sm font-medium mb-2 border-b w-full"
                  />

                  {item.type === "text" && (
                    <input className="border px-2 py-1 w-full" type="text" disabled />
                  )}

                  {item.type === "textarea" && (
                    <textarea className="border px-2 py-1 w-full" disabled />
                  )}

                  {(item.type === "select" || item.type === "radio") && (
                    <div>
                      {item.options.map((opt, i) => (
                        <div key={i} className="flex gap-2 items-center mb-1">
                          {item.type === "radio" ? (
                            <input type="radio" disabled />
                          ) : (
                            <span className="w-4 h-4 rounded border border-gray-300 bg-white" />
                          )}
                          <input
                            value={opt}
                            onChange={(e) => updateOption(item.uuid, i, e.target.value)}
                            className="border px-2 py-1 w-full"
                          />
                          <button
                            onClick={() => removeOption(item.uuid, i)}
                            className="text-red-600 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(item.uuid)}
                        className="text-sm text-blue-600 mt-1"
                      >
                        ➕ Add Option
                      </button>
                    </div>
                  )}
                  {item.type === "checkbox" && (
  <div>
    {item.options.map((opt, i) => (
      <div key={i} className="flex items-center gap-2 mb-1">
        <input type="checkbox" disabled />
        <input
          value={opt}
          onChange={(e) => updateOption(item.uuid, i, e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <button
          onClick={() => removeOption(item.uuid, i)}
          className="text-red-600 font-bold"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      onClick={() => addOption(item.uuid)}
      className="text-sm text-blue-600 mt-1"
    >
      ➕ Add Option
    </button>
  </div>
)}

{item.type === "email" && (
  <input className="border px-2 py-1 w-full" type="email" disabled />
)}

{item.type === "date" && (
  <input className="border px-2 py-1 w-full" type="date" disabled />
)}

{item.type === "number" && (
  <input className="border px-2 py-1 w-full" type="number" disabled />
)}

                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableZone;