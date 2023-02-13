import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardService } from '../../components/cardService/CardService';
import './Offer.css';

export interface CardServiceProps {
  id: string;
  title: string;
  body: string;
  picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */

let listCardServices: CardServiceProps[] = [];

export const Offer = () => {
  const [displayedCardServices, setDisplayedCardServices] = useState<
    CardServiceProps[]
  >([...listCardServices]);

  console.log(listCardServices);

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/offer')
      .then((response) => {
        listCardServices = response.data;
        setDisplayedCardServices(listCardServices);
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(listPlantDisplayed);
  }, []);
  return (
    <div className='card-wrapper'>
      {/* <CardService newCardService={setListCardServices()} /> */}
      <div className='container-fluid custom-main'>
        {displayedCardServices.map((card) => (
          <li className='card-offer' key={card.id}>
            <div className='card' style={{ width: '18rem' }}>
              <img
                className='card-img-top'
                src={card.picture}
                alt={`le titre de cette offre est ${card.title} `}
              />
              <div className='card-body'>
                <h5 className='card-title'>{card.title}</h5>
                <p className='card-text'>{card.body}</p>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>Cras justo odio</li>
              </ul>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};
