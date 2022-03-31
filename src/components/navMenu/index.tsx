import React from 'react';
import { Routes } from '../../App';
import styled from 'styled-components';
import { Menu } from 'antd';
import { LinkButton } from '../linkButton';

const MenuLinkButton = styled(LinkButton)`
  padding-left: 0;
`;

interface NavMenuProps {
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isAdmin, onLogout }) => {
  return (
    <Menu>
      <Menu.Item>
        <MenuLinkButton type="text" to={Routes.SETTINGS}>
          Account Settings
        </MenuLinkButton>
      </Menu.Item>
      {isAdmin && (
        <Menu.Item>
          <MenuLinkButton type="text" to={Routes.ADMIN}>
            Admins
          </MenuLinkButton>
        </Menu.Item>
      )}
      <Menu.Item onClick={onLogout}>Log Out</Menu.Item>
    </Menu>
  );
};

export default NavMenu;
