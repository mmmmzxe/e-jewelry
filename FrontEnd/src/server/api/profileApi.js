import { apiGet } from './api';

const BASE_URL = 'http://localhost:5000/api/profile';
 
export const fetchProfileApi = () => apiGet(BASE_URL); 