import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { axiosPrivate } from '../../../api/Axios';
import { UserTypeProps } from '../../../interface/User';
import './Admin.css';

let listeUsers: UserTypeProps[] = [];

export const Admin = () => {
  const [listUsersDisplayed, setListUsersDisplayed] = useState<UserTypeProps[]>(
    [...listeUsers]
  );
  const [accountDelete, setAccountDelete] = useState<string | null>(null);
  const [selectUserId, setselectUserId] = useState<string | null>(null);

  useEffect(() => {
    axiosPrivate.get('/user').then((Response) => {
      listeUsers = Response.data;
      setListUsersDisplayed(listeUsers);
      console.log(listeUsers);
    });
  }, []);

  const deleteAccount = async (userToDelete: string) => {
    console.log('valeur de userToDelete', userToDelete);
    axiosPrivate
      .delete(`/user/${userToDelete}`)
      .then((response: AxiosResponse<{ data: any }>) => {
        console.log('response ', response.data);
        alert('Le compte a été supprimé!');
      });
  };
  return (
    <div className='admin-wrapper'>
      <h2>Gestion des utilisateurs</h2>
      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th>Email</th>
            <th> supprimer le compte</th>
          </tr>
        </thead>
        <tbody>
          {listUsersDisplayed.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <div>
                  <button
                    type='button'
                    className='btn btn-warning'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => deleteAccount(user.id)}
                  >
                    confirmer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
