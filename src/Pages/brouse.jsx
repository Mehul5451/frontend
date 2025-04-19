import React from "react";
import Header from "../components/header.jsx";
 import  BookingPage from "../components/bookingpage.jsx";
//import EventPage from "../components/Events.jsx";
import Footer from "../components/footer.jsx";
import "../components/css/brouse.css";

function BrouseApp() {
  return (
    <div className="App">
      <Header />
      <BookingPage/>
      {/* <ContactUs/> */}
      {/* <AboutUs/>
      <EventPage/> */}
       <Footer />
    </div>  
  );
}

export default BrouseApp;
