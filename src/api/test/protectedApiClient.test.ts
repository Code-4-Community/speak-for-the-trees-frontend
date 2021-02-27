import nock from 'nock';
import ProtectedApiClient, {
  ProtectedApiClientRoutes,
  AdminApiClientRoutes,
} from '../protectedApiClient';

const BASE_URL = 'http://localhost';

// TODO: handle invalid cases

describe('Protected Client Tests', () => {
  describe('makeReservation', () => {
    it('makes the right request with team', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.MAKE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.makeReservation(1, 1);

      expect(result).toEqual(response);
    });

    it('makes the right request without team', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.MAKE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.makeReservation(1);

      expect(result).toEqual(response);
    });
  });

  describe('completeReservation', () => {
    it('makes the right request with team', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.COMPLETE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.completeReservation(2, 2);

      expect(result).toEqual(response);
    });

    it('makes the right request without team', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.COMPLETE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.completeReservation(2);

      expect(result).toEqual(response);
    });
  });

  describe('releaseReservation', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ProtectedApiClientRoutes.RELEASE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.releaseReservation(2);

      expect(result).toEqual(response);
    });
  });
});

describe('Admin Protected Client Routes', () => {
  describe('uncompleteReservation', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.uncompleteReservation(5);

      expect(result).toEqual(response);
    });
  });

  describe('markReservationForQa', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA)
        .reply(200, response);

      const result = await ProtectedApiClient.markReservationForQa(6);

      expect(result).toEqual(response);
    });
  });

  describe('passReservationQa', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.PASS_RESERVATION_QA)
        .reply(200, response);

      const result = await ProtectedApiClient.passReservationQa(6);

      expect(result).toEqual(response);
    });
  });

  describe('failReservationQa', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.FAIL_RESERVATION_QA)
        .reply(200, response);

      const result = await ProtectedApiClient.failReservationQa(7);

      expect(result).toEqual(response);
    });
  });
});
