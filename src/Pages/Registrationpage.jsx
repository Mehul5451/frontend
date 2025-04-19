import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {Register} from "../components/signup/Registration";
import "../index.css";

function Registration() {
    return (
      <div className="App">
        <Header />  
        <Register/>    
         <Footer />
      </div>  
    );
  }
  
  export default Registration;