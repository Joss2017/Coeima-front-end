import { useRef } from 'react';
import './CardCreateMessage.css';

export const CardCreateMessage = () => {
  const bodyElement = useRef<HTMLInputElement>(null);
  const urlElement = useRef<HTMLInputElement>(null);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm} className='form-login'>
        <div className='form-group' ref={bodyElement}>
          <label htmlFor='comment'>Comment:</label>
          <textarea className='form-control' rows={5} id='comment'></textarea>
        </div>
        <div className='form-outline mt-3' id='input-login'>
          <input
            type='text'
            className='form-control'
            id='urlUser'
            placeholder='lien Url'
            ref={urlElement}
          />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type='submit' className='btn btn-warning '>
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  );
};
