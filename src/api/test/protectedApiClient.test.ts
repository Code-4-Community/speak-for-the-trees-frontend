import ProtectedApiClient, {
  ProtectedApiClientRoutes,
} from '../protectedApiClient';
import nock from 'nock';

const BASE_URL = 'http://localhost';

describe('Protected Api Client Tests', () => {
  describe('changePassword', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.CHANGE_PASSWORD)
        .reply(200, response);

      const result = await ProtectedApiClient.changePassword({
        currentPassword: 'password',
        newPassword: 'password2',
      });

      expect(result).toEqual(response);
    });
  });

  /*
  describe('changeUsername', () => {
    it('makes the right request', async () => {
      const response = "";

      nock(BASE_URL).post(ProtectedApiClientRoutes.CHANGE_USERNAME).reply(200, response);

      const result = await ProtectedApiClient.changeUsername({
        newUsername: 'willthomas',
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });
  */

  /*
  describe('deleteUser', () => {
    it('makes the right request', async () => {
      const response = "";

      nock(BASE_URL).post(ProtectedApiClientRoutes.CHANGE_PASSWORD).reply(200, response);

      const result = await ProtectedApiClient.deleteUser({
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });
*/
});
