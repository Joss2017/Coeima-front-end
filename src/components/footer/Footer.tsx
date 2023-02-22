import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className='footer-container'>
        <div className='container-1'>
          <label>Contactez-moi</label>
          <Link to='mailto:josselinbaptiste@live.fr' className='logo-footer'>
            <MailOutlineIcon className='logo-footer'  />
          </Link>
        </div>
        <div className='container-2'>
          <p className='copyright'>© 2023 Copyright</p>
        </div>
        <div className='container-3'>
          <label>Mon actu </label>
          <Link to='https://www.instagram.com/cam_eha' className='logo-footer'>
            <InstagramIcon className='logo-footer' />
          </Link>
        </div>
      </footer>
    </>
  );
};
