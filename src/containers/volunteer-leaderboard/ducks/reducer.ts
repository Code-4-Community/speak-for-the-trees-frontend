import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { UserLeaderboardReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardState: UserLeaderboardReducerState = {
  userLeaderboard: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const userLeaderboardReducer = generateAsyncRequestReducer<
  UserLeaderboardReducerState,
  LeaderboardItem[],
  void
>(leaderboardItems.key);

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
