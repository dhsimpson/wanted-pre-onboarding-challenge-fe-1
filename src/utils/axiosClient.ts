import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import customHistory from 'utils/history';

const baseURL: string = process.env.REACT_APP_TODO_SERVER_BASE_URL as string;

const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem('authtoken');
    if (authToken) {
      config.headers.set('Authorization', authToken);
    }
    return config;
  },
  error => Promise.reject(error),
);

const Unauthorized = 401;

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === Unauthorized) {
      alert('로그인을 해주세요!');

      customHistory.replace('/auth');
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
