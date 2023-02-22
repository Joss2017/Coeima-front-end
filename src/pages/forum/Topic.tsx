import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { axiosPublic } from '../../api/Axios';
import { CardTopic } from '../../components/cardTopic/CardTopic';
import { AuthContext } from '../../context/AuthContext';
import { TopicProps } from '../../interface/Interface';
import './Topic.css';

export const Topic = () => {
  const { connectedUser } = useContext(AuthContext);

  const [listCardTopics, setListCardTopics] = useState<TopicProps[] | null>(
    null
  );

  useEffect(() => {
    axiosPublic
      .get('/topic')
      .then((response: AxiosResponse) => {
        setListCardTopics([...response.data]);

        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    console.log(listCardTopics);
  }, []);
  // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  const handleClickFavorite = (topicFavorite: boolean) => {
    if (topicFavorite === true) {
      setListCardTopics(listCardTopics);
      console.log('topicFavorite Topic', topicFavorite);
    } else {
    }
  };

  return (
    <>
      <div className='list-cardsTopics'>
        {listCardTopics?.map((topic: TopicProps) => (
          <CardTopic
            key={topic.id}
            cardTopic={topic}
            onClickFavorite={handleClickFavorite}
          />
        ))}
        <span>Possibilité de paiement en plusieurs fois (jusqu’à 3 fois)</span>
      </div>
    </>
  );
};
