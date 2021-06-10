import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { Routes } from '../../App';
import styled from 'styled-components';
import { Avatar, Button, Dropdown, Menu, Row, Col, Typography } from 'antd';
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
import sfttLogo from '../../assets/images/sfttNameLogo.png';
import bostonLogo from '../../assets/images/bostonParksLogo.png';
import c4cLogo from '../../assets/images/c4cTextLogo.png';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { logout } from '../../auth/ducks/thunks';

const { Paragraph } = Typography;

const NavContainer = styled.div`
  box-shadow: '0 4px 2px -2px grey';
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  height: 9vh;
  padding: 0;
  overflow: hidden;
`;

const FlexDiv = styled.div`
  display: flex;
  float: right;
  margin-right: 20px;
  height: 100%;
  line-height: 9vh;
`;

const MainLogo = styled.img`
  height: 70px;
  margin-right: 10px;
`;

const BostonLogo = styled.img`
  height: 55px;
`;

const C4CLogo = styled.img`
  height: 27px;
`;

const LandingExtraContainer = styled.div`
  float: right;
  padding-right: 2vw;
  height: 100%;
  line-height: 9vh;
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

const Name = styled(Paragraph)`
  display: inline-block;
  margin-right: 20px;
`;

const GreenAvatar = styled(Avatar)`
  background-color: ${DARK_GREEN};
`;

const NoHoverShadeButton = styled(Button)`
  height: 100%;
  overflow: hidden;
  &:hover {
    background: ${BACKGROUND_GREY};
  }
`;

const LogoCol = styled(Col)`
  height: 100%;
  line-height: 6vh;
`;

const NavTitleText = styled.div`
  font-size: 14px;
  font-weight: bold;
  height: 100%;
  display: inline-block;
  color: ${MID_GREEN};
  margin-bottom: 10px;
`;

interface NavBarProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const NavBar: React.FC<NavBarProps> = ({ tokens }) => {
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

  const HeaderTitle = () => (
    <NoHoverShadeButton type="text" onClick={() => history.push(Routes.HOME)}>
      <Row align="bottom">
        <Col span={6}>
          <MainLogo src={sfttLogo} alt="icon" />
        </Col>
        <Col span={6}>
          <NavTitleText>in partnership with</NavTitleText>
        </Col>
        <LogoCol span={4}>
          <BostonLogo src={bostonLogo} />
        </LogoCol>
        <Col span={2}>
          <NavTitleText>and</NavTitleText>
        </Col>
        <LogoCol span={4}>
          <C4CLogo src={c4cLogo} />
        </LogoCol>
      </Row>
    </NoHoverShadeButton>
  );

  const ShortHeaderTitle = () => (
    <NoHoverShadeButton type="text" onClick={() => history.push(Routes.HOME)}>
      <MainLogo src={sfttLogo} alt="icon" />
    </NoHoverShadeButton>
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
      {(privilegeLevel === PrivilegeLevel.ADMIN ||
        privilegeLevel === PrivilegeLevel.SUPER_ADMIN) && (
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
            history.go(0);
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
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Paragraph>
            <Name>{userFullName}</Name>
            <GreenAvatar size="large" icon={<UserOutlined />} />
          </Paragraph>
        </Dropdown>
      </FlexDiv>
    );
  };

  switch (windowType) {
    case WindowTypes.Mobile:
      return <MobileNavBar isLoggedIn={isLoggedIn} />;

    case WindowTypes.Tablet:
      return (
        <NavContainer>
          <ShortHeaderTitle />
          {isLoggedIn ? <LoggedInExtra /> : <LandingExtra />}
        </NavContainer>
      );
    case WindowTypes.NarrowDesktop:
    case WindowTypes.Desktop:
      return (
        <NavContainer>
          <HeaderTitle />
          {isLoggedIn ? <LoggedInExtra /> : <LandingExtra />}
        </NavContainer>
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
