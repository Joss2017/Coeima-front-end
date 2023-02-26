import { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { axiosPrivate } from '../../../../api/Axios';
import { AuthContext } from '../../../../context/AuthContext';
import { CardMessageProps } from '../../../../interface/Message';
import './CardMessage.css';

export const CardMessage = ({ message }: CardMessageProps) => {
  //--------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //--------------------------------------useState permets de gérer message crée +chois du user est conecté ou pas------------//

  const [isRead, setIsRead] = useState<boolean>(message.isRead);
  const [isDelete, setisDelete] = useState<string>('');

  //--------------------------------------Permets  de Gérer si le messagest est lu ou non------------------------------------//
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();

    axiosPrivate
      .get(`/message/${message?.id}`)
      .then((response: AxiosResponse) => {
        console.log('valeur de les response pour un message lu', response.data);
      });
  };

  const handleClickRead = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .patch(`/message/${message.id}`, {
        isRead: true,
      })
      .then((response: AxiosResponse) => {
        console.log(
          "la réponse d'un patch message pour un message lu",
          response
        );
        setIsRead(true);
      })
      .catch((error) => console.log(error));
  };

  //--------------------------------------Permets  de supprimer le message au click----------------------------------------//

  const handleClickDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .delete(`/message/${message.id}`)
      .then((response: AxiosResponse) => {
        console.log("la réponse d'un delete message", response);
        setisDelete(response.data);
        // window.location = document.location;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className='container-alert mt-5 '>
        {isRead === false && (
          <div className='alert alert-warning'>Nouveau message</div>
        )}
      </div>
      <div>
        {isDelete && <div className='alert alert-success'>{isDelete}</div>}
      </div>
      {connectedUser?.role === 'admin' ? (
        <table className='table'>
          <thead>
            <tr
              className={isRead === false ? 'table-warning' : 'table-success'}
            >
              <th scope='col'>Envoyé par</th>
              <th scope='col'>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{message.sender.nickname}</td>
              <td>{message.date_creation}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className='table'>
          <thead>
            <tr
              className={isRead === false ? 'table-warning' : 'table-success'}
            >
              <th scope='col'>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{message.date_creation}</td>
            </tr>
          </tbody>
        </table>
      )}
      <button
        type='button'
        className='btn btn-warning'
        data-bs-toggle='modal'
        data-bs-target={`#${message.id}`}
        onClick={handleClickRead}
      >
        Voir le message
      </button>
      <button
        type='button'
        className='btn btn-danger'
        onClick={handleClickDelete}
      >
        supprimer le message
      </button>
      <div
        className='modal fade'
        id={`${message.id}`}
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Contenu du message
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body' onChange={handleChange}>
              {message.body}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
