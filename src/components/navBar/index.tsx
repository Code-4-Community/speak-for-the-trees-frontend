import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { Routes } from '../../App';
import styled from 'styled-components';
import { Avatar, Button, Dropdown, Menu, PageHeader, Typography } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { UserOutlined } from '@ant-design/icons';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { connect, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import MobileNavBar from '../mobileComponents/mobileNavBar';
import {
  BACKGROUND_GREY,
  DARK_GREEN,
  LIGHT_GREEN,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';
import Logo from '../../nav-bar-icon.png';

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

type NavBarProps = UserAuthenticationReducerState;

const NavBar: React.FC<NavBarProps> = ({ tokens }) => {
  const { windowType } = useWindowDimensions();
  const history = useHistory();

  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const isLoggedIn: boolean = privilegeLevel !== PrivilegeLevel.NONE;

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
          history.push(Routes.SETTINGS);
        }}
      >
        Account Settings
      </Menu.Item>
      {privilegeLevel === PrivilegeLevel.ADMIN && (
        <Menu.Item
          onClick={() => {
            history.push(Routes.ADMIN);
          }}
        >
          Admins
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          history.push(Routes.LANDING);
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
          onClick={() => history.push(Routes.SIGNUP)}
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
          onClick={() => history.push(Routes.LOGIN)}
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
