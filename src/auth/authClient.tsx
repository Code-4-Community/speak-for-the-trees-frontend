import {
  TokenPayload,
  LoginRequest,
  SignupRequest,
  RefreshTokenResponse,
} from './ducks/types';
import axios, { AxiosInstance } from 'axios';

export interface AuthClient {
  login: (user: LoginRequest) => Promise<TokenPayload>;
  signup: (user: SignupRequest) => Promise<TokenPayload>;
  logout: (refreshToken: string) => Promise<void>;
  refresh: (refreshToken: string) => Promise<RefreshTokenResponse>;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
}

const AuthAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const login: (user: LoginRequest) => Promise<TokenPayload> = (
  user: LoginRequest,
) =>
  AuthAxiosInstance.post(API_ROUTE.LOGIN, user).then(
    (response) => response.data,
  );

const signup: (user: SignupRequest) => Promise<TokenPayload> = (
  user: SignupRequest,
) =>
  AuthAxiosInstance.post(API_ROUTE.SIGNUP, user).then(
    (response) => response.data,
  );

const logout: (refreshToken: string) => Promise<void> = (
  refreshToken: string,
) =>
  AuthAxiosInstance.delete(API_ROUTE.LOGIN, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
    // eslint-disable-next-line
  }).then(() => {});

const refresh: (refreshToken: string) => Promise<RefreshTokenResponse> = (
  refreshToken: string,
) =>
  AuthAxiosInstance.post(API_ROUTE.REFRESH, null, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
  }).then((response) => response.data);

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
});

export default Client;
