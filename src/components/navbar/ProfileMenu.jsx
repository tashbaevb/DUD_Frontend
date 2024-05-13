import React, { useState } from "react";

const ProfileMenu = ({ email, addLevelToUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddLevel = (levelName) => {
    const confirmAdd = window.confirm(`Do you want to add ${levelName} level?`);
    if (confirmAdd) {
      addLevelToUser(levelName);
    }
  };

  return (
    <div className="profile-menu">
      <span className="menu-email" onClick={handleToggleMenu}>
        {email}
      </span>
      {showMenu && (
        <div className="menu-content">
          <ul>
            <li onClick={() => handleAddLevel("A1")}>Add A1 Level</li>
            <li onClick={() => handleAddLevel("A2")}>Add A2 Level</li>
            <li onClick={() => handleAddLevel("B1")}>Add B1 Level</li>
            <li onClick={() => handleAddLevel("B2")}>Add B2 Level</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
