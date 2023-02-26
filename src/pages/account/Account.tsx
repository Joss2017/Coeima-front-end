import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/Axios';
import { Admin } from '../../components/userConnect/admin/Admin';
import { UserHome } from '../../components/userConnect/userHome/UserHome';
import { CardCreateMessage } from '../../components/userConnect/userMessage/cardCreateMessage/CardCreateMessage';
import { CardMessage } from '../../components/userConnect/userMessage/cardMessage/CardMessage';
import { UserProfil } from '../../components/userConnect/userProfil/UserProfil';
import { AuthContext } from '../../context/AuthContext';
import { MessageProps } from '../../interface/Message';
import './Account.css';

let tabCardMessages: MessageProps[] = [];

export const Account = () => {
  //---------------------------------------Contexte User Connecté-----------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //---------------------------------------Section Message---------------------------------------------------//

  const [listCardMessages, setlistCardMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    if (connectedUser?.role === 'admin') {
      axiosPrivate
        .get(`/message`)
        .then((response: AxiosResponse) => {
          tabCardMessages = response.data;
          console.log(
            'repnse de axios pour liste de messages admin',
            tabCardMessages
          );
          console.log(tabCardMessages);
          setlistCardMessages(tabCardMessages);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosPrivate
        .get(`/message`, {
          params: { receiver_id: connectedUser?.id },
        })
        .then((response: AxiosResponse) => {
          tabCardMessages = response.data;
          console.log(
            'repnse de axios pour liste de messages admin',
            tabCardMessages
          );
          console.log(tabCardMessages);
          setlistCardMessages(tabCardMessages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  console.log(
    'Valeur de la réponse axios de la liste des messages',
    listCardMessages
  );

  return (
    <>
      <div className='tabset'>
        {/* <!-- Tab 1 --> */}
        <input type='radio' name='tabset' id='tab1' aria-controls='accueil' />
        <label htmlFor='tab1'>Accueil</label>
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
          <section id='accueil' className='tab-panel'>
            <h2>Accueil</h2>
            <UserHome />
          </section>
          <section id='message' className='tab-panel'>
            <h2>Messages</h2>
            <div>
              <CardCreateMessage />
            </div>

            {listCardMessages.map((message) => (
              <CardMessage key={message.id} message={message} />
            ))}
          </section>
          <section id='profil' className='tab-panel'>
            <h2>Profil</h2>
            <UserProfil />
          </section>
          <section id='admin' className='tab-panel'>
            <h2>Paramètres</h2>
            <Admin />
          </section>
        </div>
      </div>
    </>
  );
};
