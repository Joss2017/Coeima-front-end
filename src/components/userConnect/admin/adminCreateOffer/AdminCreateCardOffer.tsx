//-------------------------- On importe les modules nécessaires depuis d'autres fichiers--------//

import { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useAxios } from '../../../../hooks/Use-Axios';
import './AdminCreateOffer.css';

export const AdminCreateOffer = () => {
  //------------------------ On utilise useRef pour créer des références aux éléments HTML dans le formulaire--------//
  const pictureElement = useRef<HTMLInputElement>(null);
  const titleElement = useRef<HTMLInputElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);
  const priceElement = useRef<HTMLInputElement>(null);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//
  const { axiosPrivate } = useAxios();

  //-------------------------On utilise useState pour gérer l'état du formulaire-----------------------------------//
  const [createdOffer, setCreatedOffer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pictures, setPictures] = useState<File>();

  //--------------------------- Cette fonction est appelée lorsqu'un fichier est téléchargé pour l'offre--------------//
  const pictureUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files?.[0];
    if (!files) {
      return;
    }
    setPictures(files);
  };

  //---------------Cette fonction est appelée lorsqu'un utilisateur soumet le formulaire de création d'offre-----------//
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(pictureElement.current?.value);
    console.log(titleElement.current?.value);
    console.log(bodyElement.current?.value);
    console.log(priceElement.current?.value);

    const title = titleElement.current?.value;
    const body = bodyElement.current?.value;
    const price = priceElement.current?.value;

    //----------------------- On crée un objet FormData pour envoyer les données du formulaire au serveur----------------//
    const formData = new FormData();

    formData.append('picture', pictures || '');
    formData.append('title', title !== undefined ? title : '');
    formData.append('body', body !== undefined ? body : '');
    formData.append('price', price !== undefined ? price : '');

    //---------------------On envoie la requête POST au serveur pour créer une nouvelle offre---------------------------//
    axiosPrivate({
      method: 'post',
      url: '/offer',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response: AxiosResponse) => {
        console.log('réponse de axios', response);
        //------------------------On met à jour l'état pour indiquer que l'offre a été créée avec succès--------------------//
        setCreatedOffer('>Nouvelle offre crée !');
        //------------ On réinitialise l'état après 2 secondes pour effacer le message de confirmation----------------------//
        setTimeout(() => {
          setCreatedOffer(null);
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
      {error || createdOffer ? (
        <div className='container-alert  '>
          {error !== null ? (
            <div className='alert alert-danger' role='alert' id='alert-danger'>
              {error}
            </div>
          ) : (
            createdOffer !== null && (
              <div
                className='alert alert-success'
                role='alert'
                id='alert-success'
              >
                {createdOffer}
              </div>
            )
          )}
        </div>
      ) : null}
      <div className='container-card-offer'>
        <div className='card' id='card-offer'>
          <form onSubmit={handleSubmitForm} className='form-offer'>
            <div className='card-title'>
              <span
                className='span-message'
                style={{ color: '#2a5360', fontWeight: 'bold' }}
              >
                Nouvelle offre
              </span>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  placeholder="Titre de l'offre"
                  autoComplete='new nickname'
                  ref={titleElement}
                />
              </h5>
              <p className='card-text'>
                <textarea
                  className='form-control'
                  rows={5}
                  id='body'
                  placeholder="descriptif de l'offre"
                  ref={bodyElement}
                ></textarea>
              </p>
              <p>
                <input
                  type='text'
                  className='form-control'
                  id='price'
                  placeholder="prix de l'offre"
                  autoComplete='price'
                  ref={priceElement}
                />
              </p>
              <div className='form-outline mt-3' id='input-offer'>
                <input
                  type='file'
                  className='form-control'
                  accept='image/*'
                  id='image'
                  onChange={pictureUploader}
                />
              </div>
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
