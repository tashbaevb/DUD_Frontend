import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <span onClick={showSidebar}>Menu</span>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <span onClick={showSidebar}>Close</span>
            </Link>
          </li>
          {/* Здесь вы рендерите пункты меню */}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
