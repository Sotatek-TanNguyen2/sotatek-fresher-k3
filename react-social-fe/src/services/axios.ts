import Axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    config.headers['Authorization'] =
      'Bearer ' + localStorage.getItem('accessToken');
    return config;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem('accessToken');
    }

    return Promise.reject(error);
  }
);
