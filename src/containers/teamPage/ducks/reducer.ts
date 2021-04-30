import { TeamReducerState, TeamResponse } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { teamResponse } from './actions';
import { C4CAction } from '../../../store';

export const initialTeamState: TeamReducerState = {
  team: AsyncRequestNotStarted<TeamResponse, any>(),
};

const teamReducer = generateAsyncRequestReducer<
  TeamReducerState,
  TeamResponse,
  void
>(teamResponse.key);

const reducers = (
  state: TeamReducerState = initialTeamState,
  action: C4CAction,
): TeamReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        team: teamReducer(state.team, action),
      };
    default:
      return state;
  }
};

export default reducers;
