import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../context/RegistrationContext";

// Define user type
type User = {
  userId?: string;
  name?: string;
  email: string;
};

export default function Herosection() {
  const { openRegistration } = useRegistration();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // Check for authenticated user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle list event button click
  const handleListEvent = () => {
    if (user) {
      // User is logged in, navigate to event upload page
      navigate("/event-upload");
    } else {
      // User is not logged in, open registration modal
      openRegistration();
    }
  };

  // Handle find ticket button click
  const handleFindTicket = () => {
    if (user) {
      // User is logged in, navigate to ticket view page
      navigate("/ticket-view");
    } else {
      // User is not logged in, open registration modal
      openRegistration();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm"
      >
        <source src="/images/invideo.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <img src="/images/logo.png" alt="Evently Logo" className="h-16 sm:h-20" />
          <img src="/images/textlogo.png" alt="Evently Text Logo" className="h-12 sm:h-16" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-wide">
          DISCOVER. CONNECT. CELEBRATE.
        </h1>
        <p className="mt-2 sm:mt-4 text-lg sm:text-xl">
          Your All-in-One Destination for Fast, Affordable, and Seamless Event Booking & Fest Solutions!
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleListEvent}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white"
          >
            List Your Event
          </button>
          <button
            onClick={handleFindTicket}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white"
          >
            Find Your Ticket
          </button>
        </div>
      </div>
    </div>
  );
}