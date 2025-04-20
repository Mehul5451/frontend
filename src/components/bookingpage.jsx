import React, { useState , useEffect } from "react";
import { TextField, Button, Select, MenuItem, Grid, Card, CardContent, Typography } from "@mui/material";
import Calendar from "react-calendar"; // Install using 'npm install react-calendar'
import axios from "axios";
import { Key } from "lucide-react";




 const BookingPage = () => {
  const [DJs, setDJs] = useState([]);
  const [filters, setFilters] = useState({ genre: "", location: "", price: "", rating: "" });
  const [selectedDJ, setSelectedDJ] = useState(null);
  const [date, setDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({ location: "", duration: "", requirements: "" });



  useEffect(() => {
    const fetchDJs = async () => {
      try {
        const response = await axios.get("https://bakend-0ymv.onrender.com/dj");
        setDJs(response.data);
      } catch (error) {
        console.error("Error fetching DJs:", error);
      }
    };
  
    fetchDJs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBooking = (dj) => {
    setSelectedDJ(dj);
  };

  const handleEventDetailChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };


  

const handleConfirmBooking = async () => {
  const token = localStorage.getItem("token"); // ✅ Retrieve JWT from local storage

  if (!token) {
    alert("You must be logged in to book a DJ.");
    return;
  }

  const bookingData = {
    djId: selectedDJ._id,
    djName: selectedDJ.name,
    date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    eventLocation: eventDetails.location,
    eventDuration: eventDetails.duration,
    requirements: eventDetails.requirements,
    status: "pending", // Initial status
  };

  try {
    const response = await axios.post("https://bakend-0ymv.onrender.com/bookings", bookingData, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Add JWT token
    });

    console.log("Booking Success:", response.data);
    alert("Booking request sent!");
  } catch (error) {
    console.error("Error sending booking request:", error.response?.data || error.message);
    alert("Failed to send booking request.");
  }
};


const filteredDJs = DJs.filter((dj) =>
  (!filters.genre || dj.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
  (!filters.location || dj.location.toLowerCase().includes(filters.location.toLowerCase())) &&
  (!filters.price || dj.price <= Number(filters.price)) &&
  (!filters.rating || dj.rating >= Number(filters.rating))
);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Find Your DJ
      </Typography>

      {/* Filters Section */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="Genre"
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#242424',
                color: '#add8e6',
                '& fieldset': {
                  borderColor: '#444444',
                },
                '&:hover fieldset': {
                  borderColor: '#add8e6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#add8e6',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#add8e6',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#242424',
                color: '#add8e6',
                '& fieldset': {
                  borderColor: '#444444',
                },
                '&:hover fieldset': {
                  borderColor: '#add8e6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#add8e6',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#add8e6',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Max Price"
            name="price"
            type="number"
            value={filters.price}
            onChange={handleFilterChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#242424',
                color: '#add8e6',
                '& fieldset': {
                  borderColor: '#444444',
                },
                '&:hover fieldset': {
                  borderColor: '#add8e6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#add8e6',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#add8e6',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Min Rating"
            name="rating"
            type="number"
            step="0.1"
            value={filters.rating}
            onChange={handleFilterChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#242424',
                color: '#add8e6',
                '& fieldset': {
                  borderColor: '#444444',
                },
                '&:hover fieldset': {
                  borderColor: '#add8e6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#add8e6',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#add8e6',
              },
            }}
          />
        </Grid>
      </Grid>

      {/* DJ List Section */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Available DJs
      </Typography>
      <Grid container spacing={3}>
        {filteredDJs.map((dj) => (
          <Grid item xs={12} sm={6} md={4} key={dj._id}>
            <Card  sx={{
      backgroundColor: '#333333', // Dark background
      color: '#add8e6',           // Light blue text  
      padding: '20px',
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: '#444444', // Hover effect
      },
    }}>
              <CardContent >
                <Typography variant="h6" >{dj.name}</Typography>
                <Typography>Genre: {dj.genre}</Typography>
                <Typography>Location: {dj.location}</Typography>
                <Typography>Price: ₹{dj.price}</Typography>
                <Typography>Rating: {dj.rating} / 5</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleBooking(dj)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking and Event Management Section */}
      {selectedDJ && (
  <div
    sx={{
      backgroundColor: '#333333', // Dark background
      color: '#add8e6',           // Light blue text  
      padding: '20px',
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: '#444444', // Hover effect
      },
      marginTop: "30px"
    }}
  >
    <Typography variant="h5" gutterBottom>
      Booking for {selectedDJ.name}
    </Typography>

    <Calendar onChange={setDate} value={date} />

    <TextField
      label="Event Location"
      name="location"
      value={eventDetails.location}
      onChange={handleEventDetailChange}
      fullWidth
      style={{ marginTop: "20px" ,backgroundColor:"white"}}
    />
    <TextField
      label="Event Duration"
      name="duration"
      value={eventDetails.duration}
      onChange={handleEventDetailChange}
      fullWidth
      style={{ marginTop: "20px" ,backgroundColor:"white"}}
    />
    <TextField
      label="Special Requirements"
      name="requirements"
      value={eventDetails.requirements}
      onChange={handleEventDetailChange}
      fullWidth
      style={{ marginTop: "20px",backgroundColor:"white"}}
    />

     <Button
      variant="contained"
      color="success"
      style={{ marginTop: "20px" }}
      onClick={handleConfirmBooking}
      >
       Confirm Booking
      </Button>

  </div>
)}

    </div>
  );
};

export default BookingPage;
