import {
  BlockGeoData,
  NeighborhoodGeoData,
  BlockGeoDataReducerState,
  NeighborhoodGeoDataReducerState,
  MapGeoDataReducerState,
} from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../../utils/asyncRequest';
import { blockGeoData, neighborhoodGeoData } from './actions';
import { C4CAction } from '../../../../store';

export const initialMapGeoDataState: MapGeoDataReducerState = {
  blockGeoData: AsyncRequestNotStarted<BlockGeoData, any>(),
  neighborhoodGeoData: AsyncRequestNotStarted<NeighborhoodGeoData, any>(),
};

const blockGeoDataReducer = generateAsyncRequestReducer<
  BlockGeoDataReducerState,
  BlockGeoData,
  void
>(blockGeoData.key);

const neighborhoodGeoDataReducer = generateAsyncRequestReducer<
  NeighborhoodGeoDataReducerState,
  NeighborhoodGeoData,
  void
>(neighborhoodGeoData.key);

const reducers = (
  state: MapGeoDataReducerState = initialMapGeoDataState,
  action: C4CAction,
): MapGeoDataReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        blockGeoData: blockGeoDataReducer(state.blockGeoData, action),
        neighborhoodGeoData: neighborhoodGeoDataReducer(
          state.neighborhoodGeoData,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
