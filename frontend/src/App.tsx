import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import TaskManagement from "./TaskManager";
import ProtectedRoute from "./ProtectedRoute";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <TaskManagement />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
