import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import tokenService from './token';
import { refresh, logout } from './authAPI';

const Instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestInterceptor: (
  request: AxiosRequestConfig,
) => AxiosRequestConfig = (request: AxiosRequestConfig) => {
  // eslint-disable-next-line
  request.headers['X-Access-Token'] = tokenService.getAccessToken();
  return request;
};

Instance.interceptors.request.use(requestInterceptor);

const INVALID_ACCESS_TOKEN = 'Given access token is expired or invalid';

const responseErrorInterceptor: (error: AxiosError) => void = (error) => {
  const originalRequest = error.config;
  if (
    error.code === '401' &&
    error.message === INVALID_ACCESS_TOKEN &&
    tokenService.isRefreshTokenValid()
  ) {
    return refresh().then(() => {
      Instance.defaults.headers[
        'X-Access-Token'
      ] = tokenService.getAccessToken();
      return Instance(originalRequest);
    });
  }
  if (
    error.code === '401' &&
    error.message === INVALID_ACCESS_TOKEN &&
    !tokenService.isRefreshTokenValid()
  ) {
    logout();
  }
  return Promise.reject(error);
};

Instance.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
);

export default Instance;
