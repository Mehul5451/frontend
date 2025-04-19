import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {Login} from "../components/signup/Login";
import "../index.css";

function LoginPage() {
    return (
      <div className="App">
        <Header />  
        <Login/>    
         <Footer />
      </div>  
    );
  }
  
  export default LoginPage;