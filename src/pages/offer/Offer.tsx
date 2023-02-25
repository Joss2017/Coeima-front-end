import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { axiosPublic } from '../../api/Axios';
import { CardOffer } from '../../components/offer/cardOffer/CardOffer';
import { OfferProps } from '../../interface/Offer';
import './Offer.css';

let tabCardOffers: OfferProps[] = [];

export const Offer = () => {
  const [listCardOffers, setListCardOffers] = useState<OfferProps[]>([]);

  useEffect(() => {
    axiosPublic
      .get('/offer')
      .then((response: AxiosResponse) => {
        tabCardOffers = response.data;
        setListCardOffers(tabCardOffers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(listCardOffers);

  return (
    <div className='container'>
      <h5>Mes prestations :</h5>
      {listCardOffers.map((offer) => (
        <ul key={offer.id}>
          <CardOffer cardOffer={offer} />
        </ul>
      ))}
    </div>
  );
};
