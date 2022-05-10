import React from 'react';
import { Routes } from '../../App';
import styled from 'styled-components';
import useWindowDimensions, { WindowTypes } from '../windowDimensions';
import MobileNavBar from './mobileNavBar';
import { BACKGROUND_GREY, MID_GREEN } from '../../utils/colors';
import { LinkButton } from '../linkButton';
import NavExtra from './navExtra';
import { SFTT_PARTNER_LOGOS } from '../../assets/links';
import { useLocation } from 'react-router-dom';

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

const NoHoverShadeButton = styled(LinkButton)`
  height: 100%;
  overflow: hidden;
  &:hover {
    background: ${BACKGROUND_GREY};
  }
`;

interface NavBarProps {
  readonly userName?: string;
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userName, isAdmin, onLogout }) => {
  const { windowType } = useWindowDimensions();
  const location = useLocation();

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
        <NoHoverShadeButton type="text" to={Routes.HOME}>
          <MainLogo src={SFTT_PARTNER_LOGOS} alt={'SFTT Logo'} />
        </NoHoverShadeButton>
        <NavExtra
          userName={userName}
          isAdmin={isAdmin}
          onLogout={onLogout}
          location={location}
        />
      </NavContainer>
    );
  }
};

export default NavBar;
