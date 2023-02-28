import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/Axios';
import { AuthContext } from '../../../context/AuthContext';
import { MessageProps } from '../../../interface/Message';
import './UserHome.css';
export const UserHome = () => {
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  const [listPhotos, setListPhotos] = useState<MessageProps[]>([]);

  useEffect(() => {
    axiosPrivate
      .get(`/user`)
      .then((response: AxiosResponse) => {
        setListPhotos(response.data);
        console.log('repnse de axios pour liste de messages admin', listPhotos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='home-wrapper'>
      <h2>Accueil</h2>
      Hello faudra remplir tout sa =)
      {/* {listPhotos.map((file)=>} */}
    </div>
  );
};
