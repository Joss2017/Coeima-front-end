import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardService } from '../../components/cardService/CardService';
import './Topic.css';

export interface TopicProps {
  id: string;
  title: string;
  body: string;
  picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */

let listeTopics: TopicProps[] = [];

export const Topic = () => {
  const [displayedTopics, setDisplayedTopics] = useState<TopicProps[]>([
    ...listeTopics,
  ]);

  console.log(listeTopics);

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/topic')
      .then((response) => {
        listeTopics = response.data;
        setDisplayedTopics(listeTopics);
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
        {displayedTopics.map((topic) => (
          <li className='card-offer' key={topic.id}>
            <div className='card' style={{ width: '18rem' }}>
              <div className='card-body'>
                <h5 className='card-title'>{topic.title}</h5>
                <p className='card-text'>{topic.body}</p>
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
