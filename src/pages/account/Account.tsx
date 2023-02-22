import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/Axios';
import { SearchBar } from '../../components/SearchBar';
import { Admin } from '../../components/userConnect/admin/Admin';
import { UserHome } from '../../components/userConnect/userHome/UserHome';
import { CardMessage } from '../../components/userConnect/userMessage/cardMessage/CardMessage';
import { UserProfil } from '../../components/userConnect/userProfil/UserProfil';
import { AuthContext } from '../../context/AuthContext';
import { MessageProps } from '../../interface/Interface';
import './Account.css';

let tabCardMessages: MessageProps[] = [];
let dataMess: MessageProps[] = [];

export const Account = () => {
  //---------------------------------------Contexte-----------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //---------------------------------------Section Message---------------------------------------------------//

  const [listCardMessages, setlistCardMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    axiosPrivate
      .get('/message')
      .then((response: AxiosResponse) => {
        tabCardMessages = response.data;
        setlistCardMessages(tabCardMessages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUserInput = (userInputText: string) => {
    console.log("qu'a tapé mon user ? : ", userInputText);
    let MessTemporaire = [...listCardMessages];
    if (userInputText.length > 0) {
      MessTemporaire = MessTemporaire.filter((e) =>
        e.date_creation.includes(userInputText)
      );
      setlistCardMessages(MessTemporaire);
      console.log('ma nouvelle listeState après search : ', listCardMessages);
      console.log('ma nouvelle liste après search : ', MessTemporaire);
    } else {
      setlistCardMessages(dataMess);
    }
  };

  //---------------------------------------Section Message---------------------------------------------------//

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
            <h2>Messages reçus</h2>
            <SearchBar onSearch={handleUserInput} />
            {listCardMessages.map((message) => (
              <CardMessage key={message.id} cardMessage={message} />
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
