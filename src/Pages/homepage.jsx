import React from "react";
 import Header from "../components/header.jsx";
import Banner from "../components/banner.jsx";
import FeaturedDJs from "../components/featuredDJ.jsx";
import Services from "../components/services.jsx";
import Footer from "../components/footer.jsx";
import Testimonials from "../components/testimonials.jsx";
import "../index.css";


function HomePageApp() {
  return (
 
              <>
              
                <Header/>
                <Banner />
                <FeaturedDJs />
                <Services />
                <Testimonials />
                <Footer /> 
              </>


   )
         
 }



export default HomePageApp;
