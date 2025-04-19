import React from "react";
import { Navigate } from "react-router-dom";

// A higher-order component to protect routes
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // If the user is authenticated, return the protected content
};

export default AuthRoute;
