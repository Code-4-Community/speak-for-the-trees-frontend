import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import { PrivilegeLevel, TokenPayload } from '../ducks/types';
import { getPrivilegeLevel } from '../ducks/selectors';

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
});
