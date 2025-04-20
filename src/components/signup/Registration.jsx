import { useState } from "react";
import React from "react";
import axios from "axios";  // Import axios
import { useNavigate } from "react-router-dom"; 
import "../css/registration.css";

export const Register = () => {
  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
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


    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user);  // Check if user data is correct
    
      try {
        const result = await axios.post("https://bakend-0ymv.onrender.com/submit", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (result.data.success) {
          setMessage("Registration successful!");
          navigate("/login");
        } else {
          setMessage(result.data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        setMessage("There was an error. Please try again later.");
      }
    };
    return (
      <section
        style={{
          color: '#add8e6',
          backgroundColor: '#242424',
          height: '100vh', // Ensure it takes up full height
          display: 'flex', // Flexbox for centering
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <main>
          <div className="section-registration" style={{ width: '100%', maxWidth: '800px' }}>
            <div className="container grid grid-two-cols">
              
              <div className="registration-form">
                <h1 className="main-heading mb-3" style={{ color: '#add8e6' }}>Registration Form</h1>
                <form onSubmit={handleSubmit} action="/submit">
                  <div>
                    <label htmlFor="name" style={{ color: '#add8e6' }}>name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInput}
                      placeholder="name"
                      id="name"
                      autoComplete="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ color: '#add8e6' }}>email</label>
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
                    <label htmlFor="phone" style={{ color: '#add8e6' }}>phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"
                      id="phone"
                      autoComplete="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" style={{ color: '#add8e6' }}>password</label>
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
                    Register Now
                  </button>
                </form>
                {message && <p className="message">{message}</p>}
                <p style={{ color: '#add8e6' }}>
                  Already have an account? <a href="/login" style={{ color: '#add8e6' }}>Login here</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }