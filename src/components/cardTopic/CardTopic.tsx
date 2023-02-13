import { TopicProps } from '../../pages/forum/Topic';
import './CardTopic.css';

export interface CardTopicPtops {
  cardTopic: TopicProps;
}

export const CardTopic = ({ cardTopic }: CardTopicPtops) => {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>{cardTopic.title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{cardTopic.url}</h6>
        <p className='card-text'>{cardTopic.body}</p>
        <button className='card-button'>Card link</button>
        <div className='alert alert-light' role='alert'>
          A simple light alert with{' '}
          <a href='#' className='alert-link'>
            an example link
          </a>
          . Give it a click if you like.
        </div>
      </div>
    </div>
  );
};
