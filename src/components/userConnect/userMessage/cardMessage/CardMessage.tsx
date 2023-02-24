import { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { axiosPrivate } from '../../../../api/Axios';
import { AuthContext } from '../../../../context/AuthContext';
import { CardMessageProps } from '../../../../interface/Interface';
import './CardMessage.css';

export const CardMessage = ({ message }: CardMessageProps) => {
  //--------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //--------------------------------------useState permets de gérer message crée +chois du user est conecté ou pas------------//

  const [isRead, setIsRead] = useState<boolean>(message.isRead);

  //--------------------------------------Permets  de Gérer si le messagest est lu ou non------------------------------------//

  const handleClickRead = (e: React.FormEvent) => {
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

  const handleClickDelete = (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .delete(`/message/${message.id}`)
      .then((response: AxiosResponse) => {
        console.log("la réponse d'un delete message", response);
      })
      .catch((error) => console.log(error));
  };
  //  {connectedUser?.role==='admin'?}
  return (
    <div>
      <div className='container-alert mt-5 '>
        {/*--------------- Condtion affichage  message  non lu/lu ------------------------------------------------- */}

        {isRead === false ? (
          <div className='alert alert-dark'>Nouveau message</div>
        ) : (
          <>
            <p></p>
          </>
        )}
      </div>
      {/*--------------- Condtion affichage role  admin ------------------------------------------------------------ */}

      {connectedUser?.role === 'admin' ? (
        <table className='table'>
          <tbody>
            <tr
              className={isRead === false ? 'table-warning' : 'table-success'}
            >
              <th scope='row'>{message.date_creation}</th>
              <td>{message.url}</td>
              <td className='button-messages '>
                {isRead === false ? (
                  <button
                    type='button'
                    className='btn btn-warning'
                    data-bs-toggle='modal'
                    data-bs-target={`#${message.id}`}
                    onClick={handleClickRead}
                  >
                    Voir le message
                  </button>
                ) : (
                  <p>{message.body}</p>
                )}

                <div
                  className='modal fade'
                  id={message.id}
                  tabIndex={-1}
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='titleModalLabel'>
                          Contenu du message
                        </h1>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div className='modal-body'>{message.body}</div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-dismiss='modal'
                        >
                          Close
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={handleClickDelete}
                        >
                          supprimer le message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        // ---------------------------------------------------------Sinon affichage role  user---------------------------------------//

        <table className='table'>
          <tbody>
            <tr
              className={isRead === false ? 'table-warning' : 'table-success'}
            >
              <th scope='row'>{message.date_creation}</th>
              <td>{message.url}</td>
              <td className='button-messages '>
                <button
                  type='button'
                  className='btn btn-warning'
                  data-bs-toggle='modal'
                  data-bs-target={`#${message.id}`}
                  onClick={handleClickRead}
                >
                  Voir le message
                </button>

                <div
                  className='modal fade'
                  id={message.id}
                  tabIndex={-1}
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='titleModalLabel'>
                          Contenu du message
                        </h1>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div className='modal-body'>{message.body}</div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-dismiss='modal'
                        >
                          Close
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={handleClickDelete}
                        >
                          supprimer le message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
