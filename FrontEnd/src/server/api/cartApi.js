import { apiGet, apiPost, apiDelete } from './api';

const BASE_URL = 'http://localhost:5000/api/cart';

export const fetchCartApi = () => apiGet(BASE_URL);

export const addToCartApi = (productId, count = 1) =>
  apiPost(BASE_URL, { productId, count });

export const removeFromCartApi = (productId) =>
  apiDelete(`${BASE_URL}/${productId}`);

export const clearCartApi = () => apiDelete(BASE_URL); 