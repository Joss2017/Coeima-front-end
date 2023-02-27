import './Admin.css';

export const Admin = () => {
  return (
    <div>
      {' '}
      <div className='form-outline mt-3' id='input-login'>
        <input
          type='file'
          className='form-control'
          accept='image/*'
          id='image'
        />
      </div>
    </div>
  );
};
