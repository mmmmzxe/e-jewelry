import { apiGet, apiPost, apiDelete } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/favorites';

export const fetchFavoritesApi = () => apiGet(BASE_URL);

export const addToFavoritesApi = (productId) =>
  apiPost(BASE_URL, { productId });

export const removeFromFavoritesApi = (productId) =>
  apiDelete(`${BASE_URL}/${productId}`); 