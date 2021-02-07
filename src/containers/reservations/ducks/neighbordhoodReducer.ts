import { NeighborhoodGeoData, NeighborhoodGeoDataReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { neighborhoodGeoData } from './actions';
import { C4CAction } from '../../../store';

export const initialNeighborhoodGeoDataState: NeighborhoodGeoDataReducerState = {
  neighborhoodGeoData: AsyncRequestNotStarted<NeighborhoodGeoData, any>(),
};

const neighborhoodGeoDataReducer = generateAsyncRequestReducer<
  NeighborhoodGeoDataReducerState,
  NeighborhoodGeoData,
  void
>(neighborhoodGeoData.key);

const reducers = (
  state: NeighborhoodGeoDataReducerState = initialNeighborhoodGeoDataState,
  action: C4CAction,
): NeighborhoodGeoDataReducerState => {
  switch(action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:  
      return {
        ...state,
        neighborhoodGeoData: neighborhoodGeoDataReducer(state.neighborhoodGeoData, action),
      };
    default:
      return state;  
  }
}

export default reducers;