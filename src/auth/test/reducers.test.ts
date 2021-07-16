import { authenticateUser, userData } from '../ducks/actions';
import reducers, { initialUserState } from '../ducks/reducers';
import {
  TokenPayload,
  UserAuthenticationReducerState,
  UserData,
} from '../ducks/types';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';

describe('User Authentication Reducers', () => {
  describe('Token Payload', () => {
    it('Updates state correctly when a user authenticates successfully', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      const action = authenticateUser.loaded(payload);
      const expectedNextState: UserAuthenticationReducerState = {
        ...initialUserState,
        tokens: AsyncRequestCompleted<TokenPayload, void>(payload),
      };
      expect(reducers(initialUserState, action)).toEqual(expectedNextState);
    });
  });

  describe('UserData', () => {
    it('Updates state correctly when user data is retrieved', () => {
      const data: UserData = {
        firstName: 'First',
        lastName: 'Last',
        email: 'test@email.com',
        username: 'user',
      };
      const action = userData.loaded(data);
      const expectedNextState: UserAuthenticationReducerState = {
        ...initialUserState,
        userData: AsyncRequestCompleted<UserData, void>(data),
      };

      expect(reducers(initialUserState, action)).toEqual(expectedNextState);
    });
  });
});
