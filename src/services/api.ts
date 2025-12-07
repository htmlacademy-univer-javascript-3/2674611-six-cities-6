import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'; // ← Import InternalAxiosRequestConfig
import { getToken } from './token.ts';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => { // ← Используй InternalAxiosRequestConfig
      const token = getToken();
      const newConfig = { ...config };

      if (token && newConfig.headers) {
        newConfig.headers['x-token'] = token;
      }

      return newConfig;
    },
  );

  return api;
};
