import { PrivilegeLevel, TokenPayload } from '../ducks/types';
import { login, signup } from '../ducks/thunks';
import { authenticateUser } from '../ducks/actions';
import authClient from '../authClient';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../store';
import tokenService from '../token';
import { AxiosError } from 'axios';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('User Authentication Thunks', () => {
  describe('login', () => {
    it('dispatches an authenticateUser.loaded() action after login', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockSetRefreshToken = jest.fn();
      const mockTokenResponse: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      mockLogin.mockResolvedValue(mockTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        tokenService: {
          ...tokenService,
          setRefreshToken: mockSetRefreshToken,
        },
      };

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockLogin).toBeCalledTimes(1);
      expect(mockSetRefreshToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.refreshToken,
      );
    });

    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockSetRefreshToken = jest.fn();
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
        tokenService: {
          ...tokenService,
          setRefreshToken: mockSetRefreshToken,
        },
      };

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });
  });

  describe('signup', () => {
    it('dispatches an authenticateUser.loaded() action after signup', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockSetRefreshToken = jest.fn();
      const mockTokenResponse: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      mockSignup.mockResolvedValue(mockTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        tokenService: {
          ...tokenService,
          setRefreshToken: mockSetRefreshToken,
        },
      };

      await signup({
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
        email: 'jack@jackblanc.com',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockSignup).toBeCalledTimes(1);
      expect(mockSetRefreshToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.refreshToken,
      );
    });
    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockSetRefreshToken = jest.fn();
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
        tokenService: {
          ...tokenService,
          setRefreshToken: mockSetRefreshToken,
        },
      };

      await signup({
        email: 'jblanc222@gmail.com',
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockSignup).toBeCalledTimes(1);
    });
  });
});
