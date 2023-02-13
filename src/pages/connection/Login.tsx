import axios, { AxiosResponse } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  // useRef permets de recupérer les valeurs des données entrantes
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // useState permets de gérer l'état si user est conecté ou pas
  const [error, setError] = useState<string | null>(null);
  const [isUserLogged, setisUserLogged] = useState<boolean>(false);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailElement || !passwordElement) {
      setError('Merci de remplir les champs');
      return;
    }

    try {
      axios
        .post('http://localhost:8087/api/auth/login', {
          email: emailElement.current?.value,
          password: passwordElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log('réponde de axios', response.data);
          const token = response.data.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            setisUserLogged(token);
            setTimeout(() => navigate('/account'), 1000);
          }
        });
    } catch (error) {
      setError('erreur dans la connexion');
    }
  };

  return (
    <div className='login-wrapper'>
      {isUserLogged ? (
        <div className='alert alert-success' role='alert'>
          Bienvenue!
        </div>
      ) : (
        error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )
      )}
      <h1>Connecte-toi</h1>
      <form className='container-form-login' onSubmit={handleSubmitForm}>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='emailUser'
            placeholder='name@example.com'
            autoComplete='current-email'
            ref={emailElement}
          />
          <label htmlFor='emailUser'>Email</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='passwordUser'
            placeholder='Password'
            autoComplete='current-password'
            ref={passwordElement}
          />
          <label htmlFor='passwordUser'>Mot de passe</label>
        </div>
        <div className='submit'>
          <button className='mt-3  btn btn-primary' type='submit'>
            Se connecter
          </button>
          <Link to='/register' className='link-register'>
            {'  Pas encore inscrit ? cliquez ici'}
          </Link>
        </div>
      </form>
    </div>
  );
};
