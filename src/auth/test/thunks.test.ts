import { RefreshTokenResponse } from '../ducks/types';
import { getUserData, login, refresh, signup } from '../ducks/thunks';
import { authenticateUser, userData } from '../ducks/actions';
import authClient from '../authClient';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../store';
import protectedApiClient, {
  ProtectedApiClientRoutes,
} from '../../api/protectedApiClient';
import apiClient from '../../api/apiClient';
import nock from 'nock';
import { mockTokenResponse, mockUserDataResponse } from '../../App.test';

const BASE_URL = 'http://localhost';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('User Authentication Thunks', () => {
  describe('login', () => {
    it('dispatches an authenticateUser.loaded() and userData.loaded action after login', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      mockLogin.mockResolvedValue(mockTokenResponse);
      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(200, mockUserDataResponse);

      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        protectedApiClient,
        apiClient,
      };

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        userData.loaded(mockUserDataResponse),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });

    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      mockLogin.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        protectedApiClient,
        apiClient,
      };

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });

    it('dispatches an userData.failed() action after login works but getUserData fails ', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      mockLogin.mockResolvedValue(mockTokenResponse);
      const mockUserDataError = 'mock fail';
      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(401, mockUserDataError);

      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        protectedApiClient,
        apiClient,
      };

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        userData.failed(mockUserDataError),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });
  });

  describe('refresh', () => {
    const mockRefreshToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY';

    it('dispatches an authenticateUser.loaded() action after refresh', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockRefresh = jest.fn();
      const mockRefreshTokenResponse: RefreshTokenResponse = {
        freshAccessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
      };
      mockRefresh.mockResolvedValue(mockRefreshTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          refresh: mockRefresh,
        },
        protectedApiClient,
        apiClient,
      };

      await refresh(mockRefreshToken)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.loaded({
          accessToken: mockRefreshTokenResponse.freshAccessToken,
          refreshToken: mockRefreshToken,
        }),
      );
      expect(mockRefresh).toBeCalledTimes(1);
    });

    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockRefresh = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Invalid token',
        },
      };
      mockRefresh.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          refresh: mockRefresh,
        },
        protectedApiClient,
        apiClient,
      };

      await refresh(mockRefreshToken)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockRefresh).toBeCalledTimes(1);
    });
  });

  describe('signup', () => {
    it('dispatches an authenticateUser.loaded() and userData.loaded() action after signup', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      mockSignup.mockResolvedValue(mockTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        protectedApiClient,
        apiClient,
      };
      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(200, mockUserDataResponse);

      await signup({
        password: 'password',
        username: 'jackblanc',
        firstName: 'Jack',
        lastName: 'Blanc',
        email: 'jack@jackblanc.com',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        userData.loaded(mockUserDataResponse),
      );
      expect(mockSignup).toBeCalledTimes(1);
    });
    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      mockSignup.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        protectedApiClient,
        apiClient,
      };

      await signup({
        email: 'jblanc222@gmail.com',
        username: 'jackblanc',
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockSignup).toBeCalledTimes(1);
    });
  });

  describe('getUserData', () => {
    it('dispatches an userData.loaded() action after getting user data', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockExtraArgs: ThunkExtraArgs = {
        authClient,
        protectedApiClient,
        apiClient,
      };

      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(200, mockUserDataResponse);

      await getUserData()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        userData.loaded(mockUserDataResponse),
      );
    });
    it('dispatches userData.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockAPIErrorData = 'Unauthenticated user';
      const mockExtraArgs: ThunkExtraArgs = {
        authClient,
        protectedApiClient,
        apiClient,
      };

      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(400, mockAPIErrorData);

      await getUserData()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        userData.failed(mockAPIErrorData),
      );
    });
  });
});
