import { SiteReducerState, StewardshipActivities, SiteProps } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { siteData, stewardshipActivities } from './actions';
import { C4CAction } from '../../../store';

export const initialSiteState: SiteReducerState = {
  siteData: AsyncRequestNotStarted<SiteProps, any>(),
  stewarshipActivityData: AsyncRequestNotStarted<StewardshipActivities, any>(),
};

const siteDataReducer = generateAsyncRequestReducer<
  SiteReducerState,
  SiteProps,
  void
>(siteData.key);

const stewarshipActivityReducer = generateAsyncRequestReducer<
  SiteReducerState,
  StewardshipActivities,
  void
>(stewardshipActivities.key);

const reducers = (
  state: SiteReducerState = initialSiteState,
  action: C4CAction,
): SiteReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        siteData: siteDataReducer(state.siteData, action),
        stewarshipActivityData: stewarshipActivityReducer(state.stewarshipActivityData, action),
      };
    default:
      return state;
  }
};

export default reducers;
