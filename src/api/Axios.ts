import axios from 'axios';

//---------------------Snippets crée une instance appelée axiosPrivate permettant ré-écrire tout le http---------------------//

const BASE_URL = 'http://localhost:8087/api';

export const axiosPrivate = axios.create({ baseURL: BASE_URL });
