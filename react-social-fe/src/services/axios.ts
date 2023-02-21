import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error?.response);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    try {
      const { data } = await axios.post(`${baseURL}/auth/refresh`, {
        accessToken,
        refreshToken,
      });
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      error.config.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
      return axios(error.config);
    } catch (err: any) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.log(err?.response);
      return Promise.reject(err);
    }
  }
  console.log(error);
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export const API: AxiosInstance = setupInterceptorsTo(
  axios.create({ baseURL })
);
