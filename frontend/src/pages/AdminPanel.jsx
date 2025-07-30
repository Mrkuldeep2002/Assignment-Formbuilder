import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("/api/forms");
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching forms:", err);
      toast.error("Failed to fetch forms!", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`http://localhost:5000/api/forms/${id}`);
        fetchForms(); // Refresh list
        toast.success("Form deleted successfully!", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#22c55e",
            color: "#fff",
          },
        });
      } catch (err) {
        console.error("Error deleting form:", err);
        toast.error("Failed to delete form!", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#ef4444",
            color: "#fff",
          },
        });
      }
    }
  };

  const handleEdit = (formId) => {
    navigate(`/edit/${formId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      duration: 3000,
      style: {
        borderRadius: "8px",
        background: "#22c55e",
        color: "#fff",
      },
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-white">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Admin Panel
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create")}
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Form
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {forms.length === 0 ? (
            <p className="text-lg text-gray-600 text-center">No forms available.</p>
          ) : (
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="flex flex-col sm:flex-row justify-between items-center border-b py-4 last:border-b-0"
                >
                  <span className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-0">
                    {form.title}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(form._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 4v12m4-12v12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;