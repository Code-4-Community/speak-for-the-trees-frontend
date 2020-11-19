import { Action } from '../store';
import { Reducer } from 'redux';
import { v4 } from 'uuid';

export enum AsyncRequestKinds {
  NotStarted = 'NotStarted',
  Loading = 'Loading',
  Completed = 'Completed',
  Failed = 'Failed',
}

interface NotStarted {
  readonly kind: AsyncRequestKinds.NotStarted;
}

interface Loading {
  readonly kind: AsyncRequestKinds.Loading;
}

interface Completed<R> {
  readonly kind: AsyncRequestKinds.Completed;
  readonly result: R;
}

interface Failed<E> {
  readonly kind: AsyncRequestKinds.Failed;
  readonly error: E;
}

export type AsyncRequest<R = void, E = void> =
  | Completed<R>
  | Failed<E>
  | Loading
  | NotStarted;

interface WithId {
  readonly id: string;
}

export type IdentifiedAsyncRequest<R, E> = AsyncRequest<R, E> & WithId;

export function asyncRequestIdentifiedBy<R, E = void>(id: string) {
  const identify = (
    request: AsyncRequest<R, E>,
  ): IdentifiedAsyncRequest<R, E> => ({
    ...request,
    id,
  });

  return {
    AsyncRequestNotStarted: () => identify(AsyncRequestNotStarted()),
    AsyncRequestLoading: () => identify(AsyncRequestLoading()),
    AsyncRequestFailed: (error: E) => identify(AsyncRequestFailed(error)),
    AsyncRequestCompleted: (result: R) =>
      identify(AsyncRequestCompleted(result)),
  };
}

export function AsyncRequestNotStarted<R, E = void>(): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.NotStarted,
  };
}

export function AsyncRequestLoading<R, E = void>(): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Loading,
  };
}

export function AsyncRequestFailed<R, E = void>(error: E): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Failed,
    error,
  };
}

export function AsyncRequestCompleted<R, E = void>(
  result: R,
): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Completed,
    result,
  };
}

export function asyncRequestIsComplete<R, E = void>(
  request: AsyncRequest<R, E>,
): request is Completed<R> {
  switch (request.kind) {
    case AsyncRequestKinds.Completed:
      return true;
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
    case AsyncRequestKinds.Loading:
      return false;
  }
}

export function asyncRequestIsLoading<R, E = void>(
  request: AsyncRequest<R, E>,
): boolean {
  switch (request.kind) {
    case AsyncRequestKinds.Loading:
      return true;
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
    case AsyncRequestKinds.Completed:
      return false;
  }
}

export function asyncRequestIsFailed<R, E = void>(
  request: AsyncRequest<R, E>,
): boolean {
  switch (request.kind) {
    case AsyncRequestKinds.Failed:
      return true;
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
    case AsyncRequestKinds.Completed:
      return false;
  }
}

export function asyncRequestIsNotStarted<R, E = void>(
  request: AsyncRequest<R, E>,
): boolean {
  switch (request.kind) {
    case AsyncRequestKinds.NotStarted:
      return true;
    case AsyncRequestKinds.Failed:
    case AsyncRequestKinds.Loading:
    case AsyncRequestKinds.Completed:
      return false;
  }
}

// When re-hydrating an async request from a cache of some kind we can't
// rehydrate a `Loading` value since the async mechanism backing the request
// will no longer be there to eventually resolve the AsyncRequest to `Failed`
// or `Completed`
export function rehydrateAsyncRequest<R, E = void>(
  request: AsyncRequest<R, E>,
): AsyncRequest<R, E> {
  switch (request.kind) {
    case AsyncRequestKinds.Loading:
      return AsyncRequestNotStarted<R, E>();
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
    case AsyncRequestKinds.Completed:
      return request;
  }
}

export const ASYNC_REQUEST_LOADING_ACTION = 'asyncLoading';
export const ASYNC_REQUEST_LOADED_ACTION = 'asyncLoaded';
export const ASYNC_REQUEST_FAILED_ACTION = 'asyncFailed';
interface LoadingPayload {
  readonly key: string;
}
interface LoadedPayload<R> {
  readonly key: string;
  readonly response: R;
}
interface FailedPayload<E> {
  readonly key: string;
  readonly error: E;
}

export type AsyncRequestAction<R, E> =
  | Action<typeof ASYNC_REQUEST_LOADING_ACTION, LoadingPayload>
  | Action<typeof ASYNC_REQUEST_LOADED_ACTION, LoadedPayload<R>>
  | Action<typeof ASYNC_REQUEST_FAILED_ACTION, FailedPayload<E>>;

export function genericAsyncActions<R, E>(): {
  loading: () => Action<typeof ASYNC_REQUEST_LOADING_ACTION, LoadingPayload>;
  loaded: (
    r: R,
  ) => Action<typeof ASYNC_REQUEST_LOADED_ACTION, LoadedPayload<R>>;
  failed: (
    e: E,
  ) => Action<typeof ASYNC_REQUEST_FAILED_ACTION, FailedPayload<E>>;
  key: string;
} {
  const key = v4(); // UUID4

  const loading = (): Action<
    typeof ASYNC_REQUEST_LOADING_ACTION,
    LoadingPayload
  > => ({
    type: ASYNC_REQUEST_LOADING_ACTION,
    payload: { key },
  });

  const loaded = (
    response: R,
  ): Action<typeof ASYNC_REQUEST_LOADED_ACTION, LoadedPayload<R>> => ({
    type: ASYNC_REQUEST_LOADED_ACTION,
    payload: { key, response },
  });

  const failed = (
    error: E,
  ): Action<typeof ASYNC_REQUEST_FAILED_ACTION, FailedPayload<E>> => ({
    type: ASYNC_REQUEST_FAILED_ACTION,
    payload: { key, error },
  });

  return {
    loading,
    loaded,
    failed,
    key,
  };
}

export function generateAsyncRequestReducer<S, R, E>(key: string) {
  const genericReducer: Reducer<
    AsyncRequest<R, E>,
    AsyncRequestAction<any, any>
  > = (
    state: AsyncRequest<R, E> = AsyncRequestNotStarted<R, E>(),
    action: AsyncRequestAction<any, any>,
  ) => {
    switch (action.type) {
      case ASYNC_REQUEST_LOADING_ACTION:
        if (action.payload.key === key) {
          return AsyncRequestLoading<R, E>();
        }
        break;
      case ASYNC_REQUEST_LOADED_ACTION:
        if (action.payload.key === key) {
          return AsyncRequestCompleted<R, E>(action.payload.response);
        }
        break;
      case ASYNC_REQUEST_FAILED_ACTION:
        if (action.payload.key === key) {
          return AsyncRequestFailed<R, E>(action.payload.error);
        }
        break;
    }
    return state;
  };
  return genericReducer;
}
