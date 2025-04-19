import React from "react";
import { Link } from "react-router-dom";

const Banner =() => {
  return (
    <div className="banner">
      <h1>Find the Perfect DJ for Your Event</h1>
      <p>Book the best DJs for weddings, parties, and corporate events!</p>
      <div className="banner-buttons">
        <Link to="brousedj"><button className="btn primary-btn">Book Now</button></Link>
          
      </div>
    </div>
  );
}

export default Banner;
