import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePageApp from "./Pages/homepage";
import AboutApp from "./Pages/AboutUs";
import BrouseApp from "./Pages/brouse";
import ContactApp from "./Pages/ContactUs";
import EventApp from "./Pages/EventPage";
import Registration from "./Pages/Registrationpage";
import LoginPage from "./Pages/Loginpage";
import AdminPanel from "./Pages/Admin";
import UserDashboard from "./Pages/UserDashboard";  
import ProtectedRoute from "./components/AdminAuth";
import AdminLogin from "./components/signup/AdminLogin";
import AuthRoute from "./components/Authroot";  // Custom Route for User Authentication

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageApp />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/aboutus",
    element: <AboutApp />,
  },
  {
    path: "/contactus",
    element: <ContactApp />,
  },
  {
    path: "/event",
    element: <EventApp />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <AuthRoute>
        <UserDashboard /> {/* Protected User Dashboard */}
      </AuthRoute>
    ),
  },
  {
    path: "/brousedj",
    element: (
      <AuthRoute>
        <BrouseApp /> {/* Protected Brouse App */}
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>, // Page Not Found handler
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
