import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const levelIndexes = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
};

const Navbar = () => {
  const [userData, setUserData] = useState({ email: "", levelNames: [] });
  const [sidebar, setSidebar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);

  const toggleSidebarFromEmail = () => {
    if (!sidebar) {
      setSidebar(true);
    }
  };

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
        setUserData({
          email: profileResponse.data.email,
          levelNames: profileResponse.data.levelNames,
        });
        setSelectedLevels(profileResponse.data.levelNames);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    const profileMenu = document.querySelector(".profile-menu");
    if (profileMenu) {
      profileMenu.addEventListener("click", toggleSidebarFromEmail);
      return () =>
        profileMenu.removeEventListener("click", toggleSidebarFromEmail);
    }
  }, [sidebar]);

  const handleLevelClick = (levelName) => {
    if (userData.levelNames.includes(levelName)) {
      // Redirect to the level if available
      window.location.href = `/lessons/${levelIndexes[levelName]}`;
    } else {
      const confirmAdd = window.confirm(
        `Do you want to add ${levelName} level?`
      );
      if (confirmAdd) {
        addLevelToUser(levelName);
      }
    }
  };

  const addLevelToUser = async (levelName) => {
    try {
      const accessToken = localStorage.getItem("jwtToken");
      const response = await axios.put(
        "http://localhost:8086/user/update",
        {
          email: userData.email,
          levelIds: [levelIndexes[levelName]],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserData({
        ...userData,
        levelNames: response.data.levelNames,
      });
      setSelectedLevels(response.data.levelNames);
      console.log(`${levelName} level added successfully`);
    } catch (error) {
      console.error("Error adding level:", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="profile-menu">
          <span className="menu-email">{userData.email}</span>
          <div className="menu-content">
            {["A1", "A2", "B1", "B2"].map((level, index) => (
              <ul key={index}>
                <li onClick={() => handleLevelClick(level)}>
                  {userData.levelNames.includes(level) ? (
                    <Link to={`/lessons/${levelIndexes[level]}`}>{level}</Link>
                  ) : (
                    `Add ${level} Level`
                  )}
                </li>
              </ul>
            ))}
          </div>
        </div>
        <Link to={"/notes"} className="menu-bars">
          <span id="notesMainNav">Note</span>
        </Link>
        <Link to={"/movies"} className="menu-bars">
          <span id="moviesMainNav" onClick={showSidebar}>
            Movies
          </span>
        </Link>
        <Link to={"/books"} className="menu-bars">
          <span id="libraryMainNav" onClick={showSidebar}>
            Library
          </span>
        </Link>
        <Link className="navbar-brand" to={`/profile/${userData.email}`}>
          <img src={logo} alt="Logo" height="30" />
        </Link>
      </div>
      <nav
        className={sidebar ? "nav-menu active" : "nav-menu"}
        style={{ width: "35%" }}
      >
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle"></li>
          {editMode && (
            <>
              {Object.keys(levelIndexes).map((level, index) => (
                <li key={index} className="nav-text">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      disabled={!userData.levelNames.includes(level)}
                      onChange={() => handleLevelToggle(level)}
                    />
                    {level}
                  </label>
                </li>
              ))}
            </>
          )}
          {!editMode && (
            <>
              {Object.keys(levelIndexes).map((level, index) => (
                <li key={index} className="nav-text">
                  <Link
                    to={`/lessons/${levelIndexes[level]}`}
                    style={{
                      cursor: userData.levelNames.includes(level)
                        ? "pointer"
                        : "not-allowed",
                      color: userData.levelNames.includes(level)
                        ? "inherit"
                        : "gray",
                    }}
                  >
                    {level}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
