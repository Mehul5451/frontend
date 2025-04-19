import React, { useState } from "react";
import { 
  Button, Card, CardContent, Typography, 
  Table, TableHead, TableBody, TableRow, TableCell 
} from "@mui/material";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserSide = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [appliedDJs, setAppliedDJs] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [viewing, setViewing] = useState(null); // 'DJs' or 'Tickets'
  const navigate = useNavigate();

  // Fetch applied DJ bookings
  const handleViewDJs = async () => {
    setViewing("DJs");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/user-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppliedDJs(response.data);
    } catch (error) {
      console.error("Error fetching DJ bookings:", error);
    }
  };

  // Fetch booked tickets
  const handleViewTickets = async () => {
    setViewing("Tickets");
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to view your tickets.");
      navigate("/login");
      return;
    }
  
    try {
      console.log("Sending token:", token);  // Log the token being sent
      const response = await axios.get("http://localhost:3000/user-ticket-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Tickets fetched:", response.data);  // Log the response
  
      if (response.data && response.data.length > 0) {
        setBookedTickets(response.data);
      } else {
        alert("No tickets found for this user.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        console.error("Error fetching ticket bookings:", error);
        alert("Failed to fetch ticket bookings.");
      }
    }
  };
  
  

  // Cancel a DJ booking
  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppliedDJs((prev) => prev.filter((dj) => dj._id !== bookingId));
      alert("DJ booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling DJ booking:", error);
      alert("Failed to cancel DJ booking.");
    }
  };

  // Delete a booked ticket
  const handleDeleteTicket = async (ticketId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/book-tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookedTickets((prev) => prev.filter((ticket) => ticket._id !== ticketId));
      alert("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>User Dashboard</Typography>

      <Card style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
        <CardContent>
          <Typography variant="h6">Welcome, User!</Typography>
          <Typography variant="body1" gutterBottom>
            Manage your DJ bookings and ticket reservations.
          </Typography>

          {/* Buttons for Viewing Bookings */}
          {!viewing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px", width: "100%" }}
                onClick={handleViewDJs}
              >
                View Applied DJs
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "10px", width: "100%" }}
                onClick={handleViewTickets}
              >
                View Booked Tickets
              </Button>
            </>
          ) : viewing === "DJs" ? (
            <div>
              <Typography variant="h6" gutterBottom>Applied DJs:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Booking ID</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>DJ Name</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell> {/* New Action Column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appliedDJs.length > 0 ? (
                    appliedDJs.map((dj) => (
                      <TableRow key={dj._id}>
                        <TableCell>{dj._id}</TableCell>
                        <TableCell>{dj.date}</TableCell>
                        <TableCell>{dj.djName || "N/A"}</TableCell>
                        <TableCell>{dj.status || "Pending"}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancelBooking(dj._id)}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No DJs applied yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

            </div>
          ) : (
            <div>
              <Typography variant="h6" gutterBottom>Booked Tickets:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Ticket ID</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Event Name</strong></TableCell>
                    <TableCell><strong>Ticket Type</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookedTickets.length > 0 ? (
                    bookedTickets.map((ticket) => (
                      <TableRow key={ticket._id}>
                        <TableCell>{ticket._id}</TableCell>
                        <TableCell>{ticket.bookingDate}</TableCell>
                        <TableCell>{ticket.eventId?.title || "N/A"}</TableCell>
                        <TableCell>{ticket.ticketType}</TableCell>
                        <TableCell>{ticket.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteTicket(ticket._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No tickets booked yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Back Button */}
          {viewing && (
            <Button
              variant="contained"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => setViewing(null)}
            >
              Back to Dashboard
            </Button>
          )}

          {/* Logout Button */}
          {!viewing && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "red",
                color: "white",
                marginTop: "10px",
                width: "100%",
              }}
              onClick={handleLogout}
            >
              <LogOut style={{ marginRight: "5px" }} /> Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSide;
