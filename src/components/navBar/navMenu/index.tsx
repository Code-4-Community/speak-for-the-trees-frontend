import React from 'react';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { Menu } from 'antd';
import { BLACK, LIGHT_GREEN, LIGHT_GREY } from '../../../utils/colors';
import { MenuLinkButton } from '../../themedComponents';

const StyledNavMenu = styled(Menu)`
  border: 1px solid ${LIGHT_GREY};
`;

const StyledNavMenuItem = styled(Menu.Item)`
  &:hover {
    background: ${LIGHT_GREEN};
    color: ${BLACK};
  }
`;

interface NavMenuProps {
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isAdmin, onLogout }) => {
  return (
    <StyledNavMenu>
      <StyledNavMenuItem>
        <MenuLinkButton type="text" to={Routes.MY_TREES}>
          My Trees
        </MenuLinkButton>
      </StyledNavMenuItem>
      {isAdmin && (
        <StyledNavMenuItem>
          <MenuLinkButton type="text" to={Routes.ADMIN}>
            Admins
          </MenuLinkButton>
        </StyledNavMenuItem>
      )}
      <StyledNavMenuItem>
        <MenuLinkButton type="text" to={Routes.SETTINGS}>
          Account Settings
        </MenuLinkButton>
      </StyledNavMenuItem>
      <StyledNavMenuItem onClick={onLogout}>Log Out</StyledNavMenuItem>
    </StyledNavMenu>
  );
};

export default NavMenu;
