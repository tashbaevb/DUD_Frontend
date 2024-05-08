import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer-content">
        <div className="footer-content">
          <form action="" className="email-form">
            <input
              type="email"
              id="emailInput"
              className="email-input-field"
              placeholder="Enter your email"
            />
            <button type="button" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
