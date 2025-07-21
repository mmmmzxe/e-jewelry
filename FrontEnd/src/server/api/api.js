import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': 'Bearer ' + token } : {};
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
     
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export async function apiGet(url) {
  try {
    const res = await axios.get(url, { headers: getAuthHeaders() });
    return { data: res.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || err.message };
  }
}

export async function apiPost(url, body) {
  try {
    const isForm = body instanceof FormData;
    const res = await axios.post(url, body, {
      headers: {
        ...getAuthHeaders(),
        ...(isForm ? {} : { 'Content-Type': 'application/json' })
      }
    });
    return { data: res.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || err.message };
  }
}

export async function apiPut(url, body) {
  try {
    const isForm = body instanceof FormData;
    const res = await axios.put(url, body, {
      headers: {
        ...getAuthHeaders(),
        ...(isForm ? {} : { 'Content-Type': 'application/json' })
      }
    });
    return { data: res.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || err.message };
  }
}

export async function apiDelete(url) {
  try {
    await axios.delete(url, { headers: getAuthHeaders() });
    return { data: true, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || err.message };
  }
} 