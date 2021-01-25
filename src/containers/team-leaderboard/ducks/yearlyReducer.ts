import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';
import { TeamLeaderboardYearlyReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';
import { C4CAction } from '../../../store';

export const initialTeamLeaderboardYearlyState: TeamLeaderboardYearlyReducerState = {
  teamLeaderboardYearly: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const teamLeaderboardYearlyReducer = generateAsyncRequestReducer<
  TeamLeaderboardYearlyReducerState,
  LeaderboardItem[],
  void
>(leaderboardItems.key);

const reducers = (
  state: TeamLeaderboardYearlyReducerState = initialTeamLeaderboardYearlyState,
  action: C4CAction,
): TeamLeaderboardYearlyReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        teamLeaderboardYearly: teamLeaderboardYearlyReducer(
          state.teamLeaderboardYearly,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
