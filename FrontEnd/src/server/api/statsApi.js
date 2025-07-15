import { apiGet } from './api';

const BASE_URL = 'http://localhost:5000/api/stats';
 
export const fetchStatsApi = () => apiGet(BASE_URL); 