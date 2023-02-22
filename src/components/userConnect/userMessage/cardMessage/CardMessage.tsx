import { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { axiosPrivate } from '../../../../api/Axios';
import { AuthContext } from '../../../../context/AuthContext';
import { CardMessageProps } from '../../../../interface/Interface';
import './CardMessage.css';

export const CardMessage = ({ cardMessage }: CardMessageProps) => {
  const { connectedUser } = useContext(AuthContext);
  const [isRead, setIsRead] = useState<boolean>(cardMessage.isRead);

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();

    axiosPrivate
      .get(`/message/${cardMessage?.id}`)
      .then((response: AxiosResponse) => {
        console.log('valeur de les response pour un message lu', response);
      });
  };

  const handleClickRead = (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .patch(`/message/${cardMessage.id}`, {
        isRead: true,
      })
      .then((response: AxiosResponse) => {
        console.log('valeur de les response pour un message lu', response);
        setIsRead(true);
      });
  };
  const handleClickDelete = (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .delete(`/message/${cardMessage.id}`)
      .then((response: AxiosResponse) => {
        console.log('valeur de les response pour un message lu', response);
      });
  };

  return (
    <div>
      <div className='container-alert mt-5 '>
        {isRead === false ? (
          <div className='alert alert-warning'>Nouveau message</div>
        ) : (
          <></>
        )}
      </div>
      <table className='table'>
        <tbody>
          <tr>
            <th scope='row'>{cardMessage.date_creation}</th>
            <td>{cardMessage.url}</td>
            <td className='button-messages '>
              <button
                type='button'
                className='btn btn-warning'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
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
                id='exampleModal'
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
                      {cardMessage.body}
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
