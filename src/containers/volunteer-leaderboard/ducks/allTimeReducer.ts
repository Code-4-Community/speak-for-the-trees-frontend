import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { UserLeaderboardAllTimeReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItemsAllTime } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialUserLeaderboardAllTimeState: UserLeaderboardAllTimeReducerState = {
  userLeaderboardAllTime: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const userLeaderboardAllTimeReducer = generateAsyncRequestReducer<
  UserLeaderboardAllTimeReducerState,
  LeaderboardItem[],
  void
>(leaderboardItemsAllTime.key);

const reducers = (
  state: UserLeaderboardAllTimeReducerState = initialUserLeaderboardAllTimeState,
  action: C4CAction,
): UserLeaderboardAllTimeReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userLeaderboardAllTime: userLeaderboardAllTimeReducer(
          state.userLeaderboardAllTime,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
