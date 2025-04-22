import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../css/login.css";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for success or error message
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Sending login request with:', user); // Log user data before sending
  
    try {
      const result = await axios.post("https://bakend-n1ab.onrender.com/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log('Response from server:', result); // Log the full response
  
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        console.log('Token saved:', result.data.token);
        navigate("/"); // Redirect on success
      } else {
        setMessage(result.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.response?.data?.error || "There was an error. Please try again later.");
    }
  };
    

  return (
    <section
      style={{
        color: "#add8e6",
        backgroundColor: "#242424",
        height: "100vh", // Full viewport height
        display: "flex", // Flexbox for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <main>
        <div className="section-login" style={{ width: "100%", maxWidth: "800px" }}>
          <div className="container grid grid-two-cols">
            <div className="login-form">
              <h1 className="main-heading mb-3" style={{ color: "#add8e6" }}>
                Login Form
              </h1>
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" style={{ color: "#add8e6" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email"
                    id="email"
                    autoComplete="true"
                  />
                </div>
                <div>
                  <label htmlFor="password" style={{ color: "#add8e6" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password"
                    id="password"
                    autoComplete="true"
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Login Now
                </button>
              </form>
              {message && <p className="message">{message}</p>}
              <p style={{ color: "#add8e6" }}>
                Don't have an account?{" "}
                <a href="/registration" style={{ color: "#add8e6" }}>
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
