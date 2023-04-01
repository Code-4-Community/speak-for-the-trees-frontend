import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import {
  getPrivilegeLevel,
  isAdmin,
  getUserFullName,
} from './auth/ducks/selectors';
import { C4CState } from './store';

import styled from 'styled-components';
import Landing from './containers/landing';
import AdminDashboard from './containers/adminDashboard';
import TreePage from './containers/treePage';
import MyTrees from './containers/myTrees';
import { Layout } from 'antd';
import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Settings from './containers/settings';
import NotFound from './containers/notFound';
import NavBar from './components/navBar';
import ForgotPassword from './containers/forgotPassword';
import ForgotPasswordReset from './containers/forgotPasswordReset';
import AuthRedirect from './components/authRedirect';
import SitePage from './containers/sitePage';
import Reports from './containers/reports';
import { logout } from './auth/ducks/thunks';
import history from './history';
import FAQ from './containers/faq';
import Email from './containers/email';

const AppLayout = styled(Layout)`
  min-height: 100vh;
`;

type AppProps = UserAuthenticationReducerState;

export enum Languages {
  ENGLISH = 'ENG',
}

export enum Websites {
  SFTT = 'SFTT',
  CAMBRiDGE = 'CAMBRIDGE',
}

export enum ParameterizedRouteBases {
  // TEAM = '/team/',
  SITE = '/site/',
  TREE = '/tree/',
  // FORGOT_PASSWORD_RESET = '/forgot-password-reset/',
}

export enum Routes {
  LANDING = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  HOME = '/home',
  SETTINGS = '/settings',
  SITE = '/site/:id',
  // VOLUNTEER = '/volunteer',
  // TEAM = '/team/:id',
  TREE = '/tree/:id',
  MY_TREES = '/my-trees',
  // TEAM_LEADERBOARD = '/team-leaderboard',
  // RESERVATIONS = '/reservations',
  AVAILABLE_TEAMS = '/available',
  ADMIN = '/admin',
  REPORTS = '/reports',
  FAQ = '/faq',
  FORGOT_PASSWORD_REQUEST = '/forgot-password',
  FORGOT_PASSWORD_RESET = '/forgot-password-reset/:key',
  EMAIL = '/email',
  NOT_FOUND = '*',
}

export interface RedirectStateProps {
  readonly destination: Routes;
}

export interface MapStateProps {
  readonly zoom: number;
  readonly lat: number;
  readonly lng: number;
}

export const site =
  (process.env.REACT_APP_WEBSITE as Websites) || Websites.SFTT;

const App: React.FC = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    history.go(0);
  };

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  const userName: string = useSelector((state: C4CState) => {
    return getUserFullName(state.authenticationState.userData);
  });

  const isAnAdmin: boolean = useSelector((state: C4CState) => {
    return isAdmin(state.authenticationState.tokens);
  });

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="speak,for,the,trees,speakforthetrees,sftt,boston,bos,treemap,tree-map,map,urban,canopy,reservation,block,blocks"
        />
        <meta name="description" content="Speak for the Trees Website" />
      </Helmet>
      <Router history={history}>
        <AppLayout>
          <NavBar
            userName={
              privilegeLevel !== PrivilegeLevel.NONE ? userName : undefined
            }
            isAdmin={isAnAdmin}
            onLogout={onLogout}
          />
          <Layout.Content>
            {(() => {
              switch (privilegeLevel) {
                case PrivilegeLevel.NONE:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route path={Routes.TREE} exact component={TreePage} />
                      <Route path={Routes.FAQ} exact component={FAQ} />
                      <AuthRedirect from={Routes.HOME} />
                      <AuthRedirect from={Routes.SETTINGS} />
                      <Route
                        path={Routes.SITE}
                        exact
                        render={({ match }) => {
                          return (
                            <AuthRedirect
                              from={`${ParameterizedRouteBases.SITE}${match.params.id}`}
                            />
                          );
                        }}
                      />
                      <AuthRedirect from={Routes.MY_TREES} />
                      {/*
                      <AuthRedirect from={Routes.VOLUNTEER} />
                      <AuthRedirect from={Routes.TEAM} />
                      <AuthRedirect from={Routes.TEAM_LEADERBOARD} />
                      <AuthRedirect from={Routes.AVAILABLE_TEAMS} />
                      <AuthRedirect from={Routes.RESERVATIONS} />
                      */}
                      <AuthRedirect from={Routes.ADMIN} />
                      <AuthRedirect from={Routes.REPORTS} />
                      <Route
                        path={Routes.FORGOT_PASSWORD_REQUEST}
                        exact
                        component={ForgotPassword}
                      />
                      <Route
                        path={Routes.FORGOT_PASSWORD_RESET}
                        exact
                        component={ForgotPasswordReset}
                      />
                      <Route
                        path={Routes.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );

                case PrivilegeLevel.STANDARD:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route path={Routes.TREE} exact component={TreePage} />
                      <Route path={Routes.FAQ} exact component={FAQ} />
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route path={Routes.MY_TREES} exact component={MyTrees} />
                      {/*
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route
                        path={Routes.TEAM_LEADERBOARD}
                        exact
                        component={TeamLeaderboard}
                      />
                      <Route
                        path={Routes.AVAILABLE_TEAMS}
                        exact
                        component={AvailableTeams}
                      />
                      <Route path={Routes.TEAM} exact component={TeamPage} />
                      <Route
                        path={Routes.RESERVATIONS}
                        exact
                        component={Reservations}
                      />
                      */}
                      <Redirect from={Routes.ADMIN} to={Routes.HOME} />
                      <Route
                        path={Routes.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );

                case PrivilegeLevel.SUPER_ADMIN:
                case PrivilegeLevel.ADMIN:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route path={Routes.TREE} exact component={TreePage} />
                      <Route path={Routes.FAQ} exact component={FAQ} />
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route path={Routes.SITE} exact component={SitePage} />
                      <Route path={Routes.MY_TREES} exact component={MyTrees} />
                      {/*
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route
                        path={Routes.TEAM_LEADERBOARD}
                        exact
                        component={TeamLeaderboard}
                      />
                      <Route
                        path={Routes.AVAILABLE_TEAMS}
                        exact
                        component={AvailableTeams}
                      />
                      <Route path={Routes.TEAM} exact component={TeamPage} />
                      <Route
                        path={Routes.RESERVATIONS}
                        exact
                        component={Reservations}
                      />
                      */}
                      <Route
                        path={Routes.ADMIN}
                        exact
                        component={AdminDashboard}
                      />
                      <Route path={Routes.REPORTS} exact component={Reports} />
                      <Route path={Routes.EMAIL} exact component={Email} />
                      <Route
                        path={Routes.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );
              }
            })()}
          </Layout.Content>
        </AppLayout>
      </Router>
    </>
  );
};

const mapStateToProps = (state: C4CState): AppProps => {
  return {
    tokens: state.authenticationState.tokens,
    userData: state.authenticationState.userData,
  };
};

export default connect(mapStateToProps)(App);
