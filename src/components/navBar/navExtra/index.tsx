import React from 'react';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BLACK, DARK_GREEN, LIGHT_GREEN, WHITE } from '../../../utils/colors';
import NavMenu from '../navMenu';
import { Location } from 'history';
import { GreenLinkButton } from '../../themedComponents';

const FlexDiv = styled.div`
  display: flex;
  float: right;
  margin-right: 20px;
  height: 100%;
  line-height: 9vh;
`;

const LandingExtraContainer = styled.div`
  float: right;
  padding-right: 2vw;
  padding-top: 22px;
  height: 100%;
`;

const SignupButton = styled(GreenLinkButton)`
  margin-right: 2vw;
  background-color: ${LIGHT_GREEN},
  border-color: ${LIGHT_GREEN};
`;

const LoginButton = styled(GreenLinkButton)`
  background-color: ${WHITE};
  border-color: ${WHITE};
  color: ${BLACK};
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
  if (userName !== undefined) {
    return (
      <FlexDiv>
        <Dropdown
          overlay={<NavMenu isAdmin={isAdmin} onLogout={onLogout} />}
          placement="bottomRight"
          arrow
        >
          <Typography.Paragraph>
            <Name>{userName}</Name>
            <GreenAvatar size="large" icon={<UserOutlined />} />
          </Typography.Paragraph>
        </Dropdown>
      </FlexDiv>
    );
  } else {
    return (
      <LandingExtraContainer>
        <SignupButton
          type="primary"
          htmlType="submit"
          size={'large'}
          to={Routes.SIGNUP}
          state={{
            destination: location.pathname,
          }}
        >
          Sign Up
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
          Log In
        </LoginButton>
      </LandingExtraContainer>
    );
  }
};

export default NavExtra;
