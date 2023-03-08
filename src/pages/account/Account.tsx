import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Admin } from '../../components/userConnect/admin/Admin';
import { AdminCreateOffer } from '../../components/userConnect/admin/adminCreateOffer/AdminCreateCardOffer';
import { UserHome } from '../../components/userConnect/userHome/UserHome';
import { CardCreateMessage } from '../../components/userConnect/userMessage/cardCreateMessage/CardCreateMessage';
import { CardMessage } from '../../components/userConnect/userMessage/cardMessage/CardMessage';
import { UserProfil } from '../../components/userConnect/userProfil/UserProfil';
import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks/Use-Axios';
import { MessageProps } from '../../interface/Message';
import './Account.css';

export const Account = () => {
  //---------------------------------------Contexte User Connecté-----------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //---------------------------------------Section Message---------------------------------------------------//

  const [listCardMessages, setlistCardMessages] = useState<MessageProps[]>([]);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//

  const { axiosPrivate } = useAxios();

  useEffect(() => {
    if (connectedUser?.role === 'admin') {
      axiosPrivate
        .get(`/message`, {
          params: { receiver: { role: connectedUser?.role === 'admin' } },
        })
        .then((response: AxiosResponse) => {
          setlistCardMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosPrivate
        .get(`/message`, {
          params: { receiver: { id: connectedUser?.id } },
        })
        .then((response: AxiosResponse) => {
          setlistCardMessages(response.data);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [connectedUser?.id]);

  console.log(
    'Valeur de la réponse axios de la liste des messages',
    listCardMessages
  );

  return (
    <div className='tabset-wrapper'>
      <div className='tabset'>
        <input type='radio' name='tabset' id='tab1' aria-controls='forum' />
        <label htmlFor='tab1'>Forum</label>
        {/* <!-- Tab 2 --> */}
        <input
          type='radio'
          name='tabset'
          id='tab2'
          aria-controls='message'
          value='message'
        />
        <label htmlFor='tab2'>Messages</label>
        {/* <!-- Tab 3 --> */}
        <input
          type='radio'
          name='tabset'
          id='tab3'
          aria-controls='profil'
          value='profil'
        />
        <label htmlFor='tab3'>Profil</label>
        {/* <!-- Tab 4 --> */}
        {connectedUser?.role === 'admin' && (
          <>
            <input
              type='radio'
              name='tabset'
              id='tab4'
              aria-controls='admin'
              value='admin'
            />
            <label htmlFor='tab4'>Admin</label>
          </>
        )}

        <div className='tab-panels'>
          <section id='forum' className='tab-panel'>
            <UserHome />
          </section>
          <section id='message' className='tab-panel'>
            <div>
              <CardCreateMessage />
            </div>
            <div>
              {connectedUser?.role === 'admin' ? (
                <div className='grid pe-4' id='list-message'>
                  <div className='row'>
                    <div className='col-3'>Ecrit par</div>
                    <div className='col-3'>Date</div>
                    <div className='col-2'>statut</div>
                    <div className='col-4 '>Actions</div>
                  </div>
                  {listCardMessages.map((message) => (
                    <CardMessage
                      listMessages={listCardMessages}
                      setListMessages={setlistCardMessages}
                      key={message.id}
                      message={message}
                    />
                  ))}
                </div>
              ) : (
                <div className='grid pe-3'>
                  <div
                    className='row'
                    style={{
                      paddingBottom: '2vh',
                    }}
                  >
                    <div className='col-4'>Date</div>
                    <div className='col-4'>statut</div>
                    <div className='col-4'>Actions</div>
                    {listCardMessages.map((message) => (
                      <CardMessage
                        listMessages={listCardMessages}
                        setListMessages={setlistCardMessages}
                        key={message.id}
                        message={message}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
          <section id='profil' className='tab-panel'>
            <UserProfil />
          </section>
          <section id='admin' className='tab-panel'>
            <Admin />
            <AdminCreateOffer />
          </section>
        </div>
      </div>
    </div>
  );
};
