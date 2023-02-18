import { CardTopicProps } from '../../interface/Interface';
import StarIcon from '@mui/icons-material/Star';
import './CardTopic.css';
import { useState } from 'react';

export const CardTopic = ({ cardTopic, onClickFavorite }: CardTopicProps) => {
  const [topicFavorite, setTopicFavorite] = useState<boolean>(false);

  const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setTopicFavorite(true);
    if (topicFavorite === true) {
      setTopicFavorite(false);
    }
    onClickFavorite(topicFavorite);
    console.log('topicFavorite cardTopic', topicFavorite);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{cardTopic.title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{cardTopic.url}</h6>
        <p className='card-text'>{cardTopic.body}</p>

        <a href={cardTopic.url} className='alert-link'>
          {cardTopic.url}
        </a>
        <button
          className='ms-2 btn btn-warning'
          id={cardTopic.id}
          onClick={handleClick}
        >
          {topicFavorite === true ? <StarIcon /> : <p>Mettre en favoris</p>}
        </button>
      </div>
    </div>
  );
};
