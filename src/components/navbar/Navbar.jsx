import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import Sidebar from "../content/NoteChat";
import logo from "../../assets/logo.png";

function Navbar({ email, levelNames, levelIndexes }) {
  const [sidebar, setSidebar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showNoteSidebar, setShowNoteSidebar] = useState(false);
  // const [userData, setUserData] = useState({ email: "", levelNames: [] });

  const showSidebar = () => setSidebar(!sidebar);

  const toggleNoteSidebar = () => setShowNoteSidebar(!showNoteSidebar);

  const allLevels = ["A1", "A2", "B1", "B2"];

  let sidebarData = [
    {
      title: `${email}`,
      path: "/",
      cName: "nav-text",
    },
    ...allLevels.map((level) => ({
      title: level,
      path:
        Array.isArray(levelNames) && levelNames.includes(level)
          ? `/lessons/${levelIndexes[level]}`
          : "",

      cName: "nav-text",
      level: level,
    })),
  ];

  const addLevelToUser = async (levelName) => {
    try {
      const accessToken = localStorage.getItem("jwtToken");
      const response = await axios.put(
        "http://localhost:8086/user/update",
        {
          email: email,
          levelIds: [levelIndexes[levelName]],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccessMessage(`${levelName} level added successfully`);
    } catch (error) {
      console.error("Error adding level:", error);
    } finally {
      window.location.reload();
    }
  };

  console.log("EMAIL: " + email);

  const handleNonClickable = (levelName) => {
    const confirmation = window.confirm(`${levelName} do you want it?`);
    if (confirmation) {
      addLevelToUser(levelName);
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <span id="emailMain" onClick={showSidebar}>
            {email}
          </span>
        </Link>
        <Link to="#" className="menu-bars" onClick={toggleNoteSidebar}>
          <span id="notesMainNav">Note</span>
        </Link>

        <Link to="/movies" className="menu-bars">
          <span id="moviesMainNav">Movies</span>
        </Link>
        <Link to="/books" className="menu-bars">
          <span id="libraryMainNav">library</span>
        </Link>
        <Link className="navbar-brand" to={`/profile/${email}`}>
          <img src={logo} alt="Logo" height="30" />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle"></li>
          {sidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              {item.path ? (
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              ) : (
                <span onClick={() => handleNonClickable(item.level)}>
                  {item.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {showNoteSidebar && <Sidebar />}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </>
  );
}

export default Navbar;
