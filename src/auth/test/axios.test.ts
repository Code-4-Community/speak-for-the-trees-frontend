import {
  accessToken,
  BASE_URL,
  invalidExp,
  mockExpiredToken,
  mockTokenResponse,
  mockUserDataResponse,
  validExp,
} from '../../App.test';
import { AdminApiClientRoutes } from '../../api/protectedApiClient';
import { AxiosError } from 'axios';
import authClient from '../authClient';
import { responseErrorInterceptor } from '../axios';
import store, { C4CState } from '../../store';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';
import { generateState } from './thunks.test';
import nock from 'nock';

// a mock partial state with a valid refresh token
const mockValidAuthState: Partial<C4CState> = {
  authenticationState: {
    tokens: AsyncRequestCompleted(mockTokenResponse(validExp)),
    userData: AsyncRequestCompleted(mockUserDataResponse),
  },
};

// a mock partial state with an invalid refresh token
const mockInvalidAuthState: Partial<C4CState> = {
  authenticationState: {
    tokens: AsyncRequestCompleted(mockTokenResponse(invalidExp)),
    userData: AsyncRequestCompleted(mockUserDataResponse),
  },
};

// mock history for navigation on logout
jest.mock('../../history');

// prepare to mock authClient
jest.mock('../authClient');

describe('Axios Non-Refresh Tests', () => {
  describe('responseErrorInterceptor', () => {
    it('refreshes if the refresh token is not expired', async () => {
      // mock unauthorized, refreshable state
      store.getState = () => generateState(mockValidAuthState);

      // mock successful refresh
      const mockRefresh = jest.fn();
      authClient.refresh = mockRefresh;
      mockRefresh.mockResolvedValue({
        freshAccessToken: accessToken,
      });

      // nock a successful request
      const adoptionReportResponse = [
        {
          siteId: 0,
          address: 'address',
          name: 'A Doe',
          email: 'adoe@email.com',
          dateAdopted: '01-01-2021',
          activityCount: 1,
          neighborhood: 'South End',
        },
      ];
      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_ADOPTION_REPORT)
        .reply(200, adoptionReportResponse);

      const result = await responseErrorInterceptor(mockExpiredToken);

      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(result.data).toEqual(adoptionReportResponse);
    });

    it('logs out if refresh token is expired and propagates error', async () => {
      // mock unauthorized, un-refreshable state
      store.getState = () => generateState(mockInvalidAuthState);

      // mock logout and refresh
      const mockLogout = jest.fn();
      authClient.logout = mockLogout;
      mockLogout.mockResolvedValue({});
      authClient.refresh = jest.fn();

      responseErrorInterceptor(mockExpiredToken)
        .then(() => {
          fail('Did not propagate error');
        })
        .catch((err) => {
          expect(authClient.logout).toHaveBeenCalledTimes(1);
          expect(err).toEqual(mockExpiredToken);
        });
    });

    it('propagates error if not an expired token error and does not logout or refresh', async () => {
      // mock logout and refresh
      authClient.logout = jest.fn();
      authClient.refresh = jest.fn();

      // a bad request error (not 401)
      const mockBadRequest: AxiosError = {
        code: '',
        config: {
          url: AdminApiClientRoutes.GET_ADOPTION_REPORT,
          baseURL: BASE_URL,
        },
        isAxiosError: false,
        message: '',
        name: '',
        request: undefined,
        response: {
          status: 400,
          data: 'Bad request',
          statusText: '',
          config: {},
          headers: undefined,
        },
        toJSON: () => {
          return mockExpiredToken;
        },
      };

      responseErrorInterceptor(mockBadRequest)
        .then(() => {
          fail('Did not propagate error');
        })
        .catch((err) => {
          expect(authClient.logout).toHaveBeenCalledTimes(0);
          expect(authClient.refresh).toHaveBeenCalledTimes(0);
          expect(err).toEqual(mockBadRequest);
        });
    });
  });
});
