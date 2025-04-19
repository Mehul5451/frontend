// src/components/ui/button.jsx
import React from "react";
import "../css/Adminpanel.css";

export function Button({ children, onClick, className = "", variant = "default" }) {
  const baseStyles =
    "px-4 py-2 rounded-lg text-white font-medium focus:outline-none transition duration-200";

  const variants = {
    default: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  const appliedStyles = `${baseStyles} ${variants[variant] || variants.default} ${className}`;

  return (
    <button className={appliedStyles} onClick={onClick}>
      {children}
    </button>
  );
}
