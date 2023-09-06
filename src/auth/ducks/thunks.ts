import {
  LoginRequest,
  RefreshTokenResponse,
  SignupRequest,
  TokenPayload,
  UserAuthenticationThunkAction,
  UserData,
} from './types';
import { authenticateUser, logoutUser, userData } from './actions';
import { C4CState, LOCALSTORAGE_STATE_KEY } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { AppAxiosInstance } from '../../api/apiClient';
import Client from '../../api/protectedApiClient';
import history from '../../history';

export const login = (
  loginRequest: LoginRequest,
  onError: () => void,
): UserAuthenticationThunkAction<void> => {
  return (
    dispatch,
    getState,
    { authClient, protectedApiClient },
  ): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .login(loginRequest)
      .then(async (response: TokenPayload) => {
        // add the access token to the getUserData request header
        // (since our authenticateUser.loaded hasn't been dispatched yet, axios can't get the token from store)
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;

        await getUserData()(dispatch, getState, {
          authClient,
          protectedApiClient,
        });
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
        onError();
      });
  };
};

export const refresh = (
  refreshToken: string,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    return authClient
      .refresh(refreshToken)
      .then((refreshTokenResponse: RefreshTokenResponse) => {
        dispatch(
          authenticateUser.loaded({
            accessToken: refreshTokenResponse.freshAccessToken,
            refreshToken,
          }),
        );
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

export const signup = (
  signupRequest: SignupRequest,
  onError: (msg: string) => void,
): UserAuthenticationThunkAction<void> => {
  return (
    dispatch,
    getState,
    { authClient, protectedApiClient },
  ): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .signup(signupRequest)
      .then(async (response) => {
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        await getUserData()(dispatch, getState, {
          authClient,
          protectedApiClient,
        });
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
        onError(error.response.data);
      });
  };
};

export const logout = (): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    const state: C4CState = getState();

    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      const refreshToken: string =
        state.authenticationState.tokens.result.refreshToken;
      return authClient
        .logout(refreshToken)
        .then(() => {
          dispatch(logoutUser.loaded());
        })
        .then(() => {
          // clear user information and refresh after successfully logging out
          localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
          history.go(0);
        })
        .catch(() => {
          dispatch(logoutUser.failed());
        });
    } else {
      dispatch(logoutUser.loaded());
      return Promise.resolve();
    }
  };
};

export const getUserData = (): UserAuthenticationThunkAction<void> => {
  return async (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(userData.loading());
    return Client.getUserData()
      .then((response: UserData) => {
        dispatch(userData.loaded(response));
      })
      .catch((error) => {
        dispatch(userData.failed(error.response.data));
      });
  };
};
