import axios, { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  //---------------------------------------useNavigate permets de naviguer sur une autre page après condition---------------//

  const navigate = useNavigate();

  //--------------------------------------useState permets de gérer l'état si user est conecté ou pas----------------------//

  const [error, setError] = useState<string | null>('');
  const [isUserLogged, setisUserLogged] = useState<string>('');

  //--------------------------------------Fonction rattachée aux Inputs pour la gestion des erreurs------------------------//

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      !emailElement.current?.value ||
      !passwordElement.current?.value === undefined ||
      null
    ) {
      setError('Merci de remplir les champs');
      return;
    } else if (
      passwordElement.current &&
      passwordElement.current?.value.length < 8
    ) {
      setError(
        'le mot de passe doit contenir 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou caractère spécial'
      );
      return;
    }
  };

  //--------------------------------------Axios.post Auth avec les valeurs réxupérées par useRef------------------------//

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    try {
      await axios
        .post('http://localhost:8087/api/auth/login', {
          email: emailElement.current?.value,
          password: passwordElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log('réponse de axios', response.data);
          console.log('message axios', response.statusText);
          const token = response.data.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            setisUserLogged(response.data.message);
            setTimeout(() => navigate('/account'), 1000);
          }
        });
    } catch (error) {
      console.log(error);
      setError('erreur dans la connexion');
    }
  };

  return (
    <>
      <div className='login-wrapper'>
        {isUserLogged ? (
          <div className='alert alert-success' role='alert'>
            {isUserLogged}
          </div>
        ) : (
          error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )
        )}
      </div>
      <div className='container-form-login '>
        <h1 className='title-login'>Connecte-toi</h1>
        <form onSubmit={handleSubmitForm}>
          <div className='form-outline mb-1'>
            <input
              type='email'
              className='form-control'
              id='emailUser'
              autoComplete='new-email'
              placeholder='name@example.com'
              onChange={handleChange}
              ref={emailElement}
            />
            <label className='form-label' htmlFor='form3Example3cg'>
              Email
            </label>
          </div>

          <div className='form-outline mb-1'>
            <input
              type='password'
              className='form-control'
              id='passwordUser'
              placeholder='mot de passe'
              autoComplete='new-password'
              onChange={handleChange}
              ref={passwordElement}
            />
            <label className='form-label' htmlFor='form3Example4cg'>
              Mot de Passe
            </label>
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-danger btn-block '>
              Se Connecter
            </button>
          </div>
          <div className='alert alert-warning mt-3' role='alert'>
            <Link to='/register' className='link-register'>
              Pas encore inscrit ? cliquez ici
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
