import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ChatModal from "./ChatModal"; // Import the chat component

const Navbar = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="nav-right">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/contactus" className="nav-link">
            Contact Us
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>

          {/* Chat Button */}
          <button className="chat-btn" onClick={() => setShowChat(true)}>
            💬 Chat
          </button>
        </div>
      </nav>

      {/* Chat Modal */}
      <ChatModal show={showChat} handleClose={() => setShowChat(false)} />
    </>
  );
};

export default Navbar;
