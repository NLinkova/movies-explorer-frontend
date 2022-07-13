import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowed }) {
  if (allowed) {
    return children;
  }
  return <Navigate to="/" />;
}