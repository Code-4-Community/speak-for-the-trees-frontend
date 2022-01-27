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
import { MapGeoDataReducerState } from './components/mapComponents/ducks/types';
import { MapActions } from './components/mapComponents/ducks/actions';
import mapGeoDataReducer, {
  initialMapGeoDataState,
} from './components/mapComponents/ducks/reducer';
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
import { TeamResponseAction } from './containers/teamPage/ducks/actions';
import { TeamReducerState } from './containers/teamPage/ducks/types';
import teamReducer, {
  initialTeamState,
} from './containers/teamPage/ducks/reducer';
import { AvailableTeamsAction } from './containers/availableTeams/ducks/actions';
import { AvailableTeamsReducerState } from './containers/availableTeams/ducks/types';
import availableTeamsReducer, {
  initialAvailableTeamsState,
} from './containers/availableTeams/ducks/reducer';
import {
  SiteActions,
  ProtectedSiteActions,
} from './containers/treePage/ducks/actions';
import {
  SiteReducerState,
  ProtectedSitesReducerState,
} from './containers/treePage/ducks/types';
import siteDataReducer, {
  initialSiteState,
} from './containers/treePage/ducks/reducer';
import protectedSitesDataReducer, {
  initialProtectedSiteState,
} from './containers/treePage/ducks/protectedReducer';
import throttle from 'lodash/throttle';
import AppAxiosInstance from './auth/axios';
import { asyncRequestIsComplete } from './utils/asyncRequest';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  userLeaderboardState: UserLeaderboardReducerState;
  teamLeaderboardState: TeamLeaderboardReducerState;
  mapGeoDataState: MapGeoDataReducerState;
  teamState: TeamReducerState;
  availableTeamsState: AvailableTeamsReducerState;
  siteState: SiteReducerState;
  adoptedSitesState: ProtectedSitesReducerState;
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
  | TeamResponseAction
  | AvailableTeamsAction
  | SiteActions
  | ProtectedSiteActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs &
  ProtectedApiExtraArgs &
  ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  userLeaderboardState: userLeaderboardReducer,
  teamLeaderboardState: teamLeaderboardReducer,
  mapGeoDataState: mapGeoDataReducer,
  teamState: teamReducer,
  availableTeamsState: availableTeamsReducer,
  siteState: siteDataReducer,
  adoptedSitesState: protectedSitesDataReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  userLeaderboardState: initialUserLeaderboardState,
  teamLeaderboardState: initialTeamLeaderboardState,
  mapGeoDataState: initialMapGeoDataState,
  teamState: initialTeamState,
  availableTeamsState: initialAvailableTeamsState,
  siteState: initialSiteState,
  adoptedSitesState: initialProtectedSiteState,
};

export const LOCALSTORAGE_STATE_KEY: string = 'state';

const loadStateFromLocalStorage = (): C4CState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const state: C4CState = JSON.parse(serializedState);
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
    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      AppAxiosInstance.defaults.headers['X-Access-Token'] =
        state.authenticationState.tokens.result.accessToken;
    }
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, serializedState);
    } catch {
      // ignore write errors
    }
  }, 1000),
);

export default store;
