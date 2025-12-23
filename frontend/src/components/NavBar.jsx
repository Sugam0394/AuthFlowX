import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="navbar">
      <h2>AI-Mart</h2>

      <div>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin/login">Admin</Link>
          </>
        ) : (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
