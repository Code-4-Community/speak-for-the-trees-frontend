import React from 'react';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BLACK, DARK_GREEN, LIGHT_GREEN, WHITE } from '../../../utils/colors';
import NavMenu from '../navMenu';
import { Location } from 'history';
import { GreenLinkButton } from '../../themedComponents';
import TranslationDropdown from '../translationDropdown';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

const FlexDiv = styled.div`
  display: flex;
  float: right;
  margin-right: 20px;
  height: 100%;
  line-height: 9vh;
  gap: 1.8vw;
  align-items: center;
`;

const SignupButton = styled(GreenLinkButton)`
  background-color: ${LIGHT_GREEN},
  border-color: ${LIGHT_GREEN};
`;

const LoginButton = styled(GreenLinkButton)`
  background-color: ${WHITE};
  border-color: ${WHITE};
  color: ${BLACK};
`;

const ExtrasContainer = styled(Typography.Paragraph)`
  margin-top: 1.6em;
`;

const Name = styled(Typography.Paragraph)`
  display: inline-block;
  margin-right: 20px;
`;

const GreenAvatar = styled(Avatar)`
  background-color: ${DARK_GREEN};
`;

interface NavExtraProps {
  readonly userName?: string;
  readonly isAdmin: boolean;
  readonly location: Location;
  readonly onLogout: () => void;
}

const NavExtra: React.FC<NavExtraProps> = ({
  userName,
  isAdmin,
  location,
  onLogout,
}) => {
  const { t } = useTranslation(n(site, 'forms'), { nsMode: 'fallback' });

  if (userName !== undefined) {
    return (
      <FlexDiv>
        <TranslationDropdown />
        <Dropdown
          overlay={<NavMenu isAdmin={isAdmin} onLogout={onLogout} />}
          placement="bottomRight"
          align={{ offset: [0, -25] }}
          arrow
        >
          <ExtrasContainer>
            <Name>{userName}</Name>
            <GreenAvatar size="large" icon={<UserOutlined />} />
          </ExtrasContainer>
        </Dropdown>
      </FlexDiv>
    );
  } else {
    return (
      <FlexDiv>
        <TranslationDropdown />
        <SignupButton
          type="primary"
          htmlType="submit"
          size={'large'}
          to={Routes.SIGNUP}
          state={{
            destination: location.pathname,
          }}
        >
          {t('sign_up')}
        </SignupButton>
        <LoginButton
          type="primary"
          htmlType="submit"
          size={'large'}
          to={Routes.LOGIN}
          state={{
            destination: location.pathname,
          }}
        >
          {t('log_in')}
        </LoginButton>
      </FlexDiv>
    );
  }
};

export default NavExtra;
