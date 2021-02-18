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

export enum ROUTE {
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
                      <Route path={ROUTE.LANDING} exact component={Landing} />
                      <Route path={ROUTE.LOGIN} exact component={Login} />
                      <Route path={ROUTE.SIGNUP} exact component={Signup} />
                      <Route path={ROUTE.HOME}>
                        <Redirect to={ROUTE.LOGIN} />
                      </Route>
                      <Route path={ROUTE.SETTINGS}>
                        <Redirect to={ROUTE.LOGIN} />
                      </Route>
                      <Route path={ROUTE.VOLUNTEER}>
                        <Redirect to={ROUTE.LOGIN} />
                      </Route>
                      <Route path={ROUTE.ADMIN}>
                        <Redirect to={ROUTE.LOGIN} />
                      </Route>
                      <Route
                        path={ROUTE.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );

                case PrivilegeLevel.STANDARD:
                  return (
                    <Switch>
                      <Route path={ROUTE.LANDING} exact component={Landing} />
                      <Route path={ROUTE.LOGIN}>
                        <Redirect to={ROUTE.HOME} />
                      </Route>
                      <Route path={ROUTE.SIGNUP}>
                        <Redirect to={ROUTE.HOME} />
                      </Route>
                      <Route path={ROUTE.HOME} exact component={Home} />
                      <Route path={ROUTE.SETTINGS} exact component={Settings} />
                      <Route
                        path={ROUTE.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route path={ROUTE.ADMIN}>
                        <Redirect to={ROUTE.HOME} />
                      </Route>
                      <Route
                        path={ROUTE.NOT_FOUND}
                        exact
                        component={NotFound}
                      />
                    </Switch>
                  );

                case PrivilegeLevel.ADMIN:
                  return (
                    <Switch>
                      <Route path={ROUTE.LANDING} exact component={Landing} />
                      <Route path={ROUTE.LOGIN}>
                        <Redirect to={ROUTE.HOME} />
                      </Route>
                      <Route path={ROUTE.SIGNUP}>
                        <Redirect to={ROUTE.HOME} />
                      </Route>
                      <Route path={ROUTE.HOME} exact component={Home} />
                      <Route path={ROUTE.SETTINGS} exact component={Settings} />
                      <Route
                        path={ROUTE.VOLUNTEER}
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route
                        path={ROUTE.ADMIN}
                        exact
                        component={AdminDashboard}
                      />
                      <Route
                        path={ROUTE.NOT_FOUND}
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
