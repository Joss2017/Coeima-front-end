import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer className='footer-container'>
        <div className='container-1'>
          <label>Contactez-moi</label>
          <MailOutlineIcon className='logo-footer' />
        </div>
        <div className='container-2'>
          <p className='copyright'>© 2023 Copyright</p>
        </div>
        <div className='container-3'>
          <label>Suivez mon actu </label>
          <InstagramIcon className='logo-footer' />
        </div>
      </footer>
    </>
  );
};
