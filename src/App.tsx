import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.less';
import Landing from './containers/landing/Landing';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import AdminDashboard from './containers/admin-dashboard/AdminDashboard';
import Home from './containers/home/Home';
import Settings from './containers/settings/Settings';
<<<<<<< HEAD
=======
import VolunteerLeaderboard from './containers/volunteer-leaderboard/VolunteerLeaderboard';
import TeamLeaderboard from './containers/team-leaderboard/TeamLeaderboard';
>>>>>>> 50f8b52... connected routes to volunteer lederboard and made a team leaderboard page based on that

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/nav-bar/NavBar';
import { Layout } from 'antd';
const { Content } = Layout;

const App: React.FC = () => {
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
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/home" exact component={Home} />
              <Route path="/settings" exact component={Settings} />
<<<<<<< HEAD
=======
              <Route path="/volunteer" exact component={VolunteerLeaderboard} />
              <Route
                path="/team-leaderboard"
                exact
                component={TeamLeaderboard}
              />
>>>>>>> 50f8b52... connected routes to volunteer lederboard and made a team leaderboard page based on that
              <Route path="/admin" exact component={AdminDashboard} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default App;
