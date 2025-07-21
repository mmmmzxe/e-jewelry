import { apiGet } from './api';

const BASE_URL = 'http://localhost:5000/api/users';

export const fetchUsersApi = () => apiGet(BASE_URL); 