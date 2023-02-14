import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink } from 'react-router-dom';

import '../navbar/Navbar.css';

export const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg '>
        <div className='container-fluid'>
          <img
            className='rounded-circle '
            src='./assets/Photo-site.png'
            alt='logo du site'
          />

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-md-auto gap-2'>
              <li className='nav-item rounded'>
                <NavLink to='/' className='link-NB'>
                  <HomeIcon className='logo-NB' />
                  Home
                </NavLink>
              </li>
              <li className='nav-item rounded'>
                <NavLink to='/offer' className='link-NB'>
                  <LocalOfferIcon className='logo-NB' />
                  Prestations
                </NavLink>
              </li>
              <li className='nav-item rounded'>
                <NavLink to='/topic' className='link-NB'>
                  <ForumIcon className='logo-NB' />
                  Forum
                </NavLink>
              </li>
              <li className='nav-item dropdown rounded'>
                <NavLink to='/login' className='link-NB'>
                  <AccountCircleIcon className='logo-NB' />
                  Profil
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
