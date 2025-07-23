import { apiGet } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/profile';
 
export const fetchProfileApi = () => apiGet(BASE_URL); 