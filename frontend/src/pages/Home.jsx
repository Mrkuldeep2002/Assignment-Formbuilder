import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("/api/forms");
        setForms(res.data);
      } catch (err) {
        console.error("Error fetching forms:", err);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 ">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Available Forms
          </h1>
          <Link
            to="/admin-login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Admin Login
          </Link>
        </div>
        {forms.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">No forms found.</p>
        ) : (
          <ul className="space-y-4">
            {forms.map((form) => (
              <li
                key={form._id}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <span className="text-lg sm:text-xl font-medium text-gray-700">
                  {form.title}
                </span>
                <Link
                  to={`/form/${form._id}`}
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Fill Form
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
