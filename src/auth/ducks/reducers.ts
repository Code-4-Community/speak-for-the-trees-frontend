import {
  TokenPayload,
  UserAuthenticationReducerState,
  UserData,
} from './types';
import { authenticateUser, userData } from './actions';
import { C4CAction } from '../../store';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../utils/asyncRequest';

export const initialUserState: UserAuthenticationReducerState = {
  tokens: AsyncRequestNotStarted<TokenPayload, any>(),
  userData: AsyncRequestNotStarted<UserData, any>(),
};

const userAuthenticationRequestReducer = generateAsyncRequestReducer<
  UserAuthenticationReducerState,
  TokenPayload,
  void
>(authenticateUser.key);

const userDataRequestReducer = generateAsyncRequestReducer<
  UserAuthenticationReducerState,
  UserData,
  void
>(userData.key);

const reducers = (
  state: UserAuthenticationReducerState = initialUserState,
  action: C4CAction,
): UserAuthenticationReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        tokens: userAuthenticationRequestReducer(state.tokens, action),
        userData: userDataRequestReducer(state.userData, action),
      };
    default:
      return state;
  }
};

export default reducers;
