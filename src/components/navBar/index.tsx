import React from 'react';
import {Routes} from '../../App';
import styled from 'styled-components';
import {Col, Row} from 'antd';
import useWindowDimensions, {WindowTypes} from '../windowDimensions';
import MobileNavBar from './mobileNavBar';
import {BACKGROUND_GREY, MID_GREEN} from '../../utils/colors';
import sfttLogo from '../../assets/images/sfttNameLogo.png';
import bostonLogo from '../../assets/images/bostonParksLogo.png';
import c4cLogo from '../../assets/images/c4cTextLogo.png';
import {LinkButton} from '../linkButton';
import NavExtra from './navExtra';

const NavContainer = styled.div`
  box-shadow: '0 4px 2px -2px grey';
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  height: 9vh;
  min-height: 80px;
  padding: 0;
  overflow: hidden;
`;

const MainLogo = styled.img`
  height: 70px;
  margin-right: 10px;
`;

const BostonLogo = styled.img`
  height: 55px;
  line-height: 0px;
`;

const C4CLogo = styled.img`
  height: 27px;
  line-height: 0px;
`;

const NoHoverShadeButton = styled(LinkButton)`
  height: 100%;
  overflow: hidden;
  &:hover {
    background: ${BACKGROUND_GREY};
  }
`;

const LogoCol = styled(Col)`
  height: 100%;
`;

const NavTitleText = styled.div`
  font-size: 14px;
  font-weight: bold;
  height: 100%;
  display: inline-block;
  color: ${MID_GREEN};
  margin-bottom: 10px;
  line-height: 0px;
`;

interface NavBarProps {
  readonly userName?: string;
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userName, isAdmin, onLogout }) => {
  const { windowType } = useWindowDimensions();

  if (windowType === WindowTypes.Mobile || windowType === WindowTypes.Tablet) {
    return (
      <MobileNavBar
        isLoggedIn={userName !== undefined}
        isAdmin={isAdmin}
        onLogout={onLogout}
      />
    );
  } else {
    return (
      <NavContainer>
        {windowType === WindowTypes.Desktop ? (
          <NoHoverShadeButton type="text" to={Routes.HOME}>
            <Row align="middle">
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
        ) : (
          <NoHoverShadeButton type="text" to={Routes.HOME}>
            <MainLogo src={sfttLogo} alt="icon" />
          </NoHoverShadeButton>
        )}
        <NavExtra userName={userName} isAdmin={isAdmin} onLogout={onLogout} />
      </NavContainer>
    );
  }
};

export default NavBar;
