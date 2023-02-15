import axios, { AxiosResponse } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
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
      setError("La taille du pseudo doit être d'au moins de 4 caractères");
      return;
    } else if (
      !emailElement.current?.value ||
      !passwordElement.current?.value
    ) {
      setError('Veuillez renseigner les champs  email et  mot de passe');
      return;
    } else if (
      passwordElement.current &&
      passwordElement.current.value.length < 8
    ) {
      setError(
        'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, et un chiffre ou un caractère spécial'
      );

      return;
    } else if (
      passwordElement.current?.value !== confirmPasswordElement.current?.value
    ) {
      setError(
        'La confirmation de mot de passe doit être identique au mot de passe'
      );
      return;
    } else if (phoneElement.current && phoneElement.current.value.length < 10) {
      setError('10 chiffres minimum');
      return;
    }

    try {
      await axios
        .post('http://localhost:8087/api/auth/register', {
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

  return (
    <>
      <div className='register-wrapper'>
        {isUserRegistered && (
          <div className='alert alert-success' role='alert'>
            {isUserRegistered}
          </div>
        )}
      </div>
      {error && (
        <div className='alert alert-warning' role='alert'>
          {error}
        </div>
      )}
      <div className='container-form-register '>
        <h1 className='title-register'>Inscription</h1>
        <form onSubmit={handleSubmitForm}>
          <div className='form-outline mb-1'>
            <input
              type='text'
              className='form-control'
              id='nicknameUser'
              placeholder='4 caractères mini'
              autoComplete='new nickname'
              ref={nicknameElement}
            />
            <label className='form-label' htmlFor='form3Example1cg'>
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
            <label className='form-label' htmlFor='form3Example3cg'>
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
            <label className='form-label' htmlFor='form3Example4cg'>
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
            <label className='form-label' htmlFor='form3Example4cdg'>
              Confirmation Mot de Passe *
            </label>
          </div>

          <div className='form-outline mb-1'>
            <input
              type='tel'
              id='typePhone'
              className='form-control form-control-lg'
              placeholder='téléphone'
              autoComplete='new-phone'
              ref={phoneElement}
            />
            <label className='form-label' htmlFor='form3Example4cdg'>
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
            <button type='submit' className='btn btn-danger btn-block '>
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

