import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink } from 'react-router-dom';

import '../navbar/Navbar.css';

export const Navbar = () => {
  return (
    <>
      <nav className='navbar sticky-top '>
        <div className='nav-item-1'>
          <img
            className='rounded-circle '
            src='./assets/Photo-site.png'
            alt='logo du site'
          />
        </div>
        <div className='container-nav'>
          <div className='nav-item-2'>
            <NavLink to='/'>
              <HomeIcon className='logo-NB' />
            </NavLink>
          </div>

          <div className='nav-item-3'>
            <NavLink to='/services'>
              <LocalOfferIcon className='logo-NB' />
            </NavLink>
          </div>
          <div className='nav-item-4'>
            <NavLink to='/forum'>
              <ForumIcon className='logo-NB' />
            </NavLink>
          </div>
          <div className='nav-item-5'>
            <NavLink to='/signIn'>
              <AccountCircleIcon className='logo-NB' />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
