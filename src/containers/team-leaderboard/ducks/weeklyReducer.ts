import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { TeamLeaderboardWeeklyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItemsWeekly } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialTeamLeaderboardWeeklyState: TeamLeaderboardWeeklyReducerState = {
  teamLeaderboardWeekly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const teamLeaderboardWeeklyReducer = generateAsyncRequestReducer<
  TeamLeaderboardWeeklyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItemsWeekly.key);

const reducers = (
  state: TeamLeaderboardWeeklyReducerState = initialTeamLeaderboardWeeklyState,
  action: C4CAction,
): TeamLeaderboardWeeklyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        teamLeaderboardWeekly: teamLeaderboardWeeklyReducer(
          state.teamLeaderboardWeekly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
