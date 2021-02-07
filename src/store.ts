import {
  UserAuthenticationExtraArgs,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import { UserAuthenticationActions } from './auth/ducks/actions';
import authClient from './auth/authClient';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import tokenService from './auth/token';
import protectedApiClient, { ProtectedApiExtraArgs } from './api/protectedApiClient';
import { 
  BlockGeoDataReducerState,
  NeighborhoodGeoDataReducerState,  
} from './containers/reservations/ducks/types';
import { 
  BlockGeoDataAction,
  NeighborhoodGeoDataAction,
} from './containers/reservations/ducks/actions';
import blockGeoDataReducer, {
  initialBlockGeoDataState
} from './containers/reservations/ducks/blockReducer';
import neighborhoodGeoDataReducer, {
  initialNeighborhoodGeoDataState
} from './containers/reservations/ducks/neighbordhoodReducer';


export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  blockGeoDataState: BlockGeoDataReducerState;
  neighborhoodGeoDataState: NeighborhoodGeoDataReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction = UserAuthenticationActions 
                        & BlockGeoDataAction
                        & NeighborhoodGeoDataAction;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & ProtectedApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  blockGeoDataState: blockGeoDataReducer,
  neighborhoodGeoDataState: neighborhoodGeoDataReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  blockGeoDataState: initialBlockGeoDataState,
  neighborhoodGeoDataState: initialNeighborhoodGeoDataState,
};

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  tokenService,
  protectedApiClient,
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware<ThunkDispatch<C4CState, ThunkExtraArgs, C4CAction>>(
    thunk.withExtraArgument(thunkExtraArgs),
  ),
);

const store: Store<C4CState, C4CAction> = createStore<
  C4CState,
  C4CAction,
  {},
  {}
>(reducers, initialStoreState, enhancer);

export default store;
