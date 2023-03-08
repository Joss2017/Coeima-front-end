import { AxiosResponse } from 'axios';
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { OfferProps } from '../../interface/Offer';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import './Offer.css';
import { useAxios } from '../../hooks/Use-Axios';
import { axiosPublic } from '../../api/Axios';

export const Offer = () => {
  //--------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { connectedUser } = useContext(AuthContext);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//

  const { axiosPrivate } = useAxios();

  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const titleElement = useRef<HTMLInputElement>(null);
  const bodyElement = useRef<HTMLTextAreaElement>(null);
  const priceElement = useRef<HTMLInputElement>(null);

  //---------------------------------------Initialisation de valeurs pour stocker les données des offres---------------------//

  const [listCardOffers, setListCardOffers] = useState<OfferProps[]>([]);
  const [deletedOffer, setDeletedOffer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pictures, setPictures] = useState<File>();

  useEffect(() => {
    axiosPublic
      .get('/offer')
      .then((response: AxiosResponse) => {
        setListCardOffers(response.data);
        console.log('Page Offer - fetch offers : ', response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  //--------------------------- Cette fonction est appelée lorsqu'un fichier est téléchargé pour l'offre--------------//
  const pictureUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files?.[0];
    if (!files) {
      return;
    }
    setPictures(files);
  };
  //---------------Cette fonction est appelée lorsqu'un utilisateur soumet le formulaire de l'update d'offre-----------//

  const handleSubmitpatchForm = async (
    e: React.FormEvent<HTMLFormElement>,
    cardUpdateId: string
  ) => {
    e.preventDefault();

    console.log(titleElement.current?.value);
    console.log(bodyElement.current?.value);
    console.log(priceElement.current?.value);

    const title = titleElement.current?.value;
    console.log('Valeur de title', title);
    const body = bodyElement.current?.value;
    const price = priceElement.current?.value;

    //----------------------- On crée un objet FormData pour envoyer les données du formulaire au serveur----------------//
    const formData = new FormData();

    formData.append('picture', pictures || '');
    formData.append('title', title !== undefined ? title : '');
    formData.append('body', body !== undefined ? body : '');
    formData.append('price', price !== undefined ? price : '');
    console.log('Valeur de formdata entries', formData.entries());

    //---------------------On envoie la requête POST au serveur pour créer une nouvelle offre---------------------------//

    axiosPrivate({
      method: 'patch',
      url: `/offer/${cardUpdateId}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response: AxiosResponse<OfferProps>) => {
        console.log('réponse de axios', response);
        // je veux dabord virer l'ancienne cardoffer qui a l'id du truc que j'ai modifié de mon state (filter)
        // je veux ensuite rajouter la reponse.data dans ce nouveau tableau
        // je mets à jour mon state avec ce nouveau tableau
        let newListCardOffers = [...listCardOffers].filter(
          (offer) => offer.id !== cardUpdateId
        );
        newListCardOffers = [response.data, ...newListCardOffers];
        setListCardOffers([...newListCardOffers]);
      })

      .catch(() => {
        // --------On met à jour l'état pour indiquer qu'il y a eu une erreur lors de l'update de l'offre----------------//
        setError('error dans la création');
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  const deleteAccount = async (cardOfferIdToDelete: string) => {
    console.log('delete ooffer - id : ', cardOfferIdToDelete);
    axiosPrivate
      .delete(`/offer/${cardOfferIdToDelete}`)
      .then((response: AxiosResponse<string>) => {
        console.log(
          'Page Offer - delete cardoffer - response : ',
          response.data
        );
        // je veux récuperer toutes les offres en enlevant celle supprimée
        const newListCardOffers = [...listCardOffers].filter(
          (offer) => offer.id !== cardOfferIdToDelete
        );
        setListCardOffers(newListCardOffers);
        setDeletedOffer('Offre supprimée !');
        setTimeout(() => {
          setDeletedOffer(null);
        }, 2000);
      })
      .catch((error) => {
        setError('offre non supprimée');
        setTimeout(() => {
          setDeletedOffer(null);
        }, 2000);
      });
  };

  return (
    <div className='offer-wrapper'>
      {error || deletedOffer ? (
        <div className='container-alert  '>
          {error !== null ? (
            <div className='alert alert-danger' role='alert' id='alert-danger'>
              {error}
            </div>
          ) : (
            deletedOffer !== null && (
              <div
                className='alert alert-success'
                role='alert'
                id='alert-success'
              >
                {deletedOffer}
              </div>
            )
          )}
        </div>
      ) : null}
      {listCardOffers.map((cardOffer) => (
        <div className='container' key={cardOffer.id}>
          <div className='card'>
            {/* Si l'utilisateur connecté est un admin, afficher les boutons de modification et suppression */}
            {connectedUser?.role === 'admin' && (
              <>
                <div className='card-header'>
                  <button
                    type='button'
                    className='btn btn-warning '
                    data-bs-toggle='modal'
                    data-bs-target={`#${cardOffer.id}`}
                  >
                    <AutoFixHighIcon style={{ color: 'white' }} />
                  </button>

                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => deleteAccount(cardOffer.id)}
                  >
                    <DeleteIcon style={{ color: 'white' }} />
                  </button>
                </div>
                <div
                  className='modal fade'
                  id={`${cardOffer.id}`}
                  tabIndex={-1}
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <form
                    onSubmit={(e) => handleSubmitpatchForm(e, cardOffer.id)}
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id={`${cardOffer.id}`}
                          >
                            Modification de l'offre
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <label htmlFor='title'>Nouveau Titre</label>
                              <input
                                type='text'
                                className='form-control'
                                id='title'
                                placeholder={cardOffer.title}
                                ref={titleElement}
                              />
                            </h5>
                            <div className='card-text'>
                              <label htmlFor='body'>Nouveau Descriptif</label>
                              <textarea
                                className='form-control'
                                rows={5}
                                id='body'
                                placeholder={cardOffer.body}
                                ref={bodyElement}
                              ></textarea>
                            </div>
                            <div>
                              <label htmlFor='price'>Nouveau Tarif</label>

                              <input
                                type='text'
                                className='form-control'
                                id='price'
                                placeholder={cardOffer.price}
                                autoComplete='price'
                                ref={priceElement}
                              />
                            </div>
                            <div className='form-outline mt-3' id='input-offer'>
                              <input
                                type='file'
                                className='form-control'
                                accept='image/*'
                                id='image'
                                onChange={pictureUploader}
                              />
                            </div>
                            <div className='d-flex justify-content-center pt-3'>
                              <button
                                type='submit'
                                className='btn btn-warning btn-block '
                              >
                                modifier
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}

            <img
              src={`http://localhost:8087/api/offer/${cardOffer.picture}`}
              className='card-img-top'
              alt={cardOffer.title}
              style={{ padding: '3vh', borderRadius: '3vh' }}
            />
            <div className='card-body'>
              <h5
                className='card-title'
                style={{ fontSize: '3vh', color: '#a28b57' }}
              >
                {cardOffer.title}
              </h5>
              <p
                className='card-text'
                style={{ fontSize: '2vh', color: '#2a5360' }}
              >
                {cardOffer.body}
              </p>
              <div
                className='card-footer'
                style={{
                  fontSize: '2vh',
                  color: '#2a5360',
                  fontWeight: 'bold',
                }}
              >
                {cardOffer.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
