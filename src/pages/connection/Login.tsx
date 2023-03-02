import { AxiosResponse } from 'axios';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { axiosPublic } from '../../api/Axios';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

export const Login = () => {
  //--contexte pour déterminer si l'utilisateur est authentifié ou non. Il récupère les propriétés par onAuthChange et savedToken---//

  const { setAuthChange } = useContext(AuthContext);
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes-----------------------------//

  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  //---------------------------------------useNavigate permets de naviguer sur une autre page après condition------------------------//

  const navigate = useNavigate();

  //--------------------------------------useState permets de gérer l'état si user est conecté ou pas--------------------------------//
  const [error, setError] = useState<string | null>(null);
  const [isUserLogged, setisUserLogged] = useState<string | null>(null);

  //--------------------------------------Axios.post Auth avec les valeurs réxupérées par useRef--------------------------------------//

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    //--------------------------------------condition rattachée aux Inputs par useRef pour la gestion des erreurs------------------------//

    if (
      !emailElement.current?.value ||
      !passwordElement.current?.value === undefined ||
      null
    ) {
      setError('Merci de remplir les champs');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (passwordElement.current && passwordElement.current?.value.length < 8) {
      setError('erreur de mot de passe');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    await axiosPublic
      .post('auth/login', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log('réponse de axios', response.data);

        const token = response.data.accessToken;
        if (token) {
          localStorage.setItem('token', token);
          setAuthChange(token);
          setisUserLogged('Connexion réussie !');
          setTimeout(() => {
            setisUserLogged(null);
            navigate('/account');
          }, 1000);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  return (
    <>
      <div className='login-wrapper'>
        {error || isUserLogged ? (
          <div className='container-alert  '>
            {error !== null ? (
              <div
                className='alert alert-danger'
                role='alert'
                id='alert-danger'
              >
                {error}
              </div>
            ) : (
              isUserLogged !== null && (
                <div
                  className='alert alert-success'
                  role='alert'
                  id='alert-success'
                >
                  {isUserLogged}
                </div>
              )
            )}
          </div>
        ) : null}
        <div className='container-form-login '>
          <form onSubmit={handleSubmitForm} className='form-login'>
            <h1 className='title-login'>Connecte-toi</h1>

            <div className='form-outline mt-' id='input-login'>
              <label className='form-label' htmlFor='emailUser'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='emailUser'
                autoComplete='new-email'
                placeholder='name@example.com'
                ref={emailElement}
              />
            </div>

            <div className='form-outline mt-3' id='input-login'>
              <label className='form-label' htmlFor='passwordUser'>
                Mot de Passe
              </label>
              <input
                type='password'
                className='form-control'
                id='passwordUser'
                placeholder='mot de passe'
                autoComplete='new-password'
                ref={passwordElement}
              />
            </div>

            <div className='d-flex justify-content-center mt-3'>
              <button type='submit' className='btn btn-warning '>
                Se Connecter
              </button>
            </div>
            <div className='card-footer'>
              <div className='alert alert-warning  mt-5' role='alert'>
                Pas encore inscrit ?
                <Link to='/register' className='alert-link'>
                  cliquez ici
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
