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
import Logo from '../../nav-bar-icon.png';

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
    return (
      <img
        className="back-icon"
        src={Logo}
        alt="icon"
        style={{
          height: '40px',
        }}
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
      <FlexDiv>
        {/* This needs to changed, not a constant */}
        <Paragraph style={{ margin: 'auto 20px auto 0' }}>Jack Blanc</Paragraph>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ backgroundColor: DARK_GREEN }}
          />
        </Dropdown>
      </FlexDiv>
    );
  };

  switch (windowType) {
    case WindowTypes.Mobile:
      return <MobileNavBar isLoggedIn={isLoggedIn} />;

    case WindowTypes.Tablet:
    case WindowTypes.NarrowDesktop:
    case WindowTypes.Desktop:
      return (
        <NavHeader
          className="page-header"
          title="Speak for the Trees"
          backIcon={<BackIcon />}
          onBack={() => history.push('/')}
          extra={isLoggedIn ? <LoggedInExtra /> : <LandingExtra />}
        />
      );

    default:
      return <></>;
  }
};

const mapStateToProps = (state: C4CState): NavBarProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(NavBar);
