import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import store, { LOCALSTORAGE_STATE_KEY } from '../store';
import { asyncRequestIsComplete } from '../utils/asyncRequest';
import { UserAuthenticationReducerState } from './ducks/types';
import { isTokenValid } from './ducks/selectors';
import { logout, refresh } from './ducks/thunks';
import authClient from './authClient';
import protectedApiClient from '../api/protectedApiClient';
import history from '../history';

const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userAuthenticationExtraArgs = {
  authClient,
  protectedApiClient,
};

const INVALID_ACCESS_TOKEN = 'Given access token is expired or invalid';

// TODO Use throughout application
export interface AppError extends Omit<AxiosError, 'response'> {
  readonly response: AxiosResponse<string>;
}

export const responseErrorInterceptor = async (
  error: AxiosError,
): Promise<AxiosResponse> => {
  const originalRequest = {
    ...error.config,
    _retry: true,
  };

  const tokens: UserAuthenticationReducerState['tokens'] =
    store.getState().authenticationState.tokens;

  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    isTokenValid(tokens.result.refreshToken) &&
    !(error.config as any)?._retry
  ) {
    await refresh(tokens.result.refreshToken)(
      store.dispatch,
      store.getState,
      userAuthenticationExtraArgs,
    );
    return AppAxiosInstance(originalRequest);
  }
  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    !isTokenValid(tokens.result.refreshToken)
  ) {
    await logout()(store.dispatch, store.getState, userAuthenticationExtraArgs);
    localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
    history.go(0);
  }
  return Promise.reject(error);
};

AppAxiosInstance.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
);

AppAxiosInstance.interceptors.request.use((config) => {
  const tokens: UserAuthenticationReducerState['tokens'] =
    store.getState().authenticationState.tokens;
  if (asyncRequestIsComplete(tokens)) {
    config.headers['X-Access-Token'] = tokens.result.accessToken;
  }
  return config;
});

export default AppAxiosInstance;
