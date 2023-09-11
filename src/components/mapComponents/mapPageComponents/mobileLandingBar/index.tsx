import React, { PropsWithChildren } from 'react';
import { Routes } from '../../../../App';
import styled from 'styled-components';
import Typography from 'antd/es/typography';
import {
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  BLACK,
} from '../../../../utils/colors';
import { Flex } from '../../../themedComponents';
import { LinkButton } from '../../../linkButton';

const TitleContainer = styled.div`
  display: block;
  width: 100%;
`;

const MobileTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  font-size: 25px;
  font-weight: bold;
  line-height: 15px;
`;

const MobileParagraph = styled(Typography.Paragraph)`
  font-size: 15px;
`;

const LoginButton = styled(LinkButton)`
  width: 100px;
  height: 50px;
  background: ${WHITE};
  border-color: ${LIGHT_GREY};
  color: ${BLACK};
`;

const SignUpButton = styled(LinkButton)`
  width: 100px;
  height: 50px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const StyledFlex = styled(Flex)`
  margin-bottom: 15px;
`;

interface MobileLandingBarProps {
  readonly barHeader: string;
  readonly barDescription: string | JSX.Element;
  readonly isLoggedIn: boolean;
}

const MobileLandingBar: React.FC<PropsWithChildren<MobileLandingBarProps>> = ({
  barHeader,
  barDescription,
  isLoggedIn,
  children,
}) => {
  return (
    <Flex gap={'0'}>
      <TitleContainer>
        <MobileTitle>{barHeader}</MobileTitle>
        <MobileParagraph>{barDescription}</MobileParagraph>
      </TitleContainer>
      {children}
      {!isLoggedIn && (
        <StyledFlex justifyContent={'center'}>
          <div>
            <LoginButton
              type="primary"
              htmlType="submit"
              size="large"
              to={Routes.LOGIN}
            >
              Log In
            </LoginButton>
          </div>
          <div>
            <SignUpButton
              type="primary"
              htmlType="submit"
              size="large"
              to={Routes.SIGNUP}
            >
              Sign Up
            </SignUpButton>
          </div>
        </StyledFlex>
      )}
    </Flex>
  );
};

export default MobileLandingBar;
