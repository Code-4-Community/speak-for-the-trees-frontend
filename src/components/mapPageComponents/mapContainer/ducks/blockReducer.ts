import { BlockGeoData, BlockGeoDataReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../../utils/asyncRequest';
import { blockGeoData } from './actions';
import { C4CAction } from '../../../../store';

export const initialBlockGeoDataState: BlockGeoDataReducerState = {
  blockGeoData: AsyncRequestNotStarted<BlockGeoData, any>(),
};

const blockGeoDataReducer = generateAsyncRequestReducer<
  BlockGeoDataReducerState,
  BlockGeoData,
  void
>(blockGeoData.key);

const reducers = (
  state: BlockGeoDataReducerState = initialBlockGeoDataState,
  action: C4CAction,
): BlockGeoDataReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        blockGeoData: blockGeoDataReducer(state.blockGeoData, action),
      };
    default:
      return state;
  }
};

export default reducers;
