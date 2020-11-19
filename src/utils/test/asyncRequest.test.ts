import {
  AsyncRequestLoading,
  AsyncRequestNotStarted,
  ASYNC_REQUEST_FAILED_ACTION,
  generateAsyncRequestReducer,
  genericAsyncActions,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestFailed,
  AsyncRequestCompleted,
  rehydrateAsyncRequest,
} from '../asyncRequest';
import {
  PrivilegeLevel,
  TokenPayload,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';

describe('asyncRequest ', () => {
  describe('genericAsyncActions', () => {
    it('creates generic action with a unique key', () => {
      const generator1 = genericAsyncActions<string, Error>();
      const generator2 = genericAsyncActions<string, Error>();
      const response = 'myResponse';

      expect(generator1.loaded(response)).toEqual({
        type: ASYNC_REQUEST_LOADED_ACTION,
        payload: { key: generator1.key, response },
      });
      expect(generator1.key).not.toEqual(generator2.key);
    });
    it('creates generic actions for loading, loaded, failed', () => {
      const generator1 = genericAsyncActions<string, Error>();
      const err = new Error();
      const response = 'myResponse';

      expect(generator1.loading()).toEqual({
        type: ASYNC_REQUEST_LOADING_ACTION,
        payload: { key: generator1.key },
      });
      expect(generator1.loaded(response)).toEqual({
        type: ASYNC_REQUEST_LOADED_ACTION,
        payload: { key: generator1.key, response },
      });
      expect(generator1.failed(err)).toEqual({
        type: ASYNC_REQUEST_FAILED_ACTION,
        payload: { key: generator1.key, error: err },
      });
    });
  });

  describe('generateAsyncRequestReducer', () => {
    const initialState = AsyncRequestNotStarted<TokenPayload, Error>();
    const actions = genericAsyncActions<TokenPayload, Error>();
    const reducer = generateAsyncRequestReducer<
      UserAuthenticationReducerState,
      TokenPayload,
      Error
    >(actions.key);

    it('updates the state for a loading action with given key', () => {
      expect(reducer(initialState, actions.loading())).toEqual(
        AsyncRequestLoading<TokenPayload, Error>(),
      );
    });

    it('updates the state for a failed action with given key', () => {
      const e = new Error();
      expect(reducer(initialState, actions.failed(e))).toEqual(
        AsyncRequestFailed<TokenPayload, Error>(e),
      );
    });

    it('updates the state for a loaded action with given key', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      expect(reducer(initialState, actions.loaded(payload))).toEqual(
        AsyncRequestCompleted<TokenPayload, Error>(payload),
      );
    });

    it('does not update on mismatched keys', () => {
      const misMatchedActions = genericAsyncActions<TokenPayload, Error>();

      expect(reducer(initialState, misMatchedActions.loading())).toEqual(
        AsyncRequestNotStarted<TokenPayload, Error>(),
      );
    });
  });

  describe('rehydrateAsyncRequest', () => {
    it('noops for a `NotStarted` request', () => {
      const notStartedRequest = AsyncRequestNotStarted();

      expect(rehydrateAsyncRequest(notStartedRequest)).toEqual(
        notStartedRequest,
      );
    });

    it('noops for a `Completed` request', () => {
      const completedRequest = AsyncRequestCompleted([]);

      expect(rehydrateAsyncRequest(completedRequest)).toEqual(completedRequest);
    });

    it('noops for a `Failed` request', () => {
      const failedRequest = AsyncRequestFailed(new Error());

      expect(rehydrateAsyncRequest(failedRequest)).toEqual(failedRequest);
    });

    it('resets a `Loading` request back to a `NotStarted` request', () => {
      const loadingRequest = AsyncRequestLoading();
      const notStartedRequest = AsyncRequestNotStarted();

      expect(rehydrateAsyncRequest(loadingRequest)).toEqual(notStartedRequest);
    });
  });
});
