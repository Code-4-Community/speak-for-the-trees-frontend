import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeader, Typography, Button, Avatar, Menu, Dropdown } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { UserOutlined } from '@ant-design/icons';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { PrivilegeLevel } from '../../auth/ducks/types';
import MobileNavBar from '../mobile-nav-bar/MobileNavBar';
import {
  LIGHT_GREEN,
  MID_GREEN,
  DARK_GREEN,
  BACKGROUND_GREY,
  WHITE,
} from '../../colors';
const { Paragraph } = Typography;

const NavHeader: typeof PageHeader = styled(PageHeader)<PageHeaderProps>`
  box-shadow: '0 4px 2px -2px grey';
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
`;

const FlexDiv = styled.div`
  display: flex;
`;

const NavBar: React.FC = () => {
  const { windowType } = useWindowDimensions();
  const history = useHistory();

  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const isLoggedIn: boolean = privilegeLevel > PrivilegeLevel.NONE;

  const BackIcon = () => {
    const Logo: string = require('../../nav-bar-icon.png');
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

    default:
      return (
        <NavHeader
          className="page-header"
          title="Speak for the Trees"
          backIcon={<BackIcon />}
          onBack={() => history.push('/')}
          extra={isLoggedIn ? <LoggedInExtra /> : <LandingExtra />}
        />
      );
  }
};

export default NavBar;
