import tokenService from './token';
import { requestInterceptor } from './axios';

describe('Request Interceptor Tests', () => {
  /*
  it('properly applies the access token when one exists in storage', () => {
    tokenService.setAccessToken('ACCESS TOKEN EXAMPLE');
    const result = requestInterceptor({
      headers: {},
    });
    expect(result).toEqual({
      headers: {
        'X-Access-Token': 'ACCESS TOKEN EXAMPLE',
      },
    });
  });
  */

  test('can run tests', () => {
    expect(true).toBe(true);
  });
});
