import { AvailableTeamsReducerState, AvailableTeam } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { availableTeams } from './actions';
import { C4CAction } from '../../../store';

export const initialAvailableTeamsState: AvailableTeamsReducerState = {
  availableTeams: AsyncRequestNotStarted<AvailableTeam[], any>(),
};

const availableTeamsReducer = generateAsyncRequestReducer<
  AvailableTeamsReducerState,
  AvailableTeam[],
  void
>(availableTeams.key);

const reducers = (
  state: AvailableTeamsReducerState = initialAvailableTeamsState,
  action: C4CAction,
): AvailableTeamsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        availableTeams: availableTeamsReducer(state.availableTeams, action),
      };
    default:
      return state;
  }
};

export default reducers;
