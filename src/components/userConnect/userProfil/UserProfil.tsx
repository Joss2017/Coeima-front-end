import { AxiosResponse } from 'axios';
import {  useState, useContext, useRef } from 'react';
import { axiosPrivate } from '../../../api/Axios';
import { AuthContext } from '../../../context/AuthContext';
import './UserProfil.css';

export const UserProfil = () => {
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nicknameElement = useRef<HTMLInputElement>(null);
  const emailElement = useRef<HTMLInputElement>(null);
  const oldPasswordElement = useRef<HTMLInputElement>(null);
  const newPasswordElement = useRef<HTMLInputElement>(null);
  const phoneElement = useRef<HTMLInputElement>(null);

  //--------------------------- Usestate pour set nouvelle valeur du User ---------------------------------------------------//
  const [userUpdate, setuserUpdate] = useState<string>('');

  //--------------------------- Requête Axios Update pour mise à jour du profil  User ---------------------------------------//

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .patch(`/user/${connectedUser?.id}`, {})
      .then((response: AxiosResponse) => {
        console.log(
          "la réponse d'un patch user pour un profil update",
          response
        );
        setuserUpdate(`Mise à jour réussi `);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm} className='form-login'>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingOne'>
              <button
                className='accordion-button'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseOne'
                aria-expanded='true'
                aria-controls='collapseOne'
              >
                pseudo : {connectedUser?.nickname}
              </button>
            </h2>
            <div
              id='collapseOne'
              className='accordion-collapse collapse show'
              aria-labelledby='headingOne'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <input
                  type='email'
                  className='form-control'
                  id='nicknameUser'
                  autoComplete='new-email'
                  placeholder='name@example.com'
                  ref={nicknameElement}
                />
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingTwo'>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseTwo'
                aria-expanded='false'
                aria-controls='collapseTwo'
              >
                email : {connectedUser?.email}
              </button>
            </h2>
            <div
              id='collapseTwo'
              className='accordion-collapse collapse'
              aria-labelledby='headingTwo'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <input
                  type='email'
                  className='form-control'
                  id='emailUser'
                  autoComplete='new-email'
                  placeholder='name@example.com'
                  ref={emailElement}
                />
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingThree'>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseThree'
                aria-expanded='false'
                aria-controls='collapseThree'
              >
                mot de passe :
              </button>
            </h2>
            <div
              id='collapseThree'
              className='accordion-collapse collapse'
              aria-labelledby='headingThree'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <input
                  type='password'
                  className='form-control'
                  id='passwordUser'
                  autoComplete='new-email'
                  placeholder='taper votre ancien mot de passe'
                  ref={oldPasswordElement}
                />
                <br />
                <input
                  type='password'
                  className='form-control'
                  id='confirmPasswordUser'
                  autoComplete='new-email'
                  placeholder='taper votre nouveau mot de passe'
                  ref={newPasswordElement}
                />
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingThree'>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseThree'
                aria-expanded='false'
                aria-controls='collapseThree'
              >
                téléphone :{connectedUser?.phone}
              </button>
            </h2>
            <div
              id='collapseThree'
              className='accordion-collapse collapse'
              aria-labelledby='headingThree'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <input
                  type='number'
                  id='typePhone'
                  className='form-control form-control-lg'
                  placeholder='téléphone'
                  autoComplete='new-phone'
                  ref={phoneElement}
                />
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-warning '>
            changer
          </button>
        </div>
      </form>
    </div>
  );
};
