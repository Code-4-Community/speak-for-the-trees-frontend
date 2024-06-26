import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { PageHeader, Dropdown } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { MenuOutlined } from '@ant-design/icons';
import { MID_GREEN, BACKGROUND_GREY, LIGHT_GREEN } from '../../../utils/colors';
import Logo from '../../../assets/images/nav-bar-icon.png';
import NavMenu from '../navMenu';
import { LinkButton } from '../../linkButton';
import TranslationDropdown from '../translationDropdown';
import { Flex } from '../../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

interface MobileNavBarProps {
  readonly isLoggedIn: boolean;
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const MobileDropdownMenu = styled(MenuOutlined)`
  display: inline-flex;
  font-size: 25px;
`;

const MobileNavHeader: typeof PageHeader = styled(PageHeader)<PageHeaderProps>`
  box-shadow: '0 4px 2px -2px grey';
  width: 100%;
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  font-weight: 700;
`;

const SignUpButton = styled(LinkButton)`
  width: 90px;
  height: 40px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const MobileNavBar: React.FC<MobileNavBarProps> = ({
  isLoggedIn,
  isAdmin,
  onLogout,
}) => {
  const history = useHistory();
  const { t } = useTranslation(n(site, 'forms'), { nsMode: 'fallback' });

  return (
    <MobileNavHeader
      className="page-header"
      title=""
      subTitle="Speak for the Trees"
      backIcon={
        <img
          className="back-icon"
          src={Logo}
          alt="icon"
          style={{
            height: '30px',
          }}
        />
      }
      onBack={() => history.push(Routes.LANDING)}
      extra={
        isLoggedIn ? (
          <Flex gap="2vw">
            <TranslationDropdown />
            <Dropdown
              overlay={<NavMenu isAdmin={isAdmin} onLogout={onLogout} />}
              placement="bottomLeft"
            >
              <MobileDropdownMenu />
            </Dropdown>
          </Flex>
        ) : (
          <Flex gap="2vw">
            <TranslationDropdown />
            <SignUpButton
              type="primary"
              htmlType="submit"
              size="large"
              to={Routes.SIGNUP}
            >
              {t('sign_up')}
            </SignUpButton>
          </Flex>
        )
      }
    />
  );
};

export default MobileNavBar;
