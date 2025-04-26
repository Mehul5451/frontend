import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminLogin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate that email and password are provided
    if (!user.email || !user.password) {
      setMessage("Please fill in both fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Send login request to the server
      const response = await axios.post("https://adminside-8y84.onrender.com/admin-login", user, {
        headers: { "Content-Type": "application/json" },
      });
  
      // Check if the response contains a token
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("adminToken", response.data.token);
  
        // Log the token to console for debugging (remove this in production)
        console.log("Admin token saved:", response.data.token);
  
        // Redirect to the admin page
        navigate("/admin");
      } else {
        setMessage("Login failed. No token received.");
      }
  
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <section style={{ color: "#add8e6", backgroundColor: "#242424", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <main>
        <div className="section-login" style={{ width: "100%", maxWidth: "800px" }}>
          <div className="container">
            <div className="login-form">
              <h1 className="main-heading mb-3" style={{ color: "#add8e6" }}>Login Form</h1>
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" style={{ color: "#add8e6" }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" style={{ color: "#add8e6" }}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
                    id="password"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login Now"}
                </button>
              </form>
              {message && <p className="message" style={{ color: "red" }}>{message}</p>}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminLogin;
