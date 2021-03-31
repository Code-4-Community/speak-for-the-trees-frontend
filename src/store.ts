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
import protectedApiClient, {
  ProtectedApiExtraArgs,
} from './api/protectedApiClient';
import { MapGeoDataReducerState } from './components/mapPageComponents/ducks/types';
import { MapActions } from './components/mapPageComponents/ducks/actions';
import mapGeoDataReducer, {
  initialMapGeoDataState,
} from './components/mapPageComponents/ducks/reducer';
import apiClient, { ApiExtraArgs } from './api/apiClient';
import { UserLeaderboardReducerState } from './containers/volunteerLeaderboard/ducks/types';
import { VolunteerLeaderboardItemAction } from './containers/volunteerLeaderboard/ducks/actions';
import { TeamLeaderboardItemAction } from './containers/teamLeaderboard/ducks/actions';
import userLeaderboardReducer, {
  initialUserLeaderboardState,
} from './containers/volunteerLeaderboard/ducks/reducer';
import { TeamLeaderboardReducerState } from './containers/teamLeaderboard/ducks/types';
import teamLeaderboardReducer, {
  initialTeamLeaderboardState,
} from './containers/teamLeaderboard/ducks/reducer';
import throttle from 'lodash/throttle';
import AppAxiosInstance from './auth/axios';
import { asyncRequestIsComplete } from './utils/asyncRequest';
import { UserDataReducerState } from './containers/home/ducks/types';
import { UserDataAction } from './containers/home/ducks/actions';
import userDataReducer, {
  initialUserDataState,
} from './containers/home/ducks/reducer';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  userLeaderboardState: UserLeaderboardReducerState;
  teamLeaderboardState: TeamLeaderboardReducerState;
  mapGeoDataState: MapGeoDataReducerState;
  userDataState: UserDataReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction =
  | UserAuthenticationActions
  | MapActions
  | VolunteerLeaderboardItemAction
  | TeamLeaderboardItemAction
  | UserDataAction;

export type ThunkExtraArgs = UserAuthenticationExtraArgs &
  ProtectedApiExtraArgs &
  ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  userLeaderboardState: userLeaderboardReducer,
  teamLeaderboardState: teamLeaderboardReducer,
  mapGeoDataState: mapGeoDataReducer,
  userDataState: userDataReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  userLeaderboardState: initialUserLeaderboardState,
  teamLeaderboardState: initialTeamLeaderboardState,
  mapGeoDataState: initialMapGeoDataState,
  userDataState: initialUserDataState,
};

export const LOCALSTORAGE_STATE_KEY: string = 'state';

const loadStateFromLocalStorage = (): C4CState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const state: C4CState = JSON.parse(serializedState);
    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      AppAxiosInstance.defaults.headers['X-Access-Token'] =
        state.authenticationState.tokens.result.accessToken;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

const preloadedState: C4CState | undefined = loadStateFromLocalStorage();

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  protectedApiClient,
  apiClient,
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
>(reducers, preloadedState || initialStoreState, enhancer);

store.subscribe(
  throttle(() => {
    const state: C4CState = store.getState();
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, serializedState);
    } catch {
      // ignore write errors
    }
  }, 10000),
);

export default store;
