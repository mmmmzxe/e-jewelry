import { apiGet } from './api';

const BASE_URL = 'http://localhost:5000/api/sales/monthly';
 
export const fetchMonthlySalesApi = () => apiGet(BASE_URL); 