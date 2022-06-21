import React, { useState } from "react";
import "./Navbar.css";
import {
  FaBlog,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onLogout = () => {
    setUser(false);
  };

  const onLogin = () => {
    setUser(true);
  };

  return (
    <nav className="navbar">
      <div className="maxWidthScreen">
        <Link to="/" className="navbar__logo">
          <h1>
            <span>Adi</span>
            <span>Blog</span>
          </h1>
        </Link>
        <div className="navbar__divform">
          <form onSubmit={onSubmit} className="navbar__form">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for posts by username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
        <ul className="navbar__right">
          {user ? (
            <>
              <li>
                <span onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={onLogin}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
