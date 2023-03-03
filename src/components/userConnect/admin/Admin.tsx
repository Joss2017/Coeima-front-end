import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useAxios } from '../../../hooks/Use-Axios';
import { UserTypeProps } from '../../../interface/User';
import './Admin.css';

export const Admin = () => {
  const [listUsersDisplayed, setListUsersDisplayed] = useState<UserTypeProps[]>(
    []
  );
  const [accountDelete, setAccountDelete] = useState<string | null>(null);

  //---------Hook personnalisé qui permets de lancer la fonction à l'appel de axios private----------//
  const { axiosPrivate } = useAxios();

  //---------Récupere  la liste de users et la stcke dans le state-----------------------------------//

  useEffect(() => {
    axiosPrivate.get('/user').then((Response: AxiosResponse) => {
      setListUsersDisplayed(Response.data);
    });
  }, []);

  //---------Fonction permettant de supprimer un user en recupérant son id au button----------------//

  const deleteAccount = async (userToDelete: string) => {
    console.log('valeur de userToDelete', userToDelete);
    axiosPrivate
      .delete(`/user/${userToDelete}`)
      .then((response: AxiosResponse<{ data: any }>) => {
        console.log('response ', response.data);
        setAccountDelete('Le compte a été supprimé!');
      });
  };
  return (
    <div className='admin-wrapper'>
      {accountDelete && (
        <div className='container-alert  '>
          {accountDelete !== null && (
            <div
              className='alert alert-success'
              role='alert'
              id='alert-success'
            >
              {accountDelete}
            </div>
          )}
        </div>
      )}
      <div className='container-table'>
        <h2 style={{ fontWeight: 'bold' }}>Liste utilisateurs</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Email</th>
              <th> supprimer</th>
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
                      className='btn btn-danger'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'
                      style={{ color: '#f3f3f3f3' }}
                      onClick={() => deleteAccount(user.id)}
                    >
                      <span style={{ color: '#f3f3f3' }}>confirmer</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
