// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
    
//     // If there's no token, the user is not authenticated
//     if (!token) {
//       setIsAuthenticated(false);
//       return;
//     }

//     // If the token exists, verify its validity by sending a request to the server
//     axios.get("https://admin-0hmf.onrender.com/admin", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true, // Include credentials (like cookies) if needed
//     })
//       .then(() => setIsAuthenticated(true)) // Token is valid, the user is authenticated
//       .catch(() => setIsAuthenticated(false)); // Token is invalid, set as unauthenticated
//   }, []);

//   if (isAuthenticated === null) {
//     return <p>Loading...</p>; // Loading state while checking authentication
//   }

//   // If the user is authenticated, render the children (protected route)
//   // If not, redirect to the login page
//   return isAuthenticated ? children : <Navigate to="/admin-login" />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

axios.get("https://admin-0hmf.onrender.com/admin", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

};

export default ProtectedRoute;

