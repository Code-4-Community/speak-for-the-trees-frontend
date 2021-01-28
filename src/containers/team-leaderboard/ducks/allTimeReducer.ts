import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { TeamLeaderboardAllTimeReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItemsAllTime } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialTeamLeaderboardAllTimeState: TeamLeaderboardAllTimeReducerState = {
  teamLeaderboardAllTime: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const teamLeaderboardAllTimeReducer = generateAsyncRequestReducer<
  TeamLeaderboardAllTimeReducerState,
  LeaderboardItem[],
  void
>(leaderboardItemsAllTime.key);

const reducers = (
  state: TeamLeaderboardAllTimeReducerState = initialTeamLeaderboardAllTimeState,
  action: C4CAction,
): TeamLeaderboardAllTimeReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        teamLeaderboardAllTime: teamLeaderboardAllTimeReducer(
          state.teamLeaderboardAllTime,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
