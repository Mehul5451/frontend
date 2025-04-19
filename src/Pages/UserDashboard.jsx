import React from "react";
import Header from "../components/header.jsx";
import UserSide from "../components/userside.jsx";
import Footer from "../components/footer.jsx";
import "../index.css";

function UserDashboard() {
  return (
    <div className="App">
      <Header />  
      <UserSide/>    
       <Footer />
    </div>  
  );
}

export default UserDashboard;