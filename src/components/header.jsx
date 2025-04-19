// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import img1 from '../../public/profile-pic-url.jpg';
// import "../index.css";

// const Header = () => {
//   // State to check if user is logged in
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Simulating authentication check (Replace with actual logic)
//   useEffect(() => {
//     const user = localStorage.getItem("token"); // Assuming you store user data in localStorage
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <header className="header">
//       <div>DJ Booking System</div>
//       <nav>
//         <ul>
//           <Link to="/"> <li>Home</li></Link>
//           <Link to="/brousedj"><li>Browse DJs</li></Link> 
//           <Link to="/event">  <li>Events</li></Link>
//           <Link to="/contactus"><li>Contact Us</li></Link> 
//           <Link to="/aboutus"><li>About Us</li></Link> 
//         </ul>
//       </nav>

//       {/* Conditional Rendering: Show Profile Info if Logged In, Else Show Login Button */}
//       {isLoggedIn ? (
//         <div className="profile-info">
//         <img src={img1} alt="Profile" className="profile-pic" />
//           <button onClick={() => {
//             localStorage.removeItem("token"); // Clear user session
//             setIsLoggedIn(false);
//           }} className="logout-btn">Logout</button>
//         </div>
//       ) : (
//         <Link to="/registration"><button className="login-btn">Login/Sign Up</button></Link>
//       )}
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from '../../public/profile-pic-url.jpg';
import "../index.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="header">
      <div>DJ Booking System</div>
      <nav>
        <ul>
          <Link to="/"> <li>Home</li></Link>
          <Link to="/brousedj"><li>Browse DJs</li></Link> 
          <Link to="/event"><li>Events</li></Link>
          <Link to="/contactus"><li>Contact Us</li></Link> 
          <Link to="/aboutus"><li>About Us</li></Link> 
        </ul>
      </nav>

      {isLoggedIn ? (
        <div className="profile-info">
          <Link to="/user-dashboard"> 
            <img src={img1} alt="Profile" className="profile-pic" />
          </Link>
          
        </div>
      ) : (
        <Link to="/registration">
          <button className="login-btn">Login/Sign Up</button>
        </Link>
      )}
    </header>
  );
}

export default Header;

