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
  getUsername,
  isLoggedIn,
} from '../ducks/selectors';
import { mockTokenResponse, mockUserDataResponse } from '../../App.test';

describe('User Authentication Selectors', () => {
  describe('getPrivilegeLevel', () => {
    it('returns standard privilege level when appropriate token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN0YW5kYXJkIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN0YW5kYXJkIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.STANDARD);
    });

    it('returns admin privilege level when appropriate token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6ImFkbWluIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6ImFkbWluIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.ADMIN);
    });

    it('returns super admin privilege level when appropriate token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN1cGVyQWRtaW4iLCJpc3MiOiJjNGMiLCJleHAiOjE2MDU0ODAzMjMsInVzZXJJZCI6MX0=.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN1cGVyQWRtaW4iLCJpc3MiOiJjNGMiLCJleHAiOjE2MDU0ODAzMjMsInVzZXJJZCI6MX0=.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.SUPER_ADMIN);
    });

    it('returns none privilege level when no token has been loaded', () => {
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestNotStarted();

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.NONE);
    });
  });

  describe('isLoggedIn', () => {
    it('returns true when a token has been loaded', () => {
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(mockTokenResponse);

      expect(isLoggedIn(tokens)).toEqual(true);
    });

    it('returns false when no token has been loaded', () => {
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestNotStarted();

      expect(isLoggedIn(tokens)).toEqual(false);
    });
  });

  describe('getUserFirstName', () => {
    it("returns the user's first name when user data has been loaded", () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(mockUserDataResponse);

      expect(getUserFirstName(userData)).toEqual('First');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserFirstName(userData)).toEqual('');
    });
  });

  describe('getUserFullName', () => {
    it("returns the user's full name when user data has been loaded", () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(mockUserDataResponse);

      expect(getUserFullName(userData)).toEqual('First Last');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserFullName(userData)).toEqual('');
    });
  });

  describe('getUserEmail', () => {
    it("returns the user's email when user data has been loaded", () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(mockUserDataResponse);

      expect(getUserEmail(userData)).toEqual('test@email.com');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUserEmail(userData)).toEqual('');
    });
  });

  describe('getUsername', () => {
    it("returns the user's username when user data has been loaded", () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestCompleted<
        UserData,
        any
      >(mockUserDataResponse);

      expect(getUsername(userData)).toEqual('user');
    });

    it('returns empty string when no user data has been loaded', () => {
      const userData: AsyncRequest<UserData, any> = AsyncRequestNotStarted();

      expect(getUsername(userData)).toEqual('');
    });
  });
});
