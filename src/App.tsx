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
import TeamLeaderboard from './containers/team-leaderboard/TeamLeaderboard';

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/nav-bar/NavBar';
import { Layout } from 'antd';

const { Content } = Layout;

type AppProps = UserAuthenticationReducerState;

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
                      <Route path="/" exact component={Landing} />
                      <Route path="/login" exact component={Login} />
                      <Route path="/signup" exact component={Signup} />
                      <Route path="/home">
                        <Redirect to="/login" />
                      </Route>
                      <Route path="/settings">
                        <Redirect to="/login" />
                      </Route>
                      <Route path="/volunteer">
                        <Redirect to="/login" />
                      </Route>
                      <Route path="/team-leaderboard">
                        <Redirect to="/login" />
                      </Route>
                      <Route path="/admin">
                        <Redirect to="/login" />
                      </Route>
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  );

                case PrivilegeLevel.STANDARD:
                  return (
                    <Switch>
                      <Route path="/" exact component={Landing} />
                      <Route path="/login">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="/signup">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="/home" exact component={Home} />
                      <Route path="/settings" exact component={Settings} />
                      <Route
                        path="/volunteer"
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route
                        path="/team-leaderboard"
                        exact
                        component={TeamLeaderboard}
                      />
                      <Route path="/admin">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  );

                case PrivilegeLevel.ADMIN:
                  return (
                    <Switch>
                      <Route path="/" exact component={Landing} />
                      <Route path="/login">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="/signup">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="/home" exact component={Home} />
                      <Route path="/settings" exact component={Settings} />
                      <Route
                        path="/volunteer"
                        exact
                        component={VolunteerLeaderboard}
                      />
                      <Route
                        path="/team-leaderboard"
                        exact
                        component={TeamLeaderboard}
                      />
                      <Route path="/admin" exact component={AdminDashboard} />
                      <Route path="*" exact component={NotFound} />
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
