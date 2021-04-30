import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import { PrivilegeLevel, TokenPayload, UserData } from '../ducks/types';
import {
  getPrivilegeLevel,
  getUserEmail,
  getUserFirstName,
  getUserFullName,
} from '../ducks/selectors';

describe('User Authentication Selectors', () => {
  describe('getPrivilegeLevel', () => {
    it('returns standard privilege level when a token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6Im9mZmljZXIiLCJpc3MiOiJjNGMiLCJleHAiOjE2MDU0ODAzMjMsInVzZXJJZCI6MX0.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6Im9mZmljZXIiLCJpc3MiOiJjNGMiLCJleHAiOjE2MDYwODMzMjMsInVzZXJJZCI6MX0.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      // TODO: this will eventually change to 'standard' or 'admin'
      expect(getPrivilegeLevel(tokens)).toEqual('officer');
    });

    it('returns none privilege level when no token has been loaded', () => {
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestNotStarted();

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.NONE);
    });
  });

  describe('getUserFirstName', () => {
    it("returns the user's first name when user data has been loaded", () => {
      const data: UserData = {
        firstName: 'First',
        lastName: 'Last',
        email: 'test@email.com',
      };
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(data);

      expect(getUserFirstName(userData)).toEqual('First');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserFirstName(userData)).toEqual('');
    });
  });

  describe('getUserFullName', () => {
    it("returns the user's full name when user data has been loaded", () => {
      const data: UserData = {
        firstName: 'First',
        lastName: 'Last',
        email: 'test@email.com',
      };
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(data);

      expect(getUserFullName(userData)).toEqual('First Last');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserFullName(userData)).toEqual('');
    });
  });

  describe('getUserEmail', () => {
    it("returns the user's email when user data has been loaded", () => {
      const data: UserData = {
        firstName: 'First',
        lastName: 'Last',
        email: 'test@email.com',
      };
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(data);

      expect(getUserEmail(userData)).toEqual('test@email.com');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserEmail(userData)).toEqual('');
    });
  });
});
