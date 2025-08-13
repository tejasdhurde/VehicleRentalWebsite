import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../assets/Header.css"; 

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top custom-shadow">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        🚗 Rentify
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/bookings">My Bookings</Link>
              </li>
              {user.role === "OWNER" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/manage-vehicles">Manage Vehicles</Link>
                </li>
              )}
            </>
          )}
        </ul>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="text-white me-3 fw-semibold">
                👋 Hi, {user.email}
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">Login</Link>
              <Link to="/signup" className="btn btn-light btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
