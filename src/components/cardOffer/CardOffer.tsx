import { CardOfferProps } from '../../interface/Interface';
import './CardOffer.css';

export const CardOffer = ({ cardOffer }: CardOfferProps) => {
  return (
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
        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          data-bs-whatever='@getbootstrap'
        >
          Je suis intéréssé
        </button>

        <div
          className='modal fade'
          id='exampleModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Nouveau message
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form>
                  <div className='mb-3'>
                    <label htmlFor='recipient-name' className='col-form-label'>
                      Nom:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='nicknameUser'
                      placeholder='nom'
                      autoComplete='new nickname'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='emailUser' className='col-form-label'>
                      Email:
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='emailUser'
                      placeholder='nom'
                      autoComplete='new nickname'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='emailUser' className='col-form-label'>
                      Téléphone:
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='emailUser'
                      placeholder='nom'
                      autoComplete='new nickname'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='message-text' className='col-form-label'>
                      Message:
                    </label>
                    <textarea
                      className='form-control'
                      id='message-text'
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
