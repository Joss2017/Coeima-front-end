import { CardOfferProps } from '../../../interface/Offer';
import './CardOffer.css';

export const CardOffer = ({ cardOffer }: CardOfferProps) => {
  return (
    <>
      <div className='card' style={{ width: '18rem' }}>
        <img
          src={cardOffer.picture}
          className='card-img-top'
          alt={cardOffer.title}
        />
        <div className='card-body'>
          <h5 className='card-title'>{cardOffer.title}</h5>
          <p className='card-text'>{cardOffer.body}</p>
          <li>{cardOffer.price}</li>
        </div>
      </div>
    </>
  );
};