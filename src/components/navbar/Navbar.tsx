import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../navbar/Navbar.css';

export const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg position-sticky '>
        <NavLink to='/'>
          <img
            className='rounded-circle '
            src='./assets/Photo-site.png'
            alt='logo du site'
          />
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/services' className='navlink-button'>
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/forum' className='navlink-button'>
                Forum
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/signIn' className='navlink-button'>
                Mon Compte
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
