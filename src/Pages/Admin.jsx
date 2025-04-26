import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, TextField ,TableContainer , Paper} from "@mui/material";
import { Check, X, Trash, LogOut as LogOutIcon, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AdminPanel = () => {
  
  const [djs, setDJs] = useState([]);
  const [view, setView] = useState("manageDJs"); // Toggle views
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    djs: "",
    tickets: [], // ✅ Always initialize as an array
    imageUrl: "",
  });
  
  const [ticketBookings, setTicketBookings] = useState([]);
  const [newDJ, setNewDJ] = useState({ name: "", genre: "", location: "", price: "", rating: "" });

  const fetchDJs = async () => {
    try {
      const response = await axios.get("https://adminside-8y84.onrender.com/dj");
      setDJs(response.data);
    } catch (error) {
      console.error("Error fetching DJs:", error);
    }
  };
  
  useEffect(() => {
    fetchDJs();
  }, []);

  const handleAddDJ = async () => {
    try {
      const response = await axios.post("https://adminside-8y84.onrender.com/dj", newDJ);
      setDJs([...djs, response.data]); // Update state
      setNewDJ({ name: "", genre: "", location: "", price: "", rating: "" }); // Clear form
    } catch (error) {
      console.error("Error adding DJ:", error);
    }
  };
  
  const handleDeleteDJ = async (id) => {
    try {
      await axios.delete(`https://adminside-8y84.onrender.com/dj/${id}`);
      setDJs(djs.filter((dj) => dj._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting DJ:", error);
    }
  };



  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("https://backend-d15r.onrender.com/bookings", {
        headers: { Authorization: `Bearer ${token}` },
 
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingAction = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`https://backend-d15r.onrender.com/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` },
      }
      );

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`https://backend-d15r.onrender.com/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
 },
      );

      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://adminside-8y84.onrender.com/admin-logout", {}, { withCredentials: true });
      navigate("/admin-login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out", error);
    }
  }; 

  //fetch event

  useEffect(() => {
    fetchEvents();
  }, []); 
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://adminside-8y84.onrender.com/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };



  // Handle adding a new event
  // Example to ensure token is passed for POST and DELETE requests
  const handleAddEvent = async () => {
    if (
      !eventData.title ||
      !eventData.date ||
      !eventData.time ||
      !eventData.location ||
      !eventData.description ||
      !eventData.djs ||
      !eventData.tickets.length
    ) {
      console.error("Please fill all the required fields.");
      return;
    }
  
    const eventPayload = {
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      description: eventData.description,
      djs: eventData.djs.split(",").map(dj => dj.trim()),
      tickets: eventData.tickets.map(ticket => ({
        ticketType: ticket.ticketType, // ✅ Fix property name
        price: ticket.price,
      })),
      imageUrl: eventData.imageUrl || "",
    };
  
    console.log("Sending event payload:", eventPayload); // ✅ Debugging
  
    try {
      const response = await axios.post("https://adminside-8y84.onrender.com/events", eventPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Event added successfully:", response.data);
      alert("Event added successfully:");
      fetchEvents();
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem("adminToken");
  
    if (!token) {
      alert("You must be logged in to delete an event");
      return;
    }
  
    try {
      const response = await axios.delete(
        `https://adminside-8y84.onrender.com/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Event deleted:", response.data);
      fetchEvents(); // Refresh the events list after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };


  useEffect(() => {
    const fetchTicketBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // ✅ Correct token key
  
        if (!token) {
          console.error("No token found, please log in first.");
          return;
        }
  
        const response = await axios.get("https://backend-d15r.onrender.com/ticket-bookings", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include correct token in headers
          },
        });
  
        setTicketBookings(response.data);
      } catch (error) {
        console.error("Error fetching ticket bookings:", error);
      }
    };
  
    fetchTicketBookings();
  }, []);
  

  // Handle updating the status of a ticket booking (Confirm, Cancel, etc.)
  const handleTicketAction = async (id, status) => {
    try {
      // Ensure status is valid before sending request
      if (!["Confirmed", "Rejected"].includes(status)) {
        console.error("Invalid status value:", status);
        alert("Invalid status! Only 'Confirmed' or 'Cancelled' are allowed.");
        return;
      }
  
      // Get the admin token from localStorage
      const token = localStorage.getItem("adminToken");
  
      if (!token) {
        console.error("No token found, please log in as admin.");
        alert("Admin authentication required. Please log in.");
        return;
      }
  
      // PUT request to update the status of the ticket booking
      const response = await axios.put(
        `https://backend-d15r.onrender.com/ticket-bookings/${id}`,
        { status }, // ✅ Ensure valid status
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Use correct token format
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Enable if using cookies for auth
        }
      );
  
      console.log("Ticket status updated:", response.data);
  
      // Update the state to reflect the status change
      setTicketBookings((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, status } : ticket
        )
      );
  
      alert(`Ticket status updated to: ${status}`);
    } catch (error) {
      console.error(
        "Error updating ticket booking:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.error || "Failed to update ticket booking. Please try again."
      );
    }
  };
  
  

  // Handle deleting a ticket booking
  const handleDeleteTicketBooking = async (id) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No token found, please log in first.");
        return;
      }

      // DELETE request to remove the ticket booking
      await axios.delete(`https://backend-d15r.onrender.com/ticket-bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
      });

      // Remove the ticket from the state after successful deletion
      setTicketBookings((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    } catch (error) {
      console.error("Error deleting ticket booking", error);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          <LogOutIcon /> Logout
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <Button variant="contained" onClick={() => setView("manageDJs")}>Manage DJs</Button>
        <Button variant="contained" onClick={() => setView("djBookings")}>DJ Bookings</Button>
        <Button variant="contained" onClick={() => setView("add-events")}>Add Events</Button>
        <Button variant="contained" onClick={() => setView("events")}>Events</Button>
        <Button variant="contained" onClick={() => setView("ticketBookings")}>Ticket Bookings</Button>
      
      </div>

      {/*Add dj*/}

      {view === "manageDJs" && (
  <Card>
    <CardContent>
      <h2>Manage DJs</h2>
      <TextField label="Name" value={newDJ.name} onChange={(e) => setNewDJ({ ...newDJ, name: e.target.value })} fullWidth margin="normal" />
      <TextField label="Genre" value={newDJ.genre} onChange={(e) => setNewDJ({ ...newDJ, genre: e.target.value })} fullWidth margin="normal" />
      <TextField label="Location" value={newDJ.location} onChange={(e) => setNewDJ({ ...newDJ, location: e.target.value })} fullWidth margin="normal" />
      <TextField label="Price" type="number" value={newDJ.price} onChange={(e) => setNewDJ({ ...newDJ, price: e.target.value })} fullWidth margin="normal" />
      <TextField label="Rating" type="number" step="0.1" value={newDJ.rating} onChange={(e) => setNewDJ({ ...newDJ, rating: e.target.value })} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleAddDJ} style={{ marginTop: "10px" }}>Add DJ</Button>

      <h3>DJ List</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {djs.map((dj) => (
            <TableRow key={dj._id}>
              <TableCell>{dj.name}</TableCell>
              <TableCell>{dj.genre}</TableCell>
              <TableCell>{dj.location}</TableCell>
              <TableCell>{dj.price}</TableCell>
              <TableCell>{dj.rating}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDeleteDJ(dj._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)}


      {/* Booking Table */}
      {view === "djBookings" && (
        
      <Card>
        <CardContent>
        <h2>DJ bookings</h2>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell><b>User</b></TableCell>

                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>DJ Name</b></TableCell>
                <TableCell><b>Requirements</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>  
                 <TableCell>{booking.userId?.email || "N/A"}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.eventLocation}</TableCell>
                  <TableCell>{booking.djName}</TableCell>
                  <TableCell>{booking.requirements}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: "green", color: "white" }} 
                        onClick={() => handleBookingAction(booking._id, "Approved")}
                        disabled={booking.status === "Approved"}
                      >
                        <Check /> Approve
                      </Button>

                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: "red", color: "white" }} 
                        onClick={() => handleBookingAction(booking._id, "Canceled")}
                        disabled={booking.status === "Canceled"}
                      >
                        <X /> Cancel
                      </Button>

                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: "black", color: "white" }} 
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        <Trash /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        )}
      {/* Add Event Form */}

      {view === "add-events" && (
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <h2>Add Event</h2>
          <TextField 
            label="Event Name" 
            value={eventData.title} 
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            type="date" 
            value={eventData.date} 
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            type="time" 
            value={eventData.time} 
            onChange={(e) => setEventData({ ...eventData, time: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Location" 
            value={eventData.location} 
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Description" 
            value={eventData.description} 
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="DJs (comma separated)" 
            value={eventData.djs} 
            onChange={(e) => setEventData({ ...eventData, djs: e.target.value })} 
            fullWidth 
            margin="normal" 
          />
 <TextField
  label="Tickets (type: price, comma separated)"
  value={eventData.ticketsInput || ""} // Store raw input separately
  onChange={(e) => setEventData({ ...eventData, ticketsInput: e.target.value })} 
  onBlur={() => { // Convert input to array format when the field loses focus
    const tickets = eventData.ticketsInput
      .split(",")
      .map(ticket => {
        const [ticketType, price] = ticket.split(":").map(item => item.trim());

        if (ticketType && !isNaN(price)) {
          return { ticketType, price: parseFloat(price) }; // Ensure price is a number
        }
        return null;
      })
      .filter(ticket => ticket !== null); // Remove invalid values

    setEventData({ ...eventData, tickets });
    console.log("Updated Tickets:", tickets); // Debugging
  }}
  fullWidth
  margin="normal"
/>


          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddEvent} 
            style={{ marginTop: "10px" }}
          >
            Add Event
          </Button>
        </CardContent>
      </Card>
      )}       



      {/* Event List */}
      {view === "events" && (
      <Card>
        <CardContent>
          <h2>Events</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="error" onClick={() => handleDeleteEvent(event._id)}>
                      <Trash /> Delete
                    </Button> 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}

      {/*ticket booking */}
      {view === "ticketBookings" && (
  <div> 
    <h2>Ticket Booking</h2> 
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>E-mail</TableCell>
            <TableCell>Event Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Ticket Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketBookings.map((ticketBooking) => (
            <TableRow key={ticketBooking._id}>
              <TableCell>{ticketBooking.bookedBy?.email}</TableCell>
              <TableCell>{ticketBooking.eventId?.title}</TableCell>
              <TableCell>{ticketBooking.price}</TableCell>
              <TableCell>{ticketBooking.ticketType}</TableCell>
              <TableCell>{ticketBooking.status}</TableCell>
              <TableCell align="center">
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => handleTicketAction(ticketBooking._id, "Confirmed")}
                    disabled={ticketBooking.status === "Confirmed"}
                  >
                    <Check /> Confirm
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleTicketAction(ticketBooking._id, "Rejected")}
                    disabled={ticketBooking.status === "Rejected"}
                  >
                    <X /> Reject
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={() => handleDeleteTicketBooking(ticketBooking._id)}
                  >
                    <Trash /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>  
)}

  </div>
)};

  export default AdminPanel;

