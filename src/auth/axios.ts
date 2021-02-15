import axios, { AxiosInstance } from 'axios';
import store, { C4CState } from '../store';
import { AsyncRequestKinds } from '../utils/asyncRequest';

const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const listener = () => {
  const state: C4CState = store.getState();
  if (state.authenticationState.tokens.kind === AsyncRequestKinds.Completed) {
    AppAxiosInstance.defaults.headers['X-Access-Token'] =
      state.authenticationState.tokens.result.accessToken;
  }
};

store.subscribe(listener);

// const responseErrorInterceptor: (error: AxiosError) => void = (error) => {
//   // const originalRequest = error.config;
//   if (
//     error.code === '401' &&
//     error.message === INVALID_ACCESS_TOKEN &&
//     tokenService.isRefreshTokenValid()
//   ) {
//     // return refresh().then(() => {
//     //   Instance.defaults.headers[
//     //     'X-Access-Token'
//     //   ] = tokenService.getAccessToken();
//     //   return Instance(originalRequest);
//     // });
//   }
//   if (
//     error.code === '401' &&
//     error.message === INVALID_ACCESS_TOKEN &&
//     !tokenService.isRefreshTokenValid()
//   ) {
//     // logout();
//   }
//   return Promise.reject(error);
// };

export default AppAxiosInstance;
