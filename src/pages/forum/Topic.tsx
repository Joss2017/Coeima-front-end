import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CardComment } from '../../components/comment/cardComment/CardComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../../context/AuthContext';
import { CommentProps } from '../../interface/Comment';
import { TopicProps } from '../../interface/Topic';
import './Topic.css';
import { axiosPrivate, axiosPublic } from '../../api/Axios';

export const Topic = () => {
  const { connectedUser } = useContext(AuthContext);

  const [listCardTopics, setListCardTopics] = useState<TopicProps[] | null>(
    null
  );
  const [topicFavorite, setTopicFavorite] = useState<boolean>(false);
  const [topicComment, setTopicComment] = useState<boolean>(false);
  const [listCardComments, setListCardComments] = useState<
    CommentProps[] | null
  >(null);

  const handleClick = (topicId: string) => {
    axiosPrivate.patch(`/topic/${topicId}`, {
      favorites: true,
    });
    setTopicFavorite(true);
    if (topicFavorite === true) {
      setTopicFavorite(false);
    }
    console.log('topicFavorite cardTopic', topicFavorite);
  };

  const handleClickchange = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    setTopicComment(true);
    if (topicComment === true) {
      setTopicComment(false);
    }
  };

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

  // ------------- mettre à jour l'affichage de notre composant en fonction de la valeur de result-------//

  return (
    <div className='topic-wrapper'>
      {listCardTopics?.map((topic) => (
        <div className='container-card-topic' key={topic.id}>
          <div className='card' style={{ width: '22rem' }}>
            <div className='card-body'>
              <button
                className='ms-2 btn btn-warning'
                id={topic.id}
                onClick={() => handleClick(topic.id)}
              >
                {topicFavorite === true ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
              <h5 className='card-title'>{topic.title}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>{topic.url}</h6>
              <p className='card-text'>{topic.body}</p>

              <a href={topic.url} className='alert-link'>
                {topic.url}
              </a>
            </div>
          </div>
          {connectedUser && (
            <button
              className='ms-2 btn btn-warning'
              id={topic.id}
              onClick={handleClickchange}
            >
              {topicComment === true && <CardComment />}répondre
            </button>
          )}
        </div>
      ))}

      <div>
        <span>Possibilité de paiement en plusieurs fois (jusqu’à 3 fois)</span>
      </div>
    </div>
  );
};
