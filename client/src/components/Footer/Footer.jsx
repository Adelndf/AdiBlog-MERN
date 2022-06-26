import React from "react";
import "./Footer.css";
import { FaTwitterSquare, FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__text">
        <p>
          Build by Adel with React.js (Frontend) & Node.js and Express.js
          (Backend)
        </p>
      </div>
      <span>|</span>
      <div className="footer__icons">
        <a target="_blank" rel="noreferrer" href="https://twitter.com/iAdelDev">
          <FaTwitterSquare />
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/Adelndf">
          <FaGithubSquare />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
