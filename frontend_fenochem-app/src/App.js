import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ContactUs from "./components/ContactUs";
import ChatModal from "./components/ChatModal";
import "./App.css";

function App() {
  const [showChat, setShowChat] = useState(false);

  // 🟢 Auto-popup Fenochem Assistant 1.5 seconds after the page loads
  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/chatmodal" element={<ChatModal show={true} />} />
        </Routes>
      </div>

      {/* 🧠 ChatModal pops up automatically on any page */}
      <ChatModal show={showChat} handleClose={() => setShowChat(false)} />
    </Router>
  );
}

export default App;
