import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.less';
import Landing from './containers/landing/Landing';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import Home from './containers/home/Home';
import Settings from './containers/settings/Settings';
import DummyLeaderboard from './containers/dummy-leaderboard/DummyLeaderboard';

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
              <Route path="/dummy" exact component={DummyLeaderboard} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default App;
