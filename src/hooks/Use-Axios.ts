import axios from 'axios';
export const useAxios = () => {
  //---------------------Snippets crée une instance appelée axiosPrivate permettant de ne pas rééecrire toute la requete---------------------//

  const BASE_URL = 'http://localhost:8087/api';

  //---------------------Snippets crée une instance appelée axiosPrivate permettant de ne pas rééecrire toute la requete---------------------//

  const axiosPublic = axios.create({ baseURL: BASE_URL });

  const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    //-----définit un en-tête par défaut pour toutes les requêtes HTTP avec une valeur de "Porteur" suivi d'un jeton Web JSON (JWT)------------//
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return { axiosPublic, axiosPrivate };
};
