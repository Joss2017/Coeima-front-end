import { AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useAxios } from '../../../../hooks/Use-Axios';
import { CardCreateMessageProps } from '../../../../interface/Message';
import { UserTypeProps } from '../../../../interface/User';
import './CardCreateMessage.css';

export const CardCreateMessage = ({
  setListMessages,
  listMessages,
}: CardCreateMessageProps) => {
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const userSelectElement = useRef<HTMLSelectElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);

  //------------------------ Utilisation de useState pour gérer les messages créés et la sélection de l'utilisateur co---//

  const [messageCreated, setmessageCreated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserTypeProps[]>([]);

  //--------------------------------------Permets  de Recuperer tout les Users dans l'input select---------------------------//

  useEffect(() => {
    if (connectedUser?.role === 'admin') {
      axiosPrivate.get('/user').then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedUser?.role]);

  //--------------------------------------Permets  de selectionner la valeur du select---------------------------------------//

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(
      'handleselect : user sélectionnée : ',
      userSelectElement.current?.value
    );
  };
  //--------------------------------------Filtre pour sélectionner l'utilisateur dans le select-----------------------------//

  const userSelectFiltered: UserTypeProps[] = users.filter(
    (userSelect) => userSelect.id === userSelectElement.current?.value
  );
  console.log(
    'user selectionnée dans le filtre du dropdown : ',
    userSelectFiltered
  );

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//

  const { axiosPrivate } = useAxios();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bodyElement.current?.value);

    if (connectedUser?.role === 'admin') {
      //--------------------------------------Si l'utilisateur est admin, il peut envoyer un message à un utilisateur spécifique----------------//
      axiosPrivate
        .post(`/message/`, {
          receiver_id: userSelectElement.current?.value,
          body: bodyElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log("la réponse d'un post message", response);
          setmessageCreated('Message envoyé !');
          setListMessages([response.data, ...listMessages]);
          setTimeout(() => {
            setmessageCreated(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setError(error.response.data.message);
          setTimeout(() => {
            setError(null);
          }, 2000);
        });
    } else {
      axiosPrivate
        //--------------------------------------Si l'utilisateur est user, il  envoyer un message à un utilisateur admin----------------//

        .post('/message/', {
          role: connectedUser?.role === 'admin',
          body: bodyElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log("la réponse d'un post message", response);
          setmessageCreated('Message envoyé !');
          setListMessages([response.data, ...listMessages]);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setTimeout(() => {
            setError(null);
          }, 2000);
        });
    }
  };

  return (
    <div className='createMessage-wrapper'>
      <div className='container-alert  '>
        {error !== null ? (
          <div className='alert alert-danger' role='alert' id='alert-danger'>
            {error}
          </div>
        ) : (
          messageCreated !== null && (
            <div
              className='alert alert-success'
              role='alert'
              id='alert-success'
            >
              {messageCreated}
            </div>
          )
        )}
      </div>

      <div className='select'>
        {connectedUser?.role === 'admin' ? (
          <select
            className='form-select'
            id='floatingSelect'
            aria-label='Floating label select example'
            onChange={handleSelect}
            ref={userSelectElement}
          >
            <option value=''>Sélectionner un Utilisateur</option>
            {users.map((user) => {
              return (
                <option id='floatingSelect' value={user.id} key={user.id}>
                  {user.email}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={handleSubmitForm} className='form-login'>
        <div className='form-group'>
          <label htmlFor='message'>
            <span
              className='span-message'
              style={{ color: '#2a5360', fontWeight: 'bold' }}
            >
              Nouveau message
            </span>
          </label>
          <textarea
            className='form-control'
            rows={5}
            id='message'
            ref={bodyElement}
          ></textarea>
        </div>

        <div className='d-flex justify-content-center mt-3'>
          <button type='submit' className='btn btn-warning '>
            <span style={{ color: '#f3f3f3' }}>Envoyer le message</span>
          </button>
        </div>
      </form>
    </div>
  );
};
