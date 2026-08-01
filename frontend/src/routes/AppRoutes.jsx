import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          token
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route
        path="/register"
        element={
          token
            ? <Navigate to="/dashboard" replace />
            : <Register />
        }
      />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;