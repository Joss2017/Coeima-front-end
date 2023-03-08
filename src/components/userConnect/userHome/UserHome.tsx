//-------------------------- On importe les modules nécessaires depuis d'autres fichiers--------//

import { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useAxios } from '../../../hooks/Use-Axios';
import './UserHome.css';

export const UserHome = () => {
  //------------------------ On utilise useRef pour créer des références aux éléments HTML dans le formulaire--------//

  const titleElement = useRef<HTMLInputElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);
  const urlElement = useRef<HTMLInputElement>(null);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//
  const { axiosPrivate } = useAxios();

  //-------------------------On utilise useState pour gérer l'état du formulaire-----------------------------------//
  const [createdTopic, setCreatedTopic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //---------------Cette fonction est appelée lorsqu'un utilisateur soumet le formulaire de création d'offre-----------//
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(titleElement.current?.value);
    console.log(bodyElement.current?.value);
    console.log(urlElement.current?.value);

    const title = titleElement.current?.value;
    const body = bodyElement.current?.value;
    const url = urlElement.current?.value;

    //---------------------On envoie la requête POST au serveur pour créer une nouvelle offre---------------------------//
    axiosPrivate
      .post('/topic', {
        title: title,
        body: body,
        url: url,
      })
      .then((response: AxiosResponse) => {
        console.log('réponse de axios', response);
        //------------------------On met à jour l'état pour indiquer que l'offre a été créée avec succès--------------------//
        setCreatedTopic('>Nouvelle offre crée !');
        //------------ On réinitialise l'état après 2 secondes pour effacer le message de confirmation----------------------//
        setTimeout(() => {
          setCreatedTopic(null);
        }, 2000);
      })

      .catch(() => {
        // --------On met à jour l'état pour indiquer qu'il y a eu une erreur lors de la création de l'offre----------------//
        setError('error dans la création');
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  return (
    <>
      <div className='container-alert  '>
        {error !== null ? (
          <div className='alert alert-danger' role='alert' id='alert-danger'>
            {error}
          </div>
        ) : createdTopic !== null ? (
          <div className='alert alert-success' role='alert' id='alert-success'>
            {createdTopic}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className='container-card-topic'>
        <div className='card' id='card-topic'>
          <form onSubmit={handleSubmitForm} className='form-offer'>
            <div className='card-title'>
              <span
                className='span-message'
                style={{ color: '#2a5360', fontWeight: 'bold' }}
              >
                Nouveau sujet
              </span>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>
                <input
                  type='text'
                  className='form-control'
                  id='title-topic'
                  placeholder='Titre du sujet'
                  autoComplete='title'
                  ref={titleElement}
                />
              </h5>
              <p className='card-text'>
                <textarea
                  className='form-control'
                  rows={5}
                  id='body-topic'
                  placeholder='descriptif du sujet'
                  ref={bodyElement}
                ></textarea>
              </p>
              <p>
                <input
                  type='text'
                  className='form-control'
                  id='url-topic'
                  placeholder='lien'
                  autoComplete='lien'
                  ref={urlElement}
                />
              </p>

              <div className='card-footer' style={{ display: 'grid' }}>
                <button type='submit' className='btn btn-warning btn-block '>
                  créer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
