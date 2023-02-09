import axios, { AxiosResponse } from 'axios';
import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export const SignIn = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    axios
      .post('http://localhost:8087/api/auth/login', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        const token = response.data.accessToken;

        if (token) {
          //------------------Réponse avec Token crée--------------//
          console.log(`valeur du token généré ${token}`);

          localStorage.setItem('token', token);
          token(setSuccess);
          setTimeout(() => navigate('/Account'), 1000);
        }
      })
      .catch(() => {
        alert('Combinaison adresse mail/ mot de passe non trouvée');
        window.location.reload();
      });
  };

  return (
    <div>
      {' '}
      <section className='Login'>
        <form className='form-login' onSubmit={handleSubmitForm}>
          <span className='title-login'>Connexion</span>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              id='emailUser'
              placeholder='name@example.com'
              ref={emailElement}
            />
            <label htmlFor='emailUser'>Email</label>
          </div>
          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='passwordUser'
              ref={passwordElement}
            />
            <label htmlFor='passwordUser'>Mot de passe</label>
          </div>
          <button className='mt-3 btn btn-primary' type='submit'>
            Se connecter
          </button>
        </form>
      </section>
    </div>
  );
};
