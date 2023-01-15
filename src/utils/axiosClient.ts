import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import { config } from 'process';
import customHistory from 'utils/history';

const baseURL: string = process.env.REACT_APP_TODO_SERVER_BASE_URL as string;

const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authToken = localStorage.getItem('authtoken');
    if (authToken) {
      config.headers = {
        Authorization: authToken,
      };
    }
    return config;
  },
  error => Promise.reject(error),
);

// 서버에서 헤더에 authorization 이 없는 경우 400 error를 반환한다. (401이어야 할 것 같은데, issue 등록해 놓자)
const Unauthorized = 401; // 우선은 내 로컬에서 서버가 401 을 response 하도록 수정해 놓자

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
