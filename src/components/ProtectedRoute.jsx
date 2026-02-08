import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  // Layout components (AppLayout) render the header + logout.
  // Rendering any extra top-level UI here causes the "white bar".
  return <>{children}</>;
};

export default ProtectedRoute;
