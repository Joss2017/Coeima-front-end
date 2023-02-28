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
        {error || isUserRegistered ? (
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
        ) : null}
        <div className='container-form-register'>
          <form onSubmit={handleSubmitForm} className='form-register '>
            <h1 className='title-register'>INSCRIPTION</h1>
            <div className='form-outline '>
              <input
                type='text'
                className='form-control'
                id='nicknameUser'
                placeholder='4 caractères mini'
                autoComplete='new nickname'
                ref={nicknameElement}
              />
              <label className='form-label' htmlFor='nicknameUser'>
                Ton Pseudo *
              </label>
            </div>

            <div className='form-outline '>
              <input
                type='email'
                className='form-control'
                id='emailUser'
                autoComplete='new-email'
                placeholder='name@example.com'
                ref={emailElement}
              />
              <label className='form-label' htmlFor='emailUser'>
                Ton Email *
              </label>
            </div>

            <div className='form-outline '>
              <input
                type='password'
                className='form-control'
                id='passwordUser'
                placeholder='8 caractères mini,une maj et un caractère'
                autoComplete='new-password'
                ref={passwordElement}
              />
              <label className='form-label' htmlFor='passwordUser'>
                Mot de Passe *
              </label>
            </div>

            <div className='form-outline '>
              <input
                type='password'
                className='form-control'
                id='confirmPasswordUser'
                placeholder='Password'
                autoComplete='new-password'
                ref={confirmPasswordElement}
              />
              <label className='form-label' htmlFor='confirmPasswordUser'>
                Confirmation Mot de Passe *
              </label>
            </div>

            <div className='form-outline '>
              <input
                type='number'
                id='typePhone'
                className='form-control form-control-lg'
                placeholder='téléphone'
                autoComplete='new-phone'
                ref={phoneElement}
              />
              <label className='form-label' htmlFor='typePhone'>
                Numéro de téléphone
              </label>
            </div>

            <div className='d-flex justify-content-center'>
              <button type='submit' className='btn btn-warning btn-block '>
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
