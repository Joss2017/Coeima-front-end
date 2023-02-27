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
  }, [connectedUser?.role]);
  //--------------------------------------Permets  de selectionner la valeur du select---------------------------------------//

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  useEffect(() => {
    // On définit une fonction qui sera exécutée à intervalles réguliers
    const intervalId = setInterval(() => {
      // On met à jour l'état "messageCreated" à "null"
      setmessageCreated(null);
      // On supprime le message d'erreur
      setError(null);
    }, 2000);

    // On retourne une fonction qui sera exécutée lorsque le composant sera démonté
    // Cette fonction a pour but d'arrêter l'exécution de la fonction setInterval
    return () => clearInterval(intervalId);
  }, []); // On utilise un tableau vide comme deuxième argument pour s'assurer que la fonction useEffect ne sera exécutée qu'une seule fois au montage du composant.```

  //--------------------------------------Permets  de Gérer si le messagest lu ou non-----------------------------------------//

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bodyElement.current?.value);

    if (bodyElement.current?.value === '') {
      setError('ton message ne peut pas être vide');
    }

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
        {messageCreated !== null ? (
          <div className='alert alert-success' role='alert'>
            {messageCreated}
          </div>
        ) : (
          error !== null && (
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

        <div className='d-flex justify-content-center mt-3'>
          <button type='submit' className='btn btn-warning '>
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  );
};
