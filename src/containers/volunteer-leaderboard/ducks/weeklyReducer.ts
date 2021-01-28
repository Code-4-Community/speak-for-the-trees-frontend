import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { UserLeaderboardWeeklyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItemsWeekly } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardWeeklyState: UserLeaderboardWeeklyReducerState = {
  userLeaderboardWeekly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const userLeaderboardWeeklyReducer = generateAsyncRequestReducer<
  UserLeaderboardWeeklyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItemsWeekly.key);

const reducers = (
  state: UserLeaderboardWeeklyReducerState = initialUserLeaderboardWeeklyState,
  action: C4CAction,
): UserLeaderboardWeeklyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userLeaderboardWeekly: userLeaderboardWeeklyReducer(
          state.userLeaderboardWeekly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
