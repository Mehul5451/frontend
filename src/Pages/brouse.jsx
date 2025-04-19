import React from "react";
import Header from "F:/project/demo/demoreact/src/components/header.jsx";
 import  BookingPage from "F:/project/demo/demoreact/src/components/bookingpage.jsx";
//import EventPage from "F:/project/demo/demoreact/src/components/Events.jsx";
import Footer from "F:/project/demo/demoreact/src/components/footer.jsx";
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
