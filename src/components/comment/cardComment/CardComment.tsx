import './CardComment.css';

export const CardComment = () => {
  return (
    <div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1' className='form-label'>
          pseudo
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='name@example.com'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          commentaire
        </label>
        <textarea
          className='form-control row-3'
          id='exampleFormControlTextarea1'
        ></textarea>
      </div>
    </div>
  );
};
