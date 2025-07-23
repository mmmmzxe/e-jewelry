import { apiGet, apiPost, apiPut, apiDelete } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/products';

export const fetchProductsApi = () => apiGet(BASE_URL);

export const addProductApi = (form, mainImage, images) => {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('price', form.price);
  formData.append('category', JSON.stringify({ title: form.category }));
  if (mainImage) formData.append('image', mainImage);
  if (images && images.length > 0) {
    images.forEach(file => formData.append('images', file));
  }
  return apiPost(BASE_URL, formData);
};

export const updateProductApi = (id, form, mainImage, images) => {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('price', form.price);
  formData.append('category', JSON.stringify({ title: form.category }));
  if (mainImage) formData.append('image', mainImage);
  if (images && images.length > 0) {
    images.forEach(file => formData.append('images', file));
  }
  return apiPut(`${BASE_URL}/${id}`, formData);
};

export const deleteProductApi = (id) => apiDelete(`${BASE_URL}/${id}`); 

export const fetchWeeklyBestsellersApi = () => apiGet(`${BASE_URL}/weekly-bestsellers`);

export const fetchProductsByCategoryApi = (category) => apiGet(`https://jewelry.up.railway.app/api/categories/${category}/products`);

export const fetchProductByIdApi = (id) => apiGet(`${BASE_URL}/${id}`); 