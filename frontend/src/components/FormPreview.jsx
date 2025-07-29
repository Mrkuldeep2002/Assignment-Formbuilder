// components/FormPreview.jsx
import React from "react";

const FormPreview = ({ formElements }) => {
  return (
    <div className="p-6 bg-white rounded shadow min-h-[500px]">
      <h2 className="text-xl font-bold mb-4">🧾 Preview Mode</h2>
      <form className="space-y-4">
        {formElements.map((item) => (
          <div key={item.uuid}>
            <label className="block font-medium mb-1">{item.label}</label>

            {item.type === "text" && (
              <input
                type="text"
                className="border px-3 py-2 w-full rounded"
                placeholder="Enter text"
              />
            )}

            {item.type === "textarea" && (
              <textarea
                className="border px-3 py-2 w-full rounded"
                placeholder="Enter details"
              ></textarea>
            )}

            {item.type === "email" && (
              <input
                type="email"
                className="border px-3 py-2 w-full rounded"
                placeholder="example@example.com"
              />
            )}

            {item.type === "date" && (
              <input
                type="date"
                className="border px-3 py-2 w-full rounded"
              />
            )}

            {item.type === "number" && (
              <input
                type="number"
                className="border px-3 py-2 w-full rounded"
                placeholder="Enter number"
              />
            )}

            {item.type === "select" && (
              <select className="border px-3 py-2 w-full rounded">
                {item.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {item.type === "radio" &&
              item.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <input type="radio" name={item.uuid} value={opt} />
                  <label>{opt}</label>
                </div>
              ))}

            {item.type === "checkbox" &&
              item.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" name={`${item.uuid}-${i}`} value={opt} />
                  <label>{opt}</label>
                </div>
              ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormPreview;
