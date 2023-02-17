import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/Axios';
import { CardOffer } from '../../components/cardOffer/CardOffer';
import { OfferProps } from '../../interface/Interface';
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
    <div>
      {listCardOffers.map((offer) => (
        <CardOffer key={offer.id} cardOffer={offer} />
      ))}
    </div>
  );
};
