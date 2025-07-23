import { apiGet } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/sales/monthly';
 
export const fetchMonthlySalesApi = () => apiGet(BASE_URL); 