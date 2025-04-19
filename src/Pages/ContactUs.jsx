import React from "react";
import Header from "../components/header.jsx";
 import ContactUs  from "../components/contact.jsx";
import Footer from "../components/footer.jsx";
import "../index.css";

function ContactApp() {
  return (
    <div className="App">
      <Header />  
      <ContactUs/>    
       <Footer />
    </div>  
  );
}

export default ContactApp;
