import React from "react";
import Header from "../components/header";
import EventPage from "../components/Events.jsx";
import Footer from "../components/footer.jsx";
import "../index.css";

function EventApp() {
  return (
    <div className="App">
      <Header />
      <EventPage/> 
       <Footer />
    </div>  
  );
}

export default EventApp;
