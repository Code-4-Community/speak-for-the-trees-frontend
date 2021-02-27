import ProtectedApiClient, {
  ProtectedApiClientRoutes,
  AdminApiClientRoutes,
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

  describe('changeUsername', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.CHANGE_USERNAME)
        .reply(200, response);

      const result = await ProtectedApiClient.changeUsername({
        newUsername: 'willthomas',
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });

  describe('changeEmail', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.CHANGE_EMAIL)
        .reply(200, response);

      const result = await ProtectedApiClient.changeEmail({
        newEmail: 'willthomas@c4c.com',
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });

  describe('deleteUser', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .delete(ProtectedApiClientRoutes.DELETE_USER)
        .reply(200, response);

      const result = await ProtectedApiClient.deleteUser({
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });
});

describe('Admin Api Client Tests', () => {
  describe('changePrivilegeLevel', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CHANGE_PRIVILEGE)
        .reply(200, response);

      const result = await ProtectedApiClient.changePrivilegeLevel({
        targetUserEmail: 'jblanc222@gmail.com',
        newLevel: 'STANDARD',
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });
});
