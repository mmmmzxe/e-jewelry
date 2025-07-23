import { apiGet, apiPost, apiPut, apiDelete } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/categories';

export const fetchCategoriesApi = () => apiGet(BASE_URL);

export const addCategoryApi = (form) => {
  const formData = new FormData();
  formData.append('title', form.title);
  if (form.imageFile) formData.append('image', form.imageFile);
  return apiPost(BASE_URL, formData);
};

export const updateCategoryApi = (id, form) => {
  const formData = new FormData();
  formData.append('title', form.title);
  if (form.imageFile) formData.append('image', form.imageFile);
  return apiPut(`${BASE_URL}/${id}`, formData);
};

export const deleteCategoryApi = (id) => apiDelete(`${BASE_URL}/${id}`); 