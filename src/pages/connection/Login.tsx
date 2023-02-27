import { AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
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
      return;
    } else if (
      passwordElement.current &&
      passwordElement.current?.value.length < 8
    ) {
      setError('erreur de mot de passe');
      return;
    }
    try {
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
            setTimeout(() => navigate('/account'), 2000);
          } else {
            setError(response.data);
          }
        });
    } catch (error: any) {
      console.log('error valeur', error.response.data.message);
      if (error.response) {
        setError(error.response.data.message);
        console.log(
          'error.response.data.message valeur',
          error.response.data.message
        );
      }
    }
  };

  useEffect(() => {
    // On définit une fonction qui sera exécutée à intervalles réguliers
    const intervalId = setInterval(() => {
      // On met à jour l'état "isUserLogged" à "false"
      setisUserLogged(null);
      // On supprime le message d'erreur
      setError(null);
    }, 2000);

    // On retourne une fonction qui sera exécutée lorsque le composant sera démonté
    // Cette fonction a pour but d'arrêter l'exécution de la fonction setInterval
    return () => clearInterval(intervalId);
  }, []); // On utilise un tableau vide comme deuxième argument pour s'assurer que la fonction useEffect ne sera exécutée qu'une seule fois au montage du composant.```

  return (
    <>
      <div className='login-wrapper'>
        <div className='container-alert mt-5 '>
          {error !== null ? (
            <div className='alert alert-danger' role='alert' id='alert-danger'>
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
        <div className='container-form-login '>
          <form onSubmit={handleSubmitForm} className='form-login'>
            <h1 className='title-login'>Connecte-toi</h1>
            <div className='form-outline mt-' id='input-login'>
              <input
                type='email'
                className='form-control'
                id='emailUser'
                autoComplete='new-email'
                placeholder='name@example.com'
                ref={emailElement}
              />
              <label className='form-label' htmlFor='emailUser'>
                Email
              </label>
            </div>

            <div className='form-outline mt-3' id='input-login'>
              <input
                type='password'
                className='form-control'
                id='passwordUser'
                placeholder='mot de passe'
                autoComplete='new-password'
                ref={passwordElement}
              />
              <label className='form-label' htmlFor='passwordUser'>
                Mot de Passe
              </label>
            </div>

            <div className='d-flex justify-content-center mt-3'>
              <button type='submit' className='btn btn-warning '>
                Se Connecter
              </button>
            </div>
            <div className='alert alert-warning  mt-5' role='alert'>
              Pas encore inscrit ?
              <Link to='/register' className='alert-link'>
                cliquez ici
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
function setuserUpdate(arg0: null) {
  throw new Error('Function not implemented.');
}
