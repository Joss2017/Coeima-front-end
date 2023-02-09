import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer className='footer-container'>
        <div className='container-1'>
          <label>Contactez-moi</label>
          <img src='./assets/email.svg' alt='icône envoi email' />
        </div>
        <div className='container-2'>
          <p className='copyright'>© 2023 Copyright:</p>
        </div>
        <div className='container-3'>
          <label>Suivez mon actu </label>
          <img src='./assets/instagram.svg' alt='icône diriger instagram' />
        </div>
      </footer>
    </>
  );
};
