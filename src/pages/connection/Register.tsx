import axios, { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosPrivate } from '../../api/Axios';
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

    //--------------------------------------condition rattachée aux Inputs par useRef pour la gestion des erreurs------------------------//

    if (nicknameElement.current && nicknameElement.current.value.length < 4) {
      setError(' taille du pseudo 4 caractères min');
      return;
    } else if (
      !emailElement.current?.value ||
      !passwordElement.current?.value
    ) {
      setError('Renseigner les champs  email et  mot de passe');
      return;
    } else if (
      passwordElement.current &&
      passwordElement.current.value.length < 8
    ) {
      setError(
        ' 8 caractères min, une lettre minuscule, une lettre majuscule, et un chiffre ou un caractère spécial'
      );

      return;
    } else if (
      passwordElement.current?.value !== confirmPasswordElement.current?.value
    ) {
      setError(
        'La confirmation de mot de passe doit être identique au mot de passe'
      );
      return;
    }

    try {
      await axiosPrivate
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
            setIsUserRegistered('Inscription réussie');
            setTimeout(() => navigate('/login'), 1000);
          } else {
            setIsUserRegistered(response.data.message);
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
    //-------------------------------------------On définit une fonction qui sera exécutée à intervalles réguliers---------------------//
    const intervalId = setInterval(() => {
      //------------------------------------------- On met à jour l'état "isUserRegistered" à "null"------------------------------------//
      setIsUserRegistered(null);
      //--------------------------------------------- On supprime le message d'erreur---------------------------------------------------//
      setError(null);
    }, 3000);

    //--------------------------------- On retourne une fonction qui sera exécutée lorsque le composant sera démonté----------------------//
    //----------------------------------- Cette fonction a pour but d'arrêter l'exécution de la fonction setInterval----------------------//
    return () => clearInterval(intervalId);
  }, []); // On utilise un tableau vide comme deuxième argument pour s'assurer que la fonction useEffect ne sera exécutée qu'une seule fois au montage du composant.

  return (
    <>
      <div className='register-wrapper'>
        <div className='container-alert '>
          {isUserRegistered !== null && (
            <div
              className='alert alert-success'
              id='alert-success'
              role='alert'
            >
              {isUserRegistered}
            </div>
          )}

          {error !== null && (
            <div
              className='alert alert-warning'
              id='alert-warning'
              role='alert'
            >
              {error}
            </div>
          )}
        </div>
        <div className='container-form-register'>
          <form onSubmit={handleSubmitForm} className='form-register '>
            <h1 className='title-register'>INSCRIPTION</h1>
            <div className='form-outline mt-2'>
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

            <div className='form-outline mb-1'>
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

            <div className='form-outline mb-1'>
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

            <div className='form-outline mb-1'>
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

            <div className='form-outline mb-1'>
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

            <div className='form-check d-flex justify-content-center mb-5'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                value=''
                id='form2Example3cg'
              />
              <label className='form-check-label' htmlFor='form2Example3g'>
                I agree all statements in{' '}
                <a href='#!' className='text-body'>
                  <u>Terms of service</u>
                </a>
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
