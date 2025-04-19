// src/components/ui/table.jsx
import React from "react";
import "../css/Adminpanel.css";


export function Table({ children, className = "" }) {
  return <table className={`table-auto w-full border ${className}`}>{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableHeader({ children }) {
  return <th className="px-4 py-2 border text-left text-gray-700">{children}</th>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="">{children}</td>;
}
