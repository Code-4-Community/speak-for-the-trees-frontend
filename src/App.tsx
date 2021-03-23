import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../src/auth/ducks/types';
import { getPrivilegeLevel } from '../src/auth/ducks/selectors';
import { C4CState } from './store';

import styled from 'styled-components';
import Landing from './containers/landing';
import AdminDashboard from './containers/adminDashboard';
import VolunteerLeaderboard from './containers/volunteerLeaderboard';
import TeamLeaderboard from './containers/teamLeaderboard';
import TeamPage from './containers/teamPage';
import AvailableTeams from './containers/availableTeams';
import { Layout } from 'antd';
import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Settings from './containers/settings';
import NotFound from './containers/notFound';
import NavBar from './components/navBar';
import AuthRedirect from './components/authRedirect';

const { Content } = Layout;

const AppLayout = styled(Layout)`
  min-height: 100vh;
`;

type AppProps = UserAuthenticationReducerState;

export enum Routes {
  LANDING = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  HOME = '/home',
  SETTINGS = '/settings',
  VOLUNTEER = '/volunteer',
  TEAM = '/team/:id',
  TEAM_LEADERBOARD = '/team-leaderboard',
  AVAILABLE_TEAMS = '/available',
  ADMIN = '/admin',
  NOT_FOUND = '*',
}

export interface RedirectStateProps {
  readonly destination: Routes;
}

const App: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
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
      <Router>
        <AppLayout>
          <NavBar />
          <Content>
            {(() => {
              switch (privilegeLevel) {
                case PrivilegeLevel.NONE:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <AuthRedirect from={Routes.HOME} />
                      <AuthRedirect from={Routes.SETTINGS} />
                      <AuthRedirect from={Routes.VOLUNTEER} />
                      <AuthRedirect from={Routes.TEAM} />
                      <AuthRedirect from={Routes.TEAM_LEADERBOARD} />
                      <AuthRedirect from={Routes.AVAILABLE_TEAMS} />
                      <AuthRedirect from={Routes.ADMIN} />
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
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route path={Routes.TEAM} exact component={TeamPage} />
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
                      <Redirect from={Routes.ADMIN} to={Routes.HOME} />
                      <Route
                        path={Routes.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );

                case PrivilegeLevel.ADMIN:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route path={Routes.TEAM} exact component={TeamPage} />
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
                      <Route
                        path={Routes.ADMIN}
                        exact
                        component={AdminDashboard}
                      />
                      <Route
                        path={Routes.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );
              }
            })()}
          </Content>
        </AppLayout>
      </Router>
    </>
  );
};

const mapStateToProps = (state: C4CState): AppProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(App);
