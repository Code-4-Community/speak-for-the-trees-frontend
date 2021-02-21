import nock from 'nock';
import ProtectedApiClient, { ProtectedApiClientRoutes } from '../protectedApiClient';

const BASE_URL = 'http://localhost';

// TODO: handle invalid cases

describe('Protected Client Tests', () => {
  describe('makeReservation', () => {
    it('makes the right request', async () => {
      const response = "";

      nock(BASE_URL).post(ProtectedApiClientRoutes.MAKE_RESERVATION).reply(200, response);

      const result = await ProtectedApiClient.makeReservation(1);

      expect(result).toEqual(response);
    }) 
  });    
});