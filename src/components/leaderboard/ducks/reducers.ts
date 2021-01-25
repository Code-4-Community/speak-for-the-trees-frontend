import { LeaderboardItem, LeaderboardItemsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { leaderboardItems } from './actions';
import { C4CAction } from '../../../store';

export const initialLeaderboardState: LeaderboardItemsReducerState = {
  volunteerLeaderboard: AsyncRequestNotStarted<LeaderboardItem[], any>(),
  teamLeaderboard: AsyncRequestNotStarted<LeaderboardItem[], any>(),
};

const leaderboardReducer = generateAsyncRequestReducer<
  LeaderboardItemsReducerState,
  LeaderboardItem[],
  void
>(leaderboardItems.key);


// Would be cool to find a way to abstract this further
const volunteerReducer = (
  state: LeaderboardItemsReducerState = initialLeaderboardState,
  action: C4CAction,
): LeaderboardItemsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:  
      return {
        ...state,
        volunteerLeaderboard: leaderboardReducer(state.volunteerLeaderboard, action),
      };
    default:
      return state;  
  }
};

const teamReducer = (
  state: LeaderboardItemsReducerState = initialLeaderboardState,
  action: C4CAction,
): LeaderboardItemsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:  
      return {
        ...state,
        teamLeaderboard: leaderboardReducer(state.teamLeaderboard, action),
      };
    default:
      return state;  
  }
};