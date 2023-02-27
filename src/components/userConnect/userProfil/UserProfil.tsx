import { AxiosResponse } from 'axios';
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { axiosPrivate } from '../../../api/Axios';
import { AuthContext } from '../../../context/AuthContext';
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
  const [user, setuser] = useState<UserTypeProps>(userTampon);

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
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du pseudo');
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
      })
      .catch((error) => console.log(error));
    setError("erreur dans la mise à jour de l'email");
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
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du password');
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
      })
      .catch((error) => console.log(error));
    setError('erreur dans la mise à jour du téléphone');
  };

  const deleteAccount = async () => {
    axiosPrivate
      .delete(`/user/${connectedUser?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response: AxiosResponse<{ data: any }>) => {
        console.log('response ', response.data);
        alert('Votre compte a été supprimé!');
        navigate('/login');
      });
  };

  useEffect(() => {
    // Création d'un interval qui va appeler la fonction toutes les 2 secondes
    const intervalId = setInterval(() => {
      // On met à jour le state userUpdate en le remettant à null
      setuserUpdate(null);
      setError(null);
    }, 2000);

    // Nettoyage du setInterval lorsque le composant est démonté ou que le state change
    // pour éviter des problèmes de fuites de mémoire
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        {userUpdate !== null && (
          <div className='alert alert-success' role='alert'>
            {userUpdate}
          </div>
        )}
        {error !== null && (
          <div className='alert alert-warning' role='alert'>
            {error}
          </div>
        )}
      </div>
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
              <label htmlFor='nicknameUser'> Nouveau Pseudo</label>
              <input
                type='text'
                className='form-control'
                id='nicknameUser'
                autoComplete='new-email'
                placeholder='Tapez votre nouveau pseudo'
                ref={nicknameElement}
              />
            </div>
            <button onClick={handleClickNickname} className='btn btn-warning '>
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
              <label htmlFor='emailUser'> Nouvel E-mail</label>
              <input
                type='email'
                className='form-control'
                id='emailUser'
                autoComplete='new-email'
                placeholder='name@example.com'
                ref={emailElement}
              />
            </div>
            <button onClick={handleClickEmail} className='btn btn-warning '>
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
              <label htmlFor='newPasswordUser'>Password</label>
              <input
                type='password'
                className='form-control'
                id='newPasswordUser'
                name='newPasswordUser'
                placeholder='Tapez votre nouveau mot de passe '
                ref={newPasswordElement}
              />
            </div>
            <button onClick={handleClickPassword} className='btn btn-warning '>
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
              <label htmlFor='typePhone'>Téléphone</label>
              <input
                type='text'
                id='typePhone'
                className='form-control form-control-lg'
                placeholder='téléphone'
                autoComplete='new-phone'
                ref={phoneElement}
              />
            </div>
            <button onClick={handleClickPhone} className='btn btn-warning '>
              changer
            </button>
          </div>
        </div>
        {/* <!-- Button trigger modal --> */}
        <button
          type='button'
          className='btn btn-warning'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          supprimer mon compte
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
                >
                  Non
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={deleteAccount}
                >
                  Oui je confirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
