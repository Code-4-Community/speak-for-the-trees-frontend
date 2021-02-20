import { TeamLeaderboardReducerState, TeamLeaderboardItem } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { teamLeaderboardItems } from './actions';
import { C4CAction } from '../../../store';

export const initialTeamLeaderboardState: TeamLeaderboardReducerState = {
  teamLeaderboard: AsyncRequestNotStarted<TeamLeaderboardItem[], any>(),
};

const teamLeaderboardReducer = generateAsyncRequestReducer<
  TeamLeaderboardReducerState,
  TeamLeaderboardItem[],
  void
>(teamLeaderboardItems.key);

const reducers = (
  state: TeamLeaderboardReducerState = initialTeamLeaderboardState,
  action: C4CAction,
): TeamLeaderboardReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        teamLeaderboard: teamLeaderboardReducer(state.teamLeaderboard, action),
      };
    default:
      return state;
  }
};

export default reducers;
