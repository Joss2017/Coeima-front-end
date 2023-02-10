import axios, { AxiosResponse } from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  //---------------------------------------------useRef permets de recupérer les valeurs des données entrantes-------------------------//
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  //---------------------------------------------useState permets de gérer l'état si user est conecté ou pas-------------------------//

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent) => {
    console.log('handleSubmitForm');
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    axios
      .post('http://api-memit.dev-formation.fr/api/auth/login', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        const token = response.data.accessToken;
        if (token) {
          localStorage.setItem('token', token);
          setIsUserLoggedIn(token);
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      })

      .catch(() => {
        alert('Combinaison adresse mail/ mot de passe non trouvée');
        window.location.reload();
      });
  };

  return (
    <div className='login-wrapper'>
      <h1 className='title-login'>Connecte-toi</h1>
      <form onSubmit={handleSubmitForm} className='form-login'>
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
        <button className=' btn btn-danger mt-3' type='submit'>
          Se connecter
        </button>
      </form>
      <p>
        <Link to='/register' className='link-login'>
          Pas encore inscrit? incrivez-vous, c'est gratuit !
        </Link>
      </p>
    </div>
  );
};
