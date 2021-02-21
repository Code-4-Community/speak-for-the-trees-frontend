import { UserLeaderboardReducerState, VolunteerLeaderboardItem } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { volunteerLeaderboardItems } from './actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardState: UserLeaderboardReducerState = {
  userLeaderboard: AsyncRequestNotStarted<VolunteerLeaderboardItem[], any>(),
};

const userLeaderboardReducer = generateAsyncRequestReducer<
  UserLeaderboardReducerState,
  VolunteerLeaderboardItem[],
  void
>(volunteerLeaderboardItems.key);

const reducers = (
  state: UserLeaderboardReducerState = initialUserLeaderboardState,
  action: C4CAction,
): UserLeaderboardReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userLeaderboard: userLeaderboardReducer(state.userLeaderboard, action),
      };
    default:
      return state;
  }
};

export default reducers;
