import { useContext } from 'react';
import { Admin } from '../../components/userConnect/admin/Admin';
import { UserHome } from '../../components/userConnect/userHome/UserHome';
import { UserMessage } from '../../components/userConnect/userMessage/UserMessage';
import { UserProfil } from '../../components/userConnect/userProfil/UserProfil';
import { AuthContext } from '../../context/auth-context';
import './Account.css';

export const Account = () => {
  //--------------------------------------AuthContext permets de gérer si token dans localstorage si user est conecté ou pas---//

  const { onAuthChange } = useContext(AuthContext);
  const { savedToken } = useContext(AuthContext);

  return (
    <div className='tabset'>
      {/* <!-- Tab 1 --> */}
      <input
        type='radio'
        name='tabset'
        id='tab1'
        aria-controls='accueil'
        checked
      />
      <label htmlFor='tab1'>Accueil</label>
      {/* <!-- Tab 2 --> */}
      <input type='radio' name='tabset' id='tab2' aria-controls='message' />
      <label htmlFor='tab2'>Messages</label>
      {/* <!-- Tab 3 --> */}
      <input type='radio' name='tabset' id='tab3' aria-controls='profil' />
      <label htmlFor='tab3'>Profil</label>
      {/* <!-- Tab 4 --> */}
      {}
      <input type='radio' name='tabset' id='tab4' aria-controls='admin' />
      <label htmlFor='tab4'>Admin</label>

      <div className='tab-panels'>
        <section id='accueil' className='tab-panel'>
          <h2>Accueil</h2>
          <UserHome />
        </section>
        <section id='message' className='tab-panel'>
          <h2>Messages</h2>
          <UserMessage />
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
  );
};
