import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../App';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import {
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  BLACK,
} from '../../../../utils/colors';
import { Flex } from '../../../themedComponents';

const MobileBarContentContainer = styled.div`
  display: block;
  padding-bottom: 10px;
`;

const TitleButtonsContainer = styled.div`
  width: 90vw;
  margin: 0px -30px;
`;

const TitleContainer = styled.div`
  display: block;
  min-width: 200px;
  max-width: 95%;
`;

const MobileTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  font-size: 18px;
  font-weight: 500;
  line-height: 15px;
`;

const MobileParagraph = styled(Typography.Paragraph)`
  font-size: 15px;
`;

const LoginButton = styled(Button)`
  width: 100px;
  height: 50px;
  background: ${WHITE};
  border-color: ${LIGHT_GREY};
  color: ${BLACK};
`;

const SignUpButton = styled(Button)`
  width: 100px;
  height: 50px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const LandingStatsContainer = styled.div`
  width: 100%;
  display: flex;
  row-gap: 30px;
  flex-wrap: wrap;
`;

const StyledFlex = styled(Flex)`
  margin-bottom: 15px;
`;

interface MobileLandingBarProps {
  readonly barHeader: string;
  readonly barDescription: string | JSX.Element;
  readonly isLoggedIn: boolean;
}

const MobileLandingBar: React.FC<MobileLandingBarProps> = ({
  barHeader,
  barDescription,
  isLoggedIn,
  children,
}) => {
  const history = useHistory();

  return (
    <Flex>
      <MobileBarContentContainer>
        <TitleButtonsContainer>
          <TitleContainer>
            <MobileTitle>{barHeader}</MobileTitle>
            <MobileParagraph>{barDescription}</MobileParagraph>
          </TitleContainer>
          {!isLoggedIn && (
            <StyledFlex justifyContent={'center'}>
              <div>
                <LoginButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => history.push(Routes.LOGIN)}
                >
                  Log In
                </LoginButton>
              </div>
              <div>
                <SignUpButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => history.push(Routes.SIGNUP)}
                >
                  Sign Up
                </SignUpButton>
              </div>
            </StyledFlex>
          )}
        </TitleButtonsContainer>
        <LandingStatsContainer>{children}</LandingStatsContainer>
      </MobileBarContentContainer>
    </Flex>
  );
};

export default MobileLandingBar;
