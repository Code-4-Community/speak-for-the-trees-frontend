import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { UserLeaderboardMonthlyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardMonthlyState: UserLeaderboardMonthlyReducerState = {
  userLeaderboardMonthly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const userLeaderboardMonthlyReducer = generateAsyncRequestReducer<
  UserLeaderboardMonthlyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItems.key);

const reducers = (
  state: UserLeaderboardMonthlyReducerState = initialUserLeaderboardMonthlyState,
  action: C4CAction,
): UserLeaderboardMonthlyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userLeaderboardMonthly: userLeaderboardMonthlyReducer(
          state.userLeaderboardMonthly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
