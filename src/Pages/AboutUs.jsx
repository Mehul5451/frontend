import React from "react";
import Header from "../components/header.jsx";
import AboutUs from "../components/aboutus.jsx";
import Footer from "../components/footer.jsx";
import "../index.css";

function AboutApp() {
  return (
    <div className="App">
     <Header />
     <AboutUs/>
     <Footer />
    </div>  
  );
}

export default AboutApp;
