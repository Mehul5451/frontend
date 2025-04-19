import React from "react";
import "../components/css/homepage.jsx";

 const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center text-light d-flex align-items-center">
        <div className="container">
          <h1>Find the Perfect DJ for Your Event</h1>
          <p>Book the best DJs for weddings, parties, and corporate events!</p>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-primary me-2">Book Now</button>
            <button className="btn btn-outline-light">Browse DJs</button>
          </div>
        </div>
      </section>

      {/* Featured DJs */}
      <section className="container mt-5">
        <h2 className="text-center">Featured DJs</h2>
        <div className="row mt-4">
          {[1, 2, 3, 4].map((dj) => (
            <div className="col-md-3 mb-4" key={dj}>
              <div className="card">
                <img
                  src={`https://via.placeholder.com/150?text=DJ+${dj}`}
                  alt={`DJ ${dj}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">DJ {dj}</h5>
                  <p className="card-text">Specializes in EDM and parties.</p>
                  <button className="btn btn-primary">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview bg-light py-5">
        <div className="container text-center">
          <h2>What We Offer</h2>
          <p>
            From weddings to corporate events, find DJs for every occasion with
            customizable packages.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials container py-5">
        <h2 className="text-center">What Our Clients Say</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>
                "The DJ was amazing! They made our wedding unforgettable. Highly
                recommend!"
              </p>
              <footer className="blockquote-footer">Jane Doe</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>"Great service and incredible DJs! Would book again."</p>
              <footer className="blockquote-footer">John Smith</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>"The music was perfect for our corporate event. Thank you!"</p>
              <footer className="blockquote-footer">Emily Adams</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
