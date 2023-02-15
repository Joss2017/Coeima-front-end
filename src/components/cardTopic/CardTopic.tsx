import { CardTopicPtops } from '../../interface/Interface';
import './CardTopic.css';

export const CardTopic = ({ cardTopic }: CardTopicPtops) => {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>{cardTopic.title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{cardTopic.url}</h6>
        <p className='card-text'>{cardTopic.body}</p>
        <div className='alert alert-light' role='alert'>
          A simple light alert with{' '}
          <a href='#' className='alert-link'>
            an example link
          </a>
          <button className='card-button'>Card link</button>
        </div>
      </div>
    </div>
  );
};
