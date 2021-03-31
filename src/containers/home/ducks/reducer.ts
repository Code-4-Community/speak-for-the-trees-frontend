import { UserData, UserDataReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { userData } from './actions';
import { C4CAction } from '../../../store';

export const initialUserDataState: UserDataReducerState = {
  userData: AsyncRequestNotStarted<UserData, any>(),
};

const userDataReducer = generateAsyncRequestReducer<
  UserDataReducerState,
  UserData,
  void
>(userData.key);

const reducers = (
  state: UserDataReducerState = initialUserDataState,
  action: C4CAction,
): UserDataReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userData: userDataReducer(state.userData, action),
      };
    default:
      return state;
  }
};

export default reducers;
