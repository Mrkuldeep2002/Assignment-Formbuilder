import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";

const FormFill = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/api/forms/${formId}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching form:", err);
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (uuid, value) => {
    setResponses((prev) => ({ ...prev, [uuid]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/responses", {
        formId,
        answers: responses,
      });
      toast.success("Form submitted successfully!");
              navigate(`/`);

    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit form.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-600 animate-pulse">Loading form...</p>
    </div>
  );
  if (!form) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-red-600">Form not found.</p>
    </div>
  );

 return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 ">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="md:text-3xl text-2xl font-bold text-gray-800 mb-6 ">
          📝{form.title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.elements.map((field) => (
            <div key={field.uuid} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm font-medium text-gray-700 sm:w-1/3">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="w-full sm:w-2/3">
                {/* Text Input */}
                {field.type === "text" && (
                  <input
                    type="text"
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                )}

                {/* Textarea */}
                {field.type === "textarea" && (
                  <textarea
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                    rows="4"
                    required
                  />
                )}

                {/* Email Input */}
                {field.type === "email" && (
                  <input
                    type="email"
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                )}

                {/* Date Input */}
                {field.type === "date" && (
                  <input
                    type="date"
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                )}

                {/* Number Input */}
                {field.type === "number" && (
                  <input
                    type="number"
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                )}

                {/* Select Dropdown */}
                {field.type === "select" && (
                  <select
                    onChange={(e) => handleChange(field.uuid, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select an option</option>
                    {field.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {/* Radio Buttons */}
                {field.type === "radio" && (
                  <div className="space-y-2">
                    {field.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={field.uuid}
                          value={opt}
                          onChange={(e) => handleChange(field.uuid, e.target.value)}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          required
                        />
                        <label className="text-gray-700">{opt}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Checkboxes */}
                {field.type === "checkbox" && (
                  <div className="space-y-2">
                    {field.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          value={opt}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setResponses((prev) => {
                              const prevValues = prev[field.uuid] || [];
                              return {
                                ...prev,
                                [field.uuid]: isChecked
                                  ? [...prevValues, opt]
                                  : prevValues.filter((val) => val !== opt),
                              };
                            });
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-gray-700">{opt}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
);
};

export default FormFill;