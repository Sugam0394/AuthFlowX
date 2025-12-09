import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Header.css"
import LogoutButton from "./LogoutButton";

function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
     <header className="app-header">
      <div className="logo">
        <Link to="/">AuthFlowX</Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link btn-primary">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header