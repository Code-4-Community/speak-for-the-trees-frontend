import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../src/auth/ducks/types';
import { getPrivilegeLevel } from '../src/auth/ducks/selectors';
import { C4CState } from './store';

import './App.less';
import Landing from './containers/landing/Landing';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import AdminDashboard from './containers/admin-dashboard/AdminDashboard';
import Home from './containers/home/Home';
import Settings from './containers/settings/Settings';
import VolunteerLeaderboard from './containers/volunteer-leaderboard/VolunteerLeaderboard';

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/nav-bar/NavBar';
import { Layout } from 'antd';

const { Content } = Layout;

type AppProps = UserAuthenticationReducerState;

export enum Routes {
  LANDING = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  HOME = '/home',
  SETTINGS = '/settings',
  VOLUNTEER = '/volunteer',
  ADMIN = '/admin',
  NOT_FOUND = '*',
}

const App: React.FC<AppProps> = ({ tokens }) => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(tokens),
  );

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
        <Layout className="app-flex-container">
          <NavBar />
          <Content className="content-padding">
            {(() => {
              switch (privilegeLevel) {
                case PrivilegeLevel.NONE:
                  return (
                    <Switch>
                      <Route path={Routes.LANDING} exact component={Landing} />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route path={Routes.HOME}>
                        <Redirect to={Routes.LOGIN} />
                      </Route>
                      <Route path={Routes.SETTINGS}>
                        <Redirect to={Routes.LOGIN} />
                      </Route>
                      <Route path={Routes.VOLUNTEER}>
                        <Redirect to={Routes.LOGIN} />
                      </Route>
                      <Route path={Routes.ADMIN}>
                        <Redirect to={Routes.LOGIN} />
                      </Route>
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
                      <Route path={Routes.LOGIN}>
                        <Redirect to={Routes.HOME} />
                      </Route>
                      <Route path={Routes.SIGNUP}>
                        <Redirect to={Routes.HOME} />
                      </Route>
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route path={Routes.SETTINGS} exact component={Settings} />
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route path={Routes.ADMIN}>
                        <Redirect to={Routes.HOME} />
                      </Route>
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
                      <Route path={Routes.LOGIN}>
                        <Redirect to={Routes.HOME} />
                      </Route>
                      <Route path={Routes.SIGNUP}>
                        <Redirect to={Routes.HOME} />
                      </Route>
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route path={Routes.SETTINGS} exact component={Settings} />
                      <Route
                        path={Routes.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
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
        </Layout>
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
