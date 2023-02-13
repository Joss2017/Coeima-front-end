import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardTopic } from '../../components/cardTopic/CardTopic';
import './Topic.css';

export interface TopicProps {
  id: string;
  title: string;
  body: string;
  url: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */

let listeTopics: TopicProps[] = [];

export const Topic = () => {
  const [listCardTopics, setListCardTopics] = useState<TopicProps[]>([
    ...listeTopics,
  ]);

  console.log(listeTopics);

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/topic')
      .then((response) => {
        listeTopics = response.data;
        setListCardTopics(listeTopics);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(listCardTopics);
  }, []);

  return (
    <div>
      {listCardTopics.map((topic) => (
        <CardTopic key={topic.id} cardTopic={topic} />
      ))}
    </div>
  );
};
