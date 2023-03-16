import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { CardMessageProps } from '../../../../interface/Message';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './CardMessage.css';
import { AxiosResponse } from 'axios';
import { useAxios } from '../../../../hooks/Use-Axios';

export const CardMessage = ({
  message,
  setListMessages,
  listMessages,
}: CardMessageProps) => {
  //--------------------------------------Context User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //--------------------------------------useState permets de gérer message crée +chois du user est conecté ou pas------------//

  const [isRead, setIsRead] = useState<boolean>(message.isRead);
  const [isDelete, setisDelete] = useState<string | null>(null);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//

  const { axiosPrivate } = useAxios();

  const handleChange = () => {
    axiosPrivate
      .get(`/message/${message?.id}`)
      .then((response: AxiosResponse) => {
        console.log('valeur de les response pour un message lu', response.data);
      });
  };

  const handleClickRead = () => {
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

  const handleClickDelete = () => {
    axiosPrivate
      .delete(`/message/${message.id}`)
      .then((response: AxiosResponse<string>) => {
        console.log("la réponse d'un delete message", response);
        setisDelete(response.data);
        let newListMessages = [...listMessages].filter(
          (messageFromList) => message.id !== messageFromList.id
        );
        setListMessages(newListMessages);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isDelete && (
        <div className='container-alert  '>
          {isDelete !== null && (
            <div className='alert alert-success' role='alert' id='alert-danger'>
              {isDelete}
            </div>
          )}
        </div>
      )}
      {connectedUser?.role === 'admin' ? (
        <div className='row'>
          <div className='col-3'>{message.sender.nickname}</div>
          <div className='col-3'>
            {new Date(message.date_creation).toLocaleDateString()}
          </div>
          <div className='col-2'>
            {isRead === false ? (
              <span className='span'>New</span>
            ) : (
              <span>lu</span>
            )}
          </div>
          <div className='col-4' id='container-button'>
            <button
              type='button'
              className='btn btn-warning'
              id='button-message'
              data-bs-toggle='modal'
              data-bs-target={`#${message.id}`}
              onClick={handleClickRead}
            >
              <VisibilityIcon />
            </button>

            <button
              type='button'
              className='btn btn-danger'
              id='button-message'
              onClick={handleClickDelete}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          className='row'
          style={{ alignItems: 'center', height: '10vh', paddingBottom: '3vh' }}
        >
          <div className='col-4'>
            {new Date(message.date_creation).toLocaleDateString()}
          </div>
          <div className='col-4'>
            {isRead === false ? (
              <span className='span'>New</span>
            ) : (
              <span>lu</span>
            )}
          </div>
          <div className='col-2'>
            <button
              type='button'
              className='btn btn-warning'
              id='button-message'
              data-bs-toggle='modal'
              data-bs-target={`#${message.id}`}
              onClick={handleClickRead}
            >
              <VisibilityIcon />
            </button>
          </div>
          <div className='col-2'>
            <button
              type='button'
              className='btn btn-danger'
              id='button-message'
              onClick={handleClickDelete}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>
      )}

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
    </>
  );
};
