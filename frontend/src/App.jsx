import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import CreateForm from "./pages/CreateForm";
import AdminPanel from "./pages/AdminPanel";
import FormBuilder from "./components/FormBuilder";
import Home from "./pages/Home";
import FormFill from "./pages/FormFill";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Router>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/form/:formId" element={<FormFill />} />
  <Route path="/admin-login" element={<AdminLogin />} />

  {/* 🔐 Protected Admin Routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/create"
    element={
      <ProtectedRoute>
        <CreateForm />
      </ProtectedRoute>
    }
  />
  <Route
    path="/edit/:formId"
    element={
      <ProtectedRoute>
        <FormBuilder />
      </ProtectedRoute>
    }
  />
</Routes>

    </Router>
  )
}

export default App
