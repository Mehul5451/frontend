import React from "react";
import img1 from "../../public/m1.jpg";
import img2 from "../../public/utsav.jpg";
import "../components/css/aboutus.css"; // Import the CSS file

 const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <section className="intro">
        <h2>Who We Are</h2>
        <p>
          We are a passionate team dedicated to bringing you the best DJ booking
          experience. With years of experience in the entertainment industry,
          we connect you with top-notch DJs to make your events unforgettable.
        </p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify the process of finding and booking the
          perfect DJ for any occasion. We aim to provide exceptional service
          and ensure that your events are filled with amazing music and vibes.
        </p>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <p>
          Our team consists of experienced professionals who are passionate
          about music, technology, and customer satisfaction. We work hard to
          bring you a seamless and enjoyable experience.
          
        </p>
       


        <div className="team-member">
           <p >
             <img className="member-image" src={img1} alt="Image description" style={{
      width: "132px", // Adjust width
      height: "170px", // Adjust height
      objectFit: "cover", // Ensures image doesn't get distorted
      border: "1px solid #000", // Optional border
      borderRadius: "4px" // Optional for rounded corners
    }} />
             </p> 
           
             <li><strong> Gadhadara Mehul A</strong></li>
           

             <p >
             <img className="member-image" src={img2} alt="Image description" style={{
      width: "132px", // Adjust width
      height: "170px", // Adjust height
      objectFit: "cover", // Ensures image doesn't get distorted
      border: "1px solid #000", // Optional border
      borderRadius: "4px" // Optional for rounded corners
    }} />
             </p> 
           
             <li ><strong> Vaghela Utsav D</strong></li>

        
        </div>

      </section>
    </div>
  );
};

export default AboutUs;
