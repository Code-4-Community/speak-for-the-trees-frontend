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
import useWindowDimensions, { WindowTypes } from '../windowDimensions';
import { getPrivilegeLevel, getUserFullName } from '../../auth/ducks/selectors';
import { connect, useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import MobileNavBar from '../mobileComponents/mobileNavBar';
import {
  BACKGROUND_GREY,
  BLACK,
  DARK_GREEN,
  LIGHT_GREEN,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';
import Logo from '../../assets/images/nav-bar-icon.png';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { logout } from '../../auth/ducks/thunks';

const { Paragraph, Title } = Typography;

const NavHeader: typeof PageHeader = styled(PageHeader)<PageHeaderProps>`
  box-shadow: '0 4px 2px -2px grey';
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
`;

const FlexDiv = styled.div`
  display: flex;
`;

const BackLogo = styled.img`
  height: 40px;
`;

const LandingExtraContainer = styled.div`
  padding-right: 3vw;
`;

const SignupButton = styled(Button)`
  margin-right: 2vw;
  background-color: ${LIGHT_GREEN},
  border-color: ${LIGHT_GREEN};
`;

const LoginButton = styled(Button)`
  background-color: ${WHITE};
  border-color: ${WHITE};
  color: ${BLACK};
`;

const GreenAvatar = styled(Avatar)`
  background-color: ${DARK_GREEN};
`;

type NavBarProps = UserAuthenticationReducerState;

const NavBar: React.FC<NavBarProps> = ({ tokens, userData }) => {
  const { windowType } = useWindowDimensions();
  const history = useHistory();
  const dispatch = useDispatch();

  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );
  const userFullName = useSelector((state: C4CState) =>
    getUserFullName(state.authenticationState.userData),
  );

  const isLoggedIn: boolean = privilegeLevel !== PrivilegeLevel.NONE;

  const HeaderTitle = (
    <Button type="text" onClick={() => history.push(Routes.HOME)}>
      <Title level={3}>Speak for the Trees</Title>
    </Button>
  );

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
          if (asyncRequestIsComplete(tokens)) {
            dispatch(logout());
            history.push(Routes.LANDING);
          }
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  const LandingExtra = () => {
    return (
      <LandingExtraContainer>
        <SignupButton
          type="primary"
          htmlType="submit"
          size={'large'}
          onClick={() => history.push(Routes.SIGNUP)}
        >
          Sign Up
        </SignupButton>
        <LoginButton
          type="primary"
          htmlType="submit"
          size={'large'}
          onClick={() => history.push(Routes.LOGIN)}
        >
          Log In
        </LoginButton>
      </LandingExtraContainer>
    );
  };

  const LoggedInExtra = () => {
    return (
      <FlexDiv>
        <Paragraph style={{ margin: 'auto 20px auto 0' }}>
          {userFullName}
        </Paragraph>
        <Dropdown overlay={menu} placement="bottomLeft">
          <GreenAvatar size="large" icon={<UserOutlined />} />
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
          title={HeaderTitle}
          backIcon={<BackLogo src={Logo} alt="icon" />}
          onBack={() => history.push(Routes.HOME)}
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
    userData: state.authenticationState.userData,
  };
};

export default connect(mapStateToProps)(NavBar);
