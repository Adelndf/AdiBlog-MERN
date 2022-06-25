import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useClickOutside from "./../../hooks/useClickOutside";
import UserInfo from "./../UserInfo/UserInfo";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(false);
  const [toggleBar, setToggleBar] = useState(false);

  const ref = useRef(null);
  useClickOutside(ref, () => setToggleBar(false));

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onLogout = () => {
    setUser(false);
    setToggleBar(false);
  };

  const onLogin = () => {
    setUser(true);
    setToggleBar(false);
  };

  return (
    <nav ref={ref} className="navbar">
      <div className="navbar__maxWidth">
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
        <ul className="navbar__right lg">
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
        <div className="navbar__right mob">
          {/* Do for mobile design */}
          <div
            onClick={() => setToggleBar(!toggleBar)}
            className={`navbar__bars ${toggleBar ? "active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`navbar__mobile ${toggleBar ? "active" : ""}`}>
            {user ? (
              <>
                <div>
                  <span className="info">
                    <UserInfo />
                  </span>
                </div>
                <div>
                  <span onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link to="/login" onClick={onLogin}>
                    <FaSignInAlt /> Login
                  </Link>
                </div>
                <div>
                  <Link to="/register" onClick={() => setToggleBar(false)}>
                    <FaUser /> Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
