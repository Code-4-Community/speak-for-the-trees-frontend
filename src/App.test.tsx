import { TokenPayload, UserData } from './auth/ducks/types';
import { AxiosError } from 'axios';
import { AdminApiClientRoutes } from './api/protectedApiClient';

// constants to use in tests
export const BASE_URL = 'http://localhost';

export const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU';

// invalid refresh token component
export const invalidExp = 0;

// valid refresh token component
export const validExp = Date.now() * 1000 + 1000;

export const mockTokenResponse = (expDate: number): TokenPayload => {
  return {
    accessToken,
    refreshToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
      btoa('{"iss":"c4c","exp":' + expDate + ',"username":"spain"}') +
      '.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
  };
};

export const mockUserDataResponse: UserData = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@email.com',
  username: 'user',
};

export const mockExpiredToken: AxiosError = {
  code: '',
  config: {
    url: AdminApiClientRoutes.GET_ADOPTION_REPORT,
    baseURL: BASE_URL,
  },
  isAxiosError: false,
  message: '',
  name: '',
  request: undefined,
  response: {
    status: 401,
    data: 'Given access token is expired or invalid',
    statusText: '',
    config: {},
    headers: undefined,
  },
  toJSON: () => {
    return mockExpiredToken;
  },
};

test('can run tests', () => {
  expect(true).toBe(true);
});
