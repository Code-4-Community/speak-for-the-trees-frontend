import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { TeamLeaderboardMonthlyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialTeamLeaderboardMonthlyState: TeamLeaderboardMonthlyReducerState = {
  teamLeaderboardMonthly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const teamLeaderboardMonthlyReducer = generateAsyncRequestReducer<
  TeamLeaderboardMonthlyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItems.key);

const reducers = (
  state: TeamLeaderboardMonthlyReducerState = initialTeamLeaderboardMonthlyState,
  action: C4CAction,
): TeamLeaderboardMonthlyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        teamLeaderboardMonthly: teamLeaderboardMonthlyReducer(
          state.teamLeaderboardMonthly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
