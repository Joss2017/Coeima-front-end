import { AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { axiosPrivate } from '../../../../api/Axios';
import { AuthContext } from '../../../../context/AuthContext';
import { UserTypeProps } from '../../../../interface/User';
import './CardCreateMessage.css';

export const CardCreateMessage = () => {
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const userSelectElement = useRef<HTMLSelectElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);

  //--------------------------------------useState permets de gérer message crée +chois du user est conecté ou pas------------//

  const [messageCreated, setmessageCreated] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [users, setUsers] = useState<UserTypeProps[]>([]);

  //--------------------------------------Permets  de Recuperer tout les Users dans l'input select---------------------------//

  useEffect(() => {
    if (connectedUser?.role === 'admin') {
      axiosPrivate.get('/user').then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    }
  }, []);
  //--------------------------------------Permets  de selectionner la valeur du select---------------------------------------//

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(
      'handleselect : user sélectionnée : ',
      userSelectElement.current?.value
    );
  };

  const userSelectFiltered: UserTypeProps[] = users.filter(
    (userSelect) => userSelect.id === userSelectElement.current?.value
  );
  console.log(
    'user selectionnée dans le filtre du dropdown : ',
    userSelectFiltered
  );

  //--------------------------------------Permets  de Gérer si le messagest lu ou non-----------------------------------------//

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bodyElement.current?.value);
    let tabUsers = [...users];

    console.log('valeur de user admin', tabUsers);

    if (connectedUser?.role === 'admin') {
      axiosPrivate
        .post(`/message/`, {
          receiver_id: userSelectElement.current?.value,
          body: bodyElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log("la réponse d'un post message", response);
          setmessageCreated('Message envoyé !');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosPrivate
        .post('/message/', {
          role: connectedUser?.role === 'admin',
          body: bodyElement.current?.value,
        })
        .then((response: AxiosResponse) => {
          console.log("la réponse d'un post message", response);
          setmessageCreated('Message envoyé !');
        })
        .catch((error) => {
          setError('Message non transmis !');
          console.log(error);
        });
    }
  };
  return (
    <div className='createMessage-wrapper'>
      <div className='container-alert mt-5 '>
        {messageCreated ? (
          <div className='alert alert-success' role='alert'>
            {messageCreated}
          </div>
        ) : (
          error && (
            <div className='alert alert-warning' role='alert'>
              {error}
            </div>
          )
        )}
      </div>
      <div>
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
          <label htmlFor='comment'>Nouveau message</label>
          <textarea
            className='form-control'
            rows={5}
            id='comment'
            ref={bodyElement}
          ></textarea>
        </div>
        <div className='form-outline mt-3' id='input-login'>
          <input
            type='file'
            className='form-control'
            accept='image/*'
            id='image'
          />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type='submit' className='btn btn-warning '>
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  );
};