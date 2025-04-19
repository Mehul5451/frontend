// src/Pages/Admin.jsx
import React from "react";
import { Card,CardContent } from "./card";
import { Button } from "./button";
import "../css/Adminpanel.css";

export function Admin()  {
  return (
    <div className="card">
      <Card className="card">
        <CardContent>
          <h1 className="">Admin Panel</h1>
          <p className="">Manage your DJs and bookings here.</p>
          <Button className="" onClick={() => alert("Button Clicked!")}>
            Click Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


