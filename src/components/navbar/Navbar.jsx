import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import NotesModal from "../content/NotesModal";
import logo from "../../assets/logo.png";
import avatar from "../../assets/user-icon.png";
import closeIcon from "../../assets/close.png";

function Navbar({ email, levelNames, levelIndexes }) {
  const [sidebar, setSidebar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const toggleNoteModal = () => setShowNoteModal(!showNoteModal);

  const allLevels = ["A1", "A2", "B1", "B2"];

  let sidebarData = [
    ...allLevels.map((level) => ({
      title: level,
      path:
        Array.isArray(levelNames) && levelNames.includes(level)
          ? `/lessons/${levelIndexes[level]}`
          : "",

      cName: "nav-text level-card",
      level: level,
      canAdd: !(Array.isArray(levelNames) && levelNames.includes(level)), // Check if the level can be added
    })),
  ];

  const addLevelToUser = async (levelName) => {
    try {
      const accessToken = localStorage.getItem("jwtToken");
      await axios.put(
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

  const handleNonClickable = (levelName) => {
    const confirmation = window.confirm(
      `Do you want to add ${levelName} level?`
    );
    if (confirmation) {
      addLevelToUser(levelName);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <span id="emailMain">{email}</span>
          </Link>
          <Link to="#" className="menu-bars" onClick={toggleNoteModal}>
            <span id="notesMainNav">Notizen</span>
          </Link>
        </div>

        <div className="navbar-center">
          <Link to="/movies" className="menu-bars">
            <span id="moviesMainNav">Filme</span>
          </Link>
          <Link to="/books" className="menu-bars">
            <span id="libraryMainNav">Bibliothek</span>
          </Link>
        </div>

        <div className="navbar-right">
          <Link className="navbar-brand" to={`/profile/${email}`}>
            <img src={logo} alt="Logo" height="30" />
          </Link>
        </div>
      </div>
      <nav className={sidebar ? "sidebar active" : "sidebar"}>
        <div className="sidebar-header">
          <img src={avatar} alt="Avatar" className="avatar" />
          <span className="email">{email}</span>
          {/* <button className="logout-button" onClick={handleLogout}>
            Logout
          </button> */}
          <img
            src={closeIcon}
            alt="Close"
            className="close-sidebar-icon"
            onClick={showSidebar}
          />
        </div>
        <div className="level-cards">
          {sidebarData.map((item, index) => (
            <div key={index} className={item.cName}>
              {item.path ? (
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              ) : (
                <span onClick={() => handleNonClickable(item.level)}>
                  {item.title}
                  {item.canAdd && " (Add)"}
                </span>
              )}
            </div>
          ))}
          <button
            className="logout-button"
            onClick={handleLogout}
            // style={{ marginTop: "15px !important;" }}
          >
            Logout
          </button>
        </div>
      </nav>
      {showNoteModal && (
        <NotesModal showModal={showNoteModal} toggleModal={toggleNoteModal} />
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </>
  );
}

export default Navbar;
