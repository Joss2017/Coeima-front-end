import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../../../../api/Axios';
import { AuthContext } from '../../../../context/AuthContext';
import { MessageProps } from '../../../../interface/Interface';
import './Message.css';

export const Message = () => {
  const { connectedUser } = useContext(AuthContext);

  const [listMessages, setListMessages] = useState<MessageProps[] | null>(null);

  useEffect(() => {
    axiosPrivate
      .get('/message')
      .then((response: AxiosResponse) => {
        setListMessages([...response.data]);

        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    console.log(listMessages);
  }, []);
  return <div> hello userMessage component</div>;
};
