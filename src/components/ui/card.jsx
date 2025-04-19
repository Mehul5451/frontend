// src/components/ui/card.jsx
import React from "react";
import "../css/Adminpanel.css";

export function Card({ children, className = "" }) {
  return (
    <div className={` ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
