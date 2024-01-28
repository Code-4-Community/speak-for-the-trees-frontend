import React from 'react';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { Menu } from 'antd';
import { BLACK, LIGHT_GREEN, LIGHT_GREY } from '../../../utils/colors';
import { MenuLinkButton } from '../../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

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
  const { t } = useTranslation(n(site, ['landing']), { nsMode: 'fallback' });
  return (
    <StyledNavMenu>
      <StyledNavMenuItem>
        <MenuLinkButton type="text" to={Routes.MY_TREES}>
          {t('navMenu.myTrees')}
        </MenuLinkButton>
      </StyledNavMenuItem>
      {isAdmin && (
        <StyledNavMenuItem>
          <MenuLinkButton type="text" to={Routes.ADMIN}>
            {t('navMenu.admins')}
          </MenuLinkButton>
        </StyledNavMenuItem>
      )}
      <StyledNavMenuItem>
        <MenuLinkButton type="text" to={Routes.SETTINGS}>
          {t('navMenu.accountSettings')}
        </MenuLinkButton>
      </StyledNavMenuItem>
      <StyledNavMenuItem onClick={onLogout}>
        {t('navMenu.logOut')}
      </StyledNavMenuItem>
    </StyledNavMenu>
  );
};

export default NavMenu;
