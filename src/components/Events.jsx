import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/Eventpage.css";

const EventPage = () => {
  const [event, setEvent] = useState(null);  // Initial state is null until data is fetched
  const [isBooking, setIsBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {  
      try {
        const response = await axios.get("https://adminside-8y84.onrender.com/events"); // Ensure this route is correct
        if (response.data.length > 0) {
          setEvent(response.data[0]); // Assuming you're fetching a list of events, pick the first one
        } else {
          console.warn("No events found.");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);


  
  const handleBooking = async (ticket) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in first.");
      alert("You must log in to book a ticket.");
      return;
    }

    setIsBooking(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://backend-d15r.onrender.com/book-tickets",
        {
          eventId: event._id,
          ticketType: ticket.ticketType, // Ensure the ticket object has a "type" field
          price: ticket.price,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Ticket booked successfully:", response.data);
      alert("Ticket booked successfully!");
    } catch (error) {
      console.error(
        "Error booking ticket:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response?.data?.error || "Error booking the ticket. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  // Add loading state to prevent rendering before event is fetched
  if (!event) {
    return <p>Loading event data...</p>;  // Show a loading message until the event is available
  }

  return (
    <div className="event-page">
      {/* Hero Section */}
      <header className="hero">
        <h1>{event.title}</h1>
        <p>Date: {new Date(event.date).toDateString()}</p>
        <p>Time: {event.time}</p>
        <p>Location: {event.location}</p>
      </header>

      {/* Event Description */}
      <section className="description">
        <h2>About the Event</h2>
        <p>{event.description}</p>
      </section>

      {/* Performers */}
      <section className="performers">
        <h2>Featured DJs</h2>
        <ul>
          {event.djs.map((dj, index) => (
            <li key={index}>{dj}</li>
          ))}
        </ul>
      </section>

      {/* Ticket Booking */}
      <section className="tickets">
        <h2>Book Your Tickets</h2>
        <div className="ticket-options">
          {event.tickets.map((ticket, index) => (
            <div className="ticket" key={index}>
              <h3>{ticket.type}</h3>
              <p>Price: ₹{ticket.price}</p>
              <button onClick={() => handleBooking(ticket)}>
                {isBooking ? "Booking..." : "Book Now"}
              </button>
            </div>
          ))}
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </section>

      {/* Map Section (optional, you can uncomment it if needed) */}
      {/* <section className="map">
        <h2>Event Location</h2>
        <iframe
          title="Event Location"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
            event.location
          )}`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section> */}
    </div>
  );
};

export default EventPage;
