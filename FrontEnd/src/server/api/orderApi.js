import { apiGet, apiPut } from './api';

const BASE_URL = 'http://localhost:5000/api/orders';

export const fetchOrdersApi = () => apiGet(BASE_URL);

export const fetchMyOrdersApi = () => apiGet(`${BASE_URL}/my`);

export const updateOrderStatusApi = (orderId, status) =>
  apiPut(`${BASE_URL}/${orderId}/status`, { status }); 