import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { UserLeaderboardYearlyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItemsYearly } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardYearlyState: UserLeaderboardYearlyReducerState = {
  userLeaderboardYearly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const userLeaderboardYearlyReducer = generateAsyncRequestReducer<
  UserLeaderboardYearlyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItemsYearly.key);

const reducers = (
  state: UserLeaderboardYearlyReducerState = initialUserLeaderboardYearlyState,
  action: C4CAction,
): UserLeaderboardYearlyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userLeaderboardYearly: userLeaderboardYearlyReducer(
          state.userLeaderboardYearly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
