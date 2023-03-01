import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import '../navbar/Navbar.css';

export const Navbar = () => {
  const { savedToken, setAuthChange } = useContext(AuthContext);
  //---------------------------------------useNavigate permets de naviguer sur une autre page après condition---------------//
  const navigate = useNavigate();

  //---------------------------------------Fonction qui permets de changer l'état du button si user connecté ou non---------//
  const handleLogout = () => {
    setAuthChange(null);
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <>
      <nav className='navbar sticky-top navbar-expand-lg '>
        <div className='container-fluid'>
          <div className='img-logo'>
            <img
              className='rounded-circle '
              src='assets/Photo-site.png'
              alt='logo du site'
            />
          </div>
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
              <li className='nav-item-rounded'>
                {savedToken !== null ? (
                  <button
                    type='button'
                    className='btn-connect'
                    onClick={handleLogout}
                  >
                    <CheckCircleOutlineIcon />
                    Connecté
                  </button>
                ) : (
                  <button type='button' className=' btn-disconnected'>
                    <HighlightOffIcon />
                    Deconnecté
                  </button>
                )}
              </li>
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
                {savedToken ? (
                  <NavLink to='/Account' className='link-NB'>
                    <AccountCircleIcon className='logo-NB' />
                    Profil
                  </NavLink>
                ) : (
                  <NavLink to='/login' className='link-NB'>
                    <AccountCircleIcon className='logo-NB' />
                    Profil
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
