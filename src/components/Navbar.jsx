import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import user from "../assets/user-icon.png";

function Navbar() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("jwtToken");
        const profileResponse = await axios.get(
          "http://localhost:8086/user/my-profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserEmail(profileResponse.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const userProfileLink = userEmail ? `/profile/${userEmail}` : "/";

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to={userProfileLink}>
          <img src={logo} alt="Logo" height="30" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link message-icon" href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-toggle="sidebar">
                <img src={user} alt="User" height="30" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
