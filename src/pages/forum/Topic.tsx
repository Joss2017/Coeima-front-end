import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CardTopic } from '../../components/cardTopic/CardTopic';
import { TopicProps } from '../../interface/Interface';
import './Topic.css';

export const Topic = () => {
  const [listCardTopics, setListCardTopics] = useState<TopicProps[] | null>(
    null
  );

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/topic')
      .then((response: AxiosResponse) => {
        setListCardTopics([...response.data]);

        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    console.log(listCardTopics);
  }, []);

  return (
    <div className='list-cardsTopics'>
      {listCardTopics?.map((topic: TopicProps) => (
        <CardTopic key={topic.id} cardTopic={topic} />
      ))}
    </div>
  );
};
