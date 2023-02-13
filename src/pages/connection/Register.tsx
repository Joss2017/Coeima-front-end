import axios, { AxiosResponse } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './Register.css';

export const Register = () => {
  const nicknameElement = useRef<HTMLInputElement>(null);
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const ConfirmPasswordElement = useRef<HTMLInputElement>(null);
  const phoneElement = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // useState permets de gérer l'état si user est conecté ou pas
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isUserRegister, setisUserRegister] = useState<string | null>(null);

  const handleSubmitForm = async (e: FormEvent) => {
    console.log('handleSubmitForm');
    e.preventDefault();

    console.log(nicknameElement.current?.value);
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);
    console.log(ConfirmPasswordElement.current?.value);
    console.log(phoneElement.current?.value);

    if (nickname.length < 4) {
      setError('la taille du pseudo doit être au minimum de 4 caractères');
      return;
    } else if (password.length < 8) {
      setError(
        'la taille du mot de passe doit être au minimum de 8 caractères'
      );
      return;
    } else if (!email || !passwordElement) {
      setError(
        "Veuillez entrer un nom d'utilisateur et un mot de passe valide"
      );
      return;
    } else if (password !== confirmPassword) {
      setError(
        'votre confirmation de mot de passe doit être la même que votre mot de passe'
      );
      return;
    }

    try {
      axios
        .post('http://localhost:8087/api/auth/register', {
          nickname: nicknameElement.current?.value,
          email: emailElement.current?.value,
          password: passwordElement.current?.value,
          ConfirmPassword: ConfirmPasswordElement.current?.value,
          phone: phoneElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log('réponde de axios', response.data);

          if (response.status === 201) {
            setisUserRegister(response.data.message || 'Inscription réussie');
            setTimeout(() => navigate('/login'), 1000);
          } else {
            setError(
              response.data.message ||
                "Une erreur s'est produite lors de l'inscriprion"
            );
          }
        });
    } catch (error) {
      setError('erreur dans le formulaire');
    }
  };

  return (
    <div className='register-wrapper'>
      {isUserRegister ? (
        <div className='alert alert-success' role='alert'>
          {isUserRegister}
        </div>
      ) : (
        error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )
      )}

      <div className='container-form-register '>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmitForm}>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='nicknameUser'
              placeholder='pseudo'
              autoComplete='username'
              onChange={(event) => setNickname(event.currentTarget.value)}
              ref={nicknameElement}
            />
            <label htmlFor='nicknameUser'>Pseudo *</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              id='emailUser'
              autoComplete='email'
              placeholder='name@example.com'
              onChange={(event) => setEmail(event.currentTarget.value)}
              ref={emailElement}
            />
            <label htmlFor='emailUser'>Email *</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              id='passwordUser'
              placeholder='Password'
              autoComplete='new-password'
              onChange={(event) => setPassword(event.currentTarget.value)}
              ref={passwordElement}
            />
            <label htmlFor='passwordUser'>Mot de passe *</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              id='confirmPasswordUser'
              placeholder='Password'
              autoComplete='new-password'
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
              ref={ConfirmPasswordElement}
            />
            <label htmlFor='confirmPasswordUser'>
              Confirmation mot de passe *
            </label>
          </div>
          <div className='form-floating '>
            <input
              type='number'
              className='form-control'
              id='phoneUser'
              placeholder='téléphone'
              ref={phoneElement}
            />
            <label htmlFor='confirmPasswordUser'>Numéro de téléphone</label>
          </div>
          <div className='submit'>
            <button className='mt-3  btn btn-primary' type='submit'>
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
