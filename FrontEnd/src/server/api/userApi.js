import { apiGet } from './api';

const BASE_URL = 'https://jewelry.up.railway.app/api/users';

export const fetchUsersApi = () => apiGet(BASE_URL); 