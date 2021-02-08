import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { C4CState } from '../../store';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { Avatar, Button, Dropdown, Menu, PageHeader, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DARK_GREEN, LIGHT_GREEN, WHITE } from '../../colors';

const { Paragraph } = Typography;

type NavBarProps = UserAuthenticationReducerState;

const NavBar: React.FC<NavBarProps> = ({ tokens }) => {
  const history = useHistory();

  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(tokens),
  );

  const isLoggedIn: boolean =
    privilegeLevel === PrivilegeLevel.STANDARD ||
    privilegeLevel === PrivilegeLevel.ADMIN;

  const BackIcon = () => {
    const Logo: string = require('../../nav-bar-icon.png');
    return (
      <img
        className="back-icon"
        src={Logo}
        alt="icon"
        style={{ height: '40px' }}
      />
    );
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          history.push('/settings');
        }}
      >
        Account Settings
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push('/');
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  const LandingExtra = () => {
    return (
      <div className="landing-extra" style={{ paddingRight: '3vw' }}>
        <Button
          type="primary"
          htmlType="submit"
          size={'large'}
          style={{
            backgroundColor: LIGHT_GREEN,
            borderColor: LIGHT_GREEN,
            margin: '0 2vw 0 0',
          }}
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          size={'large'}
          style={{
            backgroundColor: WHITE,
            borderColor: WHITE,
            color: 'black',
          }}
          onClick={() => history.push('/login')}
        >
          Log In
        </Button>
      </div>
    );
  };

  const LoggedInExtra = () => {
    return (
      <div className="logged-in-extra" style={{ display: 'flex' }}>
        {/* This needs to changed, not a constant */}
        <Paragraph style={{ margin: 'auto 20px auto 0' }}>Jack Blanc</Paragraph>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ backgroundColor: DARK_GREEN }}
          />
        </Dropdown>
      </div>
    );
  };

  return (
    <PageHeader
      className="page-header"
      title="Speak for the Trees"
      backIcon={<BackIcon />}
      onBack={() => history.push('/')}
      style={{
        boxShadow: '0 4px 2px -2px grey',
        margin: '0 0 3px 0',
        backgroundColor: '#F5F5F5',
        color: '#61802e',
      }}
      extra={isLoggedIn ? <LoggedInExtra /> : <LandingExtra />}
    />
  );
};

const mapStateToProps = (state: C4CState): NavBarProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(NavBar);
