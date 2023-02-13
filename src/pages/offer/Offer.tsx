import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardOffer } from '../../components/cardOffer/CardOffer';
import './Offer.css';

export interface OfferProps {
  id: string;
  picture: string;
  title: string;
  body: string;
  price: string;
}

let tabCardOffers: OfferProps[] = [];

export const Offer = () => {
  const [listCardOffers, setListCardOffers] = useState<OfferProps[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/offer')
      .then((response) => {
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
