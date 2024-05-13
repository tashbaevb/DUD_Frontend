import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ email, levelNames }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

{/* просто как пример*/}
  let sidebarData = [
    {
      title: 'Hello, ',
      path: '/',
      cName: 'nav-text'
    },
    // { 
    //   title: '1',
    //   path: '/',
    //   cName: 'nav-text'
    // },
    ...levelNames.map((level, index) => ({
      title: level,
      path: `/${level.toLowerCase()}`, // Пример: '/reports'
      cName: 'nav-text',
      level: level // Можно добавить свойство level, если оно нужно
    }))
  ];

  const handleEditEmail = () => {
    // Предположим, что здесь вы выполняете операции для редактирования email
    console.log("Edit email functionality here");
  };

  // Изменение заголовка в зависимости от условия
  if (sidebarData[1]) {
    if (sidebarData[1].title === '1') {
      sidebarData[1].title = 'A1';
    }
    if (sidebarData[1].title === '2') {
      sidebarData[1].title = 'A2';
    }
    if (sidebarData[1].title === '3') {
      sidebarData[1].title = 'B1';
    }
    if (sidebarData[1].title === '4') {
      sidebarData[1].title = 'B2';
    }
  }

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <span id = 'emailMain'>{email}</span>
        </Link>
        <Link to='#' className='menu-bars'>
          <span id = 'notesMainNav' onClick={showSidebar}>Note</span>
        </Link>
        <Link to='#' className='menu-bars'>
          <span id = 'moviesMainNav' onClick={showSidebar}>Movies</span>
        </Link>
        <Link to='#' className='menu-bars'>
          <span id = 'libraryMainNav' onClick={showSidebar}>library</span>
        </Link>
        
        
        {/* Вывод уровней в спане */}
        {levelNames.map((name, index) => (
          <span id='levelNamesId' key={index}>{name}</span>
        ))}
        {/* Кнопка "Edit" для редактирования email */}
        {/* <button onClick={handleEditEmail}>Edit</button> */}
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
          </li>
          {/* Используем созданный sidebarData */}
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
