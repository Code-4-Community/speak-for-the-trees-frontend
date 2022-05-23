import { authenticateUser, userData } from '../ducks/actions';
import reducers, { initialUserState } from '../ducks/reducers';
import {
  TokenPayload,
  UserAuthenticationReducerState,
  UserData,
} from '../ducks/types';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';
import {
  invalidExp,
  mockTokenResponse,
  mockUserDataResponse,
} from '../../App.test';

describe('User Authentication Reducers', () => {
  describe('Token Payload', () => {
    it('Updates state correctly when a user authenticates successfully', () => {
      const action = authenticateUser.loaded(mockTokenResponse(invalidExp));
      const expectedNextState: UserAuthenticationReducerState = {
        ...initialUserState,
        tokens: AsyncRequestCompleted<TokenPayload, void>(
          mockTokenResponse(invalidExp),
        ),
      };
      expect(reducers(initialUserState, action)).toEqual(expectedNextState);
    });
  });

  describe('UserData', () => {
    it('Updates state correctly when user data is retrieved', () => {
      const action = userData.loaded(mockUserDataResponse);
      const expectedNextState: UserAuthenticationReducerState = {
        ...initialUserState,
        userData: AsyncRequestCompleted<UserData, void>(mockUserDataResponse),
      };

      expect(reducers(initialUserState, action)).toEqual(expectedNextState);
    });
  });
});
