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
  const user = true;

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onLogout = () => {};

  return (
    <nav className="navbar">
      <div className="maxWidthScreen">
        <div className="navbar__logo">
          <h1>
            <span>Adi</span>
            <span>Blog</span>
          </h1>
        </div>
        <div className="navbar__search">
          <form onSubmit={onSubmit}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search for user blogs by name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
        <ul className="navbar__right">
          {user ? (
            <>
              <li>
                <Link to="/user/123id">
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <Link to="/user/blogs">
                  <FaBlog /> My blogs
                </Link>
              </li>
              <li>
                <div onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
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
