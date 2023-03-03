import { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { axiosPrivate } from '../../../api/Axios';
import './CardComment.css';

export const CardComment = () => {
  const nicknameElement = useRef<HTMLInputElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);
  const urlElement = useRef<HTMLInputElement>(null);

  //------------------------ Utilisation de useState pour gérer les messages créés et la sélection de l'utilisateur co---//

  const [commentCreated, setcommentCreated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlesubmitcomment = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bodyElement.current?.value);

    //--------------------------------------Si l'utilisateur est admin, il peut envoyer un message à un utilisateur spécifique----------------//
    axiosPrivate
      .post(`/comment/`, {
        title: nicknameElement.current?.value,
        body: bodyElement.current?.value,
        url: urlElement.current?.value,
      })
      .then((response: AxiosResponse) => {
        console.log("la réponse d'un post message", response);
        setcommentCreated('commentaire envoyé !');
        // setListMessages([response.data, ...listMessages]);
        // setTimeout(() => {
        //   setmessageCreated(null);
        // }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };
  return (
    <div>
      <form onSubmit={handlesubmitcomment}></form>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1' className='form-label'>
          pseudo
        </label>
        <input
          type='text'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='pseudo'
          ref={nicknameElement}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          commentaire
        </label>
        <textarea
          className='form-control row-3'
          id='exampleFormControlTextarea1'
          ref={bodyElement}
        ></textarea>
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1' className='form-label'>
          pseudo
        </label>
        <input
          type='text'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='pseudo'
          ref={urlElement}
        />
      </div>
    </div>
  );
};
