import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer className='footer-container'>
        <div className='container-1'>
          <label>Contactez-moi</label>
          <img
            className='img-footer'
            src='./assets/email.svg'
            alt='icône envoi email'
          />
        </div>
        <div className='container-2'>
          <p>© 2023 Copyright:</p>
        </div>
        <div className='container-3'>
          <label>Suivez mon actu </label>
          <img src='./assets/instagram.svg' alt='icône envoi email' />
        </div>
      </footer>
    </>
  );
};
