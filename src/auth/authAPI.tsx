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

export const login = async (user: LoginRequest) =>
  Axios.post(ROUTES.LOGIN, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const signup = async (user: LoginRequest) =>
  Axios.post(ROUTES.SIGNUP, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const logout = async () =>
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

export const refresh = async () =>
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
