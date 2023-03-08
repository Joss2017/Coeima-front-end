import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <nav className='footer sticky-bottom' id='footer-container'>
        <div className='container-1'>
          <label className='mb-0'>Me contacter</label>
          <Link
            to='mailto:camille.joaquim.coeima@gmail.com'
            className='logo-footer'
          >
            <MailOutlineIcon className='logo-mail' />
          </Link>
        </div>
        <div className='container-2 text-center'>
          <p className='mb-0' id='container-2'>
            © 2023 Copyright
          </p>
        </div>
        <div className='container-3'>
          <label className='mb-0'>Mon actu</label>
          <Link to='https://www.instagram.com/cam_eha'>
            <InstagramIcon className='logo-instagram' />
          </Link>
        </div>
      </nav>
      {/* )} */}
    </>
  );
};
