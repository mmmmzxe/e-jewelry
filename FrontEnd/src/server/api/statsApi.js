import { apiGet } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/stats';
 
export const fetchStatsApi = () => apiGet(BASE_URL); 