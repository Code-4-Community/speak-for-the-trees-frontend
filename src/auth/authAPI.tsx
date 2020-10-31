import Axios from './axios';
import Token from './token';

enum ROUTES {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
}

interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

interface SignupRequest {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export const login: (user: LoginRequest) => Promise<void> = async (
  user: LoginRequest,
) =>
  Axios.post(ROUTES.LOGIN, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const signup: (user: SignupRequest) => Promise<void> = async (
  user: SignupRequest,
) =>
  Axios.post(ROUTES.SIGNUP, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const logout: () => Promise<void> = async () =>
  Axios.delete(ROUTES.LOGIN, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  })
    .then(() => {
      Token.removeAccessToken();
      Token.removeRefreshToken();
    })
    .catch(() => {
      Token.removeAccessToken();
      Token.removeRefreshToken();
    });

export const refresh: () => Promise<void> = async () =>
  Axios.post(ROUTES.REFRESH, null, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  })
    .then((response) => {
      Token.setAccessToken(response.data.freshAccessToken);
    })
    .catch(() => {
      Token.removeAccessToken();
      Token.removeAccessToken();
    });
