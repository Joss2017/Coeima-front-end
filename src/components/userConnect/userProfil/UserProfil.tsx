import { AxiosResponse } from 'axios';
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { useAxios } from '../../../hooks/Use-Axios';
import { UserTypeProps } from '../../../interface/User';
import './UserProfil.css';

let userTampon: UserTypeProps = {
  nickname: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  id: '',
};

export const UserProfil = () => {
  const navigate = useNavigate();
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);
  if (connectedUser) {
    userTampon = connectedUser;
  }

  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nicknameElement = useRef<HTMLInputElement>(null);
  const emailElement = useRef<HTMLInputElement>(null);
  const newPasswordElement = useRef<HTMLInputElement>(null);
  const phoneElement = useRef<HTMLInputElement>(null);

  //--------------------------- Usestate pour set nouvelle valeur du User ---------------------------------------------------//
  const [userUpdate, setuserUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setuser] = useState<UserTypeProps>(userTampon);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//
  const { axiosPrivate } = useAxios();
  //--------------------------- Requête Axios Update pour mise à jour du Nickname  User ---------------------------------------//
  const handleClickNickname = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(nicknameElement.current?.value);

    axiosPrivate
      .patch(`/user/${connectedUser?.id}`, {
        nickname: nicknameElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log("Réponse de la récupération valeur d'un user", response);
        userTampon.nickname = response.data.nickname;
        setuser(userTampon);
        setuserUpdate(`Mise à jour réussi `);
        setTimeout(() => {
          setuserUpdate(null);
        }, 2000);
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du pseudo');
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  //--------------------------- Requête Axios Update pour mise à jour du Email  User ---------------------------------------//

  const handleClickEmail = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(emailElement.current?.value);

    axiosPrivate
      .patch(`/user/${connectedUser?.id}`, {
        email: emailElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log("la réponse d'un patch user pour  update email", response);
        userTampon.email = response.data.email;
        setuser(userTampon);
        setuserUpdate(`Mise à jour réussi `);
        setTimeout(() => {
          setuserUpdate(null);
        }, 2000);
      })
      .catch((error) => console.log(error));
    setError("erreur dans la mise à jour de l'email");
    setTimeout(() => {
      setError(null);
    }, 2000);
  };
  //--------------------------- Requête Axios Update pour mise à jour du Mot de Passe  User ---------------------------------------//

  const handleClickPassword = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(newPasswordElement.current?.value);

    axiosPrivate
      .patch(`/user/${connectedUser?.id}`, {
        password: newPasswordElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log(
          "la réponse d'un patch user pour un update password",
          response
        );
        setuserUpdate(`Mise à jour réussi `);
        setTimeout(() => {
          setuserUpdate(null);
        }, 2000);
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du password');
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  //--------------------------- Requête Axios Update pour mise à jour du Téléphone  User ---------------------------------------//

  const handleClickPhone = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(phoneElement.current?.value);

    axiosPrivate
      .patch(`/user/${connectedUser?.id}`, {
        phone: phoneElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log("la réponse d'un patch user pour update phone", response);
        userTampon.phone = response.data.phone;
        setuser(userTampon);
        setuserUpdate(`Mise à jour réussi `);
        setTimeout(() => {
          setuserUpdate(null);
        }, 2000);
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du téléphone');
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const deleteAccount = async () => {
    axiosPrivate
      .delete(`/user/${connectedUser?.id}`)
      .then((response: AxiosResponse<{ data: any }>) => {
        console.log('response ', response.data);
        navigate('/login');
      });
  };

  return (
    <div className='profil-wrapper'>
      {error || userUpdate ? (
        <div className='container-alert  '>
          {error !== null ? (
            <div className='alert alert-danger' role='alert' id='alert-danger'>
              {error}
            </div>
          ) : (
            userUpdate !== null && (
              <div
                className='alert alert-success'
                role='alert'
                id='alert-success'
              >
                {userUpdate}
              </div>
            )
          )}
        </div>
      ) : null}
      <div className='accordion ' id='accordion-profil'>
        <h2>Gérer mes données</h2>
        <div className='accordion-item mt-5 '>
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
              <label htmlFor='nicknameUser'>
                <span className='info-user'> Nouveau Pseudo</span>
              </label>
              <input
                type='text'
                className='form-control'
                id='nicknameUser'
                autoComplete='new-email'
                placeholder='Tapez votre nouveau pseudo'
                ref={nicknameElement}
              />
            </div>
            <button
              onClick={handleClickNickname}
              className='btn btn-warning mb-3 '
            >
              changer
            </button>
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
              <label htmlFor='emailUser'>
                <span className='info-user'>Nouvel E-mail</span>
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
            <button
              onClick={handleClickEmail}
              className='btn btn-warning mb-3 '
            >
              changer
            </button>
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
              <label htmlFor='newPasswordUser'>
                {' '}
                <span className='info-user'> Nouveau mot de passe</span>
              </label>
              <input
                type='password'
                className='form-control'
                id='newPasswordUser'
                name='newPasswordUser'
                placeholder='Tapez votre nouveau mot de passe '
                autoComplete='new-password'
                ref={newPasswordElement}
              />
            </div>
            <button
              onClick={handleClickPassword}
              className='btn btn-warning mb-3 '
            >
              changer
            </button>
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
              <label htmlFor='typePhone'>
                {' '}
                <span className='info-user'> Nouveau numéro de téléphone</span>
              </label>
              <input
                type='text'
                id='typePhone'
                className='form-control form-control-lg'
                placeholder='téléphone'
                autoComplete='new-phone'
                ref={phoneElement}
              />
            </div>
            <button
              onClick={handleClickPhone}
              className='btn btn-warning mb-3 '
            >
              changer
            </button>
          </div>
        </div>
        {/* <!-- Button trigger modal --> */}
        <button
          type='button'
          className='btn btn-danger mt-5'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          <span style={{ color: '#f3f3f3' }}>supprimer mon compte</span>
        </button>

        {/* <!-- Modal --> */}
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Alerte
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                Voulez-vous vraiment supprimer votre compte?
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-success'
                  data-bs-dismiss='modal'
                  style={{ color: 'white' }}
                >
                  <span style={{ color: 'white' }}>Non</span>
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={deleteAccount}
                >
                  <span style={{ color: 'white' }}>Oui je confirme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
