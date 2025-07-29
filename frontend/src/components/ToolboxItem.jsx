// components/ToolboxItem.jsx
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const ToolboxItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="bg-blue-100 border border-blue-400 rounded px-3 py-2 mb-2 cursor-move"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.label}
        </div>
      )}
    </Draggable>
  );
};

export default ToolboxItem;

