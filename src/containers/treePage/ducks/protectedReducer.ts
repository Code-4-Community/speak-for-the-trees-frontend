import { ProtectedSitesReducerState, AdoptedSites } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { adoptedSites } from './actions';
import { C4CAction } from '../../../store';

export const initialProtectedSiteState: ProtectedSitesReducerState = {
  adoptedSites: AsyncRequestNotStarted<AdoptedSites, any>(),
};

const adoptedSitesReducer = generateAsyncRequestReducer<
  ProtectedSitesReducerState,
  AdoptedSites,
  void
>(adoptedSites.key);

const reducers = (
  state: ProtectedSitesReducerState = initialProtectedSiteState,
  action: C4CAction,
): ProtectedSitesReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        adoptedSites: adoptedSitesReducer(state.adoptedSites, action),
      };
    default:
      return state;
  }
};

export default reducers;
