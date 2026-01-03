import { Link } from "react-router-dom";
import "./HomeNavbar.css";
import ChatBot from "./chatBot/chatBot";
import { useState} from "react";
 
 

const Navbar = () => {
  const [chatOpen, setChatOpen] = useState(false);


  return (
    <nav className="home-navbar">
      <div className="logo">AI-Mart</div>

      <div className="nav-actions">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>

      {/* Floating Chat Icon */}
      <div className="chatbot-toggle" onClick={() => setChatOpen(prev => !prev)}>
        💬
      </div>

      {/* ChatBot floating box */}
      {chatOpen && (
        <div className="navbar-chatbot">
          <div className="chatbot-header">
            AI-Mart Assistant
            <span className="close-btn" onClick={() => setChatOpen(false)}>×</span>
          </div>
          <ChatBot />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
