import { AxiosResponse } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosPublic } from '../../api/Axios';
import './Register.css';

export const Register = () => {
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nicknameElement = useRef<HTMLInputElement>(null);
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const confirmPasswordElement = useRef<HTMLInputElement>(null);
  const phoneElement = useRef<HTMLInputElement>(null);

  //---------------------------------------useNavigate permets de naviguer sur une autre page après condition---------------//

  const navigate = useNavigate();

  //--------------------------------------useState permets de gérer l'état si user est conecté ou pas----------------------//

  const [error, setError] = useState<string | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<string | null>(null);

  //--------------------------------------Axios.post Auth avec les valeurs réxupérées par useRef------------------------//

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    console.log(nicknameElement.current?.value);
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);
    console.log(confirmPasswordElement.current?.value);
    console.log(phoneElement.current?.value);

    // //--------------------------------------condition rattachée aux Inputs par useRef pour la gestion des erreurs------------------------//

    //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//

    if (nicknameElement.current && nicknameElement.current.value.length < 4) {
      setError(' taille du pseudo 4 caractères min');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (!emailElement.current?.value || !passwordElement.current?.value) {
      setError('Renseigner les champs  email et  mot de passe');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (passwordElement.current && passwordElement.current.value.length < 8) {
      setError(' 8 caractères minimum');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (
      passwordElement.current?.value !== confirmPasswordElement.current?.value
    ) {
      setError(
        'La confirmation de mot de passe doit être identique au mot de passe'
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    await axiosPublic
      .post('/auth/register', {
        nickname: nicknameElement.current?.value,
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
        confirmPassword: confirmPasswordElement.current?.value,
        phone: phoneElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log('réponse de axios', response.data);
        if (response.status === 201) {
          setIsUserRegistered('Inscription réussie !');

          setTimeout(() => {
            setIsUserRegistered(null);
            navigate('/login');
          }, 2000);
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
      <div className='register-wrapper'>
        <div className='container-alert-register '>
          {error !== null ? (
            <div className='alert alert-danger' role='alert' id='alert-danger'>
              {error}
            </div>
          ) : (
            isUserRegistered !== null && (
              <div
                className='alert alert-success'
                role='alert'
                id='alert-success'
              >
                {isUserRegistered}
              </div>
            )
          )}
        </div>

        <div className='container-form-register'>
          <div className='card' id='card-register'>
            <form onSubmit={handleSubmitForm} className='form-register '>
              <div className='card-title'>INSCRIPTION</div>
              <div className='card-body'>
                <div className='form-outline  '>
                  <label className='form-label' htmlFor='nicknameUser'>
                    Ton Pseudo *
                  </label>
                  <input
                    type='text'
                    className='form-control '
                    id='nicknameUser'
                    placeholder='4 caractères mini'
                    ref={nicknameElement}
                  />
                </div>

                <div className='form-outline '>
                  <label className='form-label' htmlFor='emailUser'>
                    Ton Email *
                  </label>
                  <input
                    type='email'
                    className='form-control '
                    id='emailUser'
                    placeholder='name@example.com'
                    ref={emailElement}
                  />
                </div>

                <div className='form-outline  '>
                  <label className='form-label' htmlFor='passwordUser'>
                    Mot de Passe *
                  </label>
                  <input
                    type='password'
                    className='form-control '
                    id='passwordUser'
                    placeholder='8 caractères min 1 maj 1caract spé'
                    ref={passwordElement}
                  />
                </div>

                <div className='form-outline  '>
                  <label className='form-label' htmlFor='confirmPasswordUser'>
                    Confirmation Mot de Passe *
                  </label>
                  <input
                    type='password'
                    className='form-control '
                    id='confirmPasswordUser'
                    placeholder='Password'
                    ref={confirmPasswordElement}
                  />
                </div>

                <div className='form-outline '>
                  <label className='form-label' htmlFor='typePhone'>
                    Numéro de téléphone
                  </label>
                  <input
                    type='number'
                    id='typePhone'
                    className='form-control form-control '
                    placeholder='téléphone'
                    ref={phoneElement}
                  />
                </div>

                <div className='card-footer'>
                  <button type='submit' className='btn btn-warning btn-block '>
                    S'inscrire
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
