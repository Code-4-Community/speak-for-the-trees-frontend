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
import apiClient, { ApiExtraArgs } from './api/apiClient';
import {
  UserLeaderboardWeeklyReducerState,
  UserLeaderboardMonthlyReducerState,
  UserLeaderboardYearlyReducerState,
  UserLeaderboardAllTimeReducerState,
} from './containers/volunteer-leaderboard/ducks/types';
import { LeaderboardItemActions } from './components/leaderboard/ducks/actions';
import userLeaderboardWeeklyReducer, {
  initialUserLeaderboardWeeklyState,
} from './containers/volunteer-leaderboard/ducks/weeklyReducer';
import userLeaderboardMonthlyReducer, {
  initialUserLeaderboardMonthlyState,
} from './containers/volunteer-leaderboard/ducks/monthlyReducer';
import userLeaderboardYearlyReducer, {
  initialUserLeaderboardYearlyState,
} from './containers/volunteer-leaderboard/ducks/yearlyReducer';
import userLeaderboardAllTimeReducer, {
  initialUserLeaderboardAllTimeState,
} from './containers/volunteer-leaderboard/ducks/allTimeReducer';
import {
  TeamLeaderboardWeeklyReducerState,
  TeamLeaderboardMonthlyReducerState,
  TeamLeaderboardYearlyReducerState,
  TeamLeaderboardAllTimeReducerState,
} from './containers/team-leaderboard/ducks/types';
import teamLeaderboardWeeklyReducer, {
  initialTeamLeaderboardWeeklyState,
} from './containers/team-leaderboard/ducks/weeklyReducer';
import teamLeaderboardMonthlyReducer, {
  initialTeamLeaderboardMonthlyState,
} from './containers/team-leaderboard/ducks/monthlyReducer';
import teamLeaderboardYearlyReducer, {
  initialTeamLeaderboardYearlyState,
} from './containers/team-leaderboard/ducks/yearlyReducer';
import teamLeaderboardAllTimeReducer, {
  initialTeamLeaderboardAllTimeState,
} from './containers/team-leaderboard/ducks/allTimeReducer';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  userLeaderboardWeeklyState: UserLeaderboardWeeklyReducerState;
  userLeaderboardMonthlyState: UserLeaderboardMonthlyReducerState;
  userLeaderboardYearlyState: UserLeaderboardYearlyReducerState;
  userLeaderboardAllTimeState: UserLeaderboardAllTimeReducerState;
  teamLeaderboardWeeklyState: TeamLeaderboardWeeklyReducerState;
  teamLeaderboardMonthlyState: TeamLeaderboardMonthlyReducerState;
  teamLeaderboardYearlyState: TeamLeaderboardYearlyReducerState;
  teamLeaderboardAllTimeState: TeamLeaderboardAllTimeReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction = UserAuthenticationActions & LeaderboardItemActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  userLeaderboardWeeklyState: userLeaderboardWeeklyReducer,
  userLeaderboardMonthlyState: userLeaderboardMonthlyReducer,
  userLeaderboardYearlyState: userLeaderboardYearlyReducer,
  userLeaderboardAllTimeState: userLeaderboardAllTimeReducer,
  teamLeaderboardWeeklyState: teamLeaderboardWeeklyReducer,
  teamLeaderboardMonthlyState: teamLeaderboardMonthlyReducer,
  teamLeaderboardYearlyState: teamLeaderboardYearlyReducer,
  teamLeaderboardAllTimeState: teamLeaderboardAllTimeReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  userLeaderboardWeeklyState: initialUserLeaderboardWeeklyState,
  userLeaderboardMonthlyState: initialUserLeaderboardMonthlyState,
  userLeaderboardYearlyState: initialUserLeaderboardYearlyState,
  userLeaderboardAllTimeState: initialUserLeaderboardAllTimeState,
  teamLeaderboardWeeklyState: initialTeamLeaderboardWeeklyState,
  teamLeaderboardMonthlyState: initialTeamLeaderboardMonthlyState,
  teamLeaderboardYearlyState: initialTeamLeaderboardYearlyState,
  teamLeaderboardAllTimeState: initialTeamLeaderboardAllTimeState,
};

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  tokenService,
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
>(reducers, initialStoreState, enhancer);

export default store;
