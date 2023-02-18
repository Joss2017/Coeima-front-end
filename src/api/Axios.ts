import axios from 'axios';

//---------------------Snippets crée une instance appelée axiosPrivate permettant de ne pas rééecrire toute la requete---------------------//

const BASE_URL = 'http://localhost:8087/api';

//---------------------Snippets crée une instance appelée axiosPrivate permettant de ne pas rééecrire toute la requete---------------------//

export const axiosPublic = axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({ baseURL: BASE_URL });

//-----définit un en-tête par défaut pour toutes les requêtes HTTP avec une valeur de "Porteur" suivi d'un jeton Web JSON (JWT)------------//

axiosPrivate.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
