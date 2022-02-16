import { TokenPayload, UserData } from './auth/ducks/types';

// constants to use in tests
export const mockTokenResponse: TokenPayload = {
  accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
  refreshToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
};

export const mockUserDataResponse: UserData = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@email.com',
  username: 'user',
};

test('can run tests', () => {
  expect(true).toBe(true);
});
